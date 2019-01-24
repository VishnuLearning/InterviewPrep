"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var question_1 = require("../../classes/question");
var QuestionComponent = /** @class */ (function () {
    function QuestionComponent() {
    }
    QuestionComponent.prototype.ngOnInit = function () {
        console.log("Q" + this.question);
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", question_1.Question)
    ], QuestionComponent.prototype, "question", void 0);
    QuestionComponent = __decorate([
        core_1.Component({
            selector: "Question",
            moduleId: module.id,
            templateUrl: "./question.component.html",
            styleUrls: ['./question.component.css']
        }),
        __metadata("design:paramtypes", [])
    ], QuestionComponent);
    return QuestionComponent;
}());
exports.QuestionComponent = QuestionComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlc3Rpb24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicXVlc3Rpb24uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQXlEO0FBQ3pELG1EQUFrRDtBQVFsRDtJQUdDO0lBQ0EsQ0FBQztJQUVELG9DQUFRLEdBQVI7UUFDQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDbEMsQ0FBQztJQVBRO1FBQVIsWUFBSyxFQUFFO2tDQUFXLG1CQUFRO3VEQUFDO0lBRGhCLGlCQUFpQjtRQU43QixnQkFBUyxDQUFDO1lBQ1YsUUFBUSxFQUFFLFVBQVU7WUFDcEIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFdBQVcsRUFBRSwyQkFBMkI7WUFDeEMsU0FBUyxFQUFFLENBQUMsMEJBQTBCLENBQUM7U0FDdkMsQ0FBQzs7T0FDVyxpQkFBaUIsQ0FTN0I7SUFBRCx3QkFBQztDQUFBLEFBVEQsSUFTQztBQVRZLDhDQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IFF1ZXN0aW9uIH0gZnJvbSBcIi4uLy4uL2NsYXNzZXMvcXVlc3Rpb25cIjtcclxuXHJcbkBDb21wb25lbnQoe1xyXG5cdHNlbGVjdG9yOiBcIlF1ZXN0aW9uXCIsXHJcblx0bW9kdWxlSWQ6IG1vZHVsZS5pZCxcclxuXHR0ZW1wbGF0ZVVybDogXCIuL3F1ZXN0aW9uLmNvbXBvbmVudC5odG1sXCIsXHJcblx0c3R5bGVVcmxzOiBbJy4vcXVlc3Rpb24uY29tcG9uZW50LmNzcyddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBRdWVzdGlvbkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcblx0QElucHV0KCkgcXVlc3Rpb246IFF1ZXN0aW9uO1xyXG5cclxuXHRjb25zdHJ1Y3RvcigpIHtcclxuXHR9XHJcblxyXG5cdG5nT25Jbml0KCk6IHZvaWQge1xyXG5cdFx0Y29uc29sZS5sb2coXCJRXCIgKyB0aGlzLnF1ZXN0aW9uKTtcclxuXHR9XHJcbn0iXX0=