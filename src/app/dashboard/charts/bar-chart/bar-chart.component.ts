import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { DataChart, JsonDataModel } from 'src/app/models/chart.dto';
import { compareAsc, differenceInDays } from 'date-fns';

import { Color } from '@swimlane/ngx-charts';
import dayData from '../../../../data/bar_chart/today.json';
import lastHourData from '../../../../data/bar_chart/last_hour.json';
import monthData from '../../../../data/bar_chart/month.json';
import weekData from '../../../../data/bar_chart/week.json';
import yesterdayData from '../../../../data/bar_chart/yesterday.json';

@Component({
  selector: 'bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss'],
})
export class BarChartComponent implements OnInit {
  @Input() dataAssets: string = '';
  @Input() color: string = '#ffffff';

  /*
  ? The graph is updated every time a setter connected to an input is updated, 
  ? i.e. when a piece of data necessary to determine the graph to display is changed
  */
  @Input() set setContainer(value: string) {
    this.containerSelected = value;
    this.takeDataFromJsonByFilters();
  }

  @Input() set setInterval(value: string) {
    // console.log('cambio intervallo', value);
    this.interval = value;
    this.takeDataFromJsonByFilters();
  }

  @Input() set dateBegin(value: Date) {
    this.dateBeginSelected = value;
    this.takeDataFromJsonByFilters();
  }
  
  @Input() set dateEnd(value: Date) {
    this.dateEndSelected = value;
    this.takeDataFromJsonByFilters();
  }

  interval: string = '1 ora';
  containerSelected: string = '';
  dateBeginSelected!: Date;
  dateEndSelected!: Date;
  barPadding = 20;
  result: DataChart[] = [];

  colorScheme = {
    domain: [this.color],
  } as Color;

  ngOnInit() {
    this.colorScheme = {
      domain: [this.color],
    } as Color;
  }

  /**
   * takeDataFromJsonByFilters takes care of taking dummy data from JSON files depending on the following data 
   * specified by GUI:
   *  - initial date.
   *  - final date.
   *  - name of the container. selected.
   *  - interval.
   *  If there is unspecified or inconsistent data, the data update fails and the program waits for it to be specified
   */
  takeDataFromJsonByFilters() {
    let interval: number = Number(this.interval[0]);
    // ? If there is unspecified or inconsistent data, the data update fails
    if ( !this.dateBeginSelected || !this.dateEndSelected || compareAsc(this.dateBeginSelected, this.dateEndSelected) > 0 || this.containerSelected === '')
      return;

    // Check which dummy file it should take
    const diffInDays = differenceInDays(
      this.dateEndSelected,
      this.dateBeginSelected
    );
    let data: any[] = [];
    // case of daily data loading
    if (diffInDays == 0) {
      let day = this.dateBeginSelected.getDay();
      if (
        this.dateEndSelected.getHours() - this.dateBeginSelected.getHours() ==
        1
      ) {
        data = lastHourData;
      } else {
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
    let arr: DataChart[] = [];
    data.forEach((container) => {
      // ? select data by container selected (by the default it will shows all containers' data)
      if (container && (this.containerSelected == 'Tutti' || this.containerSelected == container.name)) {
        container.series.forEach(
          (item: JsonDataModel) => {
            let founded = arr.find((el) => el.name === item.name);
            /* if time is set, then select the date with defined interval (default '1 hour'). 
             If the date not corresponding to the defined interval, it will ignore its. */
            if (item.name[12] && interval != 1 && (this.interval && Number(item.name[12]) % interval != 0))
              return;
            if (founded !== undefined)
              founded.value += this.dataAssets == 'people' ? item.people : item.alarms;
            else 
              arr.push({
                value: this.dataAssets == 'people' ? item.people : item.alarms,
                name: item.name,
              });
          }
        );
      }
    });
    // ? display the result.
    this.result = arr;
    console.log(this.result)
  }// TODO sembra che i datepicker e l'intervallo non siano più collegati con il bar chart
}
