"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var angular_1 = require("nativescript-ui-sidedrawer/angular");
var core_2 = require("@angular/core");
// import { Response } from "@angular/http";
var path_service_1 = require("../../services/path/path.service");
var router_1 = require("@angular/router");
var nativescript_texttospeech_1 = require("nativescript-texttospeech");
var nativescript_speech_recognition_1 = require("nativescript-speech-recognition");
// import { error } from "tns-core-modules/trace/trace";
// import {Slider} from "tns-core-modules/ui/slider";
var QuestionsComponent = /** @class */ (function () {
    function QuestionsComponent(text2speech, pathservice, route, router) {
        var _this_1 = this;
        this.text2speech = text2speech;
        this.pathservice = pathservice;
        this.route = route;
        this.router = router;
        this.imagePath = "~/assets/images/Final_Avatar_small/";
        this.showAnswer = false;
        this.speaking = false;
        this.sentenceIndex = -1;
        this.speakAndAnimateFlag = 1;
        this.AvatarImages = ['jobs_full.png', 'jobs_mouth_wide5.png', 'jobs_mouth_wide5.png', 'jobs_mouth_narrow_o.png', 'jobs_mouth_wide_y.png',
            'jobs_mouth_wide5.png', 'jobs_mouth_wide_d_f_k_r_s.png', 'jobs_mouth_narrow_w.png', 'jobs_mouth_narrow_o.png',
            'jobs_mouth_wide_d_f_k_r_s.png', 'jobs_mouth_narrow_u.png', 'jobs_mouth_wide5.png', 'jobs_mouth_wide_d_f_k_r_s.png', 'jobs_mouth_wide_sh.png',
            'jobs_mouth_wide5.png', 'jobs_mouth_wide_sh.png', 'jobs_mouth_wide_sh.png', 'jobs_mouth_wide_th.png', 'jobs_mouth_wide_f.png',
            'jobs_mouth_wide_sh.png', 'jobs_mouth_wide_d_f_k_r_s.png', 'jobs_mouth_closed.png'];
        this.speechRate = 0.9;
        this.microphoneEnabled = false;
        this.recording = false;
        this.lastTranscription = null;
        this.spoken = false;
        this.pitch = 100;
        this.questions = [];
        this.qnum = 1;
        var u = decodeURI(router.url);
        this.title = u.substring(u.lastIndexOf('%2F') + 3, u.lastIndexOf('.'));
        this.speakOptions = {
            text: "Question 1, ",
            pitch: 1.0,
            speakRate: 0.9,
            volume: 1.0,
            language: "en",
            locale: "en-US",
            finishedCallback: function () { _this_1.speakNextSentence(); }
        };
    }
    QuestionsComponent.prototype.onOpenDrawerTap = function () {
        this.drawerComponent.sideDrawer.showDrawer();
    };
    QuestionsComponent.prototype.onSwipe = function (args) {
        if (args.direction == 1) {
            this.goLeft();
        }
        else if (args.direction == 2) {
            this.goRight();
        }
    };
    QuestionsComponent.prototype.goLeft = function () {
        if (this.qnum > 0) {
            this.text2speech.pause();
            this.avatarImage.nativeElement.src = this.imagePath + this.AvatarImages[0];
            this.showAnswer = false;
            this.loadQuestion(this.qnum - 1);
        }
    };
    QuestionsComponent.prototype.goRight = function () {
        if (this.qnum < this.questions.length - 1) {
            this.text2speech.pause();
            this.avatarImage.nativeElement.src = this.imagePath + this.AvatarImages[0];
            this.showAnswer = false;
            this.loadQuestion(this.qnum + 1);
        }
    };
    //loading question directly from navigation tab
    QuestionsComponent.prototype.loadQuestion = function (i) {
        this.drawerComponent.sideDrawer.closeDrawer();
        this.question = this.questions[i];
        this.variable = this.question.quest;
        var value = this.variable.replace(/\./gi, "?");
        this.sentences = value.split("? ");
        for (var v = 0; v < this.sentences.length; v++)
            console.log(this.sentences[v]);
        console.log(this.sentences);
        this.sentenceIndex = -1;
        if (this.speakinterval)
            clearInterval(this.speakinterval);
        this.speaking = false;
        this.speakAndAnimateFlag = 1;
        this.qnum = i;
        // this.speakTitle();
    };
    QuestionsComponent.prototype.displayAnswer = function () {
        this.showAnswer = !this.showAnswer;
    };
    QuestionsComponent.prototype.speakNextSentence = function () {
        var _this_1 = this;
        console.log("speakNextSentence called ", this.speakAndAnimateFlag, this.speaking, this.sentenceIndex);
        this.speakAndAnimateFlag++;
        if (this.speaking && this.speakAndAnimateFlag == 2) {
            this.speakAndAnimateFlag = 0;
            this.sentenceIndex++;
            if (this.sentenceIndex < this.sentences.length) {
                this.speakOptions.text = this.sentences[this.sentenceIndex];
                this.text2speech.speak(this.speakOptions)
                    .then(function () {
                    _this_1.animateAvatar();
                    console.log("in then");
                }, function (err) { console.log(err); });
            }
            else {
                this.sentenceIndex = -1;
                this.speaking = false;
                this.speakAndAnimateFlag = 1;
            }
        }
    };
    QuestionsComponent.prototype.animateAvatar = function () {
        var _this_1 = this;
        var i = 0;
        this.speakinterval = setInterval(function () {
            _this_1.avatarImage.nativeElement.src = _this_1.imagePath + _this_1.AvatarImages[_this_1.question.visemes[_this_1.sentenceIndex][i]];
            i++;
            if (i == _this_1.question.visemes[_this_1.sentenceIndex].length) {
                clearInterval(_this_1.speakinterval);
                _this_1.speakNextSentence();
            }
        }, this.speechRate * 85);
    };
    QuestionsComponent.prototype.textToSpeech = function () {
        // this.text2speech.pause();
        var _this = this;
        this.speaking = true;
        this.speakNextSentence();
    };
    QuestionsComponent.prototype.speakTextOnly = function () {
        this.text2speech.pause();
        var options = {
            text: this.question.text,
            pitch: 1.0,
            speakRate: 0.9,
            volume: 1.0,
            language: "en",
            locale: "en-US",
            finishedCallback: function () {
                console.log("read the answer");
            }
        };
        this.text2speech.speak(options);
    };
    QuestionsComponent.prototype.toggleRecording = function () {
        this.recording = !this.recording;
        // console.log(this.recording);
        if (this.recording) {
            // console.log("toggleRecording true part");
            this.spoken = false;
            this.lastTranscription = null;
            this.startListening();
        }
        else {
            // console.log("toggleRecording true part");
            this.stopListening();
            if (!this.spoken && this.lastTranscription !== null) {
                alert(this.lastTranscription);
            }
        }
    };
    QuestionsComponent.prototype.startListening = function () {
        var _this_1 = this;
        // console.log("Inside startlistening");
        if (!this.recordingAvailable) {
            console.log("inside if");
            alert({
                title: "Not supported",
                message: "Speech recognition not supported on this device. Try a different device please.",
                okButtonText: "Oh, bummer"
            });
            this.recognizedText = "No support, Sorry";
            this.recording = false;
            return;
        }
        // console.log("else part");
        this.recording = true;
        this.speech2text.startListening({
            locale: "en-US",
            returnPartialResults: true,
            onResult: function (transcription) {
                // this.zone.run(() => this.recognizedText = transcription.text);
                _this_1.lastTranscription = transcription.text;
                if (transcription.finished) {
                    _this_1.spoken = true;
                    setTimeout(function () { return alert(transcription.text); }, 300);
                    _this_1.spokenText = transcription.text;
                    // alert(transcription.text);
                    _this_1.generateScore();
                }
            },
        }).then(function (started) { console.log("started listening"); }, function (errorMessage) { console.log("Error: " + errorMessage); });
    };
    QuestionsComponent.prototype.generateScore = function () {
        var spokenSentences = this.spokenText.split(" ");
        var givenSentences = this.question.text.split(" ");
        var v = 0;
        while (v < givenSentences.length) {
            givenSentences[v].replace('.', '');
            givenSentences[v].replace(',', '');
            v++;
        }
        var i = 0;
        var j = 0;
        var count = 0;
        while (i < spokenSentences.length) {
            while (j < givenSentences.length) {
                if (spokenSentences[i].toLowerCase() == givenSentences[j].toLowerCase()) {
                    count++;
                    break;
                }
                j++;
            }
            i++;
            j = 0;
        }
        alert(((count / givenSentences.length) * 100).toFixed(2));
    };
    QuestionsComponent.prototype.stopListening = function () {
        // console.log("stopListening");
        this.recording = false;
        this.speech2text.stopListening().then(function () {
            console.log("Stopped listening");
        });
    };
    QuestionsComponent.prototype.ngOnInit = function () {
        var _this_1 = this;
        this.speech2text = new nativescript_speech_recognition_1.SpeechRecognition();
        this.speech2text.available().then(function (avail) {
            _this_1.recordingAvailable = avail;
        });
        // this.text2speech = new TNSTextToSpeech();
        this.sub = this.route.params.subscribe(function (params) {
            _this_1.path = params['path'];
            _this_1.pathservice.getQuestions(_this_1.path)
                .subscribe(function (d) {
                _this_1.question = d[0];
                _this_1.questions = d;
                _this_1.variable = _this_1.question.quest;
                _this_1.variable.replace(".", "?");
                _this_1.sentences = _this_1.variable.split("? ");
            }, function (error) {
                console.log(error);
            });
        });
    };
    QuestionsComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    __decorate([
        core_1.ViewChild(angular_1.RadSideDrawerComponent),
        __metadata("design:type", angular_1.RadSideDrawerComponent)
    ], QuestionsComponent.prototype, "drawerComponent", void 0);
    __decorate([
        core_1.ViewChild("avatar"),
        __metadata("design:type", core_1.ElementRef)
    ], QuestionsComponent.prototype, "avatarImage", void 0);
    QuestionsComponent = __decorate([
        core_2.Component({
            selector: "Questions",
            moduleId: module.id,
            providers: [path_service_1.PathService],
            templateUrl: "./questions.component.html",
            styleUrls: ['./questions.component.css']
        }),
        __metadata("design:paramtypes", [nativescript_texttospeech_1.TNSTextToSpeech, path_service_1.PathService, router_1.ActivatedRoute, router_1.Router])
    ], QuestionsComponent);
    return QuestionsComponent;
}());
exports.QuestionsComponent = QuestionsComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlc3Rpb25zLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInF1ZXN0aW9ucy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBc0Q7QUFDdEQsOERBQTRGO0FBQzVGLHNDQUE2RDtBQUM3RCw0Q0FBNEM7QUFDNUMsaUVBQStEO0FBQy9ELDBDQUF5RDtBQUd6RCx1RUFBMEU7QUFDMUUsbUZBQThIO0FBRzlILHdEQUF3RDtBQUN4RCxxREFBcUQ7QUFVckQ7SUF3Q0MsNEJBQW9CLFdBQTRCLEVBQVUsV0FBd0IsRUFBVSxLQUFxQixFQUFVLE1BQWM7UUFBekksbUJBY0M7UUFkbUIsZ0JBQVcsR0FBWCxXQUFXLENBQWlCO1FBQVUsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFBVSxVQUFLLEdBQUwsS0FBSyxDQUFnQjtRQUFVLFdBQU0sR0FBTixNQUFNLENBQVE7UUEvQnpJLGNBQVMsR0FBVyxxQ0FBcUMsQ0FBQztRQU0xRCxlQUFVLEdBQVksS0FBSyxDQUFDO1FBQzVCLGFBQVEsR0FBWSxLQUFLLENBQUM7UUFDMUIsa0JBQWEsR0FBVyxDQUFDLENBQUMsQ0FBQztRQUczQix3QkFBbUIsR0FBVyxDQUFDLENBQUM7UUFFaEMsaUJBQVksR0FBRyxDQUFDLGVBQWUsRUFBQyxzQkFBc0IsRUFBQyxzQkFBc0IsRUFBQyx5QkFBeUIsRUFBQyx1QkFBdUI7WUFDL0gsc0JBQXNCLEVBQUMsK0JBQStCLEVBQUMseUJBQXlCLEVBQUMseUJBQXlCO1lBQzFHLCtCQUErQixFQUFDLHlCQUF5QixFQUFDLHNCQUFzQixFQUFDLCtCQUErQixFQUFDLHdCQUF3QjtZQUN6SSxzQkFBc0IsRUFBQyx3QkFBd0IsRUFBQyx3QkFBd0IsRUFBQyx3QkFBd0IsRUFBQyx1QkFBdUI7WUFDekgsd0JBQXdCLEVBQUMsK0JBQStCLEVBQUMsdUJBQXVCLENBQUMsQ0FBQztRQUNsRixlQUFVLEdBQUcsR0FBRyxDQUFDO1FBSWQsc0JBQWlCLEdB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QUFDLFFBQVEsR0FBRyxPQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQztnQkFDcEMsT0FBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUMvQixPQUFJLENBQUMsU0FBUyxHQUFHLE9BQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzVDLENBQUMsRUFDRCxVQUFDLEtBQUs7Z0JBQ0wsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNwQixDQUFDLENBQ0QsQ0FBQTtRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0osQ0FBQztJQUVELHdDQUFXLEdBQVg7UUFDQyxJQUFJLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3hCLENBQUM7SUE3UWtDO1FBQWxDLGdCQUFTLENBQUMsZ0NBQXNCLENBQUM7a0NBQXlCLGdDQUFzQjsrREFBQztJQUM3RDtRQUFwQixnQkFBUyxDQUFDLFFBQVEsQ0FBQztrQ0FBYSxpQkFBVTsyREFBQztJQUZoQyxrQkFBa0I7UUFSOUIsZ0JBQVMsQ0FBQztZQUNWLFFBQVEsRUFBRSxXQUFXO1lBQ3JCLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixTQUFTLEVBQUUsQ0FBQywwQkFBVyxDQUFDO1lBQ3hCLFdBQVcsRUFBRSw0QkFBNEI7WUFDekMsU0FBUyxFQUFFLENBQUMsMkJBQTJCLENBQUM7U0FDeEMsQ0FBQzt5Q0EwQ2dDLDJDQUFlLEVBQXVCLDBCQUFXLEVBQWlCLHVCQUFjLEVBQWtCLGVBQU07T0F4QzdILGtCQUFrQixDQStROUI7SUFBRCx5QkFBQztDQUFBLEFBL1FELElBK1FDO0FBL1FZLGdEQUFrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFZpZXdDaGlsZCwgRWxlbWVudFJlZiB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IFJhZFNpZGVEcmF3ZXJDb21wb25lbnQsIFNpZGVEcmF3ZXJUeXBlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC11aS1zaWRlZHJhd2VyL2FuZ3VsYXJcIjtcclxuaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIE9uRGVzdHJveSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbi8vIGltcG9ydCB7IFJlc3BvbnNlIH0gZnJvbSBcIkBhbmd1bGFyL2h0dHBcIjtcclxuaW1wb3J0IHsgUGF0aFNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvcGF0aC9wYXRoLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgUm91dGVyLCBBY3RpdmF0ZWRSb3V0ZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCB7IFF1ZXN0aW9uIH0gZnJvbSBcIi4uLy4uL2NsYXNzZXMvcXVlc3Rpb25cIjtcclxuaW1wb3J0IHsgU3dpcGVHZXN0dXJlRXZlbnREYXRhIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvZ2VzdHVyZXNcIjtcclxuaW1wb3J0IHsgVE5TVGV4dFRvU3BlZWNoLCBTcGVha09wdGlvbnMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LXRleHR0b3NwZWVjaFwiO1xyXG5pbXBvcnQgeyBTcGVlY2hSZWNvZ25pdGlvbiwgU3BlZWNoUmVjb2duaXRpb25UcmFuc2NyaXB0aW9uLCBTcGVlY2hSZWNvZ25pdGlvbk9wdGlvbnMgfSBmcm9tICduYXRpdmVzY3JpcHQtc3BlZWNoLXJlY29nbml0aW9uJztcclxuaW1wb3J0IHsgdmFyaWFibGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29tcGlsZXIvc3JjL291dHB1dC9vdXRwdXRfYXN0XCI7XHJcbmltcG9ydCB7IFZhcmlhYmxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvbXBpbGVyL3NyYy9yZW5kZXIzL3IzX2FzdFwiO1xyXG4vLyBpbXBvcnQgeyBlcnJvciB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3RyYWNlL3RyYWNlXCI7XHJcbi8vIGltcG9ydCB7U2xpZGVyfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9zbGlkZXJcIjtcclxuXHJcbkBDb21wb25lbnQoe1xyXG5cdHNlbGVjdG9yOiBcIlF1ZXN0aW9uc1wiLFxyXG5cdG1vZHVsZUlkOiBtb2R1bGUuaWQsXHJcblx0cHJvdmlkZXJzOiBbUGF0aFNlcnZpY2VdLFxyXG5cdHRlbXBsYXRlVXJsOiBcIi4vcXVlc3Rpb25zLmNvbXBvbmVudC5odG1sXCIsXHJcblx0c3R5bGVVcmxzOiBbJy4vcXVlc3Rpb25zLmNvbXBvbmVudC5jc3MnXVxyXG59KVxyXG5cclxuZXhwb3J0IGNsYXNzIFF1ZXN0aW9uc0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcclxuXHRAVmlld0NoaWxkKFJhZFNpZGVEcmF3ZXJDb21wb25lbnQpIHB1YmxpYyBkcmF3ZXJDb21wb25lbnQ6IFJhZFNpZGVEcmF3ZXJDb21wb25lbnQ7XHJcblx0QFZpZXdDaGlsZChcImF2YXRhclwiKSBhdmF0YXJJbWFnZTpFbGVtZW50UmVmO1xyXG5cdFxyXG5cdG9uT3BlbkRyYXdlclRhcCgpIHtcclxuXHRcdHRoaXMuZHJhd2VyQ29tcG9uZW50LnNpZGVEcmF3ZXIuc2hvd0RyYXdlcigpO1xyXG5cdH1cclxuXHJcblx0cGF0aDogc3RyaW5nO1xyXG5cdGltYWdlUGF0aDogc3RyaW5nID0gXCJ+L2Fzc2V0cy9pbWFnZXMvRmluYWxfQXZhdGFyX3NtYWxsL1wiO1xyXG5cdHF1ZXN0aW9uczogUXVlc3Rpb25bXTtcclxuXHRxdWVzdGlvbjogUXVlc3Rpb247XHJcblx0cW51bTogbnVtYmVyO1xyXG5cdHRpdGxlOnN0cmluZztcclxuXHR2YXJpYWJsZTogc3RyaW5nO1xyXG5cdHNob3dBbnN3ZXI6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHRzcGVha2luZzogYm9vbGVhbiA9IGZhbHNlO1xyXG5cdHNlbnRlbmNlSW5kZXg6IG51bWJlciA9IC0xO1xyXG5cdHNlbnRlbmNlczogQXJyYXk8c3RyaW5nPjtcclxuXHRzcGVha2ludGVydmFsOiBudW1iZXI7XHJcblx0c3BlYWtBbmRBbmltYXRlRmxhZzogbnVtYmVyID0gMTtcclxuXHRwcml2YXRlIHN1YjogYW55O1xyXG5cdEF2YXRhckltYWdlcyA9IFsnam9ic19mdWxsLnBuZycsJ2pvYnNfbW91dGhfd2lkZTUucG5nJywnam9ic19tb3V0aF93aWRlNS5wbmcnLCdqb2JzX21vdXRoX25hcnJvd19vLnBuZycsJ2pvYnNfbW91dGhfd2lkZV95LnBuZycsXHJcblx0J2pvYnNfbW91dGhfd2lkZTUucG5nJywnam9ic19tb3V0aF93aWRlX2RfZl9rX3Jfcy5wbmcnLCdqb2JzX21vdXRoX25hcnJvd193LnBuZycsJ2pvYnNfbW91dGhfbmFycm93X28ucG5nJyxcclxuXHQnam9ic19tb3V0aF93aWRlX2RfZl9rX3Jfcy5wbmcnLCdqb2JzX21vdXRoX25hcnJvd191LnBuZycsJ2pvYnNfbW91dGhfd2lkZTUucG5nJywnam9ic19tb3V0aF93aWRlX2RfZl9rX3Jfcy5wbmcnLCdqb2JzX21vdXRoX3dpZGVfc2gucG5nJyxcclxuXHQnam9ic19tb3V0aF93aWRlNS5wbmcnLCdqb2JzX21vdXRoX3dpZGVfc2gucG5nJywnam9ic19tb3V0aF93aWRlX3NoLnBuZycsJ2pvYnNfbW91dGhfd2lkZV90aC5wbmcnLCdqb2JzX21vdXRoX3dpZGVfZi5wbmcnLFxyXG5cdCdqb2JzX21vdXRoX3dpZGVfc2gucG5nJywnam9ic19tb3V0aF93aWRlX2RfZl9rX3Jfcy5wbmcnLCdqb2JzX21vdXRoX2Nsb3NlZC5wbmcnXTtcclxuXHRzcGVlY2hSYXRlID0gMC45O1xyXG5cdC8vIHByaXZhdGUgdGV4dDJzcGVlY2g6IFROU1RleHRUb1NwZWVjaDtcclxuXHRwcml2YXRlIHNwZWVjaDJ0ZXh0OiBTcGVlY2hSZWNvZ25pdGlvbjtcclxuXHRzcGVha09wdGlvbnMgOiBTcGVha09wdGlvbnM7XHJcbiAgICBtaWNyb3Bob25lRW5hYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgcmVjb3JkaW5nOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBsYXN0VHJhbnNjcmlwdGlvbjogc3RyaW5nID0gbnVsbDtcclxuICAgIHNwb2tlbjogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgcmVjb2duaXplZFRleHQ6IHN0cmluZztcclxuICAgIHBpdGNoOiBudW1iZXIgPSAxMDA7XHJcblx0cHJpdmF0ZSByZWNvcmRpbmdBdmFpbGFibGU6IGJvb2xlYW47XHJcblx0cHJpdmF0ZSBzcG9rZW5UZXh0OiBzdHJpbmc7XHJcblxyXG5cdGNvbnN0cnVjdG9yKHByaXZhdGUgdGV4dDJzcGVlY2g6IFROU1RleHRUb1NwZWVjaCwgcHJpdmF0ZSBwYXRoc2VydmljZTogUGF0aFNlcnZpY2UsIHByaXZhdGUgcm91dGU6IEFjdGl2YXRlZFJvdXRlLCBwcml2YXRlIHJvdXRlcjogUm91dGVyKSB7XHJcblx0XHR0aGlzLnF1ZXN0aW9ucyA9IFtdO1xyXG5cdFx0dGhpcy5xbnVtID0gMTtcclxuXHRcdHZhciB1ID0gZGVjb2RlVVJJKHJvdXRlci51cmwpO1xyXG5cdFx0dGhpcy50aXRsZSA9IHUuc3Vic3RyaW5nKHUubGFzdEluZGV4T2YoJyUyRicpKzMsIHUubGFzdEluZGV4T2YoJy4nKSk7XHJcblx0XHR0aGlzLnNwZWFrT3B0aW9ucyA9IHtcclxuXHRcdFx0dGV4dDogXCJRdWVzdGlvbiAxLCBcIixcclxuXHRcdFx0cGl0Y2g6IDEuMCxcclxuXHRcdFx0c3BlYWtSYXRlOiAwLjksXHJcblx0XHRcdHZvbHVtZTogMS4wLFxyXG5cdFx0XHRsYW5ndWFnZTpcImVuXCIsXHJcblx0XHRcdGxvY2FsZTpcImVuLVVTXCIsXHJcblx0XHRcdGZpbmlzaGVkQ2FsbGJhY2s6ICgpPT57dGhpcy5zcGVha05leHRTZW50ZW5jZSgpO31cclxuXHRcdH07XHJcblx0fVxyXG5cclxuXHRvblN3aXBlKGFyZ3M6IFN3aXBlR2VzdHVyZUV2ZW50RGF0YSkge1xyXG5cdFx0aWYgKGFyZ3MuZGlyZWN0aW9uID09IDEpIHtcdFxyXG5cdFx0XHR0aGlzLmdvTGVmdCgpO1xyXG5cdFx0fSBlbHNlIGlmIChhcmdzLmRpcmVjdGlvbiA9PSAyKSB7XHJcblx0XHRcdHRoaXMuZ29SaWdodCgpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHRnb0xlZnQoKXtcclxuXHRcdGlmICh0aGlzLnFudW0gPiAwKSB7XHRcclxuXHRcdFx0dGhpcy50ZXh0MnNwZWVjaC5wYXVzZSgpO1xyXG5cdFx0XHR0aGlzLmF2YXRhckltYWdlLm5hdGl2ZUVsZW1lbnQuc3JjID0gdGhpcy5pbWFnZVBhdGggKyB0aGlzLkF2YXRhckltYWdlc1swXTtcclxuXHRcdFx0dGhpcy5zaG93QW5zd2VyID0gZmFsc2U7XHJcblx0XHRcdHRoaXMubG9hZFF1ZXN0aW9uKHRoaXMucW51bSAtIDEpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHRnb1JpZ2h0KCl7XHJcblx0XHRpZiAodGhpcy5xbnVtIDwgdGhpcy5xdWVzdGlvbnMubGVuZ3RoIC0gMSkge1xyXG5cdFx0XHR0aGlzLnRleHQyc3BlZWNoLnBhdXNlKCk7XHJcblx0XHRcdHRoaXMuYXZhdGFySW1hZ2UubmF0aXZlRWxlbWVudC5zcmMgPSB0aGlzLmltYWdlUGF0aCArIHRoaXMuQXZhdGFySW1hZ2VzWzBdO1xyXG5cdFx0XHR0aGlzLnNob3dBbnN3ZXIgPSBmYWxzZTtcclxuXHRcdFx0dGhpcy5sb2FkUXVlc3Rpb24odGhpcy5xbnVtICsgMSk7XHJcblx0XHR9XHJcblx0fVxyXG5cdC8vbG9hZGluZyBxdWVzdGlvbiBkaXJlY3RseSBmcm9tIG5hdmlnYXRpb24gdGFiXHJcblx0bG9hZFF1ZXN0aW9uKGk6IG51bWJlcikge1xyXG5cdFx0dGhpcy5kcmF3ZXJDb21wb25lbnQuc2lkZURyYXdlci5jbG9zZURyYXdlcigpO1xyXG5cdFx0dGhpcy5xdWVzdGlvbiA9IHRoaXMucXVlc3Rpb25zW2ldO1xyXG5cdFx0dGhpcy52YXJpYWJsZSA9IHRoaXMucXVlc3Rpb24ucXVlc3Q7XHJcblx0XHRsZXQgdmFsdWUgPSB0aGlzLnZhcmlhYmxlLnJlcGxhY2UoL1xcLi9naSxcIj9cIik7XHJcblx0XHR0aGlzLnNlbnRlbmNlcyA9IHZhbHVlLnNwbGl0KFwiPyBcIik7XHJcblx0XHRmb3IodmFyIHY9MDt2PHRoaXMuc2VudGVuY2VzLmxlbmd0aDt2KyspXHJcblx0XHRcdGNvbnNvbGUubG9nKHRoaXMuc2VudGVuY2VzW3ZdKTtcclxuXHRcdGNvbnNvbGUubG9nKHRoaXMuc2VudGVuY2VzKTtcclxuXHRcdHRoaXMuc2VudGVuY2VJbmRleCA9IC0xO1xyXG5cdFx0aWYodGhpcy5zcGVha2ludGVydmFsKSBjbGVhckludGVydmFsKHRoaXMuc3BlYWtpbnRlcnZhbCk7XHJcblx0XHR0aGlzLnNwZWFraW5nID0gZmFsc2U7XHJcblx0XHR0aGlzLnNwZWFrQW5kQW5pbWF0ZUZsYWcgPSAxO1xyXG5cdFx0dGhpcy5xbnVtID0gaTtcclxuXHRcdC8vIHRoaXMuc3BlYWtUaXRsZSgpO1xyXG5cdH1cclxuXHJcblx0ZGlzcGxheUFuc3dlcigpe1xyXG5cdFx0dGhpcy5zaG93QW5zd2VyID0gIXRoaXMuc2hvd0Fuc3dlcjtcclxuXHR9XHJcblx0XHJcblx0c3BlYWtOZXh0U2VudGVuY2UoKXtcclxuXHRcdGNvbnNvbGUubG9nKFwic3BlYWtOZXh0U2VudGVuY2UgY2FsbGVkIFwiLCB0aGlzLnNwZWFrQW5kQW5pbWF0ZUZsYWcsIHRoaXMuc3BlYWtpbmcsIHRoaXMuc2VudGVuY2VJbmRleCk7XHJcblx0XHR0aGlzLnNwZWFrQW5kQW5pbWF0ZUZsYWcrKztcclxuXHRcdGlmKHRoaXMuc3BlYWtpbmcgJiYgdGhpcy5zcGVha0FuZEFuaW1hdGVGbGFnID09IDIpIHtcclxuXHRcdFx0dGhpcy5zcGVha0FuZEFuaW1hdGVGbGFnID0gMDtcclxuXHRcdFx0dGhpcy5zZW50ZW5jZUluZGV4Kys7XHJcblx0XHRcdGlmKHRoaXMuc2VudGVuY2VJbmRleDx0aGlzLnNlbnRlbmNlcy5sZW5ndGgpIHtcclxuXHRcdFx0XHR0aGlzLnNwZWFrT3B0aW9ucy50ZXh0ID0gdGhpcy5zZW50ZW5jZXNbdGhpcy5zZW50ZW5jZUluZGV4XTtcclxuXHRcdFx0XHR0aGlzLnRleHQyc3BlZWNoLnNwZWFrKHRoaXMuc3BlYWtPcHRpb25zKVxyXG5cdFx0XHRcdC50aGVuKCgpPT57XHJcblx0XHRcdFx0XHR0aGlzLmFuaW1hdGVBdmF0YXIoKTtcclxuXHRcdFx0XHRcdGNvbnNvbGUubG9nKFwiaW4gdGhlblwiKTt9LCBcclxuXHRcdFx0XHRcdChlcnIpPT57Y29uc29sZS5sb2coZXJyKTt9KTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHR0aGlzLnNlbnRlbmNlSW5kZXggPSAtMTtcclxuXHRcdFx0XHR0aGlzLnNwZWFraW5nID0gZmFsc2U7XHJcblx0XHRcdFx0dGhpcy5zcGVha0FuZEFuaW1hdGVGbGFnID0gMTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0YW5pbWF0ZUF2YXRhcigpOiB2b2lkIHtcclxuXHRcdGxldCBpID0gMDtcclxuICAgICAgICB0aGlzLnNwZWFraW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKSA9PiB7IFxyXG5cdFx0XHR0aGlzLmF2YXRhckltYWdlLm5hdGl2ZUVsZW1lbnQuc3JjID0gdGhpcy5pbWFnZVBhdGggKyB0aGlzLkF2YXRhckltYWdlc1t0aGlzLnF1ZXN0aW9uLnZpc2VtZXNbdGhpcy5zZW50ZW5jZUluZGV4XVtpXV07XHJcblx0XHRcdFxyXG4gICAgICAgICAgICBpKys7XHJcbiAgICAgICAgICAgIGlmIChpID09IHRoaXMucXVlc3Rpb24udmlzZW1lc1t0aGlzLnNlbnRlbmNlSW5kZXhdLmxlbmd0aCkge1xyXG5cdFx0XHRcdGNsZWFySW50ZXJ2YWwodGhpcy5zcGVha2ludGVydmFsKTtcclxuXHRcdFx0XHR0aGlzLnNwZWFrTmV4dFNlbnRlbmNlKCk7XHJcblx0XHRcdH1cclxuXHRcdH0sIHRoaXMuc3BlZWNoUmF0ZSo4NSk7XHJcblx0fVxyXG5cclxuXHR0ZXh0VG9TcGVlY2goKXtcclxuXHRcdC8vIHRoaXMudGV4dDJzcGVlY2gucGF1c2UoKTtcclxuXHRcdHZhciBfdGhpcyA9IHRoaXM7XHJcblx0XHR0aGlzLnNwZWFraW5nID0gdHJ1ZTtcclxuXHRcdHRoaXMuc3BlYWtOZXh0U2VudGVuY2UoKTtcclxuXHR9XHJcblxyXG5cdHNwZWFrVGV4dE9ubHkoKXtcclxuXHRcdHRoaXMudGV4dDJzcGVlY2gucGF1c2UoKTtcclxuXHRcdGxldCBvcHRpb25zOiBTcGVha09wdGlvbnMgPSB7XHJcblx0XHRcdHRleHQ6IHRoaXMucXVlc3Rpb24udGV4dCxcclxuXHRcdFx0cGl0Y2g6IDEuMCxcclxuXHRcdFx0c3BlYWtSYXRlOiAwLjksXHJcblx0XHRcdHZvbHVtZTogMS4wLFxyXG5cdFx0XHRsYW5ndWFnZTogXCJlblwiLFxyXG5cdFx0XHRsb2NhbGU6IFwiZW4tVVNcIixcclxuXHRcdFx0ZmluaXNoZWRDYWxsYmFjazogKCk9PntcclxuXHRcdFx0XHRjb25zb2xlLmxvZyhcInJlYWQgdGhlIGFuc3dlclwiKTtcclxuXHRcdFx0fVxyXG5cdFx0fTtcclxuXHRcdHRoaXMudGV4dDJzcGVlY2guc3BlYWsob3B0aW9ucyk7XHJcblx0fVxyXG4gICBcclxuXHR0b2dnbGVSZWNvcmRpbmcoKTogdm9pZCB7XHJcblx0XHR0aGlzLnJlY29yZGluZyA9ICF0aGlzLnJlY29yZGluZztcclxuXHRcdC8vIGNvbnNvbGUubG9nKHRoaXMucmVjb3JkaW5nKTtcclxuICAgICAgICBpZiAodGhpcy5yZWNvcmRpbmcpIHtcclxuXHRcdFx0Ly8gY29uc29sZS5sb2coXCJ0b2dnbGVSZWNvcmRpbmcgdHJ1ZSBwYXJ0XCIpO1xyXG5cdFx0XHR0aGlzLnNwb2tlbiA9IGZhbHNlO1xyXG4gICAgICAgICAgXHR0aGlzLmxhc3RUcmFuc2NyaXB0aW9uID0gbnVsbDtcclxuICAgICAgICAgIFx0dGhpcy5zdGFydExpc3RlbmluZygpO1xyXG5cdFx0fSBcclxuXHRcdGVsc2Uge1xyXG5cdFx0XHQvLyBjb25zb2xlLmxvZyhcInRvZ2dsZVJlY29yZGluZyB0cnVlIHBhcnRcIik7XHJcbiAgICAgICAgICBcdHRoaXMuc3RvcExpc3RlbmluZygpO1xyXG4gICAgICAgICAgXHRpZiAoIXRoaXMuc3Bva2VuICYmIHRoaXMubGFzdFRyYW5zY3JpcHRpb24gIT09IG51bGwpIHtcclxuICAgICAgICAgICAgXHRhbGVydCh0aGlzLmxhc3RUcmFuc2NyaXB0aW9uKTtcclxuICAgICAgICAgIFx0fVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG5cdHByaXZhdGUgc3RhcnRMaXN0ZW5pbmcoKTogdm9pZCB7XHJcblx0XHQvLyBjb25zb2xlLmxvZyhcIkluc2lkZSBzdGFydGxpc3RlbmluZ1wiKTtcclxuXHRcdGlmICghdGhpcy5yZWNvcmRpbmdBdmFpbGFibGUpIHtcclxuXHRcdFx0Y29uc29sZS5sb2coXCJpbnNpZGUgaWZcIik7XHJcblx0XHRcdGFsZXJ0KHtcclxuXHRcdFx0dGl0bGU6IFwiTm90IHN1cHBvcnRlZFwiLFxyXG5cdFx0XHRtZXNzYWdlOiBcIlNwZWVjaCByZWNvZ25pdGlvbiBub3Qgc3VwcG9ydGVkIG9uIHRoaXMgZGV2aWNlLiBUcnkgYSBkaWZmZXJlbnQgZGV2aWNlIHBsZWFzZS5cIixcclxuXHRcdFx0b2tCdXR0b25UZXh0OiBcIk9oLCBidW1tZXJcIlxyXG5cdFx0XHR9KTtcclxuXHRcdFx0dGhpcy5yZWNvZ25pemVkVGV4dCA9IFwiTm8gc3VwcG9ydCwgU29ycnlcIjtcclxuXHRcdFx0dGhpcy5yZWNvcmRpbmcgPSBmYWxzZTtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cdFx0Ly8gY29uc29sZS5sb2coXCJlbHNlIHBhcnRcIik7XHJcblx0XHR0aGlzLnJlY29yZGluZyA9IHRydWU7XHJcblx0XHR0aGlzLnNwZWVjaDJ0ZXh0LnN0YXJ0TGlzdGVuaW5nKHtcclxuXHRcdFx0bG9jYWxlOiBcImVuLVVTXCIsXHJcblx0XHRcdHJldHVyblBhcnRpYWxSZXN1bHRzOiB0cnVlLFxyXG5cdFx0XHRvblJlc3VsdDogKHRyYW5zY3JpcHRpb246IFNwZWVjaFJlY29nbml0aW9uVHJhbnNjcmlwdGlvbikgPT4ge1xyXG5cdFx0XHRcdC8vIHRoaXMuem9uZS5ydW4oKCkgPT4gdGhpcy5yZWNvZ25pemVkVGV4dCA9IHRyYW5zY3JpcHRpb24udGV4dCk7XHJcblx0XHRcdFx0dGhpcy5sYXN0VHJhbnNjcmlwdGlvbiA9IHRyYW5zY3JpcHRpb24udGV4dDtcclxuXHRcdFx0XHRpZiAodHJhbnNjcmlwdGlvbi5maW5pc2hlZCkge1xyXG5cdFx0XHRcdFx0dGhpcy5zcG9rZW4gPSB0cnVlO1xyXG5cdFx0XHRcdFx0c2V0VGltZW91dCgoKSA9PiBhbGVydCh0cmFuc2NyaXB0aW9uLnRleHQpLCAzMDApO1xyXG5cdFx0XHRcdFx0dGhpcy5zcG9rZW5UZXh0ID0gdHJhbnNjcmlwdGlvbi50ZXh0O1xyXG5cdFx0XHRcdFx0Ly8gYWxlcnQodHJhbnNjcmlwdGlvbi50ZXh0KTtcclxuXHRcdFx0XHRcdHRoaXMuZ2VuZXJhdGVTY29yZSgpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSxcclxuXHRcdH0pLnRoZW4oXHJcblx0XHRcdChzdGFydGVkOiBib29sZWFuKSA9PiB7Y29uc29sZS5sb2coXCJzdGFydGVkIGxpc3RlbmluZ1wiKTt9LFxyXG5cdFx0XHQoZXJyb3JNZXNzYWdlOiBzdHJpbmcpID0+IHtjb25zb2xlLmxvZyhgRXJyb3I6ICR7ZXJyb3JNZXNzYWdlfWApO31cclxuXHRcdCk7XHJcblx0fVxyXG5cclxuXHRwcml2YXRlIGdlbmVyYXRlU2NvcmUoKTogdm9pZCB7XHJcblx0XHRsZXQgc3Bva2VuU2VudGVuY2VzID0gdGhpcy5zcG9rZW5UZXh0LnNwbGl0KFwiIFwiKTtcclxuXHRcdGxldCBnaXZlblNlbnRlbmNlcyA9IHRoaXMucXVlc3Rpb24udGV4dC5zcGxpdChcIiBcIik7XHJcblx0XHRsZXQgdj0wO1xyXG5cdFx0d2hpbGUodjxnaXZlblNlbnRlbmNlcy5sZW5ndGgpe1xyXG5cdFx0XHRnaXZlblNlbnRlbmNlc1t2XS5yZXBsYWNlKCcuJywnJyk7XHJcblx0XHRcdGdpdmVuU2VudGVuY2VzW3ZdLnJlcGxhY2UoJywnLCcnKTtcclxuXHRcdFx0disrO1xyXG5cdFx0fVxyXG5cdFx0bGV0IGk9MDtcclxuXHRcdGxldCBqPTA7XHJcblx0XHRsZXQgY291bnQ9MDtcclxuXHRcdHdoaWxlKGk8c3Bva2VuU2VudGVuY2VzLmxlbmd0aCApe1xyXG5cdFx0XHR3aGlsZShqPGdpdmVuU2VudGVuY2VzLmxlbmd0aCl7XHJcblx0XHRcdFx0aWYoc3Bva2VuU2VudGVuY2VzW2ldLnRvTG93ZXJDYXNlKCkgPT0gZ2l2ZW5TZW50ZW5jZXNbal0udG9Mb3dlckNhc2UoKSl7XHJcblx0XHRcdFx0XHRjb3VudCsrO1xyXG5cdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGorKztcclxuXHRcdFx0fVxyXG5cdFx0XHRpKys7IGo9MDtcclxuXHRcdH1cclxuXHRcdGFsZXJ0KCgoY291bnQvZ2l2ZW5TZW50ZW5jZXMubGVuZ3RoKSoxMDApLnRvRml4ZWQoMikpO1xyXG5cdH1cclxuICAgIFxyXG4gICAgcHJpdmF0ZSBzdG9wTGlzdGVuaW5nKCk6IHZvaWQge1xyXG5cdFx0Ly8gY29uc29sZS5sb2coXCJzdG9wTGlzdGVuaW5nXCIpO1xyXG4gICAgICAgIHRoaXMucmVjb3JkaW5nID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5zcGVlY2gydGV4dC5zdG9wTGlzdGVuaW5nKCkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICBcdGNvbnNvbGUubG9nKFwiU3RvcHBlZCBsaXN0ZW5pbmdcIik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG5cdG5nT25Jbml0KCk6IHZvaWQge1xyXG5cdFx0dGhpcy5zcGVlY2gydGV4dCA9IG5ldyBTcGVlY2hSZWNvZ25pdGlvbigpO1xyXG4gICAgXHR0aGlzLnNwZWVjaDJ0ZXh0LmF2YWlsYWJsZSgpLnRoZW4oYXZhaWwgPT4ge1xyXG4gICAgICBcdFx0dGhpcy5yZWNvcmRpbmdBdmFpbGFibGUgPSBhdmFpbDtcclxuICAgIFx0fSk7XHJcblx0XHQvLyB0aGlzLnRleHQyc3BlZWNoID0gbmV3IFROU1RleHRUb1NwZWVjaCgpO1xyXG5cdFx0dGhpcy5zdWIgPSB0aGlzLnJvdXRlLnBhcmFtcy5zdWJzY3JpYmUocGFyYW1zID0+IHtcclxuXHRcdFx0dGhpcy5wYXRoID0gcGFyYW1zWydwYXRoJ107XHJcblx0XHRcdHRoaXMucGF0aHNlcnZpY2UuZ2V0UXVlc3Rpb25zKHRoaXMucGF0aClcclxuXHRcdFx0XHQuc3Vic2NyaWJlKFxyXG5cdFx0XHRcdFx0KGQ6IFF1ZXN0aW9uW10pID0+IHtcclxuXHRcdFx0XHRcdFx0dGhpcy5xdWVzdGlvbiA9IGRbMF07XHJcblx0XHRcdFx0XHRcdHRoaXMucXVlc3Rpb25zID0gZDtcclxuXHRcdFx0XHRcdFx0dGhpcy52YXJpYWJsZSA9IHRoaXMucXVlc3Rpb24ucXVlc3Q7XHJcblx0XHRcdFx0XHRcdHRoaXMudmFyaWFibGUucmVwbGFjZShcIi5cIixcIj9cIik7XHJcblx0XHRcdFx0XHRcdHRoaXMuc2VudGVuY2VzID0gdGhpcy52YXJpYWJsZS5zcGxpdChcIj8gXCIpO1xyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdChlcnJvcikgPT4ge1xyXG5cdFx0XHRcdFx0XHRjb25zb2xlLmxvZyhlcnJvcik7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0KVxyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHRuZ09uRGVzdHJveSgpIHtcclxuXHRcdHRoaXMuc3ViLnVuc3Vic2NyaWJlKCk7XHJcblx0fVxyXG59Il19