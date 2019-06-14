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
var auth_module_1 = require("./auth/auth.module");
var lesson_component_1 = require("./components/lesson/lesson.component");
var questions_component_1 = require("./components/questions/questions.component");
var home_component_1 = require("./components/home/home.component");
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
                auth_module_1.AuthModule,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMkQ7QUFDM0QsZ0ZBQThFO0FBQzlFLDZEQUE4RDtBQUM5RCx1RUFBNEQ7QUFDNUQsb0RBQXFFO0FBQ3JFLG1GQUFtRTtBQUNuRSw4REFBb0Y7QUFDcEYsMkRBQXdEO0FBQ3hELGlEQUErQztBQUMvQyxrREFBZ0Q7QUFDaEQseUVBQXVFO0FBQ3ZFLGtGQUFnRjtBQUNoRixtRUFBaUU7QUFnQ2pFO0lBSEE7O01BRUU7SUFDRjtJQUF5QixDQUFDO0lBQWIsU0FBUztRQTdCckIsZUFBUSxDQUFDO1lBQ04sU0FBUyxFQUFFO2dCQUNQLDRCQUFZO2FBQ2Y7WUFDRCxPQUFPLEVBQUU7Z0JBQ0wsd0JBQVU7Z0JBQ1Ysd0NBQWtCO2dCQUNsQixxQ0FBZ0I7Z0JBQ2hCLDZDQUFzQjtnQkFDdEIsd0NBQThCO2dCQUM5QiwrQkFBdUI7YUFDMUI7WUFDRCxZQUFZLEVBQUU7Z0JBQ1YsNEJBQVk7Z0JBQ1osa0NBQWU7Z0JBQ2Ysd0NBQWtCO2dCQUNsQiw4QkFBYTthQUNoQjtZQUNELFNBQVMsRUFBRTtnQkFDUCwyQ0FBZTtnQkFDZixtREFBaUI7YUFDcEI7WUFDRCxPQUFPLEVBQUU7Z0JBQ0wsdUJBQWdCO2FBQ25CO1NBQ0osQ0FBQztRQUNGOztVQUVFO09BQ1csU0FBUyxDQUFJO0lBQUQsZ0JBQUM7Q0FBQSxBQUExQixJQUEwQjtBQUFiLDhCQUFTIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIE5PX0VSUk9SU19TQ0hFTUEgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvbmF0aXZlc2NyaXB0Lm1vZHVsZVwiO1xyXG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRIdHRwTW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyXCI7XHJcbmltcG9ydCB7IFROU1RleHRUb1NwZWVjaCB9IGZyb20gXCJuYXRpdmVzY3JpcHQtdGV4dHRvc3BlZWNoXCI7XHJcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdEZvcm1zTW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL2Zvcm1zXCI7XHJcbmltcG9ydCB7IFNwZWVjaFJlY29nbml0aW9uIH1mcm9tICduYXRpdmVzY3JpcHQtc3BlZWNoLXJlY29nbml0aW9uJztcclxuaW1wb3J0IHsgTmF0aXZlU2NyaXB0VUlTaWRlRHJhd2VyTW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC11aS1zaWRlZHJhd2VyL2FuZ3VsYXJcIjtcclxuaW1wb3J0IHsgQXBwUm91dGluZ01vZHVsZSB9IGZyb20gXCIuL2FwcC1yb3V0aW5nLm1vZHVsZVwiO1xyXG5pbXBvcnQgeyBBcHBDb21wb25lbnQgfSBmcm9tIFwiLi9hcHAuY29tcG9uZW50XCI7XHJcbmltcG9ydCB7IEF1dGhNb2R1bGUgfSBmcm9tIFwiLi9hdXRoL2F1dGgubW9kdWxlXCI7XHJcbmltcG9ydCB7IExlc3NvbkNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9sZXNzb24vbGVzc29uLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IFF1ZXN0aW9uc0NvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9xdWVzdGlvbnMvcXVlc3Rpb25zLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IEhvbWVDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvaG9tZS9ob21lLmNvbXBvbmVudCc7XHJcblxyXG5cclxuQE5nTW9kdWxlKHtcclxuICAgIGJvb3RzdHJhcDogW1xyXG4gICAgICAgIEFwcENvbXBvbmVudFxyXG4gICAgXSxcclxuICAgIGltcG9ydHM6IFtcclxuICAgICAgICBBdXRoTW9kdWxlLFxyXG4gICAgICAgIE5hdGl2ZVNjcmlwdE1vZHVsZSxcclxuICAgICAgICBBcHBSb3V0aW5nTW9kdWxlLFxyXG4gICAgICAgIE5hdGl2ZVNjcmlwdEh0dHBNb2R1bGUsXHJcbiAgICAgICAgTmF0aXZlU2NyaXB0VUlTaWRlRHJhd2VyTW9kdWxlLFxyXG4gICAgICAgIE5hdGl2ZVNjcmlwdEZvcm1zTW9kdWxlLCAgXHJcbiAgICBdLFxyXG4gICAgZGVjbGFyYXRpb25zOiBbXHJcbiAgICAgICAgQXBwQ29tcG9uZW50LFxyXG4gICAgICAgIExlc3NvbkNvbXBvbmVudCxcclxuICAgICAgICBRdWVzdGlvbnNDb21wb25lbnQsXHJcbiAgICAgICAgSG9tZUNvbXBvbmVudCxcclxuICAgIF0sXHJcbiAgICBwcm92aWRlcnM6IFtcclxuICAgICAgICBUTlNUZXh0VG9TcGVlY2gsXHJcbiAgICAgICAgU3BlZWNoUmVjb2duaXRpb24sXHJcbiAgICBdLFxyXG4gICAgc2NoZW1hczogW1xyXG4gICAgICAgIE5PX0VSUk9SU19TQ0hFTUFcclxuICAgIF1cclxufSlcclxuLypcclxuUGFzcyB5b3VyIGFwcGxpY2F0aW9uIG1vZHVsZSB0byB0aGUgYm9vdHN0cmFwTW9kdWxlIGZ1bmN0aW9uIGxvY2F0ZWQgaW4gbWFpbi50cyB0byBzdGFydCB5b3VyIGFwcFxyXG4qL1xyXG5leHBvcnQgY2xhc3MgQXBwTW9kdWxlIHsgfVxyXG4iXX0=