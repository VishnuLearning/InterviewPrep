"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var nativescript_module_1 = require("nativescript-angular/nativescript.module");
var nativescript_angular_1 = require("nativescript-angular");
var nativescript_texttospeech_1 = require("nativescript-texttospeech");
var forms_1 = require("nativescript-angular/forms");
var nativescript_speech_recognition_1 = require("nativescript-speech-recognition");
var app_routing_module_1 = require("./app-routing.module");
var app_component_1 = require("./app.component");
var lesson_component_1 = require("./components/lesson/lesson.component");
var questions_component_1 = require("./components/questions/questions.component");
var home_component_1 = require("./components/home/home.component");
var question_component_1 = require("./components/question/question.component");
var angular_1 = require("nativescript-ui-sidedrawer/angular");
// import { StsComponent } from "./components/sts/sts";
// Uncomment and add to NgModule imports if you need to use two-way binding
// import { NativeScriptFormsModule } from "nativescript-angular/forms";
// Uncomment and add to NgModule imports if you need to use the HttpClient wrapper
// import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";
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
                question_component_1.QuestionComponent
            ],
            providers: [nativescript_texttospeech_1.TNSTextToSpeech, nativescript_speech_recognition_1.SpeechRecognition],
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMkQ7QUFDM0QsZ0ZBQThFO0FBQzlFLDZEQUE4RDtBQUM5RCx1RUFBNEQ7QUFDNUQsb0RBQXFFO0FBQ3JFLG1GQUFtRTtBQUVuRSwyREFBd0Q7QUFDeEQsaURBQStDO0FBQy9DLHlFQUF1RTtBQUN2RSxrRkFBZ0Y7QUFDaEYsbUVBQWlFO0FBQ2pFLCtFQUE2RTtBQUU3RSw4REFBb0Y7QUFDcEYsdURBQXVEO0FBRXZELDJFQUEyRTtBQUMzRSx3RUFBd0U7QUFFeEUsa0ZBQWtGO0FBQ2xGLG1GQUFtRjtBQTRCbkY7SUFIQTs7TUFFRTtJQUNGO0lBQXlCLENBQUM7SUFBYixTQUFTO1FBMUJyQixlQUFRLENBQUM7WUFDTixTQUFTLEVBQUU7Z0JBQ1AsNEJBQVk7YUFDZjtZQUNELE9BQU8sRUFBRTtnQkFDTCx3Q0FBa0I7Z0JBQ2xCLHFDQUFnQjtnQkFDaEIsNkNBQXNCO2dCQUN0Qix3Q0FBOEI7Z0JBQzlCLCtCQUF1QjthQUMxQjtZQUNELFlBQVksRUFBRTtnQkFDViw0QkFBWTtnQkFDWixrQ0FBZTtnQkFDZix3Q0FBa0I7Z0JBQ2xCLDhCQUFhO2dCQUNiLHNDQUFpQjthQUNwQjtZQUNELFNBQVMsRUFBRSxDQUFDLDJDQUFlLEVBQUMsbURBQWlCLENBQUM7WUFDOUMsT0FBTyxFQUFFO2dCQUNMLHVCQUFnQjthQUNuQjtTQUNKLENBQUM7UUFDRjs7VUFFRTtPQUNXLFNBQVMsQ0FBSTtJQUFELGdCQUFDO0NBQUEsQUFBMUIsSUFBMEI7QUFBYiw4QkFBUyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBOT19FUlJPUlNfU0NIRU1BIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgTmF0aXZlU2NyaXB0TW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL25hdGl2ZXNjcmlwdC5tb2R1bGVcIjtcclxuaW1wb3J0IHsgTmF0aXZlU2NyaXB0SHR0cE1vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhclwiO1xyXG5pbXBvcnQgeyBUTlNUZXh0VG9TcGVlY2ggfSBmcm9tIFwibmF0aXZlc2NyaXB0LXRleHR0b3NwZWVjaFwiO1xyXG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRGb3Jtc01vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9mb3Jtc1wiO1xyXG5pbXBvcnQgeyBTcGVlY2hSZWNvZ25pdGlvbiB9ZnJvbSAnbmF0aXZlc2NyaXB0LXNwZWVjaC1yZWNvZ25pdGlvbic7XHJcblxyXG5pbXBvcnQgeyBBcHBSb3V0aW5nTW9kdWxlIH0gZnJvbSBcIi4vYXBwLXJvdXRpbmcubW9kdWxlXCI7XHJcbmltcG9ydCB7IEFwcENvbXBvbmVudCB9IGZyb20gXCIuL2FwcC5jb21wb25lbnRcIjtcclxuaW1wb3J0IHsgTGVzc29uQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2xlc3Nvbi9sZXNzb24uY29tcG9uZW50JztcclxuaW1wb3J0IHsgUXVlc3Rpb25zQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL3F1ZXN0aW9ucy9xdWVzdGlvbnMuY29tcG9uZW50JztcclxuaW1wb3J0IHsgSG9tZUNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9ob21lL2hvbWUuY29tcG9uZW50JztcclxuaW1wb3J0IHsgUXVlc3Rpb25Db21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvcXVlc3Rpb24vcXVlc3Rpb24uY29tcG9uZW50JztcclxuXHJcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdFVJU2lkZURyYXdlck1vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtdWktc2lkZWRyYXdlci9hbmd1bGFyXCI7XHJcbi8vIGltcG9ydCB7IFN0c0NvbXBvbmVudCB9IGZyb20gXCIuL2NvbXBvbmVudHMvc3RzL3N0c1wiO1xyXG5cclxuLy8gVW5jb21tZW50IGFuZCBhZGQgdG8gTmdNb2R1bGUgaW1wb3J0cyBpZiB5b3UgbmVlZCB0byB1c2UgdHdvLXdheSBiaW5kaW5nXHJcbi8vIGltcG9ydCB7IE5hdGl2ZVNjcmlwdEZvcm1zTW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL2Zvcm1zXCI7XHJcblxyXG4vLyBVbmNvbW1lbnQgYW5kIGFkZCB0byBOZ01vZHVsZSBpbXBvcnRzIGlmIHlvdSBuZWVkIHRvIHVzZSB0aGUgSHR0cENsaWVudCB3cmFwcGVyXHJcbi8vIGltcG9ydCB7IE5hdGl2ZVNjcmlwdEh0dHBDbGllbnRNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvaHR0cC1jbGllbnRcIjtcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgICBib290c3RyYXA6IFtcclxuICAgICAgICBBcHBDb21wb25lbnRcclxuICAgIF0sXHJcbiAgICBpbXBvcnRzOiBbXHJcbiAgICAgICAgTmF0aXZlU2NyaXB0TW9kdWxlLFxyXG4gICAgICAgIEFwcFJvdXRpbmdNb2R1bGUsXHJcbiAgICAgICAgTmF0aXZlU2NyaXB0SHR0cE1vZHVsZSxcclxuICAgICAgICBOYXRpdmVTY3JpcHRVSVNpZGVEcmF3ZXJNb2R1bGUsXHJcbiAgICAgICAgTmF0aXZlU2NyaXB0Rm9ybXNNb2R1bGUsICAgXHJcbiAgICBdLFxyXG4gICAgZGVjbGFyYXRpb25zOiBbXHJcbiAgICAgICAgQXBwQ29tcG9uZW50LFxyXG4gICAgICAgIExlc3NvbkNvbXBvbmVudCxcclxuICAgICAgICBRdWVzdGlvbnNDb21wb25lbnQsXHJcbiAgICAgICAgSG9tZUNvbXBvbmVudCxcclxuICAgICAgICBRdWVzdGlvbkNvbXBvbmVudFxyXG4gICAgXSxcclxuICAgIHByb3ZpZGVyczogW1ROU1RleHRUb1NwZWVjaCxTcGVlY2hSZWNvZ25pdGlvbl0sXHJcbiAgICBzY2hlbWFzOiBbXHJcbiAgICAgICAgTk9fRVJST1JTX1NDSEVNQVxyXG4gICAgXVxyXG59KVxyXG4vKlxyXG5QYXNzIHlvdXIgYXBwbGljYXRpb24gbW9kdWxlIHRvIHRoZSBib290c3RyYXBNb2R1bGUgZnVuY3Rpb24gbG9jYXRlZCBpbiBtYWluLnRzIHRvIHN0YXJ0IHlvdXIgYXBwXHJcbiovXHJcbmV4cG9ydCBjbGFzcyBBcHBNb2R1bGUgeyB9XHJcbiJdfQ==