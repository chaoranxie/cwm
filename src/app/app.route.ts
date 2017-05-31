import { RouteComponent } from './route/route.component';
import { RouteAddUpdateComponent } from './route/route-add-update.component';
import { RouteListComponent } from './route-list/route-list.component';
import { Routes, RouterModule }  from '@angular/router';


export const routes: Routes = [
  // basic routes
  { path: '', redirectTo: '/route/list', pathMatch: 'full' },
  {
    path: 'route/add',
    component: RouteAddUpdateComponent
  },
  { path: 'route/list', component: RouteListComponent },
];
