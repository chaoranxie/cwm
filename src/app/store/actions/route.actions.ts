import {Injectable} from '@angular/core';
import {Action} from '@ngrx/store';

import {Route} from '../../model';

@Injectable()
export class RouteActions {

  static LOAD_ROUTES = 'LOAD_ROUTES';
  static LOAD_ROUTES_SUCCESS = 'LOAD_ROUTES_SUCCESS';
  static ADD_ROUTE = 'ADD_ROUTE';
  static ADD_ROUTE_SUCCESS = 'ADD_ROUTE_SUCCESS';

  static LOAD_COMPLETIONS = 'LOAD_COMPLETIONS';
  static LOAD_COMPLETIONS_SUCCESS = 'LOAD_COMPLETIONS_SUCCESS';
  static ADD_COMPLETION = 'ADD_COMPLETION';
  static ADD_COMPLETION_SUCCESS = 'ADD_COMPLETION_SUCCESS';

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

  loadCompletions(): Action {
    return {
      type: RouteActions.LOAD_COMPLETIONS
    };
  }

  loadCompletionsSuccess(completions: any[]): Action {
    return {
      type: RouteActions.LOAD_COMPLETIONS_SUCCESS,
      payload: completions
    };
  }

  addCompletion(completion: string): Action {
    return {
      type: RouteActions.ADD_COMPLETION,
      payload: completion
    };
  }

  addCompletionSuccess(completion: string): Action {
    return {
      type: RouteActions.ADD_COMPLETION_SUCCESS,
      payload: completion
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
}
