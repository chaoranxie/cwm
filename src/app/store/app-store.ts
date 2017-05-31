import { Route } from '../model';

import { routes } from './reducers';

import { combineReducers } from '@ngrx/store';
import { compose } from '@ngrx/core/compose';

export interface AppStore {
  routes: Route[];
}

export default compose(combineReducers)({
    routes: routes,
});
