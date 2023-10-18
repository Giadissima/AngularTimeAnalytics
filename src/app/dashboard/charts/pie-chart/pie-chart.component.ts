import { Component, Input } from '@angular/core';
import { DataChart, JsonDataModel } from 'src/app/models/chart.dto';
import { compareAsc, differenceInDays } from 'date-fns';

import { ApiService } from 'src/app/services/api.service';
import { Color } from '@swimlane/ngx-charts';

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
  @Input() dataAssets: 'alarms' | 'people' = 'alarms';
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

  constructor(private apiService: ApiService) {}

  /**
   * takeDataFromJsonByFilters takes care of taking dummy data from JSON files depending on the following data 
   * specified by GUI:
   *  - initial date.
   *  - final date.
   *  If there is unspecified or inconsistent data, the data update fails and the program waits for it to be specified
   */
  async takeDataFromJsonByFilters() {
    // ? If there is unspecified or inconsistent data, the data update fails
    if (
      !this.dateBeginSelected ||
      !this.dateEndSelected ||
      compareAsc(this.dateBeginSelected, this.dateEndSelected) > 0
    ) return;

    this.result = (
      await this.apiService.chart.postPieChartData({
        dateBeginSelected: this.dateBeginSelected,
        dateEndSelected: this.dateEndSelected,
        dataAssets: this.dataAssets
      })
    ).response;
  }
}