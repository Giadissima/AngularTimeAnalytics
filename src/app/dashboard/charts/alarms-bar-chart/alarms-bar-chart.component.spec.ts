import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlarmsBarChartComponent } from './alarms-bar-chart.component';

describe('AlarmsBarChartComponent', () => {
  let component: AlarmsBarChartComponent;
  let fixture: ComponentFixture<AlarmsBarChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AlarmsBarChartComponent]
    });
    fixture = TestBed.createComponent(AlarmsBarChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
