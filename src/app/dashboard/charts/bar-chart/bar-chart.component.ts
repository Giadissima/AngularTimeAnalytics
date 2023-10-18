import { Component, Input, OnInit } from '@angular/core';
import { DataChart, JsonDataModel } from 'src/app/models/chart.dto';
import { compareAsc, differenceInDays } from 'date-fns';

import { ApiService } from 'src/app/services/api.service';
import { Color } from '@swimlane/ngx-charts';

@Component({
  selector: 'bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss'],
})
export class BarChartComponent implements OnInit {
  /*
  ? The graph is updated every time a setter connected to an input is updated, 
  ? i.e. when a piece of data necessary to determine the graph to display is changed
  */
  @Input() dataAssets!: 'people' | 'alarms';
  @Input() color: string = '#ffffff';

  @Input() set setContainer(value: string) {
    this.containerSelected = value;
    this.takeDataFromJsonByFilters();
  }

  @Input() set setInterval(value: string) {
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

  interval!: string;
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

  constructor(private apiService: ApiService) {}

  /**
   * takeDataFromJsonByFilters takes care of taking dummy data from JSON files depending on the following data
   * specified by GUI:
   *  - initial date.
   *  - final date.
   *  - name of the container selected.
   *  - interval.
   *  If there is unspecified or inconsistent data, the data update fails and the program waits for it to be specified
   */
  async takeDataFromJsonByFilters() {
    // ? If there is unspecified or inconsistent data, the data update fails
    if (
      !this.dateBeginSelected ||
      !this.dateEndSelected ||
      compareAsc(this.dateBeginSelected, this.dateEndSelected) > 0 ||
      this.containerSelected === '' ||
      !this.interval
    ) return;

    this.result = (
      await this.apiService.chart.postBarChartData({
        dateBeginSelected: this.dateBeginSelected,
        dateEndSelected: this.dateEndSelected,
        container: this.containerSelected,
        interval: this.interval,
        dataAssets: this.dataAssets
      })
    ).response;
  }
}
