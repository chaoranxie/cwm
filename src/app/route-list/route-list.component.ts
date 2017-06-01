import { Component, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ChangeDetectionStrategy } from '@angular/core';

import { RouteService } from '../services/route.service';
import { UserService } from '../services/user.service';


import { Store } from '@ngrx/store';
import { AppStore } from '../store/app-store';
import { RouteActions } from '../store/actions';

import { Route } from '../model';

@Component({
  selector: 'app-route-list',
  templateUrl: './route-list.component.html',
  styleUrls: ['./route-list.component.css'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RouteListComponent implements OnInit, OnChanges, OnDestroy {

  routesObs: Observable<Route[]>;
  completionsObs: Observable<string[]>;

  routes: Route[] = [];
  completions: string[] = [];
  routesSub: any;
  completionsSub: any;

  constructor(
    private routeService: RouteService,
    public userService: UserService,
    private store: Store<AppStore>,
    private routeActions: RouteActions,
  ) {

    this.routesObs = store.select(s => s.routes);
    this.completionsObs = store.select(s => s.completions);

    this.store.dispatch(this.routeActions.loadRoutes());

    this.userService.user.subscribe(currentUser => {
      console.log('Current User: ' + currentUser);
      this.store.dispatch(this.routeActions.loadCompletions());
    });

  }

  hasCompleted(routeKey: string): boolean {
    // FIXME: i dont like this approach,
    // This function is run in every digest loop
    return this.completions.indexOf(routeKey) !== -1;
  }

  markRouteAsCompleted(route: Route) {
    this.store.dispatch(this.routeActions.addCompletion(route.$key))
  }

  ngOnInit() {
    console.log('Route-list ngOnInit');
    this.routesSub = this.routesObs.subscribe(routes => {
      this.routes = routes;
    });
    this.completionsSub = this.completionsObs.subscribe(completions => {
      this.completions = completions;
    });

  }

  ngOnDestroy() {
    console.log('Route-list ngOnDestroy');
    if (this.routesSub) {
      this.routesSub.unsubscribe();
    }
    if (this.completionsSub) {
      this.completionsSub.unsubscribe();
    }
  }

  ngOnChanges() {
    console.log('Route-list ngOnChanges');
  }
}
