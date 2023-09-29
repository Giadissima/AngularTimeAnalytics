import { ChartFilter, DataChart } from 'src/app/models/chart.dto';
import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { compareAsc, differenceInDays } from 'date-fns';

import { Color } from '@swimlane/ngx-charts';
import dayData from '../../../../data/today.json';
import monthData from '../../../../data/month.json';
import weekData from '../../../../data/week.json';
import yesterdayData from '../../../../data/yesterday.json';

@Component({
  selector: 'bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss'],
})
export class BarChartComponent implements OnInit, OnChanges {
  
  @Input() dataAssets: string = '';
  // TODO ci andrebbe un altra set per il container
  @Input() containerSelected: string = '';
  @Input() color: string = '#ffffff';
  @Input() set dateBegin(value: Date) {
    this.dateBeginSelected = value;
    this.takeDataFromJsonByFilters();
  }
  
  @Input() set dateEnd(value: Date) {
    console.log("date end setted", value)
    this.dateEndSelected = value;
    this.takeDataFromJsonByFilters();
  }
  
  dateBeginSelected!: Date;
  dateEndSelected!: Date;
  barPadding = 20;
  
  colorScheme = {
    domain:[this.color]
  } as Color

  result: any[] = [];
  // ? debugger;
  // ? TOT 168 items

  ngOnInit() {
    console.log("aaaaa", this.dateBeginSelected)
      this.takeDataFromJsonByFilters();
      this.colorScheme = {
        domain:[this.color]
      } as Color
  }

  takeDataFromJsonByFilters() {
    const dataKeyToSearch =
      this.dataAssets == 'alarms' ? 'number_of_alarms' : 'number_of_persons';
    if (
      !this.dateBeginSelected ||
      !this.dateEndSelected ||
      compareAsc(this.dateBeginSelected, this.dateEndSelected) > 0 ||
      this.containerSelected === ''
    ) {
      return;
    }

    let data: any[] = [];
    // TODO aggiungere il filters.container
    switch (differenceInDays(this.dateEndSelected, this.dateBeginSelected)) {
      // caso caricamento dati giornalieri
      case 0:
        let day = this.dateBeginSelected.getDay();
        if (day % 2 == 0) {
          // carica i dati di "oggi"
          data = dayData;
        } else {
          // carica i dati di "ieri"
          data = yesterdayData;
        }
        break;
      // caso caricamento dati settimanali
      case 6:
        data = weekData;
        break;
      case 29 || 30 || 27:
        data = monthData;
        break;
    }
    data.forEach((container) => {
      if (
        container &&
        (this.containerSelected == 'Tutti' ||
          this.containerSelected == container)
      ) {
        container.series.forEach(
          (item: { people: number; name: string; alarms: number }) => {
            let founded = this.result.find((el) => el.name === item.name);
            if (founded !== undefined) {
              founded.value +=
                this.dataAssets == 'people' ? item.people : item.alarms;
            } else {
              this.result.push({
                value: this.dataAssets == 'people' ? item.people : item.alarms,
                name: item.name,
              });
            }
          }
        );
      }
    });
    console.log("date taken");
  }

  ngOnChanges(changes: SimpleChanges) {
    // this.takeDataFromJsonByFilters();
  }
}
