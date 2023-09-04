import { AlarmsBarChartComponent } from './dashboard/charts/alarms-bar-chart/alarms-bar-chart.component';
import { AlarmsPieChartComponent } from './dashboard/charts/alarms-pie-chart/alarms-pie-chart.component';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { ChartsComponent } from './dashboard/charts/charts.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DpDatePickerModule } from 'ng2-date-picker';
import { FormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatNativeDateModule} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
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
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatNativeDateModule,
    AppRoutingModule,
    MatDatepickerModule,
    FormsModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
