import { Component, OnInit } from '@angular/core';
import { AngularFire, AuthProviders } from 'angularfire2';
import { MdCardModule } from '@angular2-material/card';
import { routing } from '../app.routes';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isAuth = false;
  authColor = 'warn';
  user = {};


  constructor(
    public router: Router,
    public af: AngularFire
  ) {
    this.af.auth.subscribe(
      user => this._changeState(user),
      error => console.trace(error)
    );
   }


login(from: string) {
   this.af.auth.login({
     provider: this._getProvider(from)
   });
   this.router.navigate(['/dashboard']);
 }

 logout() {
   this.af.auth.logout();
   this.router.navigate(['/home']);
 }

 private _changeState(user: any = null) {
   if(user) {
     this.isAuth = true;
     this.authColor = 'primary';
     this.user = this._getUserInfo(user)
   }
   else {
     this.isAuth = false;
     this.authColor = 'warn';
     this.user = {};
   }
 }

 private _getUserInfo(user: any): any {
   if(!user) {
     return {};
   }
   let data = user.auth.providerData[0];
   return {
     name: data.displayName,
     avatar: data.photoURL,
     email: data.email,
     provider: data.providerId
   };
 }

 private _getProvider(from: string) {
   switch(from){
     case 'twitter': return AuthProviders.Twitter;
     case 'facebook': return AuthProviders.Facebook;
     case 'github': return AuthProviders.Github;
     case 'google': return AuthProviders.Google;
   }
 }

  ngOnInit() {
  }

}
