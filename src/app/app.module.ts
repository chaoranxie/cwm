import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule, MdNativeDateModule } from '@angular/material';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Location } from '@angular/common';
import {
  RouterModule,
  Routes
} from '@angular/router';

import { Angulartics2Module, Angulartics2GoogleAnalytics } from 'angulartics2';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';

import { AppComponent } from './components';


import { RouteListComponent } from './route-list/route-list.component';
import { RouteService } from './services/route.service';
import { UserService } from './services/user.service';

import 'hammerjs';
import { RouteComponent } from './route/route.component';
import { RouteAddUpdateComponent } from './route/route-add-update.component';



const routes: Routes = [
  // basic routes
  { path: '', redirectTo: '/', pathMatch: 'full' },
  {
    path: 'route/add',
    component: RouteAddUpdateComponent
  },
  { path: 'route/list', component: RouteListComponent },
];



@NgModule({
  declarations: [
    AppComponent,
    RouteListComponent,
    RouteComponent,
    RouteAddUpdateComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    MdNativeDateModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(routes), // <-- routes
    FlexLayoutModule,
    Angulartics2Module.forRoot([ Angulartics2GoogleAnalytics ]),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule, // imports firebase/database, only needed for database features
    AngularFireAuthModule // imports firebase/auth, only needed for auth features

  ],
  providers: [
    RouteService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
