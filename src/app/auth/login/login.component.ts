import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { TnsOAuthClient, ITnsOAuthTokenResult } from "nativescript-oauth2";
import { RouterExtensions } from "nativescript-angular";

@Component({
  selector: 'ns-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  moduleId: module.id,
})
export class LoginComponent implements OnInit {
  private client: TnsOAuthClient;
  private loggedIn: boolean = false;

  constructor(private route: Router, private routerExtensions: RouterExtensions) {}

  public tnsOauthLogin(providerType): Promise<ITnsOAuthTokenResult> {
    this.client = new TnsOAuthClient(providerType);

    return new Promise<ITnsOAuthTokenResult>((resolve, reject) => {
      this.client.loginWithCompletion(
        (tokenResult: ITnsOAuthTokenResult, error) => {
          if (error) {
            console.error("back to main page with error: ");
            console.error(error);
            reject(error);
          } else {
            console.log("back to main page with access token: ");
            console.log(tokenResult);
            resolve(tokenResult);
          }
        }
      );
    });
  }

  public tnsOauthLogout() {
    if (this.client) {
      this.client.logout();
    }
  }

 
  login() {
    console.log("login clicked");
    this.tnsOauthLogin("google")
        .then((result: ITnsOAuthTokenResult) => {
          console.log("back to login component with token " + result.accessToken);
          this.loggedIn = true;
          // this.routerExtensions
          //     .navigate((["../authenticated"]))
          //     .then(() => console.log("navigated to /authenticated"))
          //     .catch(err => console.log("error navigating to /authenticated: " + err));
        })
        .catch(e => console.log("Error: " + e));
  }

  logout() {
    if(this.client) {
      this.client.logout();
      this.loggedIn = false;
    }
  }

  goToHome() {
    this.route.navigate(["/home"]);
  }

  ngOnInit() {}
}
