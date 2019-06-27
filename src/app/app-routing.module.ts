import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import { LessonComponent } from "./components/lesson/lesson.component";
import { QuestionsComponent } from "./components/questions/questions.component";
import { InstructionsComponent } from "./components/instructions/instructions.component";
import { LoginComponent } from './auth/login/login.component';

const routes: Routes = [
    { path: "", redirectTo: "/login", pathMatch: "full" },
    { path:'login',component : LoginComponent },
    { path: "home", component: HomeComponent },
    { path: "instructions", component: InstructionsComponent },
    { path: "lesson/:path", component: LessonComponent },
    { path: "questions/:path", component: QuestionsComponent },
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { } 