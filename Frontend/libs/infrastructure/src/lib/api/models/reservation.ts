import { CompanyEntity, PersonEntity, ReservationContactEntity, ReservationContactTypesEntity, ReservationEntity } from "../../openapi";

// Alle Properties als Pflichtfeld
export type Person = {
  [Property in keyof PersonEntity]-?: PersonEntity[Property];
}

export type ReadonlyPerson = Readonly<Person>;

function convertPerson(entity: PersonEntity){
  return <Person> entity;
}

// CompanyEntity ohne Property 'contact', alle Properties als Pflichtfelder
export type CompanyPart1 = {
  [Property in keyof Omit<CompanyEntity, 'contact'>]-?: CompanyEntity[Property]
}

// Property 'contact' von Company als Pflichtfeld
export type CompanyPart2 = {
  [Property in keyof Pick<CompanyEntity, 'contact'>]-?: Person
}

// Intersection aus Part1 und Part2
export type Company = CompanyPart1 & CompanyPart2

function convertCompany(entity: CompanyEntity){
  return <Company> entity;
}

 // Reservierung ohne contact
type ReservationWithoutContact = Omit<ReservationEntity, 'contact'>

// Discriminated Union (Wird nur für Legacy-Zugriff verwendet)
export type ReservationContactUnion =
|  {
  kind: ReservationContactTypesEntity.PrivateReservation,
  privateReservation: Person;
   }
| {
  kind: ReservationContactTypesEntity.CompanyReservation,
  companyReservation: Company;
  }



type ContactForReservation =
{
  [Property in keyof Pick<ReservationEntity, 'contact'>]-?: Person | Company
}

function isCompanyContact(contact: Person | Company): contact is Company
 {
    return (contact as Company).name != undefined;
 }

export function convertContact (contact: ReservationContactEntity) : Person | Company | null{
  const contactu = <ReservationContactUnion> contact;
  if (contactu.kind == ReservationContactTypesEntity.PrivateReservation){
    if (contact.privateReservation)
    {
      return convertPerson(contact.privateReservation);
    }
  } else {
    if(contact.companyReservation){
    return  convertCompany (contact.companyReservation);
    }
  }

  return null;
}

export function convertContactToLegacy (contactForReservation: Person | Company) : ReservationContactEntity | null{
  const result: ReservationContactEntity = {
  kind: isCompanyContact (contactForReservation) ? ReservationContactTypesEntity.CompanyReservation : ReservationContactTypesEntity.PrivateReservation,
  companyReservation: isCompanyContact (contactForReservation) ? {
    name: contactForReservation.name,
    contact: <PersonEntity> {
      ... contactForReservation.contact
    }
   }: undefined,
    privateReservation: ! isCompanyContact (contactForReservation) ? {
        ... contactForReservation
    }: undefined,
  };

  return result;
}

export type Reservation = ReservationWithoutContact & ContactForReservation
export type NewReservation = Omit<Reservation, 'id'>;

export function convertReservation (reservation: ReservationEntity){
   if (!reservation.contact){
    throw 'contact required'
   }
  return <Reservation> {
    ...reservation,
    contact: convertContact(reservation.contact)
  }
}

export function convertReservationToLegacy (reservation: Reservation){
  if (!reservation.contact){
   throw 'contact required'
  }
 return <ReservationEntity> {
   ...reservation,
   contact: convertContactToLegacy(reservation.contact)
 }
}

