"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var angular_1 = require("nativescript-ui-sidedrawer/angular");
var core_2 = require("@angular/core");
// import { Response } from "@angular/http";
var path_service_1 = require("../../services/path.service");
var router_1 = require("@angular/router");
var nativescript_texttospeech_1 = require("nativescript-texttospeech");
var nativescript_speech_recognition_1 = require("nativescript-speech-recognition");
// import {Slider} from "tns-core-modules/ui/slider";
var QuestionsComponent = /** @class */ (function () {
    function QuestionsComponent(pathservice, route, router) {
        var _this_1 = this;
        this.pathservice = pathservice;
        this.route = route;
        this.router = router;
        this.imagePath = "~/assets/images/dr_sinha/";
        this.showAnswer = false;
        this.speaking = false;
        this.sentenceIndex = -1;
        this.speakAndAnimateFlag = 1;
        this.AvatarImages = ['julia_full.png', 'julia_mouth_wide5.png', 'julia_mouth_wide5.png', 'julia_mouth_narrow_o.png', 'julia_mouth_wide_y.png',
            'julia_mouth_wide5.png', 'julia_mouth_wide_d_f_k_r_s.png', 'julia_mouth_narrow_w.png', 'julia_mouth_narrow_o.png',
            'julia_mouth_wide_d_f_k_r_s.png', 'julia_mouth_narrow_u.png', 'julia_mouth_wide5.png', 'julia_mouth_wide_d_f_k_r_s.png', 'julia_mouth_wide_sh.png',
            'julia_mouth_wide5.png', 'julia_mouth_wide_sh.png', 'julia_mouth_wide_sh.png', 'julia_mouth_wide_th.png', 'julia_mouth_wide_f.png',
            'julia_mouth_wide_sh.png', 'julia_mouth_wide_d_f_k_r_s.png', 'julia_mouth_closed.png'];
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
        if (args.direction == 1 && this.qnum > 0) {
            this.text2speech.pause();
            this.avatarImage.nativeElement.src = this.imagePath + this.AvatarImages[0];
            this.showAnswer = false;
            this.loadQuestion(this.qnum - 1);
        }
        else if (args.direction == 2 && this.qnum < this.questions.length - 1) {
            this.text2speech.pause();
            this.avatarImage.nativeElement.src = this.imagePath + this.AvatarImages[0];
            this.showAnswer = false;
            this.loadQuestion(this.qnum + 1);
        }
    };
    QuestionsComponent.prototype.loadQuestion = function (i) {
        this.question = this.questions[i];
        this.variable = this.question.quest;
        this.variable.replace(".", "?");
        this.sentences = this.variable.split("? ");
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
        this.text2speech.pause();
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
        if (this.recording) {
            this.spoken = false;
            this.lastTranscription = null;
            this.startListening();
        }
        else {
            this.stopListening();
            if (!this.spoken && this.lastTranscription !== null) {
                alert(this.lastTranscription);
            }
        }
    };
    QuestionsComponent.prototype.startListening = function () {
        var _this_1 = this;
        if (!this.recordingAvailable) {
            alert({
                title: "Not supported",
                message: "Speech recognition not supported on this device. Try a different device please.",
                okButtonText: "Oh, bummer"
            });
            this.recognizedText = "No support, Sorry";
            this.recording = false;
            return;
        }
        this.recording = true;
        this.speech2text.startListening({
            returnPartialResults: true,
            onResult: function (transcription) {
                // this.zone.run(() => this.recognizedText = transcription.text);
                _this_1.lastTranscription = transcription.text;
                if (transcription.finished) {
                    _this_1.spoken = true;
                    setTimeout(function () { return alert(transcription.text); }, 300);
                    // alert(transcription.text);
                }
            },
        }).then(function (started) { console.log("started listening"); }, function (errorMessage) { console.log("Error: " + errorMessage); });
    };
    QuestionsComponent.prototype.stopListening = function () {
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
        this.text2speech = new nativescript_texttospeech_1.TNSTextToSpeech();
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
        __metadata("design:paramtypes", [path_service_1.PathService, router_1.ActivatedRoute, router_1.Router])
    ], QuestionsComponent);
    return QuestionsComponent;
}());
exports.QuestionsComponent = QuestionsComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlc3Rpb25zLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInF1ZXN0aW9ucy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBc0Q7QUFDdEQsOERBQTRGO0FBQzVGLHNDQUE2RDtBQUM3RCw0Q0FBNEM7QUFDNUMsNERBQTBEO0FBQzFELDBDQUF5RDtBQUd6RCx1RUFBMEU7QUFDMUUsbUZBQThIO0FBRTlILHFEQUFxRDtBQVVyRDtJQXdDQyw0QkFBb0IsV0FBd0IsRUFBVSxLQUFxQixFQUFVLE1BQWM7UUFBbkcsbUJBY0M7UUFkbUIsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFBVSxVQUFLLEdBQUwsS0FBSyxDQUFnQjtRQUFVLFdBQU0sR0FBTixNQUFNLENBQVE7UUEvQm5HLGNBQVMsR0FBVywyQkFBMkIsQ0FBQztRQU1oRCxlQUFVLEdBQVksS0FBSyxDQUFDO1FBQzVCLGFBQVEsR0FBWSxLQUFLLENBQUM7UUFDMUIsa0JBQWEsR0FBVyxDQUFDLENBQUMsQ0FBQztRQUczQix3QkFBbUIsR0FBVyxDQUFDLENBQUM7UUFFaEMsaUJBQVksR0FBRyxDQUFDLGdCQUFnQixFQUFDLHVCQUF1QixFQUFDLHVCQUF1QixFQUFDLDBCQUEwQixFQUFDLHdCQUF3QjtZQUNwSSx1QkFBdUIsRUFBQyxnQ0FBZ0MsRUFBQywwQkFBMEIsRUFBQywwQkFBMEI7WUFDOUcsZ0NBQWdDLEVBQUMsMEJBQTBCLEVBQUMsdUJBQXVCLEVBQUMsZ0NBQWdDLEVBQUMseUJBQXlCO1lBQzlJLHVCQUF1QixFQUFDLHlCQUF5QixFQUFDLHlCQUF5QixFQUFDLHlCQUF5QixFQUFDLHdCQUF3QjtZQUM5SCx5QkFBeUIsRUFBQyxnQ0FBZ0MsRUFBQyx3QkFBd0IsQ0FBQyxDQUFDO1FBQ3JGLGVBQVUsR0FBRyxHQUFHLENBQUM7UUFLZCxzQkFBaUIsR0FBWSxLQUFLLENBQUM7UUFDbkMsY0FBUyxHQUFZLEtBQUssQ0FBQztRQUMzQixzQkFB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WUFDbkIsU0FBUyxFQUFFLENBQUMsMEJBQVcsQ0FBQztZQUN4QixXQUFXLEVBQUUsNEJBQTRCO1lBQ3pDLFNBQVMsRUFBRSxDQUFDLDJCQUEyQixDQUFDO1NBQ3hDLENBQUM7eUNBMENnQywwQkFBVyxFQUFpQix1QkFBYyxFQUFrQixlQUFNO09BeEN2RixrQkFBa0IsQ0ErTjlCO0lBQUQseUJBQUM7Q0FBQSxBQS9ORCxJQStOQztBQS9OWSxnREFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBWaWV3Q2hpbGQsIEVsZW1lbnRSZWYgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBSYWRTaWRlRHJhd2VyQ29tcG9uZW50LCBTaWRlRHJhd2VyVHlwZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtdWktc2lkZWRyYXdlci9hbmd1bGFyXCI7XHJcbmltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBPbkRlc3Ryb3kgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG4vLyBpbXBvcnQgeyBSZXNwb25zZSB9IGZyb20gXCJAYW5ndWxhci9odHRwXCI7XHJcbmltcG9ydCB7IFBhdGhTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL3BhdGguc2VydmljZVwiO1xyXG5pbXBvcnQgeyBSb3V0ZXIsIEFjdGl2YXRlZFJvdXRlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHsgUXVlc3Rpb24gfSBmcm9tIFwiLi4vLi4vY2xhc3Nlcy9xdWVzdGlvblwiO1xyXG5pbXBvcnQgeyBTd2lwZUdlc3R1cmVFdmVudERhdGEgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9nZXN0dXJlc1wiO1xyXG5pbXBvcnQgeyBUTlNUZXh0VG9TcGVlY2gsIFNwZWFrT3B0aW9ucyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtdGV4dHRvc3BlZWNoXCI7XHJcbmltcG9ydCB7IFNwZWVjaFJlY29nbml0aW9uLCBTcGVlY2hSZWNvZ25pdGlvblRyYW5zY3JpcHRpb24sIFNwZWVjaFJlY29nbml0aW9uT3B0aW9ucyB9IGZyb20gJ25hdGl2ZXNjcmlwdC1zcGVlY2gtcmVjb2duaXRpb24nO1xyXG5pbXBvcnQgeyBlcnJvciB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3RyYWNlL3RyYWNlXCI7XHJcbi8vIGltcG9ydCB7U2xpZGVyfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9zbGlkZXJcIjtcclxuXHJcbkBDb21wb25lbnQoe1xyXG5cdHNlbGVjdG9yOiBcIlF1ZXN0aW9uc1wiLFxyXG5cdG1vZHVsZUlkOiBtb2R1bGUuaWQsXHJcblx0cHJvdmlkZXJzOiBbUGF0aFNlcnZpY2VdLFxyXG5cdHRlbXBsYXRlVXJsOiBcIi4vcXVlc3Rpb25zLmNvbXBvbmVudC5odG1sXCIsXHJcblx0c3R5bGVVcmxzOiBbJy4vcXVlc3Rpb25zLmNvbXBvbmVudC5jc3MnXVxyXG59KVxyXG5cclxuZXhwb3J0IGNsYXNzIFF1ZXN0aW9uc0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcclxuXHRAVmlld0NoaWxkKFJhZFNpZGVEcmF3ZXJDb21wb25lbnQpIHB1YmxpYyBkcmF3ZXJDb21wb25lbnQ6IFJhZFNpZGVEcmF3ZXJDb21wb25lbnQ7XHJcblx0QFZpZXdDaGlsZChcImF2YXRhclwiKSBhdmF0YXJJbWFnZTpFbGVtZW50UmVmO1xyXG5cdFxyXG5cdG9uT3BlbkRyYXdlclRhcCgpIHtcclxuXHRcdHRoaXMuZHJhd2VyQ29tcG9uZW50LnNpZGVEcmF3ZXIuc2hvd0RyYXdlcigpO1xyXG5cdH1cclxuXHJcblx0cGF0aDogc3RyaW5nO1xyXG5cdGltYWdlUGF0aDogc3RyaW5nID0gXCJ+L2Fzc2V0cy9pbWFnZXMvZHJfc2luaGEvXCI7XHJcblx0cXVlc3Rpb25zOiBRdWVzdGlvbltdO1xyXG5cdHF1ZXN0aW9uOiBRdWVzdGlvbjtcclxuXHRxbnVtOiBudW1iZXI7XHJcblx0dGl0bGU6c3RyaW5nO1xyXG5cdHZhcmlhYmxlOiBzdHJpbmc7XHJcblx0c2hvd0Fuc3dlcjogYm9vbGVhbiA9IGZhbHNlO1xyXG5cdHNwZWFraW5nOiBib29sZWFuID0gZmFsc2U7XHJcblx0c2VudGVuY2VJbmRleDogbnVtYmVyID0gLTE7XHJcblx0c2VudGVuY2VzOiBBcnJheTxzdHJpbmc+O1xyXG5cdHNwZWFraW50ZXJ2YWw6IG51bWJlcjtcclxuXHRzcGVha0FuZEFuaW1hdGVGbGFnOiBudW1iZXIgPSAxO1xyXG5cdHByaXZhdGUgc3ViOiBhbnk7XHJcblx0QXZhdGFySW1hZ2VzID0gWydqdWxpYV9mdWxsLnBuZycsJ2p1bGlhX21vdXRoX3dpZGU1LnBuZycsJ2p1bGlhX21vdXRoX3dpZGU1LnBuZycsJ2p1bGlhX21vdXRoX25hcnJvd19vLnBuZycsJ2p1bGlhX21vdXRoX3dpZGVfeS5wbmcnLFxyXG5cdCdqdWxpYV9tb3V0aF93aWRlNS5wbmcnLCdqdWxpYV9tb3V0aF93aWRlX2RfZl9rX3Jfcy5wbmcnLCdqdWxpYV9tb3V0aF9uYXJyb3dfdy5wbmcnLCdqdWxpYV9tb3V0aF9uYXJyb3dfby5wbmcnLFxyXG5cdCdqdWxpYV9tb3V0aF93aWRlX2RfZl9rX3Jfcy5wbmcnLCdqdWxpYV9tb3V0aF9uYXJyb3dfdS5wbmcnLCdqdWxpYV9tb3V0aF93aWRlNS5wbmcnLCdqdWxpYV9tb3V0aF93aWRlX2RfZl9rX3Jfcy5wbmcnLCdqdWxpYV9tb3V0aF93aWRlX3NoLnBuZycsXHJcblx0J2p1bGlhX21vdXRoX3dpZGU1LnBuZycsJ2p1bGlhX21vdXRoX3dpZGVfc2gucG5nJywnanVsaWFfbW91dGhfd2lkZV9zaC5wbmcnLCdqdWxpYV9tb3V0aF93aWRlX3RoLnBuZycsJ2p1bGlhX21vdXRoX3dpZGVfZi5wbmcnLFxyXG5cdCdqdWxpYV9tb3V0aF93aWRlX3NoLnBuZycsJ2p1bGlhX21vdXRoX3dpZGVfZF9mX2tfcl9zLnBuZycsJ2p1bGlhX21vdXRoX2Nsb3NlZC5wbmcnXTtcclxuXHRzcGVlY2hSYXRlID0gMC45O1xyXG5cclxuXHRwcml2YXRlIHRleHQyc3BlZWNoOiBUTlNUZXh0VG9TcGVlY2g7XHJcblx0cHJpdmF0ZSBzcGVlY2gydGV4dDogU3BlZWNoUmVjb2duaXRpb247XHJcblx0cHJpdmF0ZSBzcGVha09wdGlvbnMgOiBTcGVha09wdGlvbnM7XHJcbiAgICBtaWNyb3Bob25lRW5hYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgcmVjb3JkaW5nOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBsYXN0VHJhbnNjcmlwdGlvbjogc3RyaW5nID0gbnVsbDtcclxuICAgIHNwb2tlbjogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgcmVjb2duaXplZFRleHQ6IHN0cmluZztcclxuICAgIHBpdGNoOiBudW1iZXIgPSAxMDA7XHJcblx0cHJpdmF0ZSByZWNvcmRpbmdBdmFpbGFibGU6IGJvb2xlYW47XHJcblxyXG5cdGNvbnN0cnVjdG9yKHByaXZhdGUgcGF0aHNlcnZpY2U6IFBhdGhTZXJ2aWNlLCBwcml2YXRlIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSwgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlcikge1xyXG5cdFx0dGhpcy5xdWVzdGlvbnMgPSBbXTtcclxuXHRcdHRoaXMucW51bSA9IDE7XHJcblx0XHR2YXIgdSA9IGRlY29kZVVSSShyb3V0ZXIudXJsKTtcclxuXHRcdHRoaXMudGl0bGUgPSB1LnN1YnN0cmluZyh1Lmxhc3RJbmRleE9mKCclMkYnKSszLCB1Lmxhc3RJbmRleE9mKCcuJykpO1xyXG5cdFx0dGhpcy5zcGVha09wdGlvbnMgPSB7XHJcblx0XHRcdHRleHQ6IFwiUXVlc3Rpb24gMSwgXCIsXHJcblx0XHRcdHBpdGNoOiAxLjAsXHJcblx0XHRcdHNwZWFrUmF0ZTogMC45LFxyXG5cdFx0XHR2b2x1bWU6IDEuMCxcclxuXHRcdFx0bGFuZ3VhZ2U6XCJlblwiLFxyXG5cdFx0XHRsb2NhbGU6XCJlbi1VU1wiLFxyXG5cdFx0XHRmaW5pc2hlZENhbGxiYWNrOiAoKT0+e3RoaXMuc3BlYWtOZXh0U2VudGVuY2UoKTt9XHJcblx0XHR9O1xyXG5cdH1cclxuXHJcblx0b25Td2lwZShhcmdzOiBTd2lwZUdlc3R1cmVFdmVudERhdGEpIHtcclxuXHRcdGlmIChhcmdzLmRpcmVjdGlvbiA9PSAxICYmIHRoaXMucW51bSA+IDApIHtcdFxyXG5cdFx0XHR0aGlzLnRleHQyc3BlZWNoLnBhdXNlKCk7XHJcblx0XHRcdHRoaXMuYXZhdGFySW1hZ2UubmF0aXZlRWxlbWVudC5zcmMgPSB0aGlzLmltYWdlUGF0aCArIHRoaXMuQXZhdGFySW1hZ2VzWzBdO1xyXG5cdFx0XHR0aGlzLnNob3dBbnN3ZXIgPSBmYWxzZTtcclxuXHRcdFx0dGhpcy5sb2FkUXVlc3Rpb24odGhpcy5xbnVtIC0gMSk7XHJcblx0XHR9IGVsc2UgaWYgKGFyZ3MuZGlyZWN0aW9uID09IDIgJiYgdGhpcy5xbnVtIDwgdGhpcy5xdWVzdGlvbnMubGVuZ3RoIC0gMSkge1xyXG5cdFx0XHR0aGlzLnRleHQyc3BlZWNoLnBhdXNlKCk7XHJcblx0XHRcdHRoaXMuYXZhdGFySW1hZ2UubmF0aXZlRWxlbWVudC5zcmMgPSB0aGlzLmltYWdlUGF0aCArIHRoaXMuQXZhdGFySW1hZ2VzWzBdO1xyXG5cdFx0XHR0aGlzLnNob3dBbnN3ZXIgPSBmYWxzZTtcclxuXHRcdFx0dGhpcy5sb2FkUXVlc3Rpb24odGhpcy5xbnVtICsgMSk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRsb2FkUXVlc3Rpb24oaTogbnVtYmVyKSB7XHJcblx0XHR0aGlzLnF1ZXN0aW9uID0gdGhpcy5xdWVzdGlvbnNbaV07XHJcblx0XHR0aGlzLnZhcmlhYmxlID0gdGhpcy5xdWVzdGlvbi5xdWVzdDtcclxuXHRcdHRoaXMudmFyaWFibGUucmVwbGFjZShcIi5cIixcIj9cIik7XHJcblx0XHR0aGlzLnNlbnRlbmNlcyA9IHRoaXMudmFyaWFibGUuc3BsaXQoXCI/IFwiKTtcclxuXHRcdGNvbnNvbGUubG9nKHRoaXMuc2VudGVuY2VzKTtcclxuXHRcdHRoaXMuc2VudGVuY2VJbmRleCA9IC0xO1xyXG5cdFx0aWYodGhpcy5zcGVha2ludGVydmFsKSBjbGVhckludGVydmFsKHRoaXMuc3BlYWtpbnRlcnZhbCk7XHJcblx0XHR0aGlzLnNwZWFraW5nID0gZmFsc2U7XHJcblx0XHR0aGlzLnNwZWFrQW5kQW5pbWF0ZUZsYWcgPSAxO1xyXG5cdFx0dGhpcy5xbnVtID0gaTtcclxuXHRcdC8vIHRoaXMuc3BlYWtUaXRsZSgpO1xyXG5cdH1cclxuXHJcblx0ZGlzcGxheUFuc3dlcigpe1xyXG5cdFx0dGhpcy5zaG93QW5zd2VyID0gIXRoaXMuc2hvd0Fuc3dlcjtcclxuXHR9XHJcblx0XHJcblx0c3BlYWtOZXh0U2VudGVuY2UoKXtcclxuXHRcdGNvbnNvbGUubG9nKFwic3BlYWtOZXh0U2VudGVuY2UgY2FsbGVkIFwiLCB0aGlzLnNwZWFrQW5kQW5pbWF0ZUZsYWcsIHRoaXMuc3BlYWtpbmcsIHRoaXMuc2VudGVuY2VJbmRleCk7XHJcblx0XHR0aGlzLnNwZWFrQW5kQW5pbWF0ZUZsYWcrKztcclxuXHRcdGlmKHRoaXMuc3BlYWtpbmcgJiYgdGhpcy5zcGVha0FuZEFuaW1hdGVGbGFnID09IDIpIHtcclxuXHRcdFx0dGhpcy5zcGVha0FuZEFuaW1hdGVGbGFnID0gMDtcclxuXHRcdFx0dGhpcy5zZW50ZW5jZUluZGV4Kys7XHJcblx0XHRcdGlmKHRoaXMuc2VudGVuY2VJbmRleDx0aGlzLnNlbnRlbmNlcy5sZW5ndGgpIHtcclxuXHRcdFx0XHR0aGlzLnNwZWFrT3B0aW9ucy50ZXh0ID0gdGhpcy5zZW50ZW5jZXNbdGhpcy5zZW50ZW5jZUluZGV4XTtcclxuXHRcdFx0XHR0aGlzLnRleHQyc3BlZWNoLnNwZWFrKHRoaXMuc3BlYWtPcHRpb25zKVxyXG5cdFx0XHRcdC50aGVuKCgpPT57XHJcblx0XHRcdFx0XHR0aGlzLmFuaW1hdGVBdmF0YXIoKTtcclxuXHRcdFx0XHRcdGNvbnNvbGUubG9nKFwiaW4gdGhlblwiKTt9LCBcclxuXHRcdFx0XHRcdChlcnIpPT57Y29uc29sZS5sb2coZXJyKTt9KTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHR0aGlzLnNlbnRlbmNlSW5kZXggPSAtMTtcclxuXHRcdFx0XHR0aGlzLnNwZWFraW5nID0gZmFsc2U7XHJcblx0XHRcdFx0dGhpcy5zcGVha0FuZEFuaW1hdGVGbGFnID0gMTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0YW5pbWF0ZUF2YXRhcigpOiB2b2lkIHtcclxuXHRcdGxldCBpID0gMDtcclxuICAgICAgICB0aGlzLnNwZWFraW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKSA9PiB7IFxyXG5cdFx0XHR0aGlzLmF2YXRhckltYWdlLm5hdGl2ZUVsZW1lbnQuc3JjID0gdGhpcy5pbWFnZVBhdGggKyB0aGlzLkF2YXRhckltYWdlc1t0aGlzLnF1ZXN0aW9uLnZpc2VtZXNbdGhpcy5zZW50ZW5jZUluZGV4XVtpXV07XHJcblx0XHRcdFxyXG4gICAgICAgICAgICBpKys7XHJcbiAgICAgICAgICAgIGlmIChpID09IHRoaXMucXVlc3Rpb24udmlzZW1lc1t0aGlzLnNlbnRlbmNlSW5kZXhdLmxlbmd0aCkge1xyXG5cdFx0XHRcdGNsZWFySW50ZXJ2YWwodGhpcy5zcGVha2ludGVydmFsKTtcclxuXHRcdFx0XHR0aGlzLnNwZWFrTmV4dFNlbnRlbmNlKCk7XHJcblx0XHRcdH1cclxuXHRcdH0sIHRoaXMuc3BlZWNoUmF0ZSo4NSk7XHJcblx0fVxyXG5cclxuXHR0ZXh0VG9TcGVlY2goKXtcclxuXHRcdHRoaXMudGV4dDJzcGVlY2gucGF1c2UoKTtcclxuXHRcdHZhciBfdGhpcyA9IHRoaXM7XHJcblx0XHR0aGlzLnNwZWFraW5nID0gdHJ1ZTtcclxuXHRcdHRoaXMuc3BlYWtOZXh0U2VudGVuY2UoKTtcclxuXHR9XHJcblxyXG5cdHNwZWFrVGV4dE9ubHkoKXtcclxuXHRcdHRoaXMudGV4dDJzcGVlY2gucGF1c2UoKTtcclxuXHRcdGxldCBvcHRpb25zOiBTcGVha09wdGlvbnMgPSB7XHJcblx0XHRcdHRleHQ6IHRoaXMucXVlc3Rpb24udGV4dCxcclxuXHRcdFx0cGl0Y2g6IDEuMCxcclxuXHRcdFx0c3BlYWtSYXRlOiAwLjksXHJcblx0XHRcdHZvbHVtZTogMS4wLFxyXG5cdFx0XHRsYW5ndWFnZTogXCJlblwiLFxyXG5cdFx0XHRsb2NhbGU6IFwiZW4tVVNcIixcclxuXHRcdFx0ZmluaXNoZWRDYWxsYmFjazogKCk9PntcclxuXHRcdFx0XHRjb25zb2xlLmxvZyhcInJlYWQgdGhlIGFuc3dlclwiKTtcclxuXHRcdFx0fVxyXG5cdFx0fTtcclxuXHRcdHRoaXMudGV4dDJzcGVlY2guc3BlYWsob3B0aW9ucyk7XHJcblx0fVxyXG4gICBcclxuXHR0b2dnbGVSZWNvcmRpbmcoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5yZWNvcmRpbmcgPSAhdGhpcy5yZWNvcmRpbmc7XHJcbiAgICAgICAgaWYgKHRoaXMucmVjb3JkaW5nKSB7XHJcblx0XHRcdHRoaXMuc3Bva2VuID0gZmFsc2U7XHJcbiAgICAgICAgICBcdHRoaXMubGFzdFRyYW5zY3JpcHRpb24gPSBudWxsO1xyXG4gICAgICAgICAgXHR0aGlzLnN0YXJ0TGlzdGVuaW5nKCk7XHJcblx0XHR9IFxyXG5cdFx0ZWxzZSB7XHJcbiAgICAgICAgICBcdHRoaXMuc3RvcExpc3RlbmluZygpO1xyXG4gICAgICAgICAgXHRpZiAoIXRoaXMuc3Bva2VuICYmIHRoaXMubGFzdFRyYW5zY3JpcHRpb24gIT09IG51bGwpIHtcclxuICAgICAgICAgICAgXHRhbGVydCh0aGlzLmxhc3RUcmFuc2NyaXB0aW9uKTtcclxuICAgICAgICAgIFx0fVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG5cdHByaXZhdGUgc3RhcnRMaXN0ZW5pbmcoKTogdm9pZCB7XHJcblx0XHRpZiAoIXRoaXMucmVjb3JkaW5nQXZhaWxhYmxlKSB7XHJcblx0XHRcdGFsZXJ0KHtcclxuXHRcdFx0dGl0bGU6IFwiTm90IHN1cHBvcnRlZFwiLFxyXG5cdFx0XHRtZXNzYWdlOiBcIlNwZWVjaCByZWNvZ25pdGlvbiBub3Qgc3VwcG9ydGVkIG9uIHRoaXMgZGV2aWNlLiBUcnkgYSBkaWZmZXJlbnQgZGV2aWNlIHBsZWFzZS5cIixcclxuXHRcdFx0b2tCdXR0b25UZXh0OiBcIk9oLCBidW1tZXJcIlxyXG5cdFx0XHR9KTtcclxuXHRcdFx0dGhpcy5yZWNvZ25pemVkVGV4dCA9IFwiTm8gc3VwcG9ydCwgU29ycnlcIjtcclxuXHRcdFx0dGhpcy5yZWNvcmRpbmcgPSBmYWxzZTtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cdFx0dGhpcy5yZWNvcmRpbmcgPSB0cnVlO1xyXG5cdFx0dGhpcy5zcGVlY2gydGV4dC5zdGFydExpc3RlbmluZyh7XHJcblx0XHRcdHJldHVyblBhcnRpYWxSZXN1bHRzOiB0cnVlLFxyXG5cdFx0XHRvblJlc3VsdDogKHRyYW5zY3JpcHRpb246IFNwZWVjaFJlY29nbml0aW9uVHJhbnNjcmlwdGlvbikgPT4ge1xyXG5cdFx0XHRcdC8vIHRoaXMuem9uZS5ydW4oKCkgPT4gdGhpcy5yZWNvZ25pemVkVGV4dCA9IHRyYW5zY3JpcHRpb24udGV4dCk7XHJcblx0XHRcdFx0dGhpcy5sYXN0VHJhbnNjcmlwdGlvbiA9IHRyYW5zY3JpcHRpb24udGV4dDtcclxuXHRcdFx0XHRpZiAodHJhbnNjcmlwdGlvbi5maW5pc2hlZCkge1xyXG5cdFx0XHRcdFx0dGhpcy5zcG9rZW4gPSB0cnVlO1xyXG5cdFx0XHRcdFx0c2V0VGltZW91dCgoKSA9PiBhbGVydCh0cmFuc2NyaXB0aW9uLnRleHQpLCAzMDApO1xyXG5cdFx0XHRcdFx0Ly8gYWxlcnQodHJhbnNjcmlwdGlvbi50ZXh0KTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0sXHJcblx0XHR9KS50aGVuKFxyXG5cdFx0XHQoc3RhcnRlZDogYm9vbGVhbikgPT4ge2NvbnNvbGUubG9nKFwic3RhcnRlZCBsaXN0ZW5pbmdcIik7fSxcclxuXHRcdFx0KGVycm9yTWVzc2FnZTogc3RyaW5nKSA9PiB7Y29uc29sZS5sb2coYEVycm9yOiAke2Vycm9yTWVzc2FnZX1gKTt9XHJcblx0XHQpO1xyXG5cdH1cclxuICAgIFxyXG4gICAgcHJpdmF0ZSBzdG9wTGlzdGVuaW5nKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMucmVjb3JkaW5nID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5zcGVlY2gydGV4dC5zdG9wTGlzdGVuaW5nKCkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICBcdGNvbnNvbGUubG9nKFwiU3RvcHBlZCBsaXN0ZW5pbmdcIik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG5cdG5nT25Jbml0KCk6IHZvaWQge1xyXG5cdFx0dGhpcy5zcGVlY2gydGV4dCA9IG5ldyBTcGVlY2hSZWNvZ25pdGlvbigpO1xyXG4gICAgXHR0aGlzLnNwZWVjaDJ0ZXh0LmF2YWlsYWJsZSgpLnRoZW4oYXZhaWwgPT4ge1xyXG4gICAgICBcdFx0dGhpcy5yZWNvcmRpbmdBdmFpbGFibGUgPSBhdmFpbDtcclxuICAgIFx0fSk7XHJcblx0XHR0aGlzLnRleHQyc3BlZWNoID0gbmV3IFROU1RleHRUb1NwZWVjaCgpO1xyXG5cdFx0dGhpcy5zdWIgPSB0aGlzLnJvdXRlLnBhcmFtcy5zdWJzY3JpYmUocGFyYW1zID0+IHtcclxuXHRcdFx0dGhpcy5wYXRoID0gcGFyYW1zWydwYXRoJ107XHJcblx0XHRcdHRoaXMucGF0aHNlcnZpY2UuZ2V0UXVlc3Rpb25zKHRoaXMucGF0aClcclxuXHRcdFx0XHQuc3Vic2NyaWJlKFxyXG5cdFx0XHRcdFx0KGQ6IFF1ZXN0aW9uW10pID0+IHtcclxuXHRcdFx0XHRcdFx0dGhpcy5xdWVzdGlvbiA9IGRbMF07XHJcblx0XHRcdFx0XHRcdHRoaXMucXVlc3Rpb25zID0gZDtcclxuXHRcdFx0XHRcdFx0dGhpcy52YXJpYWJsZSA9IHRoaXMucXVlc3Rpb24ucXVlc3Q7XHJcblx0XHRcdFx0XHRcdHRoaXMudmFyaWFibGUucmVwbGFjZShcIi5cIixcIj9cIik7XHJcblx0XHRcdFx0XHRcdHRoaXMuc2VudGVuY2VzID0gdGhpcy52YXJpYWJsZS5zcGxpdChcIj8gXCIpO1xyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdChlcnJvcikgPT4ge1xyXG5cdFx0XHRcdFx0XHRjb25zb2xlLmxvZyhlcnJvcik7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0KVxyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHRuZ09uRGVzdHJveSgpIHtcclxuXHRcdHRoaXMuc3ViLnVuc3Vic2NyaWJlKCk7XHJcblx0fVxyXG59Il19