"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var nativescript_texttospeech_1 = require("nativescript-texttospeech");
var router_1 = require("@angular/router");
var HomeComponent = /** @class */ (function () {
    function HomeComponent(tts, router) {
        this.tts = tts;
        this.router = router;
    }
    HomeComponent.prototype.speak = function (text) {
        var options = {
            text: text,
            pitch: 1.0,
            speakRate: 0.9,
            volume: 1.0,
            locale: "en-US",
            finishedCallback: function () {
                //enable speak button
                console.log("intro done");
            }
        };
        this.tts.speak(options);
    };
    HomeComponent.prototype.ngAfterViewInit = function () {
        this.speak("Welcome to Job Interview Skill Training. Please Choose the Type of Interview");
    };
    HomeComponent.prototype.ngOnInit = function () { };
    HomeComponent = __decorate([
        core_1.Component({
            selector: 'ns-home',
            templateUrl: './home.component.html',
            styleUrls: ['./home.component.css'],
            moduleId: module.id,
        }),
        __metadata("design:paramtypes", [nativescript_texttospeech_1.TNSTextToSpeech, router_1.Router])
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJob21lLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFpRTtBQUNqRSx1RUFBMEU7QUFDMUUsMENBQXlEO0FBUXpEO0lBRUUsdUJBQW9CLEdBQW9CLEVBQVUsTUFBYztRQUE1QyxRQUFHLEdBQUgsR0FBRyxDQUFpQjtRQUFVLFdBQU0sR0FBTixNQUFNLENBQVE7SUFBSSxDQUFDO0lBRXJFLDZCQUFLLEdBQUwsVUFBTSxJQUFXO1FBQ2pCLElBQUksT0FBTyxHQUFHO1lBQ2IsSUFBSSxFQUFFLElBQUk7WUFDVixLQUFLLEVBQUUsR0FBRztZQUNWLFNBQVMsRUFBRSxHQUFHO1lBQ2QsTUFBTSxFQUFFLEdBQUc7WUFDWCxNQUFNLEVBQUMsT0FBTztZQUNkLGdCQUFnQixFQUFFO2dCQUNqQixxQkFBcUI7Z0JBQ3JCLE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDM0IsQ0FBQztTQUNELENBQUM7UUFDRixJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUN6QixDQUFDO0lBRUQsdUNBQWUsR0FBZjtRQUNDLElBQUksQ0FBQyxLQUFLLENBQUMsOEVBQThFLENBQUMsQ0FBQztJQUM1RixDQUFDO0lBRUEsZ0NBQVEsR0FBUixjQUFZLENBQUM7SUF2QkYsYUFBYTtRQU56QixnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLFNBQVM7WUFDbkIsV0FBVyxFQUFFLHVCQUF1QjtZQUNwQyxTQUFTLEVBQUUsQ0FBQyxzQkFBc0IsQ0FBQztZQUNuQyxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7U0FDcEIsQ0FBQzt5Q0FHeUIsMkNBQWUsRUFBa0IsZUFBTTtPQUZyRCxhQUFhLENBeUJ6QjtJQUFELG9CQUFDO0NBQUEsQUF6QkQsSUF5QkM7QUF6Qlksc0NBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBUTlNUZXh0VG9TcGVlY2gsIFNwZWFrT3B0aW9ucyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtdGV4dHRvc3BlZWNoXCI7XHJcbmltcG9ydCB7IFJvdXRlciwgQWN0aXZhdGVkUm91dGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICducy1ob21lJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vaG9tZS5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vaG9tZS5jb21wb25lbnQuY3NzJ10sXHJcbiAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcclxufSlcclxuZXhwb3J0IGNsYXNzIEhvbWVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyVmlld0luaXQge1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHR0czogVE5TVGV4dFRvU3BlZWNoLCBwcml2YXRlIHJvdXRlcjogUm91dGVyKSB7IH1cclxuXHJcbiAgc3BlYWsodGV4dDpzdHJpbmcpIHsgXHJcblx0XHRsZXQgb3B0aW9ucyA9IHtcclxuXHRcdFx0dGV4dDogdGV4dCwgXHJcblx0XHRcdHBpdGNoOiAxLjAsXHJcblx0XHRcdHNwZWFrUmF0ZTogMC45LFxyXG5cdFx0XHR2b2x1bWU6IDEuMCxcclxuXHRcdFx0bG9jYWxlOlwiZW4tVVNcIixcclxuXHRcdFx0ZmluaXNoZWRDYWxsYmFjazogKCk9PntcclxuXHRcdFx0XHQvL2VuYWJsZSBzcGVhayBidXR0b25cclxuXHRcdFx0XHRjb25zb2xlLmxvZyhcImludHJvIGRvbmVcIik7XHJcblx0XHRcdH1cclxuXHRcdH07XHJcblx0XHR0aGlzLnR0cy5zcGVhayhvcHRpb25zKTtcclxuXHR9XHJcblx0XHJcblx0bmdBZnRlclZpZXdJbml0KCkge1xyXG5cdFx0dGhpcy5zcGVhayhcIldlbGNvbWUgdG8gSm9iIEludGVydmlldyBTa2lsbCBUcmFpbmluZy4gUGxlYXNlIENob29zZSB0aGUgVHlwZSBvZiBJbnRlcnZpZXdcIik7XHJcblx0fVxyXG5cclxuICBuZ09uSW5pdCgpIHt9IFxyXG5cclxufVxyXG4iXX0=