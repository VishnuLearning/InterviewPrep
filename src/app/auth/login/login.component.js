"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var nativescript_oauth2_1 = require("nativescript-oauth2");
var nativescript_angular_1 = require("nativescript-angular");
var LoginComponent = /** @class */ (function () {
    function LoginComponent(route, routerExtensions) {
        this.route = route;
        this.routerExtensions = routerExtensions;
        this.loggedIn = false;
    }
    LoginComponent.prototype.tnsOauthLogin = function (providerType) {
        var _this = this;
        this.client = new nativescript_oauth2_1.TnsOAuthClient(providerType);
        return new Promise(function (resolve, reject) {
            _this.client.loginWithCompletion(function (tokenResult, error) {
                if (error) {
                    console.error("back to main page with error: ");
                    console.error(error);
                    reject(error);
                }
                else {
                    console.log("back to main page with access token: ");
                    console.log(tokenResult);
                    resolve(tokenResult);
                }
            });
        });
    };
    LoginComponent.prototype.tnsOauthLogout = function () {
        if (this.client) {
            this.client.logout();
        }
    };
    LoginComponent.prototype.login = function () {
        var _this = this;
        console.log("login clicked");
        this.tnsOauthLogin("google")
            .then(function (result) {
            console.log("back to login component with token " + result.accessToken);
            _this.loggedIn = true;
            // this.routerExtensions
            //     .navigate((["../authenticated"]))
            //     .then(() => console.log("navigated to /authenticated"))
            //     .catch(err => console.log("error navigating to /authenticated: " + err));
        })
            .catch(function (e) { return console.log("Error: " + e); });
    };
    LoginComponent.prototype.logout = function () {
        if (this.client) {
            this.client.logout();
            this.loggedIn = false;
        }
    };
    LoginComponent.prototype.goToHome = function () {
        this.route.navigate(["/home"]);
    };
    LoginComponent.prototype.ngOnInit = function () { };
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'ns-login',
            templateUrl: './login.component.html',
            styleUrls: ['./login.component.css'],
            moduleId: module.id,
        }),
        __metadata("design:paramtypes", [router_1.Router, nativescript_angular_1.RouterExtensions])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibG9naW4uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTBEO0FBQzFELDBDQUF5QztBQUN6QywyREFBMkU7QUFDM0UsNkRBQXdEO0FBUXhEO0lBSUUsd0JBQW9CLEtBQWEsRUFBVSxnQkFBa0M7UUFBekQsVUFBSyxHQUFMLEtBQUssQ0FBUTtRQUFVLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFGckUsYUFBUSxHQUFZLEtBQUssQ0FBQztJQUU4QyxDQUFDO0lBRTFFLHNDQUFhLEdBQXBCLFVBQXFCLFlBQVk7UUFBakMsaUJBa0JDO1FBakJDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxvQ0FBYyxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBRS9DLE9BQU8sSUFBSSxPQUFPLENBQXVCLFVBQUMsT0FBTyxFQUFFLE1BQU07WUFDdkQsS0FBSSxDQUFDLE1BQU0sQ0FBQyxtQkFBbUIsQ0FDN0IsVUFBQyxXQUFpQyxFQUFFLEtBQUs7Z0JBQ3ZDLElBQUksS0FBSyxFQUFFO29CQUNULE9BQU8sQ0FBQyxLQUFLLENBQUMsZ0NBQWdDLENBQUMsQ0FBQztvQkFDaEQsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDckIsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO2lCQUNmO3FCQUFNO29CQUNMLE9BQU8sQ0FBQyxHQUFHLENBQUMsdUNBQXVDLENBQUMsQ0FBQztvQkFDckQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQztvQkFDekIsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDO2lCQUN0QjtZQUNILENBQUMsQ0FDRixDQUFDO1FBQ0osQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRU0sdUNBQWMsR0FBckI7UUFDRSxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDZixJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDO1NBQ3RCO0lBQ0gsQ0FBQztJQUdELDhCQUFLLEdBQUw7UUFBQSxpQkFZQztRQVhDLE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDN0IsSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUM7YUFDdkIsSUFBSSxDQUFDLFVBQUMsTUFBNEI7WUFDakMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxxQ0FBcUMsR0FBRyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDeEUsS0FBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7WUFDckIsd0JBQXdCO1lBQ3hCLHdDQUF3QztZQUN4Qyw4REFBOEQ7WUFDOUQsZ0ZBQWdGO1FBQ2xGLENBQUMsQ0FBQzthQUNELEtBQUssQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQyxFQUExQixDQUEwQixDQUFDLENBQUM7SUFDOUMsQ0FBQztJQUVELCtCQUFNLEdBQU47UUFDRSxJQUFHLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDZCxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ3JCLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1NBQ3ZCO0lBQ0gsQ0FBQztJQUVELGlDQUFRLEdBQVI7UUFDRSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7SUFDakMsQ0FBQztJQUVELGlDQUFRLEdBQVIsY0FBWSxDQUFDO0lBMURGLGNBQWM7UUFOMUIsZ0JBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxVQUFVO1lBQ3BCLFdBQVcsRUFBRSx3QkFBd0I7WUFDckMsU0FBUyxFQUFFLENBQUMsdUJBQXVCLENBQUM7WUFDcEMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1NBQ3BCLENBQUM7eUNBSzJCLGVBQU0sRUFBNEIsdUNBQWdCO09BSmxFLGNBQWMsQ0EyRDFCO0lBQUQscUJBQUM7Q0FBQSxBQTNERCxJQTJEQztBQTNEWSx3Q0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBOZ1pvbmUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHsgVG5zT0F1dGhDbGllbnQsIElUbnNPQXV0aFRva2VuUmVzdWx0IH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1vYXV0aDJcIjtcclxuaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhclwiO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICducy1sb2dpbicsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL2xvZ2luLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9sb2dpbi5jb21wb25lbnQuY3NzJ10sXHJcbiAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcclxufSlcclxuZXhwb3J0IGNsYXNzIExvZ2luQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICBwcml2YXRlIGNsaWVudDogVG5zT0F1dGhDbGllbnQ7XHJcbiAgcHJpdmF0ZSBsb2dnZWRJbjogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJvdXRlOiBSb3V0ZXIsIHByaXZhdGUgcm91dGVyRXh0ZW5zaW9uczogUm91dGVyRXh0ZW5zaW9ucykge31cclxuXHJcbiAgcHVibGljIHRuc09hdXRoTG9naW4ocHJvdmlkZXJUeXBlKTogUHJvbWlzZTxJVG5zT0F1dGhUb2tlblJlc3VsdD4ge1xyXG4gICAgdGhpcy5jbGllbnQgPSBuZXcgVG5zT0F1dGhDbGllbnQocHJvdmlkZXJUeXBlKTtcclxuXHJcbiAgICByZXR1cm4gbmV3IFByb21pc2U8SVRuc09BdXRoVG9rZW5SZXN1bHQ+KChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgdGhpcy5jbGllbnQubG9naW5XaXRoQ29tcGxldGlvbihcclxuICAgICAgICAodG9rZW5SZXN1bHQ6IElUbnNPQXV0aFRva2VuUmVzdWx0LCBlcnJvcikgPT4ge1xyXG4gICAgICAgICAgaWYgKGVycm9yKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJiYWNrIHRvIG1haW4gcGFnZSB3aXRoIGVycm9yOiBcIik7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xyXG4gICAgICAgICAgICByZWplY3QoZXJyb3IpO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJiYWNrIHRvIG1haW4gcGFnZSB3aXRoIGFjY2VzcyB0b2tlbjogXCIpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0b2tlblJlc3VsdCk7XHJcbiAgICAgICAgICAgIHJlc29sdmUodG9rZW5SZXN1bHQpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHRuc09hdXRoTG9nb3V0KCkge1xyXG4gICAgaWYgKHRoaXMuY2xpZW50KSB7XHJcbiAgICAgIHRoaXMuY2xpZW50LmxvZ291dCgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiBcclxuICBsb2dpbigpIHtcclxuICAgIGNvbnNvbGUubG9nKFwibG9naW4gY2xpY2tlZFwiKTtcclxuICAgIHRoaXMudG5zT2F1dGhMb2dpbihcImdvb2dsZVwiKVxyXG4gICAgICAgIC50aGVuKChyZXN1bHQ6IElUbnNPQXV0aFRva2VuUmVzdWx0KSA9PiB7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcImJhY2sgdG8gbG9naW4gY29tcG9uZW50IHdpdGggdG9rZW4gXCIgKyByZXN1bHQuYWNjZXNzVG9rZW4pO1xyXG4gICAgICAgICAgdGhpcy5sb2dnZWRJbiA9IHRydWU7XHJcbiAgICAgICAgICAvLyB0aGlzLnJvdXRlckV4dGVuc2lvbnNcclxuICAgICAgICAgIC8vICAgICAubmF2aWdhdGUoKFtcIi4uL2F1dGhlbnRpY2F0ZWRcIl0pKVxyXG4gICAgICAgICAgLy8gICAgIC50aGVuKCgpID0+IGNvbnNvbGUubG9nKFwibmF2aWdhdGVkIHRvIC9hdXRoZW50aWNhdGVkXCIpKVxyXG4gICAgICAgICAgLy8gICAgIC5jYXRjaChlcnIgPT4gY29uc29sZS5sb2coXCJlcnJvciBuYXZpZ2F0aW5nIHRvIC9hdXRoZW50aWNhdGVkOiBcIiArIGVycikpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmNhdGNoKGUgPT4gY29uc29sZS5sb2coXCJFcnJvcjogXCIgKyBlKSk7XHJcbiAgfVxyXG5cclxuICBsb2dvdXQoKSB7XHJcbiAgICBpZih0aGlzLmNsaWVudCkge1xyXG4gICAgICB0aGlzLmNsaWVudC5sb2dvdXQoKTtcclxuICAgICAgdGhpcy5sb2dnZWRJbiA9IGZhbHNlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZ29Ub0hvbWUoKSB7XHJcbiAgICB0aGlzLnJvdXRlLm5hdmlnYXRlKFtcIi9ob21lXCJdKTtcclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCkge31cclxufVxyXG4iXX0=