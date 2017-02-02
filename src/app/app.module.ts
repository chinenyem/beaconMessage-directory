import { BrowserModule } from '@angular/platform-browser';
import {LoggingService } from './logging.service.ts';
import {DataService } from './data.service.ts';
import { AngularFireModule, AuthMethods, AuthProviders, FirebaseApp } from 'angularfire2';
import { NgModule } from '@angular/core';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormBuilder, Validators }   from '@angular/forms';
import { HttpModule } from '@angular/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MomentModule} from 'angular2-moment';

// MATERIAL DESIGN MODULES
import { MaterialModule } from '@angular/material';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NotificationListComponent } from './notification-list/notification-list.component';
import { NotificationCreateComponent } from './notification-create/notification-create.component';
import { NotificationComponent } from './notification/notification.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AccountComponent } from './account/account.component';
import { BeaconsComponent } from './beacons/beacons.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { routing } from './app.routes';




@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotificationListComponent,
    NotificationCreateComponent,
    NotificationComponent,
    DashboardComponent,
    AccountComponent,
    BeaconsComponent,
    PageNotFoundComponent


  ],
  imports: [
    AngularFireModule.initializeApp(
      {
        apiKey: "AIzaSyCvHzf-lIrUzM1KjgH_jwDZGHH38ItULWA",
        authDomain: "ibeaconapp-62c4a.firebaseapp.com",
        databaseURL: "https://ibeaconapp-62c4a.firebaseio.com",
        storageBucket: "ibeaconapp-62c4a.appspot.com"
      },
      {
        method: AuthMethods.Popup
      }
    ),
    BrowserModule,
    MomentModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    routing,
    MaterialModule.forRoot(),
    NgbModule.forRoot()
  ],
  providers: [LoggingService, DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
