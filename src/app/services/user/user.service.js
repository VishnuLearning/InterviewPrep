"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var appSettings = require("application-settings");
var user_model_1 = require("./user.model");
// import { Config } from "../config";
var UserService = /** @class */ (function () {
    function UserService() {
        var persistedUsers = JSON.parse(appSettings.getString('myapp-users') || '[]');
        this.users = persistedUsers.map(function (user) {
            var tempUser = new user_model_1.User(user.name, user.email, user.password);
            return tempUser;
        });
    }
    UserService.prototype.updateUsers = function () {
        appSettings.setString('myapp-users', JSON.stringify(this.users));
    };
    UserService.prototype.login = function (user) {
        var _this = this;
        this.currentUser = this.users.filter(function (thisuser) { return thisuser.email === user.email; });
        if (this.currentUser.password === user.password) {
            // login the user
            user.isloggedin = true;
            this.users.forEach(function (u) {
                if (u.email === _this.currentUser.email)
                    u.isloggedin = true;
            });
            this.updateUsers();
        }
        else {
            // password mismatch
        }
        return rxjs_1.of(user);
    };
    UserService.prototype.register = function (user) {
        var c = 0;
        this.users.forEach(function (u) {
            if (u.email === user.email) {
                // account already existing
                c++;
                return rxjs_1.of(c);
            }
        });
        this.users.push(user);
        this.updateUsers();
        return rxjs_1.of(c);
    };
    UserService.prototype.logout = function (user) {
        var _this = this;
        this.users.forEach(function (u) {
            if (u.email === user.email && u.isloggedin == true) {
                u.isloggedin = false;
                user.isloggedin = false;
                // log out
                _this.updateUsers();
                return rxjs_1.of(user);
            }
        });
        // couldn't log out
        return rxjs_1.of(user);
    };
    UserService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [])
    ], UserService);
    return UserService;
}());
exports.UserService = UserService;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidXNlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQW1EO0FBRW5ELDZCQUFzQztBQUV0QyxrREFBb0Q7QUFFcEQsMkNBQW9DO0FBQ3BDLHNDQUFzQztBQUd0QztJQUlJO1FBQ0ksSUFBSSxjQUFjLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxJQUFFLElBQUksQ0FBQyxDQUFDO1FBQzVFLElBQUksQ0FBQyxLQUFLLEdBQUcsY0FBYyxDQUFDLEdBQUcsQ0FBQyxVQUFDLElBQXFEO1lBQ2xGLElBQUksUUFBUSxHQUFHLElBQUksaUJBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQzlELE9BQU8sUUFBUSxDQUFDO1FBQ3BCLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELGlDQUFXLEdBQVg7UUFDSSxXQUFXLENBQUMsU0FBUyxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQ3JFLENBQUM7SUFFRCwyQkFBSyxHQUFMLFVBQU0sSUFBVTtRQUFoQixpQkFlQztRQWRHLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsVUFBQyxRQUFjLElBQUssT0FBQSxRQUFRLENBQUMsS0FBSyxLQUFLLElBQUksQ0FBQyxLQUFLLEVBQTdCLENBQTZCLENBQUMsQ0FBQztRQUN4RixJQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxLQUFLLElBQUksQ0FBQyxRQUFRLEVBQUM7WUFDM0MsaUJBQWlCO1lBQ2pCLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFVBQUMsQ0FBTztnQkFDdkIsSUFBRyxDQUFDLENBQUMsS0FBSyxLQUFLLEtBQUksQ0FBQyxXQUFXLENBQUMsS0FBSztvQkFDakMsQ0FBQyxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7WUFDNUIsQ0FBQyxDQUFDLENBQUM7WUFDSCxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7U0FDdEI7YUFDSTtZQUNELG9CQUFvQjtTQUN2QjtRQUNELE9BQU8sU0FBRSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3BCLENBQUM7SUFFRCw4QkFBUSxHQUFSLFVBQVMsSUFBVTtRQUNmLElBQUksQ0FBQyxHQUFDLENBQUMsQ0FBQztRQUNSLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFVBQUMsQ0FBTztZQUN2QixJQUFHLENBQUMsQ0FBQyxLQUFLLEtBQUssSUFBSSxDQUFDLEtBQUssRUFBQztnQkFDdEIsMkJBQTJCO2dCQUMzQixDQUFDLEVBQUUsQ0FBQztnQkFDSixPQUFPLFNBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUNoQjtRQUNMLENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdEIsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ25CLE9BQU8sU0FBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2pCLENBQUM7SUFFRCw0QkFBTSxHQUFOLFVBQU8sSUFBVTtRQUFqQixpQkFZQztRQVhHLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFVBQUMsQ0FBTztZQUN2QixJQUFHLENBQUMsQ0FBQyxLQUFLLEtBQUssSUFBSSxDQUFDLEtBQUssSUFBSSxDQUFDLENBQUMsVUFBVSxJQUFFLElBQUksRUFBQztnQkFDNUMsQ0FBQyxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7Z0JBQ3JCLElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO2dCQUN4QixVQUFVO2dCQUNWLEtBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztnQkFDbkIsT0FBTyxTQUFFLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDbkI7UUFDTCxDQUFDLENBQUMsQ0FBQztRQUNILG1CQUFtQjtRQUNuQixPQUFPLFNBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNwQixDQUFDO0lBM0RRLFdBQVc7UUFEdkIsaUJBQVUsRUFBRTs7T0FDQSxXQUFXLENBNER2QjtJQUFELGtCQUFDO0NBQUEsQUE1REQsSUE0REM7QUE1RFksa0NBQVc7QUE4RHhCLGdCQUFnQjtBQUNoQiw2QkFBNkI7QUFDN0IsMENBQTBDO0FBRTFDLDBCQUEwQjtBQUMxQixpQ0FBaUM7QUFDakMsa0VBQWtFO0FBQ2xFLCtCQUErQjtBQUMvQix3Q0FBd0M7QUFDeEMsMENBQTBDO0FBQzFDLGtCQUFrQjtBQUNsQixtREFBbUQ7QUFDbkQsa0JBQWtCO0FBQ2xCLGdEQUFnRDtBQUNoRCw0QkFBNEI7QUFDNUIscURBQXFEO0FBQ3JELGtCQUFrQjtBQUNsQiw0Q0FBNEM7QUFDNUMsbUJBQW1CO0FBQ25CLFFBQVE7QUFFUiw2QkFBNkI7QUFDN0IsaUNBQWlDO0FBQ2pDLHVEQUF1RDtBQUN2RCwrQkFBK0I7QUFDL0Isd0NBQXdDO0FBQ3hDLHFDQUFxQztBQUNyQywwQ0FBMEM7QUFDMUMsa0JBQWtCO0FBQ2xCLG1EQUFtRDtBQUNuRCxrQkFBa0I7QUFDbEIsNENBQTRDO0FBQzVDLGFBQWE7QUFDYixRQUFRO0FBRVIsMkJBQTJCO0FBQzNCLHVDQUF1QztBQUN2Qyw4REFBOEQ7QUFDOUQsOERBQThEO0FBQzlELDBCQUEwQjtBQUMxQixRQUFRO0FBRVIsc0NBQXNDO0FBQ3RDLHFEQUFxRDtBQUNyRCwwQ0FBMEM7QUFDMUMsUUFBUTtBQUNSLElBQUkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3QsIEluamVjdGFibGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBIdHRwLCBIZWFkZXJzLCBSZXNwb25zZSB9IGZyb20gXCJAYW5ndWxhci9odHRwXCI7XHJcbmltcG9ydCB7IE9ic2VydmFibGUsIG9mIH0gZnJvbSBcInJ4anNcIjtcclxuaW1wb3J0IHsgY2F0Y2hFcnJvciwgbWFwLCB0YXAgfSBmcm9tIFwicnhqcy9vcGVyYXRvcnNcIjtcclxuaW1wb3J0ICogYXMgYXBwU2V0dGluZ3MgZnJvbSBcImFwcGxpY2F0aW9uLXNldHRpbmdzXCI7XHJcblxyXG5pbXBvcnQgeyBVc2VyIH0gZnJvbSBcIi4vdXNlci5tb2RlbFwiO1xyXG4vLyBpbXBvcnQgeyBDb25maWcgfSBmcm9tIFwiLi4vY29uZmlnXCI7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBVc2VyU2VydmljZSB7XHJcbiAgICB1c2VyczogQXJyYXk8VXNlcj47XHJcbiAgICBjdXJyZW50VXNlcjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBsZXQgcGVyc2lzdGVkVXNlcnMgPSBKU09OLnBhcnNlKGFwcFNldHRpbmdzLmdldFN0cmluZygnbXlhcHAtdXNlcnMnKXx8J1tdJyk7XHJcbiAgICAgICAgdGhpcy51c2VycyA9IHBlcnNpc3RlZFVzZXJzLm1hcCgodXNlcjoge25hbWU6IHN0cmluZywgZW1haWw6IHN0cmluZywgcGFzc3dvcmQ6IHN0cmluZ30pID0+IHtcclxuICAgICAgICAgICAgbGV0IHRlbXBVc2VyID0gbmV3IFVzZXIodXNlci5uYW1lLCB1c2VyLmVtYWlsLCB1c2VyLnBhc3N3b3JkKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRlbXBVc2VyO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZVVzZXJzKCkge1xyXG4gICAgICAgIGFwcFNldHRpbmdzLnNldFN0cmluZygnbXlhcHAtdXNlcnMnLCBKU09OLnN0cmluZ2lmeSh0aGlzLnVzZXJzKSk7XHJcbiAgICB9XHJcblxyXG4gICAgbG9naW4odXNlcjogVXNlcikge1xyXG4gICAgICAgIHRoaXMuY3VycmVudFVzZXIgPSB0aGlzLnVzZXJzLmZpbHRlcigodGhpc3VzZXI6IFVzZXIpID0+IHRoaXN1c2VyLmVtYWlsID09PSB1c2VyLmVtYWlsKTtcclxuICAgICAgICBpZih0aGlzLmN1cnJlbnRVc2VyLnBhc3N3b3JkID09PSB1c2VyLnBhc3N3b3JkKXtcclxuICAgICAgICAgICAgLy8gbG9naW4gdGhlIHVzZXJcclxuICAgICAgICAgICAgdXNlci5pc2xvZ2dlZGluID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy51c2Vycy5mb3JFYWNoKCh1OiBVc2VyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZih1LmVtYWlsID09PSB0aGlzLmN1cnJlbnRVc2VyLmVtYWlsKVxyXG4gICAgICAgICAgICAgICAgICAgIHUuaXNsb2dnZWRpbiA9IHRydWU7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVVzZXJzKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAvLyBwYXNzd29yZCBtaXNtYXRjaFxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gb2YodXNlcik7XHJcbiAgICB9XHJcblxyXG4gICAgcmVnaXN0ZXIodXNlcjogVXNlcikge1xyXG4gICAgICAgIHZhciBjPTA7XHJcbiAgICAgICAgdGhpcy51c2Vycy5mb3JFYWNoKCh1OiBVc2VyKSA9PiB7XHJcbiAgICAgICAgICAgIGlmKHUuZW1haWwgPT09IHVzZXIuZW1haWwpe1xyXG4gICAgICAgICAgICAgICAgLy8gYWNjb3VudCBhbHJlYWR5IGV4aXN0aW5nXHJcbiAgICAgICAgICAgICAgICBjKys7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gb2YoYyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLnVzZXJzLnB1c2godXNlcik7XHJcbiAgICAgICAgdGhpcy51cGRhdGVVc2VycygpO1xyXG4gICAgICAgIHJldHVybiBvZihjKTtcclxuICAgIH1cclxuXHJcbiAgICBsb2dvdXQodXNlcjogVXNlcikge1xyXG4gICAgICAgIHRoaXMudXNlcnMuZm9yRWFjaCgodTogVXNlcikgPT4ge1xyXG4gICAgICAgICAgICBpZih1LmVtYWlsID09PSB1c2VyLmVtYWlsICYmIHUuaXNsb2dnZWRpbj09dHJ1ZSl7XHJcbiAgICAgICAgICAgICAgICB1LmlzbG9nZ2VkaW4gPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHVzZXIuaXNsb2dnZWRpbiA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgLy8gbG9nIG91dFxyXG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVVc2VycygpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG9mKHVzZXIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgLy8gY291bGRuJ3QgbG9nIG91dFxyXG4gICAgICAgIHJldHVybiBvZih1c2VyKTtcclxuICAgIH1cclxufVxyXG5cclxuLy8gQEluamVjdGFibGUoKVxyXG4vLyBleHBvcnQgY2xhc3MgVXNlclNlcnZpY2Uge1xyXG4vLyAgICAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwOiBIdHRwKSB7IH1cclxuXHJcbi8vICAgICBsb2dpbih1c2VyOiBVc2VyKSB7XHJcbi8vICAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0KFxyXG4vLyAgICAgICAgICAgICBDb25maWcuYXBpVXJsICsgXCJ1c2VyL1wiICsgQ29uZmlnLmFwcEtleSArIFwiL2xvZ2luXCIsXHJcbi8vICAgICAgICAgICAgIEpTT04uc3RyaW5naWZ5KHtcclxuLy8gICAgICAgICAgICAgICAgIHVzZXJuYW1lOiB1c2VyLmVtYWlsLFxyXG4vLyAgICAgICAgICAgICAgICAgcGFzc3dvcmQ6IHVzZXIucGFzc3dvcmRcclxuLy8gICAgICAgICAgICAgfSksXHJcbi8vICAgICAgICAgICAgIHsgaGVhZGVyczogdGhpcy5nZXRDb21tb25IZWFkZXJzKCkgfVxyXG4vLyAgICAgICAgICkucGlwZShcclxuLy8gICAgICAgICAgICAgbWFwKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSksXHJcbi8vICAgICAgICAgICAgIHRhcChkYXRhID0+IHtcclxuLy8gICAgICAgICAgICAgICAgIENvbmZpZy50b2tlbiA9IGRhdGEuX2ttZC5hdXRodG9rZW5cclxuLy8gICAgICAgICAgICAgfSksXHJcbi8vICAgICAgICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVFcnJvcnMpXHJcbi8vICAgICAgICAgKTsgICAgICBcclxuLy8gICAgIH1cclxuXHJcbi8vICAgICByZWdpc3Rlcih1c2VyOiBVc2VyKSB7XHJcbi8vICAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0KFxyXG4vLyAgICAgICAgICAgICBDb25maWcuYXBpVXJsICsgXCJ1c2VyL1wiICsgQ29uZmlnLmFwcEtleSxcclxuLy8gICAgICAgICAgICAgSlNPTi5zdHJpbmdpZnkoe1xyXG4vLyAgICAgICAgICAgICAgICAgdXNlcm5hbWU6IHVzZXIuZW1haWwsXHJcbi8vICAgICAgICAgICAgICAgICBlbWFpbDogdXNlci5lbWFpbCxcclxuLy8gICAgICAgICAgICAgICAgIHBhc3N3b3JkOiB1c2VyLnBhc3N3b3JkXHJcbi8vICAgICAgICAgICAgIH0pLFxyXG4vLyAgICAgICAgICAgICB7IGhlYWRlcnM6IHRoaXMuZ2V0Q29tbW9uSGVhZGVycygpIH1cclxuLy8gICAgICAgICApLnBpcGUoXHJcbi8vICAgICAgICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVFcnJvcnMpXHJcbi8vICAgICAgICAgKTtcclxuLy8gICAgIH1cclxuXHJcbi8vICAgICBnZXRDb21tb25IZWFkZXJzKCkge1xyXG4vLyAgICAgICAgIGxldCBoZWFkZXJzID0gbmV3IEhlYWRlcnMoKTtcclxuLy8gICAgICAgICBoZWFkZXJzLmFwcGVuZChcIkNvbnRlbnQtVHlwZVwiLCBcImFwcGxpY2F0aW9uL2pzb25cIik7XHJcbi8vICAgICAgICAgaGVhZGVycy5hcHBlbmQoXCJBdXRob3JpemF0aW9uXCIsIENvbmZpZy5hdXRoSGVhZGVyKTtcclxuLy8gICAgICAgICByZXR1cm4gaGVhZGVycztcclxuLy8gICAgIH1cclxuXHJcbi8vICAgICBoYW5kbGVFcnJvcnMoZXJyb3I6IFJlc3BvbnNlKSB7XHJcbi8vICAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkoZXJyb3IuanNvbigpKSk7XHJcbi8vICAgICAgICAgcmV0dXJuIE9ic2VydmFibGUudGhyb3coZXJyb3IpO1xyXG4vLyAgICAgfVxyXG4vLyB9Il19