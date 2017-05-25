import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule, MdNativeDateModule } from '@angular/material';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Location } from '@angular/common';
import {
  RouterModule,
  Routes
} from '@angular/router';

import { Angulartics2Module, Angulartics2GoogleAnalytics } from 'angulartics2';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { RouteListComponent } from './route-list/route-list.component';
import { RouteService } from './route.service';
import { UserService } from './user.service';

import 'hammerjs';
import { RouteComponent } from './route/route.component';



const routes: Routes = [
  // basic routes
  { path: '', redirectTo: 'route-list', pathMatch: 'full' },
  { path: 'route-list', component: RouteListComponent },
];



@NgModule({
  declarations: [
    AppComponent,
    RouteListComponent,
    RouteComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    MdNativeDateModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes), // <-- routes

    Angulartics2Module.forRoot([ Angulartics2GoogleAnalytics ]),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule, // imports firebase/database, only needed for database features
    AngularFireAuthModule // imports firebase/auth, only needed for auth features
  ],
  providers: [
    // Location,
    // LocationStrategy,
    RouteService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
