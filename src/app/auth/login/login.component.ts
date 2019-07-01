import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GoogleAuth } from 'nativescript-google-auth';

@Component({
  selector: 'ns-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  moduleId: module.id,
})
export class LoginComponent implements OnInit {
  displayname: string;
  email: string;
  photoUrl:string;
  private googleAuth:GoogleAuth;
  display : boolean = false;
  constructor(private router: Router) { }

  ngOnInit() {
    this.googleAuth = new GoogleAuth();
        // change your auth key below
        // https://developers.google.com/identity/sign-in/android/start-integrating
        this.googleAuth.init('529888917567-av12dm5hmliirb2l9qd63fqho4igrgte.apps.googleusercontent.com', 
        (loginresult)=>{
            console.log(loginresult);
            this.displayname = loginresult.displayName;
            this.email = loginresult.email;
            this.photoUrl = loginresult.photoUrl;
        },
        ()=>{
            console.log("logged out successfully");
            this.displayname = "";
            this.email = "";
            this.photoUrl='';
        });
    }

  login() {
    this.googleAuth.login();
    this.display = true;
    this.router.navigate(['/login']);
  }

  logout() {
    this.googleAuth.logout();
    this.display = false;
    this.router.navigate(['/login']);
  }

  goToHome(){
    this.router.navigate(['/home']);
  }
}
