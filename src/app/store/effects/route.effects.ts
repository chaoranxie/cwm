import {Injectable} from '@angular/core';
import {Effect, Actions} from '@ngrx/effects';

import {AppStore} from '../app-store';
import {Route, RouteJSON} from '../../model';
import {RouteActions} from '../actions';
import {RouteService} from '../../services'

@Injectable()
export class RouteEffects {
    constructor (
        private actions$: Actions,
        private routeActions: RouteActions,
        private svc: RouteService
    ) {}

    @Effect()
    loadRoutes$ = this.actions$
        .ofType(RouteActions.LOAD_ROUTES)
        .switchMap(() => this.svc.getRoutes())
        .map((routes: RouteJSON[]) => {
            const routeList: Route[] = [];
            routes.forEach(routeJson => {
              const myRoute: Route = Route.fromJSON(routeJson);
              routeList.push(myRoute);
            })
            return this.routeActions.loadRoutesSuccess(routeList)
          }
        );

    @Effect()
    addRoute$ = this.actions$
        .ofType(RouteActions.ADD_ROUTE)
        .switchMap((action) => this.svc.saveRoute(action.payload))
        .map((route: Route) => this.routeActions.addRouteSuccess(route));
}
