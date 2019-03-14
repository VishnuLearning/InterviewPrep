import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Page } from "tns-core-modules/ui/page";

import { User } from "../../services/user/user.model";
import { UserService } from "../../services/user/user.service";

@Component({
    selector: "login",
    providers: [UserService],
    styleUrls: ["login/login.component.css"],
    templateUrl: "login/login.component.html"
})
export class LoginComponent implements OnInit {
    user: User;
    isLoggingIn = true;

    constructor(private router: Router, private userService: UserService, private page: Page) {
        this.user = new User('','','');
    }

    ngOnInit() {
        this.page.actionBarHidden = true;
    }

    submit() {
        if (this.isLoggingIn) {
            this.login();
        } else {
            this.signUp();
        }
    }

    login() {
        this.userService.login(this.user) 
            .subscribe(
                (user) => {
                    if(user.isloggedin==true){
                        this.router.navigate(["/home"]);
                    }
                    else{
                        alert("Couldn't find your account");
                    }
                }
                // (error) => alert("Unfortunately we could not find your account.")
            ); 
    }

    signUp() {
        this.userService.register(this.user) 
            .subscribe(
                (c) => {
                    if(c==0){
                        alert("Your account was successfully created.");
                        this.toggleDisplay();
                    }
                    else{
                        alert("Unfortunately we were unable to create your account.");
                    }
                },
                // () => alert("Unfortunately we were unable to create your account.")
            );
    }

    logout() {
        this.userService.logout(this.user)
            .subscribe(
                (user) => {
                    if(user.isloggedin==false){
                        this.router.navigate(["/login"])
                    }
                    else{
                        alert("Couldn't log out");
                    }
                }
                // () => alert("Unfortunately we were unable to log you out.")
            );
    }

    toggleDisplay() {
        this.isLoggingIn = !this.isLoggingIn;
    }
}
