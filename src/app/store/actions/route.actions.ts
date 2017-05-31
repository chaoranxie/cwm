import {Injectable} from '@angular/core';
import {Action} from '@ngrx/store';

import {Route} from '../../model';

@Injectable()
export class RouteActions {

  static LOAD_ROUTES = 'LOAD_ROUTES';
  static LOAD_ROUTES_SUCCESS = 'LOAD_ROUTES_SUCCESS';
  static ADD_ROUTE = 'ADD_ROUTE';
  static ADD_ROUTE_SUCCESS = 'ADD_ROUTE_SUCCESS';
  static COMPLETE_ROUTE = 'COMPLETE_ROUTE';
  static COMPLETE_ROUTE_SUCCESS = 'COMPLETE_ROUTE_SUCCESS';

  loadRoutes(): Action {
    return {
      type: RouteActions.LOAD_ROUTES
    };
  }

  loadRoutesSuccess(routes: Route[]): Action {
    return {
      type: RouteActions.LOAD_ROUTES_SUCCESS,
      payload: routes
    };
  }


  addRoute(route: Route): Action {
    return {
      type: RouteActions.ADD_ROUTE,
      payload: route
    };
  }

  addRouteSuccess(route: Route): Action {
    return {
      type: RouteActions.ADD_ROUTE_SUCCESS,
      payload: route
    };
  }

  completeRoute(routeKey: string): Action {
    return {
      type: RouteActions.COMPLETE_ROUTE,
      payload: routeKey
    };
  }

  completeRouteSuccess(routeKey: string): Action {
    return {
      type: RouteActions.COMPLETE_ROUTE_SUCCESS,
      payload: routeKey
    };
  }

}
