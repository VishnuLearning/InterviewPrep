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
// import { error } from "tns-core-modules/trace/trace";
// import {Slider} from "tns-core-modules/ui/slider";
var QuestionsComponent = /** @class */ (function () {
    function QuestionsComponent(text2speech, pathservice, route, router) {
        var _this_1 = this;
        this.text2speech = text2speech;
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
        alert((count / givenSentences.length) * 100);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlc3Rpb25zLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInF1ZXN0aW9ucy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBc0Q7QUFDdEQsOERBQTRGO0FBQzVGLHNDQUE2RDtBQUM3RCw0Q0FBNEM7QUFDNUMsNERBQTBEO0FBQzFELDBDQUF5RDtBQUd6RCx1RUFBMEU7QUFDMUUsbUZBQThIO0FBQzlILHdEQUF3RDtBQUN4RCxxREFBcUQ7QUFVckQ7SUF3Q0MsNEJBQW9CLFdBQTRCLEVBQVUsV0FBd0IsRUFBVSxLQUFxQixFQUFVLE1BQWM7UUFBekksbUJBY0M7UUFkbUIsZ0JBQVcsR0FBWCxXQUFXLENBQWlCO1FBQVUsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFBVSxVQUFLLEdBQUwsS0FBSyxDQUFnQjtRQUFVLFdBQU0sR0FBTixNQUFNLENBQVE7UUEvQnpJLGNBQVMsR0FBVywyQkFBMkIsQ0FBQztRQU1oRCxlQUFVLEdBQVksS0FBSyxDQUFDO1FBQzVCLGFBQVEsR0FBWSxLQUFLLENBQUM7UUFDMUIsa0JBQWEsR0FBVyxDQUFDLENBQUMsQ0FBQztRQUczQix3QkFBbUIsR0FBVyxDQUFDLENBQUM7UUFFaEMsaUJBQVksR0FBRyxDQUFDLGdCQUFnQixFQUFDLHVCQUF1QixFQUFDLHVCQUF1QixFQUFDLDBCQUEwQixFQUFDLHdCQUF3QjtZQUNwSSx1QkFBdUIsRUFBQyxnQ0FBZ0MsRUFBQywwQkFBMEIsRUFBQywwQkFBMEI7WUFDOUcsZ0NBQWdDLEVBQUMsMEJBQTBCLEVBQUMsdUJBQXVCLEVBQUMsZ0NBQWdDLEVBQUMseUJBQXlCO1lBQzlJLHVCQUF1QixFQUFDLHlCQUF5QixFQUFDLHlCQUF5QixFQUFDLHlCQUF5QixFQUFDLHdCQUF3QjtZQUM5SCx5QkFBeUIsRUFBQyxnQ0FBZ0MsRUFBQyx3QkFBd0IsQ0FBQyxDQUFDO1FBQ3JGLGVBQVUsR0FBRyxHQUFHLENBQUM7UUFJZCxzQkFBaUIs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O1lBQ3pDLFNBQVMsRUFBRSxDQUFDLDJCQUEyQixDQUFDO1NBQ3hDLENBQUM7eUNBMENnQywyQ0FBZSxFQUF1QiwwQkFBVyxFQUFpQix1QkFBYyxFQUFrQixlQUFNO09BeEM3SCxrQkFBa0IsQ0FrUjlCO0lBQUQseUJBQUM7Q0FBQSxBQWxSRCxJQWtSQztBQWxSWSxnREFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBWaWV3Q2hpbGQsIEVsZW1lbnRSZWYgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBSYWRTaWRlRHJhd2VyQ29tcG9uZW50LCBTaWRlRHJhd2VyVHlwZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtdWktc2lkZWRyYXdlci9hbmd1bGFyXCI7XHJcbmltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBPbkRlc3Ryb3kgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG4vLyBpbXBvcnQgeyBSZXNwb25zZSB9IGZyb20gXCJAYW5ndWxhci9odHRwXCI7XHJcbmltcG9ydCB7IFBhdGhTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL3BhdGguc2VydmljZVwiO1xyXG5pbXBvcnQgeyBSb3V0ZXIsIEFjdGl2YXRlZFJvdXRlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHsgUXVlc3Rpb24gfSBmcm9tIFwiLi4vLi4vY2xhc3Nlcy9xdWVzdGlvblwiO1xyXG5pbXBvcnQgeyBTd2lwZUdlc3R1cmVFdmVudERhdGEgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9nZXN0dXJlc1wiO1xyXG5pbXBvcnQgeyBUTlNUZXh0VG9TcGVlY2gsIFNwZWFrT3B0aW9ucyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtdGV4dHRvc3BlZWNoXCI7XHJcbmltcG9ydCB7IFNwZWVjaFJlY29nbml0aW9uLCBTcGVlY2hSZWNvZ25pdGlvblRyYW5zY3JpcHRpb24sIFNwZWVjaFJlY29nbml0aW9uT3B0aW9ucyB9IGZyb20gJ25hdGl2ZXNjcmlwdC1zcGVlY2gtcmVjb2duaXRpb24nO1xyXG4vLyBpbXBvcnQgeyBlcnJvciB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3RyYWNlL3RyYWNlXCI7XHJcbi8vIGltcG9ydCB7U2xpZGVyfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9zbGlkZXJcIjtcclxuXHJcbkBDb21wb25lbnQoe1xyXG5cdHNlbGVjdG9yOiBcIlF1ZXN0aW9uc1wiLFxyXG5cdG1vZHVsZUlkOiBtb2R1bGUuaWQsXHJcblx0cHJvdmlkZXJzOiBbUGF0aFNlcnZpY2VdLFxyXG5cdHRlbXBsYXRlVXJsOiBcIi4vcXVlc3Rpb25zLmNvbXBvbmVudC5odG1sXCIsXHJcblx0c3R5bGVVcmxzOiBbJy4vcXVlc3Rpb25zLmNvbXBvbmVudC5jc3MnXVxyXG59KVxyXG5cclxuZXhwb3J0IGNsYXNzIFF1ZXN0aW9uc0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcclxuXHRAVmlld0NoaWxkKFJhZFNpZGVEcmF3ZXJDb21wb25lbnQpIHB1YmxpYyBkcmF3ZXJDb21wb25lbnQ6IFJhZFNpZGVEcmF3ZXJDb21wb25lbnQ7XHJcblx0QFZpZXdDaGlsZChcImF2YXRhclwiKSBhdmF0YXJJbWFnZTpFbGVtZW50UmVmO1xyXG5cdFxyXG5cdG9uT3BlbkRyYXdlclRhcCgpIHtcclxuXHRcdHRoaXMuZHJhd2VyQ29tcG9uZW50LnNpZGVEcmF3ZXIuc2hvd0RyYXdlcigpO1xyXG5cdH1cclxuXHJcblx0cGF0aDogc3RyaW5nO1xyXG5cdGltYWdlUGF0aDogc3RyaW5nID0gXCJ+L2Fzc2V0cy9pbWFnZXMvZHJfc2luaGEvXCI7XHJcblx0cXVlc3Rpb25zOiBRdWVzdGlvbltdO1xyXG5cdHF1ZXN0aW9uOiBRdWVzdGlvbjtcclxuXHRxbnVtOiBudW1iZXI7XHJcblx0dGl0bGU6c3RyaW5nO1xyXG5cdHZhcmlhYmxlOiBzdHJpbmc7XHJcblx0c2hvd0Fuc3dlcjogYm9vbGVhbiA9IGZhbHNlO1xyXG5cdHNwZWFraW5nOiBib29sZWFuID0gZmFsc2U7XHJcblx0c2VudGVuY2VJbmRleDogbnVtYmVyID0gLTE7XHJcblx0c2VudGVuY2VzOiBBcnJheTxzdHJpbmc+O1xyXG5cdHNwZWFraW50ZXJ2YWw6IG51bWJlcjtcclxuXHRzcGVha0FuZEFuaW1hdGVGbGFnOiBudW1iZXIgPSAxO1xyXG5cdHByaXZhdGUgc3ViOiBhbnk7XHJcblx0QXZhdGFySW1hZ2VzID0gWydqdWxpYV9mdWxsLnBuZycsJ2p1bGlhX21vdXRoX3dpZGU1LnBuZycsJ2p1bGlhX21vdXRoX3dpZGU1LnBuZycsJ2p1bGlhX21vdXRoX25hcnJvd19vLnBuZycsJ2p1bGlhX21vdXRoX3dpZGVfeS5wbmcnLFxyXG5cdCdqdWxpYV9tb3V0aF93aWRlNS5wbmcnLCdqdWxpYV9tb3V0aF93aWRlX2RfZl9rX3Jfcy5wbmcnLCdqdWxpYV9tb3V0aF9uYXJyb3dfdy5wbmcnLCdqdWxpYV9tb3V0aF9uYXJyb3dfby5wbmcnLFxyXG5cdCdqdWxpYV9tb3V0aF93aWRlX2RfZl9rX3Jfcy5wbmcnLCdqdWxpYV9tb3V0aF9uYXJyb3dfdS5wbmcnLCdqdWxpYV9tb3V0aF93aWRlNS5wbmcnLCdqdWxpYV9tb3V0aF93aWRlX2RfZl9rX3Jfcy5wbmcnLCdqdWxpYV9tb3V0aF93aWRlX3NoLnBuZycsXHJcblx0J2p1bGlhX21vdXRoX3dpZGU1LnBuZycsJ2p1bGlhX21vdXRoX3dpZGVfc2gucG5nJywnanVsaWFfbW91dGhfd2lkZV9zaC5wbmcnLCdqdWxpYV9tb3V0aF93aWRlX3RoLnBuZycsJ2p1bGlhX21vdXRoX3dpZGVfZi5wbmcnLFxyXG5cdCdqdWxpYV9tb3V0aF93aWRlX3NoLnBuZycsJ2p1bGlhX21vdXRoX3dpZGVfZF9mX2tfcl9zLnBuZycsJ2p1bGlhX21vdXRoX2Nsb3NlZC5wbmcnXTtcclxuXHRzcGVlY2hSYXRlID0gMC45O1xyXG5cdC8vIHByaXZhdGUgdGV4dDJzcGVlY2g6IFROU1RleHRUb1NwZWVjaDtcclxuXHRwcml2YXRlIHNwZWVjaDJ0ZXh0OiBTcGVlY2hSZWNvZ25pdGlvbjtcclxuXHRzcGVha09wdGlvbnMgOiBTcGVha09wdGlvbnM7XHJcbiAgICBtaWNyb3Bob25lRW5hYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgcmVjb3JkaW5nOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBsYXN0VHJhbnNjcmlwdGlvbjogc3RyaW5nID0gbnVsbDtcclxuICAgIHNwb2tlbjogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgcmVjb2duaXplZFRleHQ6IHN0cmluZztcclxuICAgIHBpdGNoOiBudW1iZXIgPSAxMDA7XHJcblx0cHJpdmF0ZSByZWNvcmRpbmdBdmFpbGFibGU6IGJvb2xlYW47XHJcblx0cHJpdmF0ZSBzcG9rZW5UZXh0OiBzdHJpbmc7XHJcblxyXG5cdGNvbnN0cnVjdG9yKHByaXZhdGUgdGV4dDJzcGVlY2g6IFROU1RleHRUb1NwZWVjaCwgcHJpdmF0ZSBwYXRoc2VydmljZTogUGF0aFNlcnZpY2UsIHByaXZhdGUgcm91dGU6IEFjdGl2YXRlZFJvdXRlLCBwcml2YXRlIHJvdXRlcjogUm91dGVyKSB7XHJcblx0XHR0aGlzLnF1ZXN0aW9ucyA9IFtdO1xyXG5cdFx0dGhpcy5xbnVtID0gMTtcclxuXHRcdHZhciB1ID0gZGVjb2RlVVJJKHJvdXRlci51cmwpO1xyXG5cdFx0dGhpcy50aXRsZSA9IHUuc3Vic3RyaW5nKHUubGFzdEluZGV4T2YoJyUyRicpKzMsIHUubGFzdEluZGV4T2YoJy4nKSk7XHJcblx0XHR0aGlzLnNwZWFrT3B0aW9ucyA9IHtcclxuXHRcdFx0dGV4dDogXCJRdWVzdGlvbiAxLCBcIixcclxuXHRcdFx0cGl0Y2g6IDEuMCxcclxuXHRcdFx0c3BlYWtSYXRlOiAwLjksXHJcblx0XHRcdHZvbHVtZTogMS4wLFxyXG5cdFx0XHRsYW5ndWFnZTpcImVuXCIsXHJcblx0XHRcdGxvY2FsZTpcImVuLVVTXCIsXHJcblx0XHRcdGZpbmlzaGVkQ2FsbGJhY2s6ICgpPT57dGhpcy5zcGVha05leHRTZW50ZW5jZSgpO31cclxuXHRcdH07XHJcblx0fVxyXG5cclxuXHRvblN3aXBlKGFyZ3M6IFN3aXBlR2VzdHVyZUV2ZW50RGF0YSkge1xyXG5cdFx0aWYgKGFyZ3MuZGlyZWN0aW9uID09IDEgJiYgdGhpcy5xbnVtID4gMCkge1x0XHJcblx0XHRcdHRoaXMudGV4dDJzcGVlY2gucGF1c2UoKTtcclxuXHRcdFx0dGhpcy5hdmF0YXJJbWFnZS5uYXRpdmVFbGVtZW50LnNyYyA9IHRoaXMuaW1hZ2VQYXRoICsgdGhpcy5BdmF0YXJJbWFnZXNbMF07XHJcblx0XHRcdHRoaXMuc2hvd0Fuc3dlciA9IGZhbHNlO1xyXG5cdFx0XHR0aGlzLmxvYWRRdWVzdGlvbih0aGlzLnFudW0gLSAxKTtcclxuXHRcdH0gZWxzZSBpZiAoYXJncy5kaXJlY3Rpb24gPT0gMiAmJiB0aGlzLnFudW0gPCB0aGlzLnF1ZXN0aW9ucy5sZW5ndGggLSAxKSB7XHJcblx0XHRcdHRoaXMudGV4dDJzcGVlY2gucGF1c2UoKTtcclxuXHRcdFx0dGhpcy5hdmF0YXJJbWFnZS5uYXRpdmVFbGVtZW50LnNyYyA9IHRoaXMuaW1hZ2VQYXRoICsgdGhpcy5BdmF0YXJJbWFnZXNbMF07XHJcblx0XHRcdHRoaXMuc2hvd0Fuc3dlciA9IGZhbHNlO1xyXG5cdFx0XHR0aGlzLmxvYWRRdWVzdGlvbih0aGlzLnFudW0gKyAxKTtcclxuXHRcdH1cclxuXHR9XHJcblx0Z29MZWZ0KCl7XHJcblx0XHRpZiAodGhpcy5xbnVtID4gMCkge1x0XHJcblx0XHRcdHRoaXMudGV4dDJzcGVlY2gucGF1c2UoKTtcclxuXHRcdFx0dGhpcy5hdmF0YXJJbWFnZS5uYXRpdmVFbGVtZW50LnNyYyA9IHRoaXMuaW1hZ2VQYXRoICsgdGhpcy5BdmF0YXJJbWFnZXNbMF07XHJcblx0XHRcdHRoaXMuc2hvd0Fuc3dlciA9IGZhbHNlO1xyXG5cdFx0XHR0aGlzLmxvYWRRdWVzdGlvbih0aGlzLnFudW0gLSAxKTtcclxuXHRcdH1cclxuXHR9XHJcblx0Z29SaWdodCgpe1xyXG5cdFx0aWYgKHRoaXMucW51bSA8IHRoaXMucXVlc3Rpb25zLmxlbmd0aCAtIDEpIHtcclxuXHRcdFx0dGhpcy50ZXh0MnNwZWVjaC5wYXVzZSgpO1xyXG5cdFx0XHR0aGlzLmF2YXRhckltYWdlLm5hdGl2ZUVsZW1lbnQuc3JjID0gdGhpcy5pbWFnZVBhdGggKyB0aGlzLkF2YXRhckltYWdlc1swXTtcclxuXHRcdFx0dGhpcy5zaG93QW5zd2VyID0gZmFsc2U7XHJcblx0XHRcdHRoaXMubG9hZFF1ZXN0aW9uKHRoaXMucW51bSArIDEpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHQvL2xvYWRpbmcgcXVlc3Rpb24gZGlyZWN0bHkgZnJvbSBuYXZpZ2F0aW9uIHRhYlxyXG5cdGxvYWRRdWVzdGlvbihpOiBudW1iZXIpIHtcclxuXHRcdHRoaXMucXVlc3Rpb24gPSB0aGlzLnF1ZXN0aW9uc1tpXTtcclxuXHRcdHRoaXMudmFyaWFibGUgPSB0aGlzLnF1ZXN0aW9uLnF1ZXN0O1xyXG5cdFx0dGhpcy52YXJpYWJsZS5yZXBsYWNlKFwiLlwiLFwiP1wiKTtcclxuXHRcdHRoaXMuc2VudGVuY2VzID0gdGhpcy52YXJpYWJsZS5zcGxpdChcIj8gXCIpO1xyXG5cdFx0Y29uc29sZS5sb2codGhpcy5zZW50ZW5jZXMpO1xyXG5cdFx0dGhpcy5zZW50ZW5jZUluZGV4ID0gLTE7XHJcblx0XHRpZih0aGlzLnNwZWFraW50ZXJ2YWwpIGNsZWFySW50ZXJ2YWwodGhpcy5zcGVha2ludGVydmFsKTtcclxuXHRcdHRoaXMuc3BlYWtpbmcgPSBmYWxzZTtcclxuXHRcdHRoaXMuc3BlYWtBbmRBbmltYXRlRmxhZyA9IDE7XHJcblx0XHR0aGlzLnFudW0gPSBpO1xyXG5cdFx0Ly8gdGhpcy5zcGVha1RpdGxlKCk7XHJcblx0fVxyXG5cclxuXHRkaXNwbGF5QW5zd2VyKCl7XHJcblx0XHR0aGlzLnNob3dBbnN3ZXIgPSAhdGhpcy5zaG93QW5zd2VyO1xyXG5cdH1cclxuXHRcclxuXHRzcGVha05leHRTZW50ZW5jZSgpe1xyXG5cdFx0Y29uc29sZS5sb2coXCJzcGVha05leHRTZW50ZW5jZSBjYWxsZWQgXCIsIHRoaXMuc3BlYWtBbmRBbmltYXRlRmxhZywgdGhpcy5zcGVha2luZywgdGhpcy5zZW50ZW5jZUluZGV4KTtcclxuXHRcdHRoaXMuc3BlYWtBbmRBbmltYXRlRmxhZysrO1xyXG5cdFx0aWYodGhpcy5zcGVha2luZyAmJiB0aGlzLnNwZWFrQW5kQW5pbWF0ZUZsYWcgPT0gMikge1xyXG5cdFx0XHR0aGlzLnNwZWFrQW5kQW5pbWF0ZUZsYWcgPSAwO1xyXG5cdFx0XHR0aGlzLnNlbnRlbmNlSW5kZXgrKztcclxuXHRcdFx0aWYodGhpcy5zZW50ZW5jZUluZGV4PHRoaXMuc2VudGVuY2VzLmxlbmd0aCkge1xyXG5cdFx0XHRcdHRoaXMuc3BlYWtPcHRpb25zLnRleHQgPSB0aGlzLnNlbnRlbmNlc1t0aGlzLnNlbnRlbmNlSW5kZXhdO1xyXG5cdFx0XHRcdHRoaXMudGV4dDJzcGVlY2guc3BlYWsodGhpcy5zcGVha09wdGlvbnMpXHJcblx0XHRcdFx0LnRoZW4oKCk9PntcclxuXHRcdFx0XHRcdHRoaXMuYW5pbWF0ZUF2YXRhcigpO1xyXG5cdFx0XHRcdFx0Y29uc29sZS5sb2coXCJpbiB0aGVuXCIpO30sIFxyXG5cdFx0XHRcdFx0KGVycik9Pntjb25zb2xlLmxvZyhlcnIpO30pO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHRoaXMuc2VudGVuY2VJbmRleCA9IC0xO1xyXG5cdFx0XHRcdHRoaXMuc3BlYWtpbmcgPSBmYWxzZTtcclxuXHRcdFx0XHR0aGlzLnNwZWFrQW5kQW5pbWF0ZUZsYWcgPSAxO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRhbmltYXRlQXZhdGFyKCk6IHZvaWQge1xyXG5cdFx0bGV0IGkgPSAwO1xyXG4gICAgICAgIHRoaXMuc3BlYWtpbnRlcnZhbCA9IHNldEludGVydmFsKCgpID0+IHsgXHJcblx0XHRcdHRoaXMuYXZhdGFySW1hZ2UubmF0aXZlRWxlbWVudC5zcmMgPSB0aGlzLmltYWdlUGF0aCArIHRoaXMuQXZhdGFySW1hZ2VzW3RoaXMucXVlc3Rpb24udmlzZW1lc1t0aGlzLnNlbnRlbmNlSW5kZXhdW2ldXTtcclxuXHRcdFx0XHJcbiAgICAgICAgICAgIGkrKztcclxuICAgICAgICAgICAgaWYgKGkgPT0gdGhpcy5xdWVzdGlvbi52aXNlbWVzW3RoaXMuc2VudGVuY2VJbmRleF0ubGVuZ3RoKSB7XHJcblx0XHRcdFx0Y2xlYXJJbnRlcnZhbCh0aGlzLnNwZWFraW50ZXJ2YWwpO1xyXG5cdFx0XHRcdHRoaXMuc3BlYWtOZXh0U2VudGVuY2UoKTtcclxuXHRcdFx0fVxyXG5cdFx0fSwgdGhpcy5zcGVlY2hSYXRlKjg1KTtcclxuXHR9XHJcblxyXG5cdHRleHRUb1NwZWVjaCgpe1xyXG5cdFx0dGhpcy50ZXh0MnNwZWVjaC5wYXVzZSgpO1xyXG5cdFx0dmFyIF90aGlzID0gdGhpcztcclxuXHRcdHRoaXMuc3BlYWtpbmcgPSB0cnVlO1xyXG5cdFx0dGhpcy5zcGVha05leHRTZW50ZW5jZSgpO1xyXG5cdH1cclxuXHJcblx0c3BlYWtUZXh0T25seSgpe1xyXG5cdFx0dGhpcy50ZXh0MnNwZWVjaC5wYXVzZSgpO1xyXG5cdFx0bGV0IG9wdGlvbnM6IFNwZWFrT3B0aW9ucyA9IHtcclxuXHRcdFx0dGV4dDogdGhpcy5xdWVzdGlvbi50ZXh0LFxyXG5cdFx0XHRwaXRjaDogMS4wLFxyXG5cdFx0XHRzcGVha1JhdGU6IDAuOSxcclxuXHRcdFx0dm9sdW1lOiAxLjAsXHJcblx0XHRcdGxhbmd1YWdlOiBcImVuXCIsXHJcblx0XHRcdGxvY2FsZTogXCJlbi1VU1wiLFxyXG5cdFx0XHRmaW5pc2hlZENhbGxiYWNrOiAoKT0+e1xyXG5cdFx0XHRcdGNvbnNvbGUubG9nKFwicmVhZCB0aGUgYW5zd2VyXCIpO1xyXG5cdFx0XHR9XHJcblx0XHR9O1xyXG5cdFx0dGhpcy50ZXh0MnNwZWVjaC5zcGVhayhvcHRpb25zKTtcclxuXHR9XHJcbiAgIFxyXG5cdHRvZ2dsZVJlY29yZGluZygpOiB2b2lkIHtcclxuXHRcdHRoaXMucmVjb3JkaW5nID0gIXRoaXMucmVjb3JkaW5nO1xyXG5cdFx0Ly8gY29uc29sZS5sb2codGhpcy5yZWNvcmRpbmcpO1xyXG4gICAgICAgIGlmICh0aGlzLnJlY29yZGluZykge1xyXG5cdFx0XHQvLyBjb25zb2xlLmxvZyhcInRvZ2dsZVJlY29yZGluZyB0cnVlIHBhcnRcIik7XHJcblx0XHRcdHRoaXMuc3Bva2VuID0gZmFsc2U7XHJcbiAgICAgICAgICBcdHRoaXMubGFzdFRyYW5zY3JpcHRpb24gPSBudWxsO1xyXG4gICAgICAgICAgXHR0aGlzLnN0YXJ0TGlzdGVuaW5nKCk7XHJcblx0XHR9IFxyXG5cdFx0ZWxzZSB7XHJcblx0XHRcdC8vIGNvbnNvbGUubG9nKFwidG9nZ2xlUmVjb3JkaW5nIHRydWUgcGFydFwiKTtcclxuICAgICAgICAgIFx0dGhpcy5zdG9wTGlzdGVuaW5nKCk7XHJcbiAgICAgICAgICBcdGlmICghdGhpcy5zcG9rZW4gJiYgdGhpcy5sYXN0VHJhbnNjcmlwdGlvbiAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICBcdGFsZXJ0KHRoaXMubGFzdFRyYW5zY3JpcHRpb24pO1xyXG4gICAgICAgICAgXHR9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcblx0cHJpdmF0ZSBzdGFydExpc3RlbmluZygpOiB2b2lkIHtcclxuXHRcdC8vIGNvbnNvbGUubG9nKFwiSW5zaWRlIHN0YXJ0bGlzdGVuaW5nXCIpO1xyXG5cdFx0aWYgKCF0aGlzLnJlY29yZGluZ0F2YWlsYWJsZSkge1xyXG5cdFx0XHRjb25zb2xlLmxvZyhcImluc2lkZSBpZlwiKTtcclxuXHRcdFx0YWxlcnQoe1xyXG5cdFx0XHR0aXRsZTogXCJOb3Qgc3VwcG9ydGVkXCIsXHJcblx0XHRcdG1lc3NhZ2U6IFwiU3BlZWNoIHJlY29nbml0aW9uIG5vdCBzdXBwb3J0ZWQgb24gdGhpcyBkZXZpY2UuIFRyeSBhIGRpZmZlcmVudCBkZXZpY2UgcGxlYXNlLlwiLFxyXG5cdFx0XHRva0J1dHRvblRleHQ6IFwiT2gsIGJ1bW1lclwiXHJcblx0XHRcdH0pO1xyXG5cdFx0XHR0aGlzLnJlY29nbml6ZWRUZXh0ID0gXCJObyBzdXBwb3J0LCBTb3JyeVwiO1xyXG5cdFx0XHR0aGlzLnJlY29yZGluZyA9IGZhbHNlO1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblx0XHQvLyBjb25zb2xlLmxvZyhcImVsc2UgcGFydFwiKTtcclxuXHRcdHRoaXMucmVjb3JkaW5nID0gdHJ1ZTtcclxuXHRcdHRoaXMuc3BlZWNoMnRleHQuc3RhcnRMaXN0ZW5pbmcoe1xyXG5cdFx0XHRsb2NhbGU6IFwiZW4tVVNcIixcclxuXHRcdFx0cmV0dXJuUGFydGlhbFJlc3VsdHM6IHRydWUsXHJcblx0XHRcdG9uUmVzdWx0OiAodHJhbnNjcmlwdGlvbjogU3BlZWNoUmVjb2duaXRpb25UcmFuc2NyaXB0aW9uKSA9PiB7XHJcblx0XHRcdFx0Ly8gdGhpcy56b25lLnJ1bigoKSA9PiB0aGlzLnJlY29nbml6ZWRUZXh0ID0gdHJhbnNjcmlwdGlvbi50ZXh0KTtcclxuXHRcdFx0XHR0aGlzLmxhc3RUcmFuc2NyaXB0aW9uID0gdHJhbnNjcmlwdGlvbi50ZXh0O1xyXG5cdFx0XHRcdGlmICh0cmFuc2NyaXB0aW9uLmZpbmlzaGVkKSB7XHJcblx0XHRcdFx0XHR0aGlzLnNwb2tlbiA9IHRydWU7XHJcblx0XHRcdFx0XHRzZXRUaW1lb3V0KCgpID0+IGFsZXJ0KHRyYW5zY3JpcHRpb24udGV4dCksIDMwMCk7XHJcblx0XHRcdFx0XHR0aGlzLnNwb2tlblRleHQgPSB0cmFuc2NyaXB0aW9uLnRleHQ7XHJcblx0XHRcdFx0XHQvLyBhbGVydCh0cmFuc2NyaXB0aW9uLnRleHQpO1xyXG5cdFx0XHRcdFx0dGhpcy5nZW5lcmF0ZVNjb3JlKCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9LFxyXG5cdFx0fSkudGhlbihcclxuXHRcdFx0KHN0YXJ0ZWQ6IGJvb2xlYW4pID0+IHtjb25zb2xlLmxvZyhcInN0YXJ0ZWQgbGlzdGVuaW5nXCIpO30sXHJcblx0XHRcdChlcnJvck1lc3NhZ2U6IHN0cmluZykgPT4ge2NvbnNvbGUubG9nKGBFcnJvcjogJHtlcnJvck1lc3NhZ2V9YCk7fVxyXG5cdFx0KTtcclxuXHR9XHJcblxyXG5cdHByaXZhdGUgZ2VuZXJhdGVTY29yZSgpOiB2b2lkIHtcclxuXHRcdGxldCBzcG9rZW5TZW50ZW5jZXMgPSB0aGlzLnNwb2tlblRleHQuc3BsaXQoXCIgXCIpO1xyXG5cdFx0bGV0IGdpdmVuU2VudGVuY2VzID0gdGhpcy5xdWVzdGlvbi50ZXh0LnNwbGl0KFwiIFwiKTtcclxuXHRcdGxldCB2PTA7XHJcblx0XHR3aGlsZSh2PGdpdmVuU2VudGVuY2VzLmxlbmd0aCl7XHJcblx0XHRcdGdpdmVuU2VudGVuY2VzW3ZdLnJlcGxhY2UoJy4nLCcnKTtcclxuXHRcdFx0Z2l2ZW5TZW50ZW5jZXNbdl0ucmVwbGFjZSgnLCcsJycpO1xyXG5cdFx0XHR2Kys7XHJcblx0XHR9XHJcblx0XHRsZXQgaT0wO1xyXG5cdFx0bGV0IGo9MDtcclxuXHRcdGxldCBjb3VudD0wO1xyXG5cdFx0d2hpbGUoaTxzcG9rZW5TZW50ZW5jZXMubGVuZ3RoICl7XHJcblx0XHRcdHdoaWxlKGo8Z2l2ZW5TZW50ZW5jZXMubGVuZ3RoKXtcclxuXHRcdFx0XHRpZihzcG9rZW5TZW50ZW5jZXNbaV0udG9Mb3dlckNhc2UoKSA9PSBnaXZlblNlbnRlbmNlc1tqXS50b0xvd2VyQ2FzZSgpKXtcclxuXHRcdFx0XHRcdGNvdW50Kys7XHJcblx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0aisrO1xyXG5cdFx0XHR9XHJcblx0XHRcdGkrKzsgaj0wO1xyXG5cdFx0fVxyXG5cdFx0YWxlcnQoKGNvdW50L2dpdmVuU2VudGVuY2VzLmxlbmd0aCkqMTAwKTtcclxuXHR9XHJcbiAgICBcclxuICAgIHByaXZhdGUgc3RvcExpc3RlbmluZygpOiB2b2lkIHtcclxuXHRcdC8vIGNvbnNvbGUubG9nKFwic3RvcExpc3RlbmluZ1wiKTtcclxuICAgICAgICB0aGlzLnJlY29yZGluZyA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuc3BlZWNoMnRleHQuc3RvcExpc3RlbmluZygpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgXHRjb25zb2xlLmxvZyhcIlN0b3BwZWQgbGlzdGVuaW5nXCIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuXHRuZ09uSW5pdCgpOiB2b2lkIHtcclxuXHRcdHRoaXMuc3BlZWNoMnRleHQgPSBuZXcgU3BlZWNoUmVjb2duaXRpb24oKTtcclxuICAgIFx0dGhpcy5zcGVlY2gydGV4dC5hdmFpbGFibGUoKS50aGVuKGF2YWlsID0+IHtcclxuICAgICAgXHRcdHRoaXMucmVjb3JkaW5nQXZhaWxhYmxlID0gYXZhaWw7XHJcbiAgICBcdH0pO1xyXG5cdFx0Ly8gdGhpcy50ZXh0MnNwZWVjaCA9IG5ldyBUTlNUZXh0VG9TcGVlY2goKTtcclxuXHRcdHRoaXMuc3ViID0gdGhpcy5yb3V0ZS5wYXJhbXMuc3Vic2NyaWJlKHBhcmFtcyA9PiB7XHJcblx0XHRcdHRoaXMucGF0aCA9IHBhcmFtc1sncGF0aCddO1xyXG5cdFx0XHR0aGlzLnBhdGhzZXJ2aWNlLmdldFF1ZXN0aW9ucyh0aGlzLnBhdGgpXHJcblx0XHRcdFx0LnN1YnNjcmliZShcclxuXHRcdFx0XHRcdChkOiBRdWVzdGlvbltdKSA9PiB7XHJcblx0XHRcdFx0XHRcdHRoaXMucXVlc3Rpb24gPSBkWzBdO1xyXG5cdFx0XHRcdFx0XHR0aGlzLnF1ZXN0aW9ucyA9IGQ7XHJcblx0XHRcdFx0XHRcdHRoaXMudmFyaWFibGUgPSB0aGlzLnF1ZXN0aW9uLnF1ZXN0O1xyXG5cdFx0XHRcdFx0XHR0aGlzLnZhcmlhYmxlLnJlcGxhY2UoXCIuXCIsXCI/XCIpO1xyXG5cdFx0XHRcdFx0XHR0aGlzLnNlbnRlbmNlcyA9IHRoaXMudmFyaWFibGUuc3BsaXQoXCI/IFwiKTtcclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHQoZXJyb3IpID0+IHtcclxuXHRcdFx0XHRcdFx0Y29uc29sZS5sb2coZXJyb3IpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdClcclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0bmdPbkRlc3Ryb3koKSB7XHJcblx0XHR0aGlzLnN1Yi51bnN1YnNjcmliZSgpO1xyXG5cdH1cclxufSJdfQ==