"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var Application = require("application");
var SocialLogin = require("nativescript-social-login");
var LoginComponent = /** @class */ (function () {
    function LoginComponent(route, zone) {
        this.route = route;
        this.zone = zone;
        this.loggedIn = false;
        if (Application.android) {
            console.log("android app detected");
            var result = SocialLogin.init({
                google: {
                    serverClientId: '52111376902-b7lsr3ik43p77ruf4p2dj1rbmo6sjp1o.apps.googleusercontent.com'
                }
            });
            console.log(result);
        }
    }
    LoginComponent.prototype.login = function () {
        var _this = this;
        console.log("calling login with google");
        SocialLogin.loginWithGoogle(function (result) {
            _this.zone.run(function () {
                console.log("code: " + result.code);
                console.log("error: " + result.error);
                console.log("userToken: " + result.userToken);
                console.log("displayName: " + result.displayName);
                console.log("photo: " + result.photo);
                console.log("authToken: " + result.authToken);
            });
            _this.loggedIn = true;
        });
    };
    LoginComponent.prototype.logout = function () {
        // SocialLogin.logout(); // write a callback?
        console.log("should logout");
        this.loggedIn = false;
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
        __metadata("design:paramtypes", [router_1.Router, core_1.NgZone])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibG9naW4uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTBEO0FBQzFELDBDQUF5QztBQUN6Qyx5Q0FBNEM7QUFDNUMsdURBQTBEO0FBVTFEO0lBR0Usd0JBQW9CLEtBQWEsRUFBVSxJQUFZO1FBQW5DLFVBQUssR0FBTCxLQUFLLENBQVE7UUFBVSxTQUFJLEdBQUosSUFBSSxDQUFRO1FBRi9DLGFBQVEsR0FBWSxLQUFLLENBQUM7UUFHOUIsSUFBSSxXQUFXLENBQUMsT0FBTyxFQUFFO1lBQ3ZCLE9BQU8sQ0FBQyxHQUFHLENBQUMsc0JBQXNCLENBQUMsQ0FBQztZQUNwQyxJQUFJLE1BQU0sR0FBRyxXQUFXLENBQUMsSUFBSSxDQUFDO2dCQUM1QixNQUFNLEVBQUU7b0JBQ0osY0FBYyxFQUFFLHlFQUF5RTtpQkFDNUY7YUFBQyxDQUFDLENBQUM7WUFDTixPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQ3ZCO0lBQ0gsQ0FBQztJQUVELDhCQUFLLEdBQUw7UUFBQSxpQkFhQztRQVpDLE9BQU8sQ0FBQyxHQUFHLENBQUMsMkJBQTJCLENBQUMsQ0FBQztRQUN6QyxXQUFXLENBQUMsZUFBZSxDQUFDLFVBQUMsTUFBTTtZQUMvQixLQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQztnQkFDVixPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ3BDLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDdEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2dCQUM5QyxPQUFPLENBQUMsR0FBRyxDQUFDLGVBQWUsR0FBRyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUM7Z0JBQ2xELE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDdEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ2xELENBQUMsQ0FBQyxDQUFDO1lBQ0gsS0FBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7UUFDekIsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsK0JBQU0sR0FBTjtRQUNFLDZDQUE2QztRQUM3QyxPQUFPLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQzdCLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO0lBQ3hCLENBQUM7SUFFRCxpQ0FBUSxHQUFSO1FBQ0UsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO0lBQ2pDLENBQUM7SUFFRCxpQ0FBUSxHQUFSLGNBQVksQ0FBQztJQXZDRixjQUFjO1FBTjFCLGdCQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsVUFBVTtZQUNwQixXQUFXLEVBQUUsd0JBQXdCO1lBQ3JDLFNBQVMsRUFBRSxDQUFDLHVCQUF1QixDQUFDO1lBQ3BDLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtTQUNwQixDQUFDO3lDQUkyQixlQUFNLEVBQWdCLGFBQU07T0FINUMsY0FBYyxDQXdDMUI7SUFBRCxxQkFBQztDQUFBLEFBeENELElBd0NDO0FBeENZLHdDQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIE5nWm9uZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5pbXBvcnQgQXBwbGljYXRpb24gPSByZXF1aXJlKFwiYXBwbGljYXRpb25cIik7XHJcbmltcG9ydCBTb2NpYWxMb2dpbiA9IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtc29jaWFsLWxvZ2luXCIpO1xyXG4gXHJcblxyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICducy1sb2dpbicsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL2xvZ2luLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9sb2dpbi5jb21wb25lbnQuY3NzJ10sXHJcbiAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcclxufSlcclxuZXhwb3J0IGNsYXNzIExvZ2luQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICBwcml2YXRlIGxvZ2dlZEluOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGU6IFJvdXRlciwgcHJpdmF0ZSB6b25lOiBOZ1pvbmUpIHtcclxuICAgICAgaWYgKEFwcGxpY2F0aW9uLmFuZHJvaWQpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcImFuZHJvaWQgYXBwIGRldGVjdGVkXCIpO1xyXG4gICAgICAgIGxldCByZXN1bHQgPSBTb2NpYWxMb2dpbi5pbml0KHtcclxuICAgICAgICAgIGdvb2dsZToge1xyXG4gICAgICAgICAgICAgIHNlcnZlckNsaWVudElkOiAnNTIxMTEzNzY5MDItYjdsc3IzaWs0M3A3N3J1ZjRwMmRqMXJibW82c2pwMW8uYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20nXHJcbiAgICAgICAgICB9fSk7XHJcbiAgICAgICAgY29uc29sZS5sb2cocmVzdWx0KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGxvZ2luKCkge1xyXG4gICAgY29uc29sZS5sb2coXCJjYWxsaW5nIGxvZ2luIHdpdGggZ29vZ2xlXCIpO1xyXG4gICAgU29jaWFsTG9naW4ubG9naW5XaXRoR29vZ2xlKChyZXN1bHQpID0+IHtcclxuICAgICAgICB0aGlzLnpvbmUucnVuKCgpID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJjb2RlOiBcIiArIHJlc3VsdC5jb2RlKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJlcnJvcjogXCIgKyByZXN1bHQuZXJyb3IpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInVzZXJUb2tlbjogXCIgKyByZXN1bHQudXNlclRva2VuKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJkaXNwbGF5TmFtZTogXCIgKyByZXN1bHQuZGlzcGxheU5hbWUpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInBob3RvOiBcIiArIHJlc3VsdC5waG90byk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiYXV0aFRva2VuOiBcIiArIHJlc3VsdC5hdXRoVG9rZW4pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMubG9nZ2VkSW4gPSB0cnVlO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBsb2dvdXQoKSB7XHJcbiAgICAvLyBTb2NpYWxMb2dpbi5sb2dvdXQoKTsgLy8gd3JpdGUgYSBjYWxsYmFjaz9cclxuICAgIGNvbnNvbGUubG9nKFwic2hvdWxkIGxvZ291dFwiKTtcclxuICAgIHRoaXMubG9nZ2VkSW4gPSBmYWxzZTtcclxuICB9XHJcblxyXG4gIGdvVG9Ib21lKCkge1xyXG4gICAgdGhpcy5yb3V0ZS5uYXZpZ2F0ZShbXCIvaG9tZVwiXSk7XHJcbiAgfVxyXG5cclxuICBuZ09uSW5pdCgpIHt9XHJcbn1cclxuIl19