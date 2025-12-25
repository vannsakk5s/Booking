import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageTrips } from './manage-trips';

describe('ManageTrips', () => {
  let component: ManageTrips;
  let fixture: ComponentFixture<ManageTrips>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageTrips]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageTrips);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
