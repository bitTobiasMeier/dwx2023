import { Component } from '@angular/core';
import {  FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  ReservationContactTypesEntity,
  Reservation,
  ReservationService,
  NewReservation,
} from '@dinnerfrontend/infrastructure';
import { Observable, map } from 'rxjs';
import { validateContactFields } from '../utils/validators';

@Component({
  selector: 'dinner-frontend-new-reservation',
  templateUrl: './new-reservation.component.html',
  styleUrls: ['./new-reservation.component.scss'],
})
export class NewReservationComponent {
  private static phoneNumberPattern = /^(?:\+[0-9][0-9]|0)\s?[1-9](\s?\d){1,14}$/;

  minDate = new Date();
  maxDate = new Date();
  isSaving = false;

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
      phoneNumber: ['', Validators.pattern(NewReservationComponent.phoneNumberPattern)],
    }),
    companyContact: this.fb.group({
      companyName: [''],
      contactPerson: this.fb.group({
        firstName: [''],
        lastName: [''],
        phoneNumber: ['', Validators.pattern(NewReservationComponent.phoneNumberPattern)],
      }),
    }),
  }, { validators: validateContactFields });

  constructor(
    private fb: FormBuilder,
    private reservationService: ReservationService,
    private router: Router
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
    if (this.isSaving) return;
    this.isSaving = true;
    try {
      const formvalues = this.reservationForm.value;
      const reservation = <NewReservation>{
        date: formvalues.date,
        personcount: formvalues.personcount,
        restaurantId: 1,
        contact:
          formvalues.contactType ==
          ReservationContactTypesEntity.PrivateReservation
            ? {
                nachname: formvalues.contact?.lastName,
                vorname: formvalues.contact?.firstName,
                phoneNumber: formvalues.contact?.phoneNumber,
              }
            : {
                name: formvalues.companyContact?.companyName,
                contact: {
                  vorname: formvalues.companyContact?.contactPerson?.firstName,
                  nachname: formvalues.companyContact?.contactPerson?.lastName,
                  phoneNumber:
                    formvalues.companyContact?.contactPerson?.phoneNumber,
                },
              },
      };

      const postResult = this.reservationService.save(reservation);
      //this.newReservation$ = postResult;
      postResult.forEach(v=> {
        if (v.id) {
          this.router.navigate(['reservations']);
        }
      });
    } finally {
      this.isSaving = false;
    }
  }


}



