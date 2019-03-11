import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptHttpModule } from "nativescript-angular";
import { TNSTextToSpeech } from "nativescript-texttospeech";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { SpeechRecognition }from 'nativescript-speech-recognition';

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LessonComponent } from './components/lesson/lesson.component';
import { QuestionsComponent } from './components/questions/questions.component';
import { HomeComponent } from './components/home/home.component';
// import { QuestionComponent } from './components/question/question.component';

import { NativeScriptUISideDrawerModule } from "nativescript-ui-sidedrawer/angular";

// Uncomment and add to NgModule imports if you need to use two-way binding
// import { NativeScriptFormsModule } from "nativescript-angular/forms";

// Uncomment and add to NgModule imports if you need to use the HttpClient wrapper
// import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";

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
        // QuestionComponent
    ],
    providers: [TNSTextToSpeech,SpeechRecognition],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
/*
Pass your application module to the bootstrapModule function located in main.ts to start your app
*/
export class AppModule { }
