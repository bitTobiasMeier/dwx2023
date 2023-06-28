import { Injectable } from "@angular/core";
import {  RestaurantEntity, RestaurantServiceLegacy } from "../openapi";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  constructor(private restaurantService: RestaurantServiceLegacy) {
  }

  public getall(): Observable<Array<RestaurantEntity>>{
    return this.restaurantService.getRestaurants()
  }

}
