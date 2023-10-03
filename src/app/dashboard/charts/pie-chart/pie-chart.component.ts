import { Component, Input } from '@angular/core';
import { DataChart, JsonDataModel } from 'src/app/models/chart.dto';
import { compareAsc, differenceInDays } from 'date-fns';

import { Color } from '@swimlane/ngx-charts';
import dayData from '../../../../data/pie-chart/today.json';
import lastHourData from '../../../../data/pie-chart/last_hour.json';
import monthData from '../../../../data/pie-chart/month.json';
import weekData from '../../../../data/pie-chart/week.json';
import yesterdayData from '../../../../data/pie-chart/yesterday.json';

@Component({
  selector: 'pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss'],
})
export class PieChartComponent {
  /*
  ? The graph is updated every time a setter connected to an input is updated, 
  ? i.e. when a piece of data necessary to determine the graph to display is changed
  */
  @Input() dataAssets: string = '';
  @Input() set dateBegin(value: Date) {
    this.dateBeginSelected = value;
    this.takeDataFromJsonByFilters();
  }

  @Input() set dateEnd(value: Date) {
    this.dateEndSelected = value;
    this.takeDataFromJsonByFilters();
  }

  dateBeginSelected!: Date;
  dateEndSelected!: Date;

  colorScheme = {
    domain: ['#a5a1f5', '#68c4e1', '#feb72b'],
  } as string | Color;

  result: DataChart[] = [];
  // ? debugger;

  /**
   * takeDataFromJsonByFilters takes care of taking dummy data from JSON files depending on the following data 
   * specified by GUI:
   *  - initial date.
   *  - final date.
   *  If there is unspecified or inconsistent data, the data update fails and the program waits for it to be specified
   */
  takeDataFromJsonByFilters() {
    // ? If there is unspecified or inconsistent data, the data update fails
    if (!this.dateBeginSelected || !this.dateEndSelected || compareAsc(this.dateBeginSelected, this.dateEndSelected) > 0) 
      return;

    const diffInDays = differenceInDays(
      this.dateEndSelected,
      this.dateBeginSelected
    );
    let data: any[] = [];
    // caso caricamento dati giornalieri
    if (diffInDays == 0) {
      let day = this.dateBeginSelected.getDay();
      if (
        this.dateEndSelected.getHours() - this.dateBeginSelected.getHours() ==
        1
      ) {
        data = lastHourData;
      }else {
        if (day % 2 == 0) {
          // ? load "today" data
          data = dayData;
        } else {
          // ? load "yesterday" data
          data = yesterdayData;
        }
      }
    } else if (diffInDays == 7 || diffInDays == 6 || diffInDays == 8) {
      // ? weekly data loading case
      data = weekData;
    } else 
      // ? month data loading case
      data = monthData;
    
    // ? it filters the data from the json it needs to take and formats the array so it can be displayed correctly
    this.result = [];
    data.forEach((item: JsonDataModel) => {
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
  });
  }
}