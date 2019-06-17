import { Component, OnInit, NgZone } from '@angular/core';
import Application = require("application");
import SocialLogin = require("nativescript-social-login");

@Component({
  selector: 'ns-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  moduleId: module.id,
})
export class LoginComponent implements OnInit {

  private loggedIn : boolean = false;

  constructor(private ngZone: NgZone) { 
    if (Application.android) {
      Application.android.on(Application.AndroidApplication.activityCreatedEvent, (event) => {
          let result = SocialLogin.init({
              activity: event.activity,
          });
      });
    }
  }

  login() {
    SocialLogin.loginWithFacebook((result) => {
        this.ngZone.run(() => {
            console.log("code: " + result.code);
            console.log("error: " + result.error);
            console.log("userToken: " + result.userToken);
            console.log("displayName: " + result.displayName);
            console.log("photo: " + result.photo);
            console.log("authToken: " + result.authToken);
        });
    });
    this.loggedIn = true;
  }

  logout() {
    this.loggedIn = false;
  }

  ngOnInit() {
    SocialLogin.addLogger(function(msg: any, tag: string) {
      console.log('[nativescript-social-login]: (' + tag + '): ' + msg);
    });
  }

}
