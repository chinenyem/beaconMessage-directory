import { Component, Inject, OnInit, Attribute } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { AngularFire, AuthProviders, FirebaseApp, FirebaseListObservable } from 'angularfire2';
import { MdCardModule } from '@angular2-material/card';
import { routing } from '../app.routes';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-not-found-component',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
