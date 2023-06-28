import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {
  ReservationContactTypesEntity,
  ReservationEntity,
  ReservationServiceLegacy,
} from '@dinnerfrontend/infrastructure';
import { Observable } from 'rxjs';
import { validateContactFields } from '../../utils/validators';

@Component({
  selector: 'dinner-frontend-legacy-new-reservation',
  templateUrl: './new-reservation-legacy.component.html',
  styleUrls: ['./new-reservation-legacy.component.scss'],
})
export class NewReservationLegacyComponent {
  minDate = new Date();
  maxDate = new Date();
  isSaving = false;
  private static phoneNumberPattern = /^(?:\+[0-9][0-9]|0)\s?[1-9](\s?\d){1,14}$/;

  reservationForm = this.fb.group({
    date: [this.minDate, Validators.required],
    personcount: [
      '1',
      [Validators.required, Validators.pattern(/^[1-9][0-9]?$|^100$/)],
    ],
    contactType: [
      ReservationContactTypesEntity.PrivateReservation,
      [Validators.required],
    ],
    contact: this.fb.group({
      firstName: [''],
      lastName: [''],
      phoneNumber: ['', Validators.pattern(NewReservationLegacyComponent.phoneNumberPattern)],
    }),
    companyContact: this.fb.group({
      companyName: [''],
      contactPerson: this.fb.group({
        firstName: [''],
        lastName: [''],
        phoneNumber: ['', Validators.pattern(NewReservationLegacyComponent.phoneNumberPattern)],
      }),
    }),
  }, { validators: validateContactFields });

  newReservation$: Observable<ReservationEntity> | undefined;

  constructor(
    private fb: FormBuilder,
    private reservationService: ReservationServiceLegacy
  ) {
    this.minDate.setDate(this.minDate.getDate() + 1);
    this.maxDate.setDate(this.minDate.getDate() + 56);
  }

  isPersonContact(): boolean {
    const val = this.reservationForm.get('contactType');
    if (!val) return true;
    return val.value === ReservationContactTypesEntity.PrivateReservation;
  }

  save(): void {
    this.isSaving = true;
    try {
      const formvalues = this.reservationForm.value;
      const reservation = <ReservationEntity>{
        date: formvalues.date,
        personcount: formvalues.personcount,
        restaurantId: 1,
        contact: formvalues.contactType ==
        ReservationContactTypesEntity.PrivateReservation ? {
          kind: formvalues.contactType,
          privateReservation: {
            nachname: formvalues.contact?.lastName,
            vorname: formvalues.contact?.firstName,
            phoneNumber: formvalues.contact?.phoneNumber,
          }
        } : {
          kind: formvalues.contactType,
          companyReservation: {
            name: formvalues.companyContact?.companyName,
            contact: {
             vorname: formvalues.companyContact?.contactPerson?.firstName,
             nachname: formvalues.companyContact?.contactPerson?.lastName,
             phoneNumber: formvalues.companyContact?.contactPerson?.phoneNumber,
            },
          }
        },
      };

      const postResult =
        this.reservationService.apiReservationPost(reservation);
      this.newReservation$ = postResult;
    } finally {
      this.isSaving = false;
    }
  }
}
