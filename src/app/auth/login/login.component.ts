import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import Application = require("application");
import SocialLogin = require("nativescript-social-login");
 


@Component({
  selector: 'ns-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  moduleId: module.id,
})
export class LoginComponent implements OnInit {
  private loggedIn: boolean = false;

  constructor(private route: Router, private zone: NgZone) {
      if (Application.android) {
        console.log("android app detected");
        let result = SocialLogin.init({
          google: {
              serverClientId: '52111376902-b7lsr3ik43p77ruf4p2dj1rbmo6sjp1o.apps.googleusercontent.com'
          }});
        console.log(result);
    }
  }

  login() {
    console.log("calling login with google");
    SocialLogin.loginWithGoogle((result) => {
        this.zone.run(() => {
            console.log("code: " + result.code);
            console.log("error: " + result.error);
            console.log("userToken: " + result.userToken);
            console.log("displayName: " + result.displayName);
            console.log("photo: " + result.photo);
            console.log("authToken: " + result.authToken);
        });
        this.loggedIn = true;
    });
  }

  logout() {
    // SocialLogin.logout(); // write a callback?
    console.log("should logout");
    this.loggedIn = false;
  }

  goToHome() {
    this.route.navigate(["/home"]);
  }

  ngOnInit() {}
}
