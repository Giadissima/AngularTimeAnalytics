import { Color } from '@swimlane/ngx-charts';
import { Component } from '@angular/core';
import { single } from './data';

@Component({
  selector: 'app-alarms-bar-chart',
  templateUrl: './alarms-bar-chart.component.html',
  styleUrls: ['./alarms-bar-chart.component.scss']
})
export class AlarmsBarChartComponent {
  single!: any[];

  // view: [number, number] = [1700, 400]; // size of the graph

  // options
  barPadding = 20;
  colorScheme  = {
    domain: ['#ff0309']
  } as string | Color;

  constructor() {
    Object.assign(this, { single })
  }
}
