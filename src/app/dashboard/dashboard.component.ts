import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  time_interval = [
    '00:00',
    '01:00',
    '02:00',
    '03:00',
    '04:00',
    '05:00',
    '06:00',
    '07:00',
    '08:00',
    '09:00',
    '10:00',
    '11:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
    '18:00',
    '19:00',
    '20:00',
    '20:00',
    '21:00',
    '22:00',
    '23:00',
  ];

  amount_time_interval = ['1 ora', '2 ore', '3 ore', '4 ore', '5 ore', '6 ore'];
  togglePresetGroup: boolean[] = [false, false, true, false, false];
  togglePeopleChartGroup: boolean[] = [true, false, false, false];
  toggleAlarmsChartGroup: boolean[] = [true, false, false, false];

  buttonsChangeColorOnClick(i:number, buttonsGroup:string) {
    switch(buttonsGroup){
      case "preset":
        this.togglePresetGroup.fill(false);
        this.togglePresetGroup[i] = true;
        break;
      case "people-chart":
        this.togglePeopleChartGroup.fill(false);
        this.togglePeopleChartGroup[i] = true;
        break;
      case "alarms-chart":
        this.toggleAlarmsChartGroup.fill(false);
        this.toggleAlarmsChartGroup[i] = true;
        break;
      default:
        return;
    } 
  }
}
