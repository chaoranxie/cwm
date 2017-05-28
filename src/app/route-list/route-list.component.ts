import { Component, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { RouteService } from '../route.service';
import { UserService } from '../user.service';


import { Route } from '../route';


@Component({
  selector: 'app-route-list',
  templateUrl: './route-list.component.html',
})
export class RouteListComponent implements OnInit, OnChanges, OnDestroy {
  public routeList: Route[];
  constructor(
    private routeService: RouteService,
    public userService: UserService,
  ) {


    routeService.routesBS.subscribe( routes => {
      this.routeList = [];

      routes.forEach(routeJson => {
        const myRoute: Route = Route.fromJSON(routeJson);
        this.routeList.push(myRoute);
      })
    });

    routeService.routeCompletionsBS.subscribe(completions=>{
      this.routeList.forEach(route=> {
        debugger;
        route.hasCompleted = completions[route.key] === undefined ? false : true;
      })
    })
  }

  markRouteAsCompleted(message: string) {
    this.routeService.markRouteAsCompletedByUser(this.userService.afAuth.auth.currentUser.uid, message)
  }

  ngOnInit() {
    console.log("Route-list ngOnInit")

  }

  ngOnDestroy(){
    console.log("Route-list ngOnDestroy")

  }

  ngOnChanges(){
      console.log("Route-list ngOnChanges")
  }
}
