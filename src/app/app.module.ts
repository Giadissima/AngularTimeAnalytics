import { AlarmsBarChartComponent } from './dashboard/charts/alarms-bar-chart/alarms-bar-chart.component';
import { AlarmsPieChartComponent } from './dashboard/charts/alarms-pie-chart/alarms-pie-chart.component';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { ChartsComponent } from './dashboard/charts/charts.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DpDatePickerModule } from 'ng2-date-picker';
import { NgModule } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { PeopleBarChartComponent } from './dashboard/charts/people-bar-chart/people-bar-chart.component';
import { PeoplePieChartComponent } from './dashboard/charts/people-pie-chart/people-pie-chart.component';
import { TestComponent } from './test/test.component';
import { ToolbarComponent } from './dashboard/toolbar/toolbar.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent, 
    TestComponent,
    ChartsComponent,
    ToolbarComponent,
    AlarmsBarChartComponent,
    PeopleBarChartComponent,
    PeoplePieChartComponent,
    AlarmsPieChartComponent,
  ],
  imports: [
    BrowserModule,
    NgxChartsModule,
    DpDatePickerModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
