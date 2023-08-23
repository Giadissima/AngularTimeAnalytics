import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeopleBarChartComponent } from './people-bar-chart.component';

describe('PeopleBarChartComponent', () => {
  let component: PeopleBarChartComponent;
  let fixture: ComponentFixture<PeopleBarChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PeopleBarChartComponent]
    });
    fixture = TestBed.createComponent(PeopleBarChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
