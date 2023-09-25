import {
  Component,
  OnInit,
  SimpleChanges,
} from '@angular/core';

// import { BarChartComponent } from '../charts/bar-chart/bar-chart.component'
import { compareAsc } from 'date-fns';
import subDays from 'date-fns/subDays';

@Component({
  selector: 'toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {

  // constructor(private barChartComponent: BarChartComponent) { }
  
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
    this.dateBeginDatePicker = new Date(2023, 7, 1);
    this.dateEndDatePicker = new Date(2023, 7, 1);
    this.selectBeginTime = '12:00';
    this.selectEndTime = '22:00';
    this.intervallo = '1 ora';
  }

  amount_time_interval = ['1 ora', '2 ore', '3 ore', '4 ore', '5 ore', '6 ore'];

  toggleGroup: boolean[] = [false, false, true, false, false];

  updateChartByClick(event: Event, nameButtonClicked: string) {
    console.log('button clicked');
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
        this.selectEndTime = '23:59';
        break;
      case 'Ieri':
        this.dateBeginDatePicker = subDays(new Date(), 1);
        this.dateEndDatePicker = this.dateBeginDatePicker;
        this.selectBeginTime = '00:00';
        this.selectEndTime = '23:59';
        break;
      case 'Ultima ora':
        let date = new Date();
        this.dateBeginDatePicker = date;
        this.dateEndDatePicker = date;
        this.selectBeginTime = `${date
          .getHours()
          .toString()
          .padStart(2, '0')}:00`;
        this.selectEndTime = this.selectBeginTime;
        break;
      case 'Ultima settimana':
        this.dateBeginDatePicker = subDays(new Date(), 7);
        this.dateEndDatePicker = new Date();
        this.selectBeginTime = '00:00';
        this.selectEndTime = '23:59';
        break;
      case 'Ultimo mese':
        this.dateBeginDatePicker = subDays(new Date(), 30);
        this.dateEndDatePicker = new Date();
        this.selectBeginTime = '00:00';
        this.selectEndTime = '23:59';
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    // se la data è corretta, chiama un aggiornamento dati
    let fromDate = this.dateBeginDatePicker;
    let toDate = this.dateEndDatePicker;
    fromDate.setHours(parseInt(this.selectBeginTime.split(':')[0],10), 0);
    toDate.setHours(parseInt(this.selectEndTime.split(':')[0],10), 0);
    // if(compareAsc(fromDate, toDate)<=0) this.barChartComponent.takeDataFromJsonByFilters({fromDate, toDate});
  }
}
