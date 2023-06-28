import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReservationsOverviewComponent } from './reservations-overview.component';

describe('ReservationsOverviewComponent', () => {
  let component: ReservationsOverviewComponent;
  let fixture: ComponentFixture<ReservationsOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReservationsOverviewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ReservationsOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
