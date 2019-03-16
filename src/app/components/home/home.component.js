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
        __metadata("design:paramtypes", [nativescript_texttospeech_1.TNSTextToSpeech])
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJob21lLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFpRTtBQUNqRSx1RUFBMEU7QUFRMUU7SUFFRSx1QkFBb0IsR0FBb0I7UUFBcEIsUUFBRyxHQUFILEdBQUcsQ0FBaUI7SUFBSSxDQUFDO0lBRTdDLDZCQUFLLEdBQUwsVUFBTSxJQUFXO1FBQ2pCLElBQUksT0FBTyxHQUFHO1lBQ2IsSUFBSSxFQUFFLElBQUk7WUFDVixLQUFLLEVBQUUsR0FBRztZQUNWLFNBQVMsRUFBRSxHQUFHO1lBQ2QsTUFBTSxFQUFFLEdBQUc7WUFDWCxNQUFNLEVBQUMsT0FBTztZQUNkLGdCQUFnQixFQUFFO2dCQUNqQixxQkFBcUI7Z0JBQ3JCLE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDM0IsQ0FBQztTQUNELENBQUM7UUFDRixJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUN6QixDQUFDO0lBRUQsdUNBQWUsR0FBZjtRQUNDLElBQUksQ0FBQyxLQUFLLENBQUMsOEVBQThFLENBQUMsQ0FBQztJQUM1RixDQUFDO0lBRUEsZ0NBQVEsR0FBUixjQUFZLENBQUM7SUF2QkYsYUFBYTtRQU56QixnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLFNBQVM7WUFDbkIsV0FBVyxFQUFFLHVCQUF1QjtZQUNwQyxTQUFTLEVBQUUsQ0FBQyxzQkFBc0IsQ0FBQztZQUNuQyxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7U0FDcEIsQ0FBQzt5Q0FHeUIsMkNBQWU7T0FGN0IsYUFBYSxDQXlCekI7SUFBRCxvQkFBQztDQUFBLEFBekJELElBeUJDO0FBekJZLHNDQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIEFmdGVyVmlld0luaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgVE5TVGV4dFRvU3BlZWNoLCBTcGVha09wdGlvbnMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LXRleHR0b3NwZWVjaFwiO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICducy1ob21lJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vaG9tZS5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vaG9tZS5jb21wb25lbnQuY3NzJ10sXHJcbiAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcclxufSlcclxuZXhwb3J0IGNsYXNzIEhvbWVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyVmlld0luaXQge1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHR0czogVE5TVGV4dFRvU3BlZWNoKSB7IH1cclxuXHJcbiAgc3BlYWsodGV4dDpzdHJpbmcpIHtcclxuXHRcdGxldCBvcHRpb25zID0ge1xyXG5cdFx0XHR0ZXh0OiB0ZXh0LCBcclxuXHRcdFx0cGl0Y2g6IDEuMCxcclxuXHRcdFx0c3BlYWtSYXRlOiAwLjksXHJcblx0XHRcdHZvbHVtZTogMS4wLFxyXG5cdFx0XHRsb2NhbGU6XCJlbi1VU1wiLFxyXG5cdFx0XHRmaW5pc2hlZENhbGxiYWNrOiAoKT0+e1xyXG5cdFx0XHRcdC8vZW5hYmxlIHNwZWFrIGJ1dHRvblxyXG5cdFx0XHRcdGNvbnNvbGUubG9nKFwiaW50cm8gZG9uZVwiKTtcclxuXHRcdFx0fVxyXG5cdFx0fTtcclxuXHRcdHRoaXMudHRzLnNwZWFrKG9wdGlvbnMpO1xyXG5cdH1cclxuXHRcclxuXHRuZ0FmdGVyVmlld0luaXQoKSB7XHJcblx0XHR0aGlzLnNwZWFrKFwiV2VsY29tZSB0byBKb2IgSW50ZXJ2aWV3IFNraWxsIFRyYWluaW5nLiBQbGVhc2UgQ2hvb3NlIHRoZSBUeXBlIG9mIEludGVydmlld1wiKTtcclxuXHR9XHJcblxyXG4gIG5nT25Jbml0KCkge30gXHJcblxyXG59XHJcbiJdfQ==