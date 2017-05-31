import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import { RouteActions } from '../actions/route.actions';
import { Route } from '../../model/route';

export const routes = (state: Route[] = [], action: Action): Route[] => {
  switch (action.type) {
    case RouteActions.LOAD_ROUTES_SUCCESS:
      return action.payload;
    case RouteActions.ADD_ROUTE_SUCCESS:
      return [...state, ...action.payload];
    case RouteActions.COMPLETE_ROUTE_SUCCESS:
      return completeRouteInStore(state, action.payload);
    // You can see that not all RouteActions are here because they dont all
    // modify the store, for example RouteActions.ADD_ROUTE only start the
    // add but only RouteActions.ADD_ROUTE_SUCCESS updates the store.
    default:
      return state;
  }
};

function completeRouteInStore(originalState: Route[] = [], routeKey: string) {
  originalState.forEach(route => {
    if (route.$key === routeKey) {
      route.hasCompleted = true;
    }
  })
  return originalState;
}

// export const routeSaveStatus = (state: any = "NONE", action: Action): string => {
//   switch (action.type) {
//     case RouteActions.ADD_ROUTE:
//       return "IN PROGRESS";
//     case RouteActions.ADD_ROUTE_SUCCESS:
//       return "SUCCESS";
//     default:
//       return state;
//   }
// };

// export const routeCompleteStatus = (state: any = "NONE", action: Action): string => {
//   switch (action.type) {
//     case RouteActions.COMPLETE_ROUTE:
//       return "IN PROGRESS";
//     case RouteActions.COMPLETE_ROUTE_SUCCESS:
//       return "SUCCESS";
//     default:
//       return state;
//   }
// };
