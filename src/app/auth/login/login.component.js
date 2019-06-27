"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var nativescript_google_auth_1 = require("nativescript-google-auth");
var LoginComponent = /** @class */ (function () {
    function LoginComponent(router) {
        this.router = router;
    }
    LoginComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.googleAuth = new nativescript_google_auth_1.GoogleAuth();
        // change your auth key below
        // https://developers.google.com/identity/sign-in/android/start-integrating
        this.googleAuth.init('529888917567-av12dm5hmliirb2l9qd63fqho4igrgte.apps.googleusercontent.com', function (loginresult) {
            console.log(loginresult);
            _this.displayname = loginresult.displayName;
            _this.email = loginresult.email;
        }, function () {
            console.log("logged out successfully");
            _this.displayname = "";
            _this.email = "";
        });
    };
    LoginComponent.prototype.login = function () {
        this.googleAuth.login();
        this.router.navigate(['/login']);
    };
    LoginComponent.prototype.logout = function () {
        this.googleAuth.logout();
        this.router.navigate(['/login']);
    };
    LoginComponent.prototype.goToHome = function () {
        this.router.navigate(['/home']);
    };
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'ns-login',
            templateUrl: './login.component.html',
            styleUrls: ['./login.component.css'],
            moduleId: module.id,
        }),
        __metadata("design:paramtypes", [router_1.Router])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibG9naW4uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtEO0FBQ2xELDBDQUF5QztBQUN6QyxxRUFBc0Q7QUFRdEQ7SUFJRSx3QkFBb0IsTUFBYztRQUFkLFdBQU0sR0FBTixNQUFNLENBQVE7SUFBSSxDQUFDO0lBRXZDLGlDQUFRLEdBQVI7UUFBQSxpQkFlRztRQWRELElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxxQ0FBVSxFQUFFLENBQUM7UUFDL0IsNkJBQTZCO1FBQzdCLDJFQUEyRTtRQUMzRSxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQywwRUFBMEUsRUFDL0YsVUFBQyxXQUFXO1lBQ1IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUN6QixLQUFJLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQyxXQUFXLENBQUM7WUFDM0MsS0FBSSxDQUFDLEtBQUssR0FBRyxXQUFXLENBQUMsS0FBSyxDQUFDO1FBQ25DLENBQUMsRUFDRDtZQUNJLE9BQU8sQ0FBQyxHQUFHLENBQUMseUJBQXlCLENBQUMsQ0FBQztZQUN2QyxLQUFJLENBQUMsV0FBVyxHQUFHLEVBQUUsQ0FBQztZQUN0QixLQUFJLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztRQUNwQixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFSCw4QkFBSyxHQUFMO1FBQ0UsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUN4QixJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7SUFDbkMsQ0FBQztJQUVELCtCQUFNLEdBQU47UUFDRSxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztJQUNuQyxDQUFDO0lBRUQsaUNBQVEsR0FBUjtRQUNFLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztJQUNsQyxDQUFDO0lBbkNVLGNBQWM7UUFOMUIsZ0JBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxVQUFVO1lBQ3BCLFdBQVcsRUFBRSx3QkFBd0I7WUFDckMsU0FBUyxFQUFFLENBQUMsdUJBQXVCLENBQUM7WUFDcEMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1NBQ3BCLENBQUM7eUNBSzRCLGVBQU07T0FKdkIsY0FBYyxDQW9DMUI7SUFBRCxxQkFBQztDQUFBLEFBcENELElBb0NDO0FBcENZLHdDQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHsgR29vZ2xlQXV0aCB9IGZyb20gJ25hdGl2ZXNjcmlwdC1nb29nbGUtYXV0aCc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ25zLWxvZ2luJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vbG9naW4uY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL2xvZ2luLmNvbXBvbmVudC5jc3MnXSxcclxuICBtb2R1bGVJZDogbW9kdWxlLmlkLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgTG9naW5Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gIGRpc3BsYXluYW1lOiBzdHJpbmc7XHJcbiAgZW1haWw6IHN0cmluZztcclxuICBwcml2YXRlIGdvb2dsZUF1dGg6R29vZ2xlQXV0aDtcclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJvdXRlcjogUm91dGVyKSB7IH1cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICB0aGlzLmdvb2dsZUF1dGggPSBuZXcgR29vZ2xlQXV0aCgpO1xyXG4gICAgICAgIC8vIGNoYW5nZSB5b3VyIGF1dGgga2V5IGJlbG93XHJcbiAgICAgICAgLy8gaHR0cHM6Ly9kZXZlbG9wZXJzLmdvb2dsZS5jb20vaWRlbnRpdHkvc2lnbi1pbi9hbmRyb2lkL3N0YXJ0LWludGVncmF0aW5nXHJcbiAgICAgICAgdGhpcy5nb29nbGVBdXRoLmluaXQoJzUyOTg4ODkxNzU2Ny1hdjEyZG01aG1saWlyYjJsOXFkNjNmcWhvNGlncmd0ZS5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbScsIFxyXG4gICAgICAgIChsb2dpbnJlc3VsdCk9PntcclxuICAgICAgICAgICAgY29uc29sZS5sb2cobG9naW5yZXN1bHQpO1xyXG4gICAgICAgICAgICB0aGlzLmRpc3BsYXluYW1lID0gbG9naW5yZXN1bHQuZGlzcGxheU5hbWU7XHJcbiAgICAgICAgICAgIHRoaXMuZW1haWwgPSBsb2dpbnJlc3VsdC5lbWFpbDtcclxuICAgICAgICB9LFxyXG4gICAgICAgICgpPT57XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwibG9nZ2VkIG91dCBzdWNjZXNzZnVsbHlcIik7XHJcbiAgICAgICAgICAgIHRoaXMuZGlzcGxheW5hbWUgPSBcIlwiO1xyXG4gICAgICAgICAgICB0aGlzLmVtYWlsID0gXCJcIjtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgbG9naW4oKSB7XHJcbiAgICB0aGlzLmdvb2dsZUF1dGgubG9naW4oKTtcclxuICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnL2xvZ2luJ10pO1xyXG4gIH1cclxuXHJcbiAgbG9nb3V0KCkge1xyXG4gICAgdGhpcy5nb29nbGVBdXRoLmxvZ291dCgpO1xyXG4gICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvbG9naW4nXSk7XHJcbiAgfVxyXG5cclxuICBnb1RvSG9tZSgpe1xyXG4gICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvaG9tZSddKTtcclxuICB9XHJcbn1cclxuIl19