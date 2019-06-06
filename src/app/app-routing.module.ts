import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";

// import { LoginComponent } from "./components/login/login.component";
import { HomeComponent } from "./components/home/home.component";
import { LessonComponent } from "./components/lesson/lesson.component";
import { QuestionsComponent } from "./components/questions/questions.component";

const routes: Routes = [
    { path: "", redirectTo: "/home", pathMatch: "full" },
    //{ path: "login", component: LoginComponent},
    { path: "home", component: HomeComponent },
    { path: "lesson/:path", component: LessonComponent },
    { path: "questions/:path", component: QuestionsComponent },
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { } 