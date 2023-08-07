import { Component } from '@angular/core';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
})
export class ChartsComponent {

  togglePeopleChartGroup: boolean[] = [true, false, false, false];
  toggleAlarmsChartGroup: boolean[] = [true, false, false, false];

  buttonsChangeColorOnClick(i: number, buttonsGroup: string) {
    switch (buttonsGroup) {
      case 'people-chart':
        this.togglePeopleChartGroup.fill(false);
        this.togglePeopleChartGroup[i] = true;
        break;
      case 'alarms-chart':
        this.toggleAlarmsChartGroup.fill(false);
        this.toggleAlarmsChartGroup[i] = true;
        break;
      default:
        return;
    }
  }
}
