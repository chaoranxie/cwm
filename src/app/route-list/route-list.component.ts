import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { RouteService } from '../route.service';
import { UserService } from '../user.service';


import { Route } from '../route';


@Component({
  selector: 'app-route-list',
  templateUrl: './route-list.component.html',
})
export class RouteListComponent implements OnInit {
  public routes: Observable<Route[]>;

  constructor(
    private routeService: RouteService,
    public userService: UserService,
  ) {
    this.routes = routeService.routes;
  }

  markRouteAsCompleted(message: string){
    this.routeService.markRouteAsCompletedByUser(this.userService.afAuth.auth.currentUser.uid, message)
  }

  ngOnInit() {
  }
}
