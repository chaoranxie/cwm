import { Component } from '@angular/core';
import { RouteService } from './route.service';
import { UserService } from './user.service';

import { Route } from './route';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  grades = [
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
    {value: 'black', viewValue: 'Black'},
    {value: 'blue', viewValue: 'Blue'},
    {value: 'green', viewValue: 'Green'},
    {value: 'orange', viewValue: 'Orange'},
    {value: 'purple', viewValue: 'Purple'},
    {value: 'red', viewValue: 'Red'},
    {value: 'white', viewValue: 'White'},
    {value: 'yellow', viewValue: 'Yellow'},
    {value: 'other', viewValue: 'Other'}
  ];

  setters = [
    {value: 'ek', viewValue: 'EY'},
    {value: 'jw', viewValue: 'JW'},
    {value: 'ks', viewValue: 'KS'},
    {value: 'ly', viewValue: 'LY'},
    {value: 'ps', viewValue: 'PS'},
    {value: 'rw', viewValue: 'RW'},
    {value: 'sm', viewValue: 'SM'},
    {value: 'tex', viewValue: 'TEX'},
    {value: 'zgy', viewValue: 'ZGY'},
    {value: 'other', viewValue: 'OTHER'}
  ];

  constructor(
    private routeService: RouteService,
    public userService: UserService,
  ) {

  }

  addRoute(station, grade, color, setter, setDate, type) {
    const route: Route = new Route (station, color, grade, setter, setDate, type);
    this.routeService.addRoute(route);
  }

  loginGoogle() {
    this.userService.loginGoogle()
  }

  logout() {
    this.userService.logout()
  }

}
