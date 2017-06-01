import { Route } from '../model';

import { routes, completions } from './reducers';

import { combineReducers } from '@ngrx/store';
import { compose } from '@ngrx/core/compose';

export interface AppStore {
  routes: Route[];
  completions: string[];
}

export default compose(combineReducers)({
    routes: routes,
    completions: completions,
});
