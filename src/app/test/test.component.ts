import { Component } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent {
  toggleFirstGroup: boolean[] = [true, false, false, false];
  toggleSecondGroup: boolean[] = [false, true, false, false];
  toggleThirdGroup: boolean[] = [false, false, false, true];

  enableDisableRule(i:number, buttonsGroup:string){
    switch(buttonsGroup){
      case "first":
        this.toggleFirstGroup.fill(false);
        this.toggleFirstGroup[i] = true;
        break;
      case "second":
        this.toggleSecondGroup.fill(false);
        this.toggleSecondGroup[i] = true;
        break;
      case "third":
        this.toggleThirdGroup.fill(false);
        this.toggleThirdGroup[i] = true;
        break;
      default:
        return;
    } 
  }
}
