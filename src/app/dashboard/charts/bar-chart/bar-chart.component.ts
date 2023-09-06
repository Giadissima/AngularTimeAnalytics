import { ChartFilter, DataChart } from 'src/app/models/chart.dto';
import { Component, OnInit } from '@angular/core';

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

  result: DataChart[] = []

  constructor() {
    // TOT = 168 items
    // console.log(alarmsData);
    // debugger;
    // console.log(this.takeDataFromJsonByFilters({dataAssets: 'alarms'}));
    // console.log(this.takeDataFromJsonByFilters({dataAssets: 'alarms', fromDate: new Date(2023,8,4,0,0), toDate: new Date(2023,8,7,23,0)}));
  }

  ngOnInit(){
    // TODO passarli attraverso Input dal padre
    this.result = this.takeDataFromJsonByFilters({dataAssets: 'alarms'})
    console.log(this.result);
  }
  
  takeDataFromJsonByFilters(filters: ChartFilter){
    const data = filters.dataAssets == 'alarms'? alarmsData : peopleData;

    if(!filters.fromDate || !filters.toDate) return data;

    return data.filter((obj: DataChart) => {
      const objDate = new Date(obj.name);
      return compareAsc(objDate, filters.fromDate!) >= 0 && compareAsc(objDate, filters.toDate!) <= 0;
    });
  }
}
