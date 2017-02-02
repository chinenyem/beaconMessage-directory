import { Component, Inject, OnInit, Attribute } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Observable} from 'rxjs/Observable';
import { AngularFire, AuthProviders, FirebaseApp, FirebaseListObservable } from 'angularfire2';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { FormGroup, FormBuilder, Validators }   from '@angular/forms';
import { MdCardModule } from '@angular2-material/card';
import { routing } from '../app.routes';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})


export class NotificationComponent implements OnInit {

  public complexForm : FormGroup;
  public notificationObject: any;
  public notification: any;
  public newTitle: string;
  public newMessage: string;
  public newImage: string[] = [];
  public userName: string;
  public userUID: string;
  public user: any;
  public time: any = firebase.database.ServerValue.TIMESTAMP;
  public data: any;
  public newId: any;
  public file_srcs: string[] = [];
  public file: any;
  public firebase: any;
  public uploadTask: any;
  public storageRef: any;
  public key: any;
  public downloadurl: any;
  public metadata: any;
  public notifications: FirebaseListObservable<any[]>;

  constructor(@Inject(FirebaseApp) firebaseApp: any, private af: AngularFire, private router: Router, private route: ActivatedRoute, fb: FormBuilder) {


      this.af.auth.subscribe((user:any) =>{
          if(!user) {
            return {};
          }
          this.data = user.auth.providerData[0];
      });

      this.complexForm = fb.group({
        'title' : [null, Validators.required],
        'message' : [null, Validators.required],
        'image' : [null, Validators.required]
     });

   }

  ngOnInit() {
    this.route.params
      .map(params => params['id'])
      .subscribe((id) => {
          firebase.database().ref('/notifications/' + id).once('value').then(function(snapshot) {
            var message = snapshot.val().message;
            console.log(message)
          this.newTitle = message;
          console.log(this.userName);
        });
      });

  }

}
