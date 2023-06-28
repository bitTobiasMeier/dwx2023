import { CdkCellDef } from '@angular/cdk/table';
import { Component, Directive, Input, OnInit } from '@angular/core';
import { MatCellDef, MatTable } from '@angular/material/table';
import { ReservationContactTypesEntity, ReservationEntity, ReservationServiceLegacy } from '@dinnerfrontend/infrastructure';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'dinner-frontend-reservations-legacy-overview',
  templateUrl: './reservations-overview-legacy.component.html',
  styleUrls: ['./reservations-overview-legacy.component.scss'],
})
export class ReservationsOverviewLegacyComponent implements OnInit {
  reservations$: Observable<ReservationEntity[]> = of([]);
  displayedColumns: string[] = ['id', 'date', 'personcount', 'contact'];
  /**
   *
   */
  constructor(private reservationsvc: ReservationServiceLegacy) {

  }
  ngOnInit(): void {
    this.reservations$ = this.reservationsvc.apiReservationGet();
  }

  isPrivateReservation (res: ReservationEntity){
    return res.contact?.kind === ReservationContactTypesEntity.PrivateReservation;
  }

}

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: "[matCellDef]", // same selector as MatCellDef
  providers: [{ provide: CdkCellDef, useExisting: TypeSafeMatCellDef }],
})
// eslint-disable-next-line @angular-eslint/directive-class-suffix
export class TypeSafeMatCellDef<T> extends MatCellDef {
  // leveraging syntactic-sugar syntax when we use *matCellDef
  @Input() matCellDefTable:
      T[] |
    Observable<T[]> |
    MatTable<T> | undefined;

  // ngTemplateContextGuard flag to help with the Language Service
  static ngTemplateContextGuard<T>(
      dir: TypeSafeMatCellDef<T>,
      ctx: unknown
  ): ctx is { $implicit: T; index: number } {
      return true;
  }
}
