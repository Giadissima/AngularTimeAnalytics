import { Component, Input, SimpleChanges } from '@angular/core';
import { compareAsc, differenceInDays } from 'date-fns';

import { Color } from '@swimlane/ngx-charts';
import dayData from '../../../../data/today.json';
import monthData from '../../../../data/month.json';
import weekData from '../../../../data/week.json';
import yesterdayData from '../../../../data/yesterday.json';

@Component({
  selector: 'pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss'],
})
export class PieChartComponent {
  @Input() dataAssets: string = '';
  @Input() set dateBegin(value: Date) {
    this.dateBeginSelected = value;
    this.takeDataFromJsonByFilters();
  }

  @Input() set dateEnd(value: Date) {
    // console.log('date end setted', value);
    this.dateEndSelected = value;
    this.takeDataFromJsonByFilters();
  }

  dateBeginSelected!: Date;
  dateEndSelected!: Date;
  barPadding = 20;

  colorScheme = {
    domain: ['#a5a1f5', '#68c4e1', '#feb72b'],
  } as string | Color;

  result: any[] = [];
  // ? debugger;

  ngOnInit() {
    this.takeDataFromJsonByFilters();
  }

  takeDataFromJsonByFilters() {
    if (
      !this.dateBeginSelected ||
      !this.dateEndSelected ||
      compareAsc(this.dateBeginSelected, this.dateEndSelected) > 0
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
    });
    // console.log('date taken');
  }

  ngOnChanges(changes: SimpleChanges) {
    // this.takeDataFromJsonByFilters();
  }
}
