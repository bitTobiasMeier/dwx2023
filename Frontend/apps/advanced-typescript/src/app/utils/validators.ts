import { AbstractControl, ValidationErrors } from "@angular/forms";
import { ReservationContactTypesEntity } from "@dinnerfrontend/infrastructure";

export function validateContactFields (control: AbstractControl): ValidationErrors | null  {
  const contactType = control.get('contactType')?.value;

  if (contactType === ReservationContactTypesEntity.PrivateReservation) {
    const firstName = control.get('contact.firstName')?.value;
    const lastName = control.get('contact.lastName')?.value;
    const phoneNumber = control.get('contact.phoneNumber')?.value;

    if (
      !firstName ||
      !lastName ||
      !phoneNumber
    ) {
      return { personFieldsIncomplete: true };
    }
  }

  if (contactType === ReservationContactTypesEntity.CompanyReservation) {
    const companyName = control.get('companyContact.companyName')?.value;
    const contactFirstName = control.get('companyContact.contactPerson.firstName')?.value;
    const contactLastName = control.get('companyContact.contactPerson.lastName')?.value;
    const contactPhoneNumber = control.get('companyContact.contactPerson.phoneNumber')?.value;

    if (
      !companyName ||
      !contactFirstName ||
      !contactLastName ||
      !contactPhoneNumber
    ) {
      return { companyFieldsIncomplete: true };
    }
  }

  return null;
};
