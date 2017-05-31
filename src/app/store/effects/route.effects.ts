import {Injectable} from '@angular/core';
import {Effect, Actions} from '@ngrx/effects';

import {AppStore} from '../app-store';
import {Route} from '../../model';
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
    loadQuestions$ = this.actions$
        .ofType(RouteActions.LOAD_ROUTES)
        .switchMap(() => this.svc.getRoutes())
        .map((routes: Route[]) => this.routeActions.loadRoutesSuccess(routes));

    @Effect()
    addQuestion$ = this.actions$
        .ofType(RouteActions.ADD_ROUTE)
        .switchMap((action) => this.svc.saveRoute(action.payload))
        .map((route: Route) => this.routeActions.addRouteSuccess(route));
}
