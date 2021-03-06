"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("nativescript-angular/router");
var home_component_1 = require("./components/home/home.component");
var lesson_component_1 = require("./components/lesson/lesson.component");
var questions_component_1 = require("./components/questions/questions.component");
var instructions_component_1 = require("./components/instructions/instructions.component");
var login_component_1 = require("./auth/login/login.component");
var routes = [
    { path: "", redirectTo: "/login", pathMatch: "full" },
    { path: 'login', component: login_component_1.LoginComponent },
    { path: "home", component: home_component_1.HomeComponent },
    { path: "instructions", component: instructions_component_1.InstructionsComponent },
    { path: "lesson/:path", component: lesson_component_1.LessonComponent },
    { path: "questions/:path", component: questions_component_1.QuestionsComponent },
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.NativeScriptRouterModule.forRoot(routes)],
            exports: [router_1.NativeScriptRouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLXJvdXRpbmcubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXBwLXJvdXRpbmcubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQXlDO0FBQ3pDLHNEQUF1RTtBQUV2RSxtRUFBaUU7QUFDakUseUVBQXVFO0FBQ3ZFLGtGQUFnRjtBQUNoRiwyRkFBeUY7QUFDekYsZ0VBQThEO0FBRTlELElBQU0sTUFBTSxHQUFXO0lBQ25CLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUU7SUFDckQsRUFBRSxJQUFJLEVBQUMsT0FBTyxFQUFDLFNBQVMsRUFBRyxnQ0FBYyxFQUFFO0lBQzNDLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsOEJBQWEsRUFBRTtJQUMxQyxFQUFFLElBQUksRUFBRSxjQUFjLEVBQUUsU0FBUyxFQUFFLDhDQUFxQixFQUFFO0lBQzFELEVBQUUsSUFBSSxFQUFFLGNBQWMsRUFBRSxTQUFTLEVBQUUsa0NBQWUsRUFBRTtJQUNwRCxFQUFFLElBQUksRUFBRSxpQkFBaUIsRUFBRSxTQUFTLEVBQUUsd0NBQWtCLEVBQUU7Q0FDN0QsQ0FBQztBQU1GO0lBQUE7SUFBZ0MsQ0FBQztJQUFwQixnQkFBZ0I7UUFKNUIsZUFBUSxDQUFDO1lBQ04sT0FBTyxFQUFFLENBQUMsaUNBQXdCLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ25ELE9BQU8sRUFBRSxDQUFDLGlDQUF3QixDQUFDO1NBQ3RDLENBQUM7T0FDVyxnQkFBZ0IsQ0FBSTtJQUFELHVCQUFDO0NBQUEsQUFBakMsSUFBaUM7QUFBcEIsNENBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRSb3V0ZXJNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyXCI7XHJcbmltcG9ydCB7IFJvdXRlcyB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcclxuaW1wb3J0IHsgSG9tZUNvbXBvbmVudCB9IGZyb20gXCIuL2NvbXBvbmVudHMvaG9tZS9ob21lLmNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBMZXNzb25Db21wb25lbnQgfSBmcm9tIFwiLi9jb21wb25lbnRzL2xlc3Nvbi9sZXNzb24uY29tcG9uZW50XCI7XHJcbmltcG9ydCB7IFF1ZXN0aW9uc0NvbXBvbmVudCB9IGZyb20gXCIuL2NvbXBvbmVudHMvcXVlc3Rpb25zL3F1ZXN0aW9ucy5jb21wb25lbnRcIjtcclxuaW1wb3J0IHsgSW5zdHJ1Y3Rpb25zQ29tcG9uZW50IH0gZnJvbSBcIi4vY29tcG9uZW50cy9pbnN0cnVjdGlvbnMvaW5zdHJ1Y3Rpb25zLmNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBMb2dpbkNvbXBvbmVudCB9IGZyb20gJy4vYXV0aC9sb2dpbi9sb2dpbi5jb21wb25lbnQnO1xyXG5cclxuY29uc3Qgcm91dGVzOiBSb3V0ZXMgPSBbXHJcbiAgICB7IHBhdGg6IFwiXCIsIHJlZGlyZWN0VG86IFwiL2xvZ2luXCIsIHBhdGhNYXRjaDogXCJmdWxsXCIgfSxcclxuICAgIHsgcGF0aDonbG9naW4nLGNvbXBvbmVudCA6IExvZ2luQ29tcG9uZW50IH0sXHJcbiAgICB7IHBhdGg6IFwiaG9tZVwiLCBjb21wb25lbnQ6IEhvbWVDb21wb25lbnQgfSxcclxuICAgIHsgcGF0aDogXCJpbnN0cnVjdGlvbnNcIiwgY29tcG9uZW50OiBJbnN0cnVjdGlvbnNDb21wb25lbnQgfSxcclxuICAgIHsgcGF0aDogXCJsZXNzb24vOnBhdGhcIiwgY29tcG9uZW50OiBMZXNzb25Db21wb25lbnQgfSxcclxuICAgIHsgcGF0aDogXCJxdWVzdGlvbnMvOnBhdGhcIiwgY29tcG9uZW50OiBRdWVzdGlvbnNDb21wb25lbnQgfSxcclxuXTtcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgICBpbXBvcnRzOiBbTmF0aXZlU2NyaXB0Um91dGVyTW9kdWxlLmZvclJvb3Qocm91dGVzKV0sXHJcbiAgICBleHBvcnRzOiBbTmF0aXZlU2NyaXB0Um91dGVyTW9kdWxlXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgQXBwUm91dGluZ01vZHVsZSB7IH0gIl19