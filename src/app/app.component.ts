import { Component } from '@angular/core';
import { RouteService } from './route.service';
import { UserService } from './user.service';
import { Angulartics2GoogleAnalytics } from 'angulartics2';
import { Location } from '@angular/common';

import { Route } from './route';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  grade: number;
  setter: string;
  setDate: string;
  color: string;
  type: string;

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

  types = [
    {value: 'top_rope', viewValue: 'Top Rope Only'},
    {value: 'lead', viewValue: 'Lead Climb Only'},
    {value: 'both', viewValue: 'Both'},
  ];

  setters = [
    'ek',
    'jw',
    'ks',
    'ly',
    'ps',
    'rw',
    'sm',
    'tex',
    'zgy',
    'other',
  ];

  constructor(
    // public angulartics2GoogleAnalytics: Angulartics2GoogleAnalytics,
    private routeService: RouteService,
    public userService: UserService,
  ) {

  }

  addRoute(station, grade, color, setter, setDate, type) {
    const route: Route = new Route (Number(station), color, Number(grade), setter, new Date(setDate), type, '');
    this.routeService.addRoute(route);
  }

  loginGoogle() {
    this.userService.loginGoogle()
  }

  logout() {
    this.userService.logout()
  }

}
