import { Injectable } from "@angular/core";
import {   ReservationEntity, ReservationServiceLegacy } from "../openapi";
import { NewReservation, Reservation, convertReservation, convertReservationToLegacy} from './models/reservation'
import { Observable,  concatMap,  map, of, switchMap } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  constructor(private reservationLegacyService: ReservationServiceLegacy) {
  }

  public getall(): Observable<Array<Reservation>>{
    const reservations =  this.reservationLegacyService.apiReservationGet().pipe(map(list=>{
      const entriesMitContact = list.filter(e=>e.contact != null && e.contact != undefined);
      return entriesMitContact.map(reservation=>{
        return convertReservation(reservation);
      })
    }))
    return reservations;
  }

  public save(reservation: NewReservation): Observable<Reservation>{
    const resLegacy: ReservationEntity =  convertReservationToLegacy (reservation);
    return this.reservationLegacyService.apiReservationPost(resLegacy).pipe(switchMap(val=>{
      return of(convertReservation(val));
    }));
  }

}
