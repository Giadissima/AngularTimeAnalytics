import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlarmsPieChartComponent } from './alarms-pie-chart.component';

describe('AlarmsPieChartComponent', () => {
  let component: AlarmsPieChartComponent;
  let fixture: ComponentFixture<AlarmsPieChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AlarmsPieChartComponent]
    });
    fixture = TestBed.createComponent(AlarmsPieChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
