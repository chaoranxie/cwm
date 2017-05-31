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
import { RouteComponent } from './route/route.component';
import { RouteAddUpdateComponent } from './route/route-add-update.component';
import { RouteListComponent } from './route-list/route-list.component';

import { UserService } from './services';

import 'hammerjs';


import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { default as reducer } from './store/app-store';


import { RouteService } from './services';

import {RouteActions} from './store/actions';
import {RouteEffects} from './store/effects';


import { routes }   from './app.route';





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

    StoreModule.provideStore(reducer),

       //ngrx effects
    EffectsModule.run(RouteEffects),
    StoreDevtoolsModule.instrumentOnlyWithExtension({
      maxAge: 20
    }),


    FlexLayoutModule,
    Angulartics2Module.forRoot([ Angulartics2GoogleAnalytics ]),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule, // imports firebase/database, only needed for database features
    AngularFireAuthModule // imports firebase/auth, only needed for auth features

  ],
  providers: [
    RouteService,
    RouteActions,
    UserService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
