import {Injectable} from '@angular/core';
import {Effect, Actions} from '@ngrx/effects';

import {AppStore} from '../app-store';
import {Route} from '../../model';

import {RouteActions} from '../actions';
import {RouteService} from '../../services'

@Injectable()
export class RouteEffects {
  @Effect()
  loadRoutes$ = this.actions$
    .ofType(RouteActions.LOAD_ROUTES)
    .switchMap(() => this.svc.getRoutes())
    .map((routes: Route[]) => {
      // const routeList: Route[] = [];
      // routes.forEach(routeJson => {
      //   const myRoute: Route = Route.fromJSON(routeJson);
      //   routeList.push(myRoute);
      // })
      return this.routeActions.loadRoutesSuccess(routes)
      }
    );

  @Effect()
  loadCompletions$ = this.actions$
    .ofType(RouteActions.LOAD_COMPLETIONS)
    .switchMap(() => this.svc.getCompletions())
    .map((completions: string[]) => {
      return this.routeActions.loadCompletionsSuccess(completions)
      }
    );

  @Effect()
  addRoute$ = this.actions$
    .ofType(RouteActions.ADD_ROUTE)
    // .switchMap((action) => this.svc.addRoute(action.payload))
    // .map((route: Route) => this.routeActions.addRouteSuccess(route));
    .do((action) => this.svc.addRoute(action.payload))
    .filter(() => false);

  @Effect()
  addCompletion$ = this.actions$
    .ofType(RouteActions.ADD_COMPLETION)
    .do((action) => this.svc.addCompletion(action.payload))
    .filter(() => false);
  // Not sure why for completion route or saving question, it is different
  // .switchMap((action) => this.svc.completeRoute(action.payload))
  // .map((routeKey: string) => this.routeActions.completeRouteSuccess(routeKey));

  constructor(
    private actions$: Actions,
    private routeActions: RouteActions,
    private svc: RouteService
  ) { }
}
