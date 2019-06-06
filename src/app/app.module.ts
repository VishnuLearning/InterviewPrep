import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptHttpModule } from "nativescript-angular";
import { TNSTextToSpeech } from "nativescript-texttospeech";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { SpeechRecognition }from 'nativescript-speech-recognition';
import { NativeScriptUISideDrawerModule } from "nativescript-ui-sidedrawer/angular";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
// import { LoginComponent } from "./components/login/login.component";
import { LessonComponent } from './components/lesson/lesson.component';
import { QuestionsComponent } from './components/questions/questions.component';
import { HomeComponent } from './components/home/home.component';
// import { PathService } from "./services/path/path.service";
// import { UserService } from "./services/user/user.service"

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        AppRoutingModule,
        NativeScriptHttpModule,
        NativeScriptUISideDrawerModule,
        NativeScriptFormsModule,  
    ],
    declarations: [
        AppComponent,
        LessonComponent,
        QuestionsComponent,
        HomeComponent,
        //LoginComponent
    ],
    providers: [
        TNSTextToSpeech,
        SpeechRecognition,
        // PathService,
        // UserService
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
/*
Pass your application module to the bootstrapModule function located in main.ts to start your app
*/
export class AppModule { }
