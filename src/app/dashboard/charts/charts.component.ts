import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
})
export class ChartsComponent {
  dateBeginSelected!: Date;
  dateEndSelected!: Date;
  interval!: string;
  peopleButtonClicked = "Tutti";
  peopleButtonsColor:  { [key: string]: string }  = {
    "Tutti": 'primary',
    "Container 1": 'basic',
    "Container 2": 'basic',
    "Container 3": 'basic',
  };

  alarmsButtonClicked = "Tutti";
  alarmsButtonsColor:  { [key: string]: string }  = {
    "Tutti": 'primary',
    "Container 1": 'basic',
    "Container 2": 'basic',
    "Container 3": 'basic',
  };
  
  updateChartByClick(event: Event, type: string, nameButtonClicked: string){
    event.stopPropagation;

    if(type == 'alarms'){
      this.alarmsButtonClicked = nameButtonClicked;
      Object.keys(this.alarmsButtonsColor).forEach((key) => {
        this.alarmsButtonsColor[key] = 'basic'; // Puoi impostare qui il valore di default desiderato
      });
      this.alarmsButtonsColor[nameButtonClicked] = 'primary';
    } else{
      this.peopleButtonClicked = nameButtonClicked;
      Object.keys(this.peopleButtonsColor).forEach((key) => {
        this.peopleButtonsColor[key] = 'basic'; // Puoi impostare qui il valore di default desiderato
      });
      this.peopleButtonsColor[nameButtonClicked] = 'primary';
    }

  }

  // TODO aggiungerci un interfaccia e magari passarlo come obj
  setFilter(data:[Date, Date, string]){
    // console.log("data: ", date);
    this.dateBeginSelected = data[0];
    this.dateEndSelected = data[1];
    this.interval = data[2];
  }
}
