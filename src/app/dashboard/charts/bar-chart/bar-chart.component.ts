import { ChartFilter, DataChart } from 'src/app/models/chart.dto';
import { Component, Input, OnInit } from '@angular/core';

import { Color } from '@swimlane/ngx-charts';
import alarmsData from './alarms.data.json';
import { compareAsc } from 'date-fns';
import peopleData from './people.data.json';

@Component({
  selector: 'bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit {
  barPadding = 20;
  colorScheme  = {
    domain: ['#ff0309']
  } as string | Color;

  @Input() dataAssets:string = '';
  result: DataChart[] = []
  
  // ? debugger;
  // ? TOT 168 items
  
  constructor() {}

  ngOnInit(){
    this.result = this.takeDataFromJsonByFilters()
  }
  
  takeDataFromJsonByFilters(filters?: ChartFilter){
    const data = this.dataAssets == 'alarms'? alarmsData : peopleData;

    if(!filters || !filters.fromDate || !filters.toDate) return data;

    return data.filter((obj: DataChart) => {
      const objDate = new Date(obj.name);
      return compareAsc(objDate, filters.fromDate!) >= 0 && compareAsc(objDate, filters.toDate!) <= 0;
    });
  }
}
