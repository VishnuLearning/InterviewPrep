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
            language: "en",
            locale: "en-IN",
            finishedCallback: function () {
                //enable speak button
                console.log("intro done");
            }
        };
        this.tts.speak(options);
    };
    HomeComponent.prototype.ngOnInit = function () {
        this.speak("Welcome to Interview Preparation. Please choose your track.");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJob21lLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFrRDtBQUNsRCx1RUFBMEU7QUFRMUU7SUFFRSx1QkFBb0IsR0FBb0I7UUFBcEIsUUFBRyxHQUFILEdBQUcsQ0FBaUI7SUFBSSxDQUFDO0lBRTdDLDZCQUFLLEdBQUwsVUFBTSxJQUFXO1FBQ2pCLElBQUksT0FBTyxHQUFHO1lBQ2IsSUFBSSxFQUFFLElBQUk7WUFDVixLQUFLLEVBQUUsR0FBRztZQUNWLFNBQVMsRUFBRSxHQUFHO1lBQ2QsTUFBTSxFQUFFLEdBQUc7WUFDWCxRQUFRLEVBQUMsSUFBSTtZQUNiLE1BQU0sRUFBQyxPQUFPO1lBQ2QsZ0JBQWdCLEVBQUU7Z0JBQ2pCLHFCQUFxQjtnQkFDckIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUMzQixDQUFDO1NBQ0QsQ0FBQztRQUVGLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3hCLENBQUM7SUFFRCxnQ0FBUSxHQUFSO1FBQ0UsSUFBSSxDQUFDLEtBQUssQ0FBQyw2REFBNkQsQ0FBQyxDQUFDO0lBQzVFLENBQUM7SUF2QlUsYUFBYTtRQU56QixnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLFNBQVM7WUFDbkIsV0FBVyxFQUFFLHVCQUF1QjtZQUNwQyxTQUFTLEVBQUUsQ0FBQyxzQkFBc0IsQ0FBQztZQUNuQyxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7U0FDcEIsQ0FBQzt5Q0FHeUIsMkNBQWU7T0FGN0IsYUFBYSxDQXlCekI7SUFBRCxvQkFBQztDQUFBLEFBekJELElBeUJDO0FBekJZLHNDQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFROU1RleHRUb1NwZWVjaCwgU3BlYWtPcHRpb25zIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC10ZXh0dG9zcGVlY2hcIjtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbnMtaG9tZScsXG4gIHRlbXBsYXRlVXJsOiAnLi9ob21lLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vaG9tZS5jb21wb25lbnQuY3NzJ10sXG4gIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG59KVxuZXhwb3J0IGNsYXNzIEhvbWVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgdHRzOiBUTlNUZXh0VG9TcGVlY2gpIHsgfVxuXG4gIHNwZWFrKHRleHQ6c3RyaW5nKSB7XG5cdFx0bGV0IG9wdGlvbnMgPSB7XG5cdFx0XHR0ZXh0OiB0ZXh0LFxuXHRcdFx0cGl0Y2g6IDEuMCxcblx0XHRcdHNwZWFrUmF0ZTogMC45LFxuXHRcdFx0dm9sdW1lOiAxLjAsXG5cdFx0XHRsYW5ndWFnZTpcImVuXCIsXG5cdFx0XHRsb2NhbGU6XCJlbi1JTlwiLFxuXHRcdFx0ZmluaXNoZWRDYWxsYmFjazogKCk9Pntcblx0XHRcdFx0Ly9lbmFibGUgc3BlYWsgYnV0dG9uXG5cdFx0XHRcdGNvbnNvbGUubG9nKFwiaW50cm8gZG9uZVwiKTtcblx0XHRcdH1cblx0XHR9O1xuXHRcdFxuXHRcdHRoaXMudHRzLnNwZWFrKG9wdGlvbnMpO1xuICB9XG4gIFxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLnNwZWFrKFwiV2VsY29tZSB0byBJbnRlcnZpZXcgUHJlcGFyYXRpb24uIFBsZWFzZSBjaG9vc2UgeW91ciB0cmFjay5cIik7XG4gIH1cblxufVxuIl19