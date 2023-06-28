export * from './reservation.legacy.service';
import { ReservationServiceLegacy } from './reservation.legacy.service';
export * from './restaurant.legacy.service';
import { RestaurantServiceLegacy } from './restaurant.legacy.service';
export const APIS = [ReservationServiceLegacy, RestaurantServiceLegacy];
