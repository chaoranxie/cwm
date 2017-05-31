import { Component, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { RouteService } from '../services/route.service';
import { UserService } from '../services/user.service';


import { Store } from '@ngrx/store';
import { AppStore } from '../store/app-store';
import { RouteActions } from '../store/actions';

import { Route }     from '../model';

@Component({
  selector: 'app-route-list',
  templateUrl: './route-list.component.html',
  styleUrls: ['./route-list.component.css']

})
export class RouteListComponent implements OnInit, OnChanges, OnDestroy {

  routesObs: Observable<Route[]>;
  routes: Route[] = [];
  sub: any;

  constructor(
    private routeService: RouteService,
    public userService: UserService,
    private store: Store<AppStore>,
    private routeActions: RouteActions,

  ) {

    this.routesObs = store.select(s => s.routes);
    this.store.dispatch(this.routeActions.loadRoutes());

    routeService.routeCompletionsBS.subscribe(completions=>{
      this.routes.forEach(route=> {
        route.hasCompleted = completions[route.key] === undefined ? false : true;
      })
    })
  }

  markRouteAsCompleted(message: string) {
    this.routeService.markRouteAsCompletedByUser(this.userService.afAuth.auth.currentUser.uid, message)
  }

  ngOnInit() {
    console.log("Route-list ngOnInit")
    this.sub = this.routesObs.subscribe(routes => {
      this.routes = routes;
    }) ;

  }

  ngOnDestroy(){
    console.log("Route-list ngOnDestroy")
    if (this.sub)
      this.sub.unsubscribe();
  }

  ngOnChanges(){
      console.log("Route-list ngOnChanges")
  }
}
