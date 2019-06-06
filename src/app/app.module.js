"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var nativescript_module_1 = require("nativescript-angular/nativescript.module");
var nativescript_angular_1 = require("nativescript-angular");
var nativescript_texttospeech_1 = require("nativescript-texttospeech");
var forms_1 = require("nativescript-angular/forms");
var nativescript_speech_recognition_1 = require("nativescript-speech-recognition");
var angular_1 = require("nativescript-ui-sidedrawer/angular");
var app_routing_module_1 = require("./app-routing.module");
var app_component_1 = require("./app.component");
// import { LoginComponent } from "./components/login/login.component";
var lesson_component_1 = require("./components/lesson/lesson.component");
var questions_component_1 = require("./components/questions/questions.component");
var home_component_1 = require("./components/home/home.component");
// import { PathService } from "./services/path/path.service";
// import { UserService } from "./services/user/user.service"
var AppModule = /** @class */ (function () {
    /*
    Pass your application module to the bootstrapModule function located in main.ts to start your app
    */
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            bootstrap: [
                app_component_1.AppComponent
            ],
            imports: [
                nativescript_module_1.NativeScriptModule,
                app_routing_module_1.AppRoutingModule,
                nativescript_angular_1.NativeScriptHttpModule,
                angular_1.NativeScriptUISideDrawerModule,
                forms_1.NativeScriptFormsModule,
            ],
            declarations: [
                app_component_1.AppComponent,
                lesson_component_1.LessonComponent,
                questions_component_1.QuestionsComponent,
                home_component_1.HomeComponent,
            ],
            providers: [
                nativescript_texttospeech_1.TNSTextToSpeech,
                nativescript_speech_recognition_1.SpeechRecognition,
            ],
            schemas: [
                core_1.NO_ERRORS_SCHEMA
            ]
        })
        /*
        Pass your application module to the bootstrapModule function located in main.ts to start your app
        */
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMkQ7QUFDM0QsZ0ZBQThFO0FBQzlFLDZEQUE4RDtBQUM5RCx1RUFBNEQ7QUFDNUQsb0RBQXFFO0FBQ3JFLG1GQUFtRTtBQUNuRSw4REFBb0Y7QUFFcEYsMkRBQXdEO0FBQ3hELGlEQUErQztBQUMvQyx1RUFBdUU7QUFDdkUseUVBQXVFO0FBQ3ZFLGtGQUFnRjtBQUNoRixtRUFBaUU7QUFDakUsOERBQThEO0FBQzlELDZEQUE2RDtBQWlDN0Q7SUFIQTs7TUFFRTtJQUNGO0lBQXlCLENBQUM7SUFBYixTQUFTO1FBL0JyQixlQUFRLENBQUM7WUFDTixTQUFTLEVBQUU7Z0JBQ1AsNEJBQVk7YUFDZjtZQUNELE9BQU8sRUFBRTtnQkFDTCx3Q0FBa0I7Z0JBQ2xCLHFDQUFnQjtnQkFDaEIsNkNBQXNCO2dCQUN0Qix3Q0FBOEI7Z0JBQzlCLCtCQUF1QjthQUMxQjtZQUNELFlBQVksRUFBRTtnQkFDViw0QkFBWTtnQkFDWixrQ0FBZTtnQkFDZix3Q0FBa0I7Z0JBQ2xCLDhCQUFhO2FBRWhCO1lBQ0QsU0FBUyxFQUFFO2dCQUNQLDJDQUFlO2dCQUNmLG1EQUFpQjthQUdwQjtZQUNELE9BQU8sRUFBRTtnQkFDTCx1QkFBZ0I7YUFDbkI7U0FDSixDQUFDO1FBQ0Y7O1VBRUU7T0FDVyxTQUFTLENBQUk7SUFBRCxnQkFBQztDQUFBLEFBQTFCLElBQTBCO0FBQWIsOEJBQVMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgTk9fRVJST1JTX1NDSEVNQSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdE1vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9uYXRpdmVzY3JpcHQubW9kdWxlXCI7XHJcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdEh0dHBNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXJcIjtcclxuaW1wb3J0IHsgVE5TVGV4dFRvU3BlZWNoIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC10ZXh0dG9zcGVlY2hcIjtcclxuaW1wb3J0IHsgTmF0aXZlU2NyaXB0Rm9ybXNNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvZm9ybXNcIjtcclxuaW1wb3J0IHsgU3BlZWNoUmVjb2duaXRpb24gfWZyb20gJ25hdGl2ZXNjcmlwdC1zcGVlY2gtcmVjb2duaXRpb24nO1xyXG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRVSVNpZGVEcmF3ZXJNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LXVpLXNpZGVkcmF3ZXIvYW5ndWxhclwiO1xyXG5cclxuaW1wb3J0IHsgQXBwUm91dGluZ01vZHVsZSB9IGZyb20gXCIuL2FwcC1yb3V0aW5nLm1vZHVsZVwiO1xyXG5pbXBvcnQgeyBBcHBDb21wb25lbnQgfSBmcm9tIFwiLi9hcHAuY29tcG9uZW50XCI7XHJcbi8vIGltcG9ydCB7IExvZ2luQ29tcG9uZW50IH0gZnJvbSBcIi4vY29tcG9uZW50cy9sb2dpbi9sb2dpbi5jb21wb25lbnRcIjtcclxuaW1wb3J0IHsgTGVzc29uQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2xlc3Nvbi9sZXNzb24uY29tcG9uZW50JztcclxuaW1wb3J0IHsgUXVlc3Rpb25zQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL3F1ZXN0aW9ucy9xdWVzdGlvbnMuY29tcG9uZW50JztcclxuaW1wb3J0IHsgSG9tZUNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9ob21lL2hvbWUuY29tcG9uZW50JztcclxuLy8gaW1wb3J0IHsgUGF0aFNlcnZpY2UgfSBmcm9tIFwiLi9zZXJ2aWNlcy9wYXRoL3BhdGguc2VydmljZVwiO1xyXG4vLyBpbXBvcnQgeyBVc2VyU2VydmljZSB9IGZyb20gXCIuL3NlcnZpY2VzL3VzZXIvdXNlci5zZXJ2aWNlXCJcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgICBib290c3RyYXA6IFtcclxuICAgICAgICBBcHBDb21wb25lbnRcclxuICAgIF0sXHJcbiAgICBpbXBvcnRzOiBbXHJcbiAgICAgICAgTmF0aXZlU2NyaXB0TW9kdWxlLFxyXG4gICAgICAgIEFwcFJvdXRpbmdNb2R1bGUsXHJcbiAgICAgICAgTmF0aXZlU2NyaXB0SHR0cE1vZHVsZSxcclxuICAgICAgICBOYXRpdmVTY3JpcHRVSVNpZGVEcmF3ZXJNb2R1bGUsXHJcbiAgICAgICAgTmF0aXZlU2NyaXB0Rm9ybXNNb2R1bGUsICBcclxuICAgIF0sXHJcbiAgICBkZWNsYXJhdGlvbnM6IFtcclxuICAgICAgICBBcHBDb21wb25lbnQsXHJcbiAgICAgICAgTGVzc29uQ29tcG9uZW50LFxyXG4gICAgICAgIFF1ZXN0aW9uc0NvbXBvbmVudCxcclxuICAgICAgICBIb21lQ29tcG9uZW50LFxyXG4gICAgICAgIC8vTG9naW5Db21wb25lbnRcclxuICAgIF0sXHJcbiAgICBwcm92aWRlcnM6IFtcclxuICAgICAgICBUTlNUZXh0VG9TcGVlY2gsXHJcbiAgICAgICAgU3BlZWNoUmVjb2duaXRpb24sXHJcbiAgICAgICAgLy8gUGF0aFNlcnZpY2UsXHJcbiAgICAgICAgLy8gVXNlclNlcnZpY2VcclxuICAgIF0sXHJcbiAgICBzY2hlbWFzOiBbXHJcbiAgICAgICAgTk9fRVJST1JTX1NDSEVNQVxyXG4gICAgXVxyXG59KVxyXG4vKlxyXG5QYXNzIHlvdXIgYXBwbGljYXRpb24gbW9kdWxlIHRvIHRoZSBib290c3RyYXBNb2R1bGUgZnVuY3Rpb24gbG9jYXRlZCBpbiBtYWluLnRzIHRvIHN0YXJ0IHlvdXIgYXBwXHJcbiovXHJcbmV4cG9ydCBjbGFzcyBBcHBNb2R1bGUgeyB9XHJcbiJdfQ==