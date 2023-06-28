import { CdkCellDef } from '@angular/cdk/table';
import { Component, Directive, Input, OnInit } from '@angular/core';
import { MatCellDef, MatTable } from '@angular/material/table';
import { Company, Person, Reservation, ReservationService } from '@dinnerfrontend/infrastructure';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'dinner-frontend-reservations-overview',
  templateUrl: './reservations-overview.component.html',
  styleUrls: ['./reservations-overview.component.scss'],
})
export class ReservationsOverviewComponent implements OnInit {
  reservations$: Observable<Reservation[]> = of([]);
  displayedColumns: string[] = ['id', 'date', 'personcount', 'contact'];
  /**
   *
   */
  constructor(private reservationsvc: ReservationService) {

  }
  ngOnInit(): void {
    this.reservations$ = this.reservationsvc.getall();
  }

  isContactPerson (contact: Person | Company) : contact is Person{
    return (contact as Person).nachname !== undefined;
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
