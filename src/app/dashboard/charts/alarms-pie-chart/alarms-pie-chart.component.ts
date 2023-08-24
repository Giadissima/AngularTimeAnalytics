import { Color } from '@swimlane/ngx-charts';
import { Component } from '@angular/core';
import { single } from './data';

@Component({
  selector: 'app-alarms-pie-chart',
  templateUrl: './alarms-pie-chart.component.html',
  styleUrls: ['./alarms-pie-chart.component.scss']
})
export class AlarmsPieChartComponent {
  single!: any[];

  // options
  gradient: boolean = true;
  showLabels: boolean = true;
  legendPosition: string = 'below';

  colorScheme = {
    domain: ['#a5a1f5', '#68c4e1', '#feb72b'],
  } as string | Color;

  constructor() {
    Object.assign(this, { single });
  }
}
