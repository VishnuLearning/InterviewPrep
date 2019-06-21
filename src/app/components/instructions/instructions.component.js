"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var core_2 = require("@angular/core");
var listpoints = /** @class */ (function () {
    function listpoints(instruction) {
        this.instruction = instruction;
    }
    return listpoints;
}());
var InstructionsComponent = /** @class */ (function () {
    function InstructionsComponent(router) {
        this.router = router;
        this.points = ['Go to your device settings and make sure English is selected as your input language for Text-to-Speech and voice input.',
            'Choose the Type of Interview, select subject/lesson ', 'Tap the speaker icon, listen to the question carefully and try to understand it.',
            'Click Show Answer and speaker button, listen to the answer, think about it.', 'Click the microphone button, allow access to the mic if asked.',
            'Read the answer clearly, loudly and continuously without any pause.', 'Click the Score button to see your score. If it is below 50%, repeat steps 4-5',
            'Tap Right arrow to go to the next question, REPEAT steps 3-7', 'When finished with a lesson, tap the return to go to the main page.', 'Choose another subject/lesson or tap return to exit the App.',
            '*HINT**', 'To become confident and fluent, try to read the answers imitating the way the App reads it, paying attention to the pronunciation and intonation.',
            'Try to memorize the questions and answers as much as possible. You may want to rewrite the answers in your own words and practice reading them clearly, loudly and continuously.'];
        this.data = [];
        for (var i = 0; i < this.points.length; i++) {
            this.data.push(new listpoints(this.points[i]));
            console.log(this.data);
        }
    }
    InstructionsComponent.prototype.backToHomePage = function () {
        this.router.navigate(['']);
    };
    InstructionsComponent.prototype.ngOnInit = function () {
    };
    InstructionsComponent = __decorate([
        core_1.Component({
            selector: 'ns-instructions',
            templateUrl: './instructions.component.html',
            styleUrls: ['./instructions.component.css'],
            moduleId: module.id,
            changeDetection: core_2.ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [router_1.Router])
    ], InstructionsComponent);
    return InstructionsComponent;
}());
exports.InstructionsComponent = InstructionsComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5zdHJ1Y3Rpb25zLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImluc3RydWN0aW9ucy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBa0Q7QUFDbEQsMENBQXlEO0FBQ3pELHNDQUF3RDtBQUV4RDtJQUNFLG9CQUFtQixXQUFtQjtRQUFuQixnQkFBVyxHQUFYLFdBQVcsQ0FBUTtJQUFJLENBQUM7SUFDN0MsaUJBQUM7QUFBRCxDQUFDLEFBRkQsSUFFQztBQVVEO0lBVUUsK0JBQW9CLE1BQWM7UUFBZCxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBUmxDLFdBQU0sR0FBRyxDQUFDLHlIQUF5SDtZQUNqSSxzREFBc0QsRUFBQyxrRkFBa0Y7WUFDekksNkVBQTZFLEVBQUMsZ0VBQWdFO1lBQzlJLHFFQUFxRSxFQUFDLGdGQUFnRjtZQUN0Siw4REFBOEQsRUFBQyxxRUFBcUUsRUFBQyw4REFBOEQ7WUFDck0sU0FBUyxFQUFDLG1KQUFtSjtZQUMvSixrTEFBa0wsQ0FBQyxDQUFBO1FBRy9LLElBQUksQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDO1FBRVgsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ3pDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksVUFBVSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQy9DLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQzFCO0lBRU4sQ0FBQztJQUVGLDhDQUFjLEdBQWQ7UUFDRSxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDN0IsQ0FBQztJQUVELHdDQUFRLEdBQVI7SUFDQSxDQUFDO0lBekJVLHFCQUFxQjtRQVJqQyxnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLGlCQUFpQjtZQUMzQixXQUFXLEVBQUUsK0JBQStCO1lBQzVDLFNBQVMsRUFBRSxDQUFDLDhCQUE4QixDQUFDO1lBQzNDLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixlQUFlLEVBQUUsOEJBQXVCLENBQUMsTUFBTTtTQUNoRCxDQUFDO3lDQVk0QixlQUFNO09BVnZCLHFCQUFxQixDQTJCakM7SUFBRCw0QkFBQztDQUFBLEFBM0JELElBMkJDO0FBM0JZLHNEQUFxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFJvdXRlciwgQWN0aXZhdGVkUm91dGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5pbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcblxyXG5jbGFzcyBsaXN0cG9pbnRzIHtcclxuICBjb25zdHJ1Y3RvcihwdWJsaWMgaW5zdHJ1Y3Rpb246IHN0cmluZykgeyB9XHJcbn1cclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnbnMtaW5zdHJ1Y3Rpb25zJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vaW5zdHJ1Y3Rpb25zLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9pbnN0cnVjdGlvbnMuY29tcG9uZW50LmNzcyddLFxyXG4gIG1vZHVsZUlkOiBtb2R1bGUuaWQsXHJcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBJbnN0cnVjdGlvbnNDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gIHB1YmxpYyBkYXRhIDogQXJyYXk8bGlzdHBvaW50cz47XHJcbiAgcG9pbnRzID0gWydHbyB0byB5b3VyIGRldmljZSBzZXR0aW5ncyBhbmQgbWFrZSBzdXJlIEVuZ2xpc2ggaXMgc2VsZWN0ZWQgYXMgeW91ciBpbnB1dCBsYW5ndWFnZSBmb3IgVGV4dC10by1TcGVlY2ggYW5kIHZvaWNlIGlucHV0LicsXHJcbiAgICAnQ2hvb3NlIHRoZSBUeXBlIG9mIEludGVydmlldywgc2VsZWN0IHN1YmplY3QvbGVzc29uICcsJ1RhcCB0aGUgc3BlYWtlciBpY29uLCBsaXN0ZW4gdG8gdGhlIHF1ZXN0aW9uIGNhcmVmdWxseSBhbmQgdHJ5IHRvIHVuZGVyc3RhbmQgaXQuJyxcclxuICAgICdDbGljayBTaG93IEFuc3dlciBhbmQgc3BlYWtlciBidXR0b24sIGxpc3RlbiB0byB0aGUgYW5zd2VyLCB0aGluayBhYm91dCBpdC4nLCdDbGljayB0aGUgbWljcm9waG9uZSBidXR0b24sIGFsbG93IGFjY2VzcyB0byB0aGUgbWljIGlmIGFza2VkLicsXHJcbiAgICAnUmVhZCB0aGUgYW5zd2VyIGNsZWFybHksIGxvdWRseSBhbmQgY29udGludW91c2x5IHdpdGhvdXQgYW55IHBhdXNlLicsJ0NsaWNrIHRoZSBTY29yZSBidXR0b24gdG8gc2VlIHlvdXIgc2NvcmUuIElmIGl0IGlzIGJlbG93IDUwJSwgcmVwZWF0IHN0ZXBzIDQtNScsXHJcbiAgICAnVGFwIFJpZ2h0IGFycm93IHRvIGdvIHRvIHRoZSBuZXh0IHF1ZXN0aW9uLCBSRVBFQVQgc3RlcHMgMy03JywnV2hlbiBmaW5pc2hlZCB3aXRoIGEgbGVzc29uLCB0YXAgdGhlIHJldHVybiB0byBnbyB0byB0aGUgbWFpbiBwYWdlLicsJ0Nob29zZSBhbm90aGVyIHN1YmplY3QvbGVzc29uIG9yIHRhcCByZXR1cm4gdG8gZXhpdCB0aGUgQXBwLicsXHJcbiAgJypISU5UKionLCdUbyBiZWNvbWUgY29uZmlkZW50IGFuZCBmbHVlbnQsIHRyeSB0byByZWFkIHRoZSBhbnN3ZXJzIGltaXRhdGluZyB0aGUgd2F5IHRoZSBBcHAgcmVhZHMgaXQsIHBheWluZyBhdHRlbnRpb24gdG8gdGhlIHByb251bmNpYXRpb24gYW5kIGludG9uYXRpb24uJyxcclxuJ1RyeSB0byBtZW1vcml6ZSB0aGUgcXVlc3Rpb25zIGFuZCBhbnN3ZXJzIGFzIG11Y2ggYXMgcG9zc2libGUuIFlvdSBtYXkgd2FudCB0byByZXdyaXRlIHRoZSBhbnN3ZXJzIGluIHlvdXIgb3duIHdvcmRzIGFuZCBwcmFjdGljZSByZWFkaW5nIHRoZW0gY2xlYXJseSwgbG91ZGx5IGFuZCBjb250aW51b3VzbHkuJ11cclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZXI6IFJvdXRlciApIHtcclxuICAgIHRoaXMuZGF0YSA9IFtdO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMucG9pbnRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0YS5wdXNoKG5ldyBsaXN0cG9pbnRzKHRoaXMucG9pbnRzW2ldKSk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuZGF0YSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgfVxyXG4gICBcclxuICBiYWNrVG9Ib21lUGFnZSgpe1xyXG4gICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycnXSk7XHJcbiAgfVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICB9XHJcblxyXG59XHJcbiJdfQ==