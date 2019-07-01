"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var nativescript_google_auth_1 = require("nativescript-google-auth");
var LoginComponent = /** @class */ (function () {
    function LoginComponent(router) {
        this.router = router;
        this.display = false;
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
            _this.photoUrl = loginresult.photoUrl;
        }, function () {
            console.log("logged out successfully");
            _this.displayname = "";
            _this.email = "";
            _this.photoUrl = '';
        });
    };
    LoginComponent.prototype.login = function () {
        this.googleAuth.login();
        this.display = true;
        this.router.navigate(['/login']);
    };
    LoginComponent.prototype.logout = function () {
        this.googleAuth.logout();
        this.display = false;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibG9naW4uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtEO0FBQ2xELDBDQUF5QztBQUN6QyxxRUFBc0Q7QUFRdEQ7SUFNRSx3QkFBb0IsTUFBYztRQUFkLFdBQU0sR0FBTixNQUFNLENBQVE7UUFEbEMsWUFBTyxHQUFhLEtBQUssQ0FBQztJQUNZLENBQUM7SUFFdkMsaUNBQVEsR0FBUjtRQUFBLGlCQWlCRztRQWhCRCxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUkscUNBQVUsRUFBRSxDQUFDO1FBQy9CLDZCQUE2QjtRQUM3QiwyRUFBMkU7UUFDM0UsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsMEVBQTBFLEVBQy9GLFVBQUMsV0FBVztZQUNSLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDekIsS0FBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUMsV0FBVyxDQUFDO1lBQzNDLEtBQUksQ0FBQyxLQUFLLEdBQUcsV0FBVyxDQUFDLEtBQUssQ0FBQztZQUMvQixLQUFJLENBQUMsUUFBUSxHQUFHLFdBQVcsQ0FBQyxRQUFRLENBQUM7UUFDekMsQ0FBQyxFQUNEO1lBQ0ksT0FBTyxDQUFDLEdBQUcsQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO1lBQ3ZDLEtBQUksQ0FBQyxXQUFXLEdBQUcsRUFBRSxDQUFDO1lBQ3RCLEtBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO1lBQ2hCLEtBQUksQ0FBQyxRQUFRLEdBQUMsRUFBRSxDQUFDO1FBQ3JCLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVILDhCQUFLLEdBQUw7UUFDRSxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztJQUNuQyxDQUFDO0lBRUQsK0JBQU0sR0FBTjtRQUNFLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDekIsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7UUFDckIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO0lBQ25DLENBQUM7SUFFRCxpQ0FBUSxHQUFSO1FBQ0UsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO0lBQ2xDLENBQUM7SUF6Q1UsY0FBYztRQU4xQixnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLFVBQVU7WUFDcEIsV0FBVyxFQUFFLHdCQUF3QjtZQUNyQyxTQUFTLEVBQUUsQ0FBQyx1QkFBdUIsQ0FBQztZQUNwQyxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7U0FDcEIsQ0FBQzt5Q0FPNEIsZUFBTTtPQU52QixjQUFjLENBMEMxQjtJQUFELHFCQUFDO0NBQUEsQUExQ0QsSUEwQ0M7QUExQ1ksd0NBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5pbXBvcnQgeyBHb29nbGVBdXRoIH0gZnJvbSAnbmF0aXZlc2NyaXB0LWdvb2dsZS1hdXRoJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnbnMtbG9naW4nLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9sb2dpbi5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vbG9naW4uY29tcG9uZW50LmNzcyddLFxyXG4gIG1vZHVsZUlkOiBtb2R1bGUuaWQsXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBMb2dpbkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgZGlzcGxheW5hbWU6IHN0cmluZztcclxuICBlbWFpbDogc3RyaW5nO1xyXG4gIHBob3RvVXJsOnN0cmluZztcclxuICBwcml2YXRlIGdvb2dsZUF1dGg6R29vZ2xlQXV0aDtcclxuICBkaXNwbGF5IDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGVyOiBSb3V0ZXIpIHsgfVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIHRoaXMuZ29vZ2xlQXV0aCA9IG5ldyBHb29nbGVBdXRoKCk7XHJcbiAgICAgICAgLy8gY2hhbmdlIHlvdXIgYXV0aCBrZXkgYmVsb3dcclxuICAgICAgICAvLyBodHRwczovL2RldmVsb3BlcnMuZ29vZ2xlLmNvbS9pZGVudGl0eS9zaWduLWluL2FuZHJvaWQvc3RhcnQtaW50ZWdyYXRpbmdcclxuICAgICAgICB0aGlzLmdvb2dsZUF1dGguaW5pdCgnNTI5ODg4OTE3NTY3LWF2MTJkbTVobWxpaXJiMmw5cWQ2M2ZxaG80aWdyZ3RlLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tJywgXHJcbiAgICAgICAgKGxvZ2lucmVzdWx0KT0+e1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhsb2dpbnJlc3VsdCk7XHJcbiAgICAgICAgICAgIHRoaXMuZGlzcGxheW5hbWUgPSBsb2dpbnJlc3VsdC5kaXNwbGF5TmFtZTtcclxuICAgICAgICAgICAgdGhpcy5lbWFpbCA9IGxvZ2lucmVzdWx0LmVtYWlsO1xyXG4gICAgICAgICAgICB0aGlzLnBob3RvVXJsID0gbG9naW5yZXN1bHQucGhvdG9Vcmw7XHJcbiAgICAgICAgfSxcclxuICAgICAgICAoKT0+e1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImxvZ2dlZCBvdXQgc3VjY2Vzc2Z1bGx5XCIpO1xyXG4gICAgICAgICAgICB0aGlzLmRpc3BsYXluYW1lID0gXCJcIjtcclxuICAgICAgICAgICAgdGhpcy5lbWFpbCA9IFwiXCI7XHJcbiAgICAgICAgICAgIHRoaXMucGhvdG9Vcmw9Jyc7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gIGxvZ2luKCkge1xyXG4gICAgdGhpcy5nb29nbGVBdXRoLmxvZ2luKCk7XHJcbiAgICB0aGlzLmRpc3BsYXkgPSB0cnVlO1xyXG4gICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvbG9naW4nXSk7XHJcbiAgfVxyXG5cclxuICBsb2dvdXQoKSB7XHJcbiAgICB0aGlzLmdvb2dsZUF1dGgubG9nb3V0KCk7XHJcbiAgICB0aGlzLmRpc3BsYXkgPSBmYWxzZTtcclxuICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnL2xvZ2luJ10pO1xyXG4gIH1cclxuXHJcbiAgZ29Ub0hvbWUoKXtcclxuICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnL2hvbWUnXSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==