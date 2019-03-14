import { Inject, Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import { Observable, of } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";
import * as appSettings from "application-settings";

import { User } from "./user.model";
// import { Config } from "../config";

@Injectable()
export class UserService {
    users: Array<User>;
    currentUser;

    constructor() {
        let persistedUsers = JSON.parse(appSettings.getString('myapp-users')||'[]');
        this.users = persistedUsers.map((user: {name: string, email: string, password: string}) => {
            let tempUser = new User(user.name, user.email, user.password);
            return tempUser;
        });
    }

    updateUsers() {
        appSettings.setString('myapp-users', JSON.stringify(this.users));
    }

    login(user: User) {
        this.currentUser = this.users.filter((thisuser: User) => thisuser.email === user.email);
        if(this.currentUser.password === user.password){
            // login the user
            user.isloggedin = true;
            this.users.forEach((u: User) => {
                if(u.email === this.currentUser.email)
                    u.isloggedin = true;
            });
            this.updateUsers();
        }
        else {
            // password mismatch
        }
        return of(user);
    }

    register(user: User) {
        var c=0;
        this.users.forEach((u: User) => {
            if(u.email === user.email){
                // account already existing
                c++;
                return of(c);
            }
        });
        this.users.push(user);
        this.updateUsers();
        return of(c);
    }

    logout(user: User) {
        this.users.forEach((u: User) => {
            if(u.email === user.email && u.isloggedin==true){
                u.isloggedin = false;
                user.isloggedin = false;
                // log out
                this.updateUsers();
                return of(user);
            }
        });
        // couldn't log out
        return of(user);
    }
}

// @Injectable()
// export class UserService {
//     constructor(private http: Http) { }

//     login(user: User) {
//         return this.http.post(
//             Config.apiUrl + "user/" + Config.appKey + "/login",
//             JSON.stringify({
//                 username: user.email,
//                 password: user.password
//             }),
//             { headers: this.getCommonHeaders() }
//         ).pipe(
//             map(response => response.json()),
//             tap(data => {
//                 Config.token = data._kmd.authtoken
//             }),
//             catchError(this.handleErrors)
//         );      
//     }

//     register(user: User) {
//         return this.http.post(
//             Config.apiUrl + "user/" + Config.appKey,
//             JSON.stringify({
//                 username: user.email,
//                 email: user.email,
//                 password: user.password
//             }),
//             { headers: this.getCommonHeaders() }
//         ).pipe(
//             catchError(this.handleErrors)
//         );
//     }

//     getCommonHeaders() {
//         let headers = new Headers();
//         headers.append("Content-Type", "application/json");
//         headers.append("Authorization", Config.authHeader);
//         return headers;
//     }

//     handleErrors(error: Response) {
//         console.log(JSON.stringify(error.json()));
//         return Observable.throw(error);
//     }
// }