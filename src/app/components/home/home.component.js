"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var nativescript_texttospeech_1 = require("nativescript-texttospeech");
var HomeComponent = /** @class */ (function () {
    function HomeComponent(tts) {
        this.tts = tts;
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
    HomeComponent.prototype.ngOnInit = function () {
        this.speak("Welcome to Job Interview Skill Training. Please Choose the Type of Interview");
    };
    HomeComponent = __decorate([
        core_1.Component({
            selector: 'ns-home',
            templateUrl: './home.component.html',
            styleUrls: ['./home.component.css'],
            moduleId: module.id,
        }),
        __metadata("design:paramtypes", [nativescript_texttospeech_1.TNSTextToSpeech])
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJob21lLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFrRDtBQUNsRCx1RUFBMEU7QUFRMUU7SUFFRSx1QkFBb0IsR0FBb0I7UUFBcEIsUUFBRyxHQUFILEdBQUcsQ0FBaUI7SUFBSSxDQUFDO0lBRTdDLDZCQUFLLEdBQUwsVUFBTSxJQUFXO1FBQ2pCLElBQUksT0FBTyxHQUFHO1lBQ2IsSUFBSSxFQUFFLElBQUk7WUFDVixLQUFLLEVBQUUsR0FBRztZQUNWLFNBQVMsRUFBRSxHQUFHO1lBQ2QsTUFBTSxFQUFFLEdBQUc7WUFDWCxNQUFNLEVBQUMsT0FBTztZQUNkLGdCQUFnQixFQUFFO2dCQUNqQixxQkFBcUI7Z0JBQ3JCLE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDM0IsQ0FBQztTQUNELENBQUM7UUFFRixJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUN6QixDQUFDO0lBRUEsZ0NBQVEsR0FBUjtRQUNFLElBQUksQ0FBQyxLQUFLLENBQUMsOEVBQThFLENBQUMsQ0FBQztJQUM3RixDQUFDO0lBdEJVLGFBQWE7UUFOekIsZ0JBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxTQUFTO1lBQ25CLFdBQVcsRUFBRSx1QkFBdUI7WUFDcEMsU0FBUyxFQUFFLENBQUMsc0JBQXNCLENBQUM7WUFDbkMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1NBQ3BCLENBQUM7eUNBR3lCLDJDQUFlO09BRjdCLGFBQWEsQ0F3QnpCO0lBQUQsb0JBQUM7Q0FBQSxBQXhCRCxJQXdCQztBQXhCWSxzQ0FBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFROU1RleHRUb1NwZWVjaCwgU3BlYWtPcHRpb25zIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC10ZXh0dG9zcGVlY2hcIjtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnbnMtaG9tZScsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL2hvbWUuY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL2hvbWUuY29tcG9uZW50LmNzcyddLFxyXG4gIG1vZHVsZUlkOiBtb2R1bGUuaWQsXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBIb21lQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSB0dHM6IFROU1RleHRUb1NwZWVjaCkgeyB9XHJcblxyXG4gIHNwZWFrKHRleHQ6c3RyaW5nKSB7XHJcblx0XHRsZXQgb3B0aW9ucyA9IHtcclxuXHRcdFx0dGV4dDogdGV4dCwgXHJcblx0XHRcdHBpdGNoOiAxLjAsXHJcblx0XHRcdHNwZWFrUmF0ZTogMC45LFxyXG5cdFx0XHR2b2x1bWU6IDEuMCxcclxuXHRcdFx0bG9jYWxlOlwiZW4tVVNcIixcclxuXHRcdFx0ZmluaXNoZWRDYWxsYmFjazogKCk9PntcclxuXHRcdFx0XHQvL2VuYWJsZSBzcGVhayBidXR0b25cclxuXHRcdFx0XHRjb25zb2xlLmxvZyhcImludHJvIGRvbmVcIik7XHJcblx0XHRcdH1cclxuXHRcdH07XHJcblx0XHRcclxuXHRcdHRoaXMudHRzLnNwZWFrKG9wdGlvbnMpO1xyXG5cdH1cclxuICBcclxuICBuZ09uSW5pdCgpIHtcclxuICAgIHRoaXMuc3BlYWsoXCJXZWxjb21lIHRvIEpvYiBJbnRlcnZpZXcgU2tpbGwgVHJhaW5pbmcuIFBsZWFzZSBDaG9vc2UgdGhlIFR5cGUgb2YgSW50ZXJ2aWV3XCIpO1xyXG4gIH0gXHJcblxyXG59XHJcbiJdfQ==