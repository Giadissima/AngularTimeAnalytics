import {
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';

import { SetFilterParameters } from 'src/app/models/chart.dto';
import { setHours } from 'date-fns';
import subDays from 'date-fns/subDays';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {

  @Output() sendDataToChartsEvent = new EventEmitter<SetFilterParameters>();
  
  dateBeginDatePicker = new Date();
  dateEndDatePicker = new Date();
  selectBeginTime = '';
  selectEndTime = '';
  intervallo = '';

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

  buttonClicked = 'Ieri';
  buttonsColor: { [key: string]: string } = {
    'Ultima ora': 'basic',
    'Oggi': 'basic',
    'Ieri': 'primary',
    'Ultima settimana': 'basic',
    'Ultimo mese': 'basic',
  };

  ngOnInit(): void {
    this.selectBeginTime = '12:00';
    this.selectEndTime = '22:00';
    this.intervallo = '1 ora';
    this.sendDataToCharts()
  }

  amount_time_interval = ['1 ora', '2 ore', '3 ore', '4 ore', '5 ore', '6 ore'];

  toggleGroup: boolean[] = [false, false, true, false, false];

  updateChartByClick(event: Event, nameButtonClicked: string) {
    event.stopPropagation;
    this.buttonClicked = nameButtonClicked;
    Object.keys(this.buttonsColor).forEach((key) => {
      this.buttonsColor[key] = 'basic';
    });
    this.buttonsColor[nameButtonClicked] = 'primary';
    switch (nameButtonClicked) {
      case 'Oggi':
        this.dateBeginDatePicker = new Date();
        this.dateEndDatePicker = this.dateBeginDatePicker;
        this.selectBeginTime = '00:00';
        this.selectEndTime = '23:00';
        break;
      case 'Ieri':
        this.dateBeginDatePicker = subDays(new Date(), 1);
        this.dateEndDatePicker = this.dateBeginDatePicker;
        this.selectBeginTime = '00:00';
        this.selectEndTime = '23:00';
        break;
      case 'Ultima ora':
        let date = new Date();
        this.dateBeginDatePicker = date;
        this.dateEndDatePicker = date;
        this.selectBeginTime = "13:00";
        this.selectEndTime = "14:00";
        break;
      case 'Ultima settimana':
        this.dateBeginDatePicker = subDays(new Date(), 7);
        this.dateEndDatePicker = new Date();
        this.selectBeginTime = '00:00';
        this.selectEndTime = '23:00';
        break;
      case 'Ultimo mese':
        this.dateBeginDatePicker = subDays(new Date(), 30);
        this.dateEndDatePicker = new Date();
        this.selectBeginTime = '00:00';
        this.selectEndTime = '23:00';
    }
    this.sendDataToCharts();
  }
  
  /**
   * set hours and time and triggers the event sendDataToChartsEvent
   */
  sendDataToCharts(){
    this.dateBeginDatePicker = setHours(this.dateBeginDatePicker, parseInt(this.selectBeginTime.split(":")[0]));
    this.dateEndDatePicker = setHours(this.dateEndDatePicker, parseInt(this.selectEndTime.split(":")[0]));
    this.sendDataToChartsEvent.emit({dateBegin: this.dateBeginDatePicker, dateEnd: this.dateEndDatePicker, interval: this.intervallo} as SetFilterParameters);
  }
}
