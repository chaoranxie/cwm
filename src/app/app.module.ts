import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule, MdNativeDateModule } from '@angular/material';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

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
