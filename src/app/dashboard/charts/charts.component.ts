import { Component } from '@angular/core';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
})
export class ChartsComponent {

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
    console.log("button clicked");
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
}
