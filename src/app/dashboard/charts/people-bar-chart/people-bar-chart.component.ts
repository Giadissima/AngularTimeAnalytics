import { Color, NgxChartsModule } from '@swimlane/ngx-charts';
import { Component, NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { single } from './data';

@Component({
  selector: 'app-people-bar-chart',
  templateUrl: './people-bar-chart.component.html',
  styleUrls: ['./people-bar-chart.component.scss']
})
export class PeopleBarChartComponent {
  single!: any[];

  // view: [number, number] = [1700, 400]; // size of the graph

  // options
  barPadding = 20;
  colorScheme  = {
    domain: ['#44b182']
  } as string | Color;

  constructor() {
    Object.assign(this, { single })
  }
}
