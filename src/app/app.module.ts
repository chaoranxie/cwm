import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


// import { MdButtonModule, MdCheckboxModule, MdIconModule, MdChipsModule} from '@angular/material';
import { MaterialModule } from '@angular/material';
import { MdDialogModule } from '@angular/material';

// MaterialModul
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { ClimbListComponent } from './climb-list/climb-list.component';

import 'hammerjs';

@NgModule({
  declarations: [
    AppComponent,
    ClimbListComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    MdDialogModule,
    // MdButtonModule, MdCheckboxModule, MdIconModule, MdChipsModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule, // imports firebase/database, only needed for database features
    AngularFireAuthModule // imports firebase/auth, only needed for auth features
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
