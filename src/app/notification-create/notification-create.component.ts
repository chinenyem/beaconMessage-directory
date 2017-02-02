import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFire, AuthProviders, FirebaseApp } from 'angularfire2';
import { MdCardModule } from '@angular2-material/card';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { FormGroup, FormBuilder, Validators }   from '@angular/forms';
import { LoggingService } from '../logging.service';
import { MomentModule } from 'angular2-moment';
import { routing } from '../app.routes';
import { Router } from '@angular/router';
import * as firebase from 'firebase';



@Component({
  selector: 'app-notification-create',
  templateUrl: './notification-create.component.html',
  styleUrls: ['./notification-create.component.css']
})

export class NotificationCreateComponent {

    // The FormGroup object as you may remember from the simple form example exposes various API’s for dealing with forms. Here we are creating a new object and setting its type to FormGroup
   complexForm : FormGroup;
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

   constructor(@Inject(FirebaseApp) firebaseApp: any, private af: AngularFire, fb: FormBuilder, private router: Router, private changeDetectorRef: ChangeDetectorRef ){

     this.firebase = firebase;

     this.af.auth.subscribe((user:any) =>{
         if(!user) {
           return {};
         }
         this.data = user.auth.providerData[0];
     });

      this.complexForm = fb.group({
        // We can set default values by passing in the corresponding value or leave blank if we wish to not set the value. For our example, we’ll default the gender to female.
        'title' : [null, Validators.required],
        'message' : [null, Validators.required],
        'image' : [null, Validators.required]
     })
   }

   // Again we’ll implement our form submit function that will just console.log the results of our form
   submitForm(value: any):void{
     this.newTitle = value.title;
     this.newMessage = value.message;
     this.af.database.list('notifications').push({
          title: value.title,
          message: value.message,
          uid: this.data.uid,
          displayName: this.data.displayName,
          timestamp: this.time,
          deactivated: false,
          image_name: ''
      }).then((notification) => {
          if (this.metadata){
            this.key = notification.key;
            this.metadata.customMetadata.notification_key = this.key
            console.log(this.metadata)
            let metadata = this.metadata;
            this.storageRef = firebase.storage().ref();
            this.uploadTask = this.storageRef.child('images/notifications/' + this.file[0].name).put(this.file[0], metadata);

            const items = this.af.database.list('/notifications');
            items.update(this.key, { image_name: 'images/notifications/' + this.file[0].name });

            return Observable.create((observer) => {
              this.uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, function(snapshot){
                console.log(snapshot)
                }, function(error){
                  switch(error.code){
                    case 'storage/unauthorized':
                      console.log('unauthorized permissions');
                      break;
                    case 'storage/unkown':
                      console.log('storage/unkown');
                      break;
                  }
                }, function(){
                    let downloadURL = this.uploadTask.snapshot.downloadURL
                    console.log(this.downloadURL)
                })
            })



          }

        });
      //console.log(value, this.data.uid, this.time, this.data.displayName);

   }

   titleChange(newValue: string):void {
     this.newTitle = newValue;
   }

  messageChange(newValue: string):void {
      this.newMessage = newValue;
   }


  // This is called when the user selects new files from the upload button
  fileChange(input: any) {
    //console.log(this.file_srcs.length)
    if (this.file_srcs.length === 1){
      this.file_srcs.splice(0,this.file_srcs.length)
    }
    this.file = input.files
    //console.log(this.file[0].type)
    //only allow png, jpg, jpeg,
    let type = this.file[0].type;
    if  (!(type === 'image/png' || type === 'image/jpg' || type === 'image/jpeg')) {
      console.log('not image')
      return false
    }
    this.metadata = {
      contentType: this.file[0].type,
      owner: this.data,
      customMetadata: {}
    }

    this.readFiles(input.files);
  }

  readFile(file:any, reader:any, callback:any): void{
    // Set a callback funtion to fire after the file is fully loaded
    reader.onload = () => {
      // callback with the results
      callback(reader.result);
    }

    // Read the file
    reader.readAsDataURL(file);
  }

  readFiles(files:any, index:any = 0):void{
    // Create the file reader
    let reader = new FileReader();
    // If there is a file
    if (index in files){
      // Start reading this file
      this.readFile(files[index], reader, (result) =>{
        // After the callback fires do:
        this.file_srcs.push(result);
        this.readFiles(files, index+1);// Read the next file;
      });
    }else{
      // When all files are done This forces a change detection
      this.changeDetectorRef.detectChanges();
    }
  }



}
