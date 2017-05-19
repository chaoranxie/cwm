import { Component } from '@angular/core';
import { ClimbService } from './climb.service';
import { UserService } from './user.service';

import { Climb } from './climb';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  levels = [
    {value: 4, viewValue: '5.4'},
    {value: 5, viewValue: '5.5'},
    {value: 6, viewValue: '5.6'},
    {value: 7, viewValue: '5.7'},
    {value: 8, viewValue: '5.8'},
    {value: 9, viewValue: '5.9'},
    {value: 10, viewValue: '5.10'},
    {value: 11, viewValue: '5.11'},
    {value: 12, viewValue: '5.12'},
    {value: 13, viewValue: '5.13'},
    {value: 14, viewValue: '5.14'},
    {value: 15, viewValue: '5.15'},
    {value: 16, viewValue: '5.16'}
  ];

  colors = [
    {value: 'red', viewValue: 'red'},
    {value: 'white', viewValue: 'white'},
    {value: 'blue', viewValue: 'blue'},
    {value: 'orange', viewValue: 'orange'},
    {value: 'yellow', viewValue: 'yellow'},
    {value: 'purple', viewValue: 'purple'},
    {value: 'black', viewValue: 'black'},
    {value: 'other', viewValue: 'other'}

  ];

  setters = [
    {value: 'EK', viewValue: 'EK'},
    {value: 'LY', viewValue: 'LY'},
    {value: 'other', viewValue: 'other'}
  ];

  constructor(
    private climbService: ClimbService,
    public userService: UserService,
  ) {
  }

  isLoggedIn(): boolean {
    // Fixme: This is not good, there should be a better way
    // this.userService.user | async

    return this.userService.afAuth.auth.currentUser !== null;
  }

  addClimb(station, level, color, setter, setDate, climbStyle) {
// , level, setter, setDate, note
    // debugger
  // addClimb(station, color, level, setter, setDate, note) {
    // 76, 'red', 5.9, 'setter', new Date(), 'no note entered'
    const climb: Climb = new Climb (station, color, level, setter, setDate, climbStyle);
    this.climbService.addClimb(climb);
  }

  loginGoogle() {
    this.userService.loginGoogle()
  }

  logout() {
    this.userService.logout()
  }

}
