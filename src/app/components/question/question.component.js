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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlc3Rpb24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicXVlc3Rpb24uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQXlEO0FBQ3pELG1EQUFrRDtBQVFsRDtJQUdDO0lBQ0EsQ0FBQztJQUVELG9DQUFRLEdBQVI7UUFDQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDbEMsQ0FBQztJQVBRO1FBQVIsWUFBSyxFQUFFO2tDQUFXLG1CQUFRO3VEQUFDO0lBRGhCLGlCQUFpQjtRQU43QixnQkFBUyxDQUFDO1lBQ1YsUUFBUSxFQUFFLFVBQVU7WUFDcEIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFdBQVcsRUFBRSwyQkFBMkI7WUFDeEMsU0FBUyxFQUFFLENBQUMsMEJBQTBCLENBQUM7U0FDdkMsQ0FBQzs7T0FDVyxpQkFBaUIsQ0FTN0I7SUFBRCx3QkFBQztDQUFBLEFBVEQsSUFTQztBQVRZLDhDQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBRdWVzdGlvbiB9IGZyb20gXCIuLi8uLi9jbGFzc2VzL3F1ZXN0aW9uXCI7XG5cbkBDb21wb25lbnQoe1xuXHRzZWxlY3RvcjogXCJRdWVzdGlvblwiLFxuXHRtb2R1bGVJZDogbW9kdWxlLmlkLFxuXHR0ZW1wbGF0ZVVybDogXCIuL3F1ZXN0aW9uLmNvbXBvbmVudC5odG1sXCIsXG5cdHN0eWxlVXJsczogWycuL3F1ZXN0aW9uLmNvbXBvbmVudC5jc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBRdWVzdGlvbkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cdEBJbnB1dCgpIHF1ZXN0aW9uOiBRdWVzdGlvbjtcblxuXHRjb25zdHJ1Y3RvcigpIHtcblx0fVxuXG5cdG5nT25Jbml0KCk6IHZvaWQge1xuXHRcdGNvbnNvbGUubG9nKFwiUVwiICsgdGhpcy5xdWVzdGlvbik7XG5cdH1cbn0iXX0=