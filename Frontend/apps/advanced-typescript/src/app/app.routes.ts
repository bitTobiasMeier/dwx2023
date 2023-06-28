import { Route } from "@angular/router";
import { ReservationsOverviewComponent } from "./reservations-overview/reservations-overview.component";
import { NewReservationComponent } from "./new-reservation/new-reservation.component";
import { ReservationsOverviewLegacyComponent } from "./legacy/reservations-overview-legacy/reservations-overview-legacy.component";
import { NewReservationLegacyComponent } from "./legacy/new-reservation-legacy/new-reservation-legacy.component";

export const appRoutes: Route[] = [
  {path: 'reservations', component: ReservationsOverviewComponent},
  {path: 'reservation/new', component: NewReservationComponent},
  {path: 'legacy/reservations', component: ReservationsOverviewLegacyComponent},
  {path: 'legacy/reservation/new', component: NewReservationLegacyComponent},
  {path: '', redirectTo: '/reservations', pathMatch: 'full'}
];
