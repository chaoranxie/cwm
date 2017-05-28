import { Component, OnChanges, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { RouteService } from '../route.service';
import { UserService } from '../user.service';


import { Route } from '../route';


@Component({
  selector: 'app-route-list',
  templateUrl: './route-list.component.html',
})
export class RouteListComponent implements OnInit, OnChanges {
  // public routes: Observable<Route[]>;
  public routes: Route[];

  constructor(
    private routeService: RouteService,
    public userService: UserService,
  ) {
    this.routes = routeService.routes;
  }

  markRouteAsCompleted(message: string) {

    this.routes[message].hasCompleted = !this.routes[message].hasCompleted;

  }

  ngOnInit() {
    console.log('list onInit fired');
  }

  ngOnChanges() {
    console.log('list ngOnChanges fired');
  }
}
