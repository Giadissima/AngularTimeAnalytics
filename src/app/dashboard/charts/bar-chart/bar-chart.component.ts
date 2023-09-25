import { ChartFilter, DataChart } from 'src/app/models/chart.dto';
import { Component, Input, OnInit } from '@angular/core';
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
export class BarChartComponent implements OnInit {
  barPadding = 20;
  colorScheme = {
    domain: ['#ff0309'],
  } as string | Color;

  @Input() dataAssets: string = '';
  result: any[] = [];

  // ? debugger;
  // ? TOT 168 items

  constructor() {
    Object.assign(this, this.result);
  }

  ngOnInit() {
    this.takeDataFromJsonByFilters({fromDate: new Date(2023, 10, 1), toDate: new Date(2023, 10, 1)})
  }

  takeDataFromJsonByFilters(filters: ChartFilter) {
    const dataKeyToSearch =
      this.dataAssets == 'alarms' ? 'number_of_alarms' : 'number_of_persons';
    if (
      !filters ||
      !filters.fromDate ||
      !filters.toDate ||
      compareAsc(filters.fromDate, filters.toDate) > 0
    ) {
      this.result = [];
      return;
    }

    switch (differenceInDays(filters.toDate, filters.fromDate)) {
      // caso caricamento dati giornalieri
      case 0:
        let day = filters.fromDate.getDay();
        // if (day % 2 == 0) {
          // carica i dati di "oggi"
          this.result = dayData;
        // } else {
          // carica i dati di "ieri"
          // this.result = yesterdayData;
        // }
        break;
      // caso caricamento dati settimanali
      case 6:
        this.result = weekData;
        break;
      case 29 || 30 || 27:
        this.result = monthData;
        break;
    }
    console.log(this.result)
  }
}
