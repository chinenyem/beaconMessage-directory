import { Component, Inject, OnInit, Attribute  } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { AngularFire, AuthProviders, FirebaseApp, FirebaseListObservable } from 'angularfire2';
import { MdCardModule } from '@angular2-material/card';
import { routing } from '../app.routes';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import * as firebase from 'firebase';

@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.css']
})
export class NotificationListComponent implements OnInit {

public data: any;
public firebase: any;
public notifications: FirebaseListObservable<any[]>;
public item: any;
public storageRef: any;
public isDeactivated:boolean = false;


  constructor(@Inject(FirebaseApp) firebaseApp: any, private af: AngularFire, private router: Router){

    this.notifications = this.af.database.list('/notifications');

    this.af.auth.subscribe((user:any) =>{
        if(!user) {
          return {};
        }
        this.data = user.auth.providerData[0];
    });

  }

  removeItemFromList(notification: any) {
      this.item = notification
      let key = this.item.$key;
      this.notifications.remove(key).then(_ => console.log('item deleted!'));
      this.storageRef = firebase.storage().ref();
      let desertRef = this.storageRef.child(this.item.image_name);
      desertRef.getMetadata().then(function(metadata) {
        console.log(metadata)
        if (metadata.customMetadata.notification_key === key){
            desertRef.delete().then(_ => console.log('item image deleted!')).catch(function(error) {
              console.log(error.message)
            });
        };
      }).catch(function(error) {
        // Uh-oh, an error occurred!
          console.log(error.message)
      });

  }

  ngOnInit() {
        // initialize user model here

    }

  deactivateNotification(notification:any){
    this.item = notification
    let key = this.item.$key;
    let deactivated = this.item.deactivated;
    console.log(key)
    console.log(deactivated)
    if(deactivated === ""){
      this.notifications.update(key,  { deactivated: "checked" }).then(_ => console.log('item updated!'));
      this.notifications.subscribe((notifications) => {
        console.log(notifications.length)
        if(notifications.length > 1){
          notifications.forEach((notification) => {
            let itemkey = this.af.database.object(notification.key);
            if (key != itemkey){
              notification.update(key,  { deactivated: "" }).then(_ => console.log('rest of item updated!'));
            }
          });
        }
      });
    }else{
      this.notifications.update(key,  { deactivated: "" }).then(_ => console.log('item updated!'));
      this.notifications.subscribe((notifications) => {
        if(notifications.length > 1){
          notifications.forEach((notification) => {
            let itemkey = this.af.database.object(notification.key);
            if (key != itemkey){
              notification.update(key,  { deactivated: "checked" }).then(_ => console.log('rest of item updated!'));
            }
          });
      }
      });
    }
  }


  onSelect(notification: any) {
    this.item = notification
    let key = this.item.$key;
     console.log(key)
    this.router.navigate(['/notification', key]);
  }


  changeStatus(notification:any){

    // this.competitors.forEach(competitor) {
    // var competitorValue = competitor.val();
    // console.log(competitorValue);
    // competitorValue.forEach(sub){
    //     console.log(sub.val());
    //   }
    // }
  }




}
