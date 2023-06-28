import { RestaurantEntity } from "../../openapi";

export type Restaurant = {
  [Property in keyof RestaurantEntity]-?: RestaurantEntity[Property];
}

export type RestaurantWithoutId = Omit<Restaurant,'id'>;


export type RestaurantReadonly = Readonly<Restaurant>;

export type RestaurantSearchResultViewModel = Pick<RestaurantReadonly,'id' | 'name'>;
