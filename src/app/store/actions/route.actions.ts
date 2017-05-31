import {Injectable} from '@angular/core';
import {Action} from '@ngrx/store';

import {Route} from '../../model';

@Injectable()
export class RouteActions {

  static LOAD_ROUTES = 'LOAD_ROUTES';
  loadRoutes(): Action {
    return {
      type: RouteActions.LOAD_ROUTES
    };
  }

  static LOAD_ROUTES_SUCCESS = 'LOAD_ROUTES_SUCCESS';
  loadRoutesSuccess(routes: Route[]): Action {
    return {
      type: RouteActions.LOAD_ROUTES_SUCCESS,
      payload: routes
    };
  }


  static ADD_ROUTE = 'ADD_ROUTE';
  addRoute(route: Route): Action {
    return {
      type: RouteActions.ADD_ROUTE,
      payload: route
    };
  }

  static ADD_ROUTE_SUCCESS = 'ADD_ROUTE_SUCCESS';
  addRouteSuccess(route: Route): Action {
    return {
      type: RouteActions.ADD_ROUTE_SUCCESS,
      payload: route
    };
  }

  static COMPLETE_ROUTE = 'COMPLETE_ROUTE';
  completeRoute(routeKey: string): Action {
    return {
      type: RouteActions.COMPLETE_ROUTE,
      payload: routeKey
    };
  }

  static COMPLETE_ROUTE_SUCCESS = 'COMPLETE_ROUTE_SUCCESS';
  completeRouteSuccess(routeKey: string): Action {
    return {
      type: RouteActions.COMPLETE_ROUTE_SUCCESS,
      payload: routeKey
    };
  }


}
