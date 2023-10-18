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
  
  dateBeginDatePicker = subDays(new Date(), 1);
  dateEndDatePicker = this.dateBeginDatePicker;
  selectBeginTime = '00:00';
  selectEndTime = '23:00';
  Interval = '1 Hour';

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

  buttonClicked = 'Yesterday';
  buttonsColor: { [key: string]: string } = {
    'Last hour': 'basic',
    'Today': 'basic',
    'Yesterday': 'primary',
    'Last week': 'basic',
    'Last month': 'basic',
  };

  ngOnInit(): void {
    this.sendDataToCharts()
  }

  amount_time_interval = ['1 Hour', '2 ore', '3 ore', '4 ore', '5 ore', '6 ore'];

  toggleGroup: boolean[] = [false, false, true, false, false];

  updateChartByClick(event: Event, nameButtonClicked: string) {
    event.stopPropagation;
    this.buttonClicked = nameButtonClicked;
    Object.keys(this.buttonsColor).forEach((key) => {
      this.buttonsColor[key] = 'basic';
    });
    this.buttonsColor[nameButtonClicked] = 'primary';
    switch (nameButtonClicked) {
      case 'Today':
        this.dateBeginDatePicker = new Date();
        this.dateEndDatePicker = this.dateBeginDatePicker;
        this.selectBeginTime = '00:00';
        this.selectEndTime = '23:00';
        break;
      case 'Yesterday':
        this.dateBeginDatePicker = subDays(new Date(), 1);
        this.dateEndDatePicker = this.dateBeginDatePicker;
        this.selectBeginTime = '00:00';
        this.selectEndTime = '23:00';
        break;
      case 'Last hour':
        let date = new Date();
        this.dateBeginDatePicker = date;
        this.dateEndDatePicker = date;
        this.selectBeginTime = `${this.dateBeginDatePicker.getHours()}:00`;
        this.selectEndTime = `${this.dateBeginDatePicker.getHours() + 1}:00`;
        break;
      case 'Last week':
        this.dateBeginDatePicker = subDays(new Date(), 7);
        this.dateEndDatePicker = new Date();
        this.selectBeginTime = '00:00';
        this.selectEndTime = '23:00';
        break;
      case 'Last month':
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
    this.sendDataToChartsEvent.emit({dateBegin: this.dateBeginDatePicker, dateEnd: this.dateEndDatePicker, interval: this.Interval} as SetFilterParameters);
  }
}
