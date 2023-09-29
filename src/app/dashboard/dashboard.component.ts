import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  dateBeginSelected!: Date;
  dateEndSelected!: Date;
  onReceiveDate(date: Date[]){
    this.dateBeginSelected = date[0];
    this.dateEndSelected = date[1];
  }
}
