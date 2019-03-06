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
                    alert(transcription.text);
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
            v++;
        }
        var i = 0;
        var j = 0;
        var count = 0;
        while (i < spokenSentences.length && j < givenSentences.length) {
            // console.log(spokenSentences[i].toLowerCase());
            // console.log(givenSentences[j].toLowerCase());
            if (spokenSentences[i].toLowerCase() != givenSentences[j].toLowerCase()) {
                j++;
                continue;
            }
            i++;
            j++;
            count++;
        }
        // console.log(givenSentences)
        // console.log(spokenSentences)
        // console.log(givenSentences.length)
        // console.log(spokenSentences.length)
        // console.log(count);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlc3Rpb25zLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInF1ZXN0aW9ucy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBc0Q7QUFDdEQsOERBQTRGO0FBQzVGLHNDQUE2RDtBQUM3RCw0Q0FBNEM7QUFDNUMsNERBQTBEO0FBQzFELDBDQUF5RDtBQUd6RCx1RUFBMEU7QUFDMUUsbUZBQThIO0FBQzlILHdEQUF3RDtBQUN4RCxxREFBcUQ7QUFVckQ7SUF3Q0MsNEJBQW9CLFdBQTRCLEVBQVUsV0FBd0IsRUFBVSxLQUFxQixFQUFVLE1BQWM7UUFBekksbUJBY0M7UUFkbUIsZ0JBQVcsR0FBWCxXQUFXLENBQWlCO1FBQVUsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFBVSxVQUFLLEdBQUwsS0FBSyxDQUFnQjtRQUFVLFdBQU0sR0FBTixNQUFNLENBQVE7UUEvQnpJLGNBQVMsR0FBVywyQkFBMkIsQ0FBQztRQU1oRCxlQUFVLEdBQVksS0FBSyxDQUFDO1FBQzVCLGFBQVEsR0FBWSxLQUFLLENBQUM7UUFDMUIsa0JBQWEsR0FBVyxDQUFDLENBQUMsQ0FBQztRQUczQix3QkFBbUIsR0FBVyxDQUFDLENBQUM7UUFFaEMsaUJBQVksR0FBRyxDQUFDLGdCQUFnQixFQUFDLHVCQUF1QixFQUFDLHVCQUF1QixFQUFDLDBCQUEwQixFQUFDLHdCQUF3QjtZQUNwSSx1QkFBdUIsRUFBQyxnQ0FBZ0MsRUFBQywwQkFBMEIsRUFBQywwQkFBMEI7WUFDOUcsZ0NBQWdDLEVBQUMsMEJBQTBCLEVBQUMsdUJBQXVCLEVBQUMsZ0NBQWdDLEVBQUMseUJBQXlCO1lBQzlJLHVCQUF1QixFQUFDLHlCQUF5QixFQUFDLHlCQUF5QixFQUFDLHlCQUF5QixFQUFDLHdCQUF3QjtZQUM5SCx5QkFBeUIsRUFBQyxnQ0FBZ0MsRUFBQyx3QkFBd0IsQ0FBQyxDQUFDO1FBQ3JGLGVBQVUsR0FBRyxHQUFHLENBQUM7UUFJZCxzQkFBaUIs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VyxFQUFFLENBQUM7SUFDeEIsQ0FBQztJQW5Ra0M7UUFBbEMsZ0JBQVMsQ0FBQyxnQ0FBc0IsQ0FBQztrQ0FBeUIsZ0NBQXNCOytEQUFDO0lBQzdEO1FBQXBCLGdCQUFTLENBQUMsUUFBUSxDQUFDO2tDQUFhLGlCQUFVOzJEQUFDO0lBRmhDLGtCQUFrQjtRQVI5QixnQkFBUyxDQUFDO1lBQ1YsUUFBUSxFQUFFLFdBQVc7WUFDckIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFNBQVMsRUFBRSxDQUFDLDBCQUFXLENBQUM7WUFDeEIsV0FBVyxFQUFFLDRCQUE0QjtZQUN6QyxTQUFTLEVBQUUsQ0FBQywyQkFBMkIsQ0FBQztTQUN4QyxDQUFDO3lDQTBDZ0MsMkNBQWUsRUFBdUIsMEJBQVcsRUFBaUIsdUJBQWMsRUFBa0IsZUFBTTtPQXhDN0gsa0JBQWtCLENBcVE5QjtJQUFELHlCQUFDO0NBQUEsQUFyUUQsSUFxUUM7QUFyUVksZ0RBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVmlld0NoaWxkLCBFbGVtZW50UmVmIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgUmFkU2lkZURyYXdlckNvbXBvbmVudCwgU2lkZURyYXdlclR5cGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LXVpLXNpZGVkcmF3ZXIvYW5ndWxhclwiO1xyXG5pbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgT25EZXN0cm95IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuLy8gaW1wb3J0IHsgUmVzcG9uc2UgfSBmcm9tIFwiQGFuZ3VsYXIvaHR0cFwiO1xyXG5pbXBvcnQgeyBQYXRoU2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9wYXRoLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgUm91dGVyLCBBY3RpdmF0ZWRSb3V0ZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCB7IFF1ZXN0aW9uIH0gZnJvbSBcIi4uLy4uL2NsYXNzZXMvcXVlc3Rpb25cIjtcclxuaW1wb3J0IHsgU3dpcGVHZXN0dXJlRXZlbnREYXRhIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvZ2VzdHVyZXNcIjtcclxuaW1wb3J0IHsgVE5TVGV4dFRvU3BlZWNoLCBTcGVha09wdGlvbnMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LXRleHR0b3NwZWVjaFwiO1xyXG5pbXBvcnQgeyBTcGVlY2hSZWNvZ25pdGlvbiwgU3BlZWNoUmVjb2duaXRpb25UcmFuc2NyaXB0aW9uLCBTcGVlY2hSZWNvZ25pdGlvbk9wdGlvbnMgfSBmcm9tICduYXRpdmVzY3JpcHQtc3BlZWNoLXJlY29nbml0aW9uJztcclxuLy8gaW1wb3J0IHsgZXJyb3IgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy90cmFjZS90cmFjZVwiO1xyXG4vLyBpbXBvcnQge1NsaWRlcn0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvc2xpZGVyXCI7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuXHRzZWxlY3RvcjogXCJRdWVzdGlvbnNcIixcclxuXHRtb2R1bGVJZDogbW9kdWxlLmlkLFxyXG5cdHByb3ZpZGVyczogW1BhdGhTZXJ2aWNlXSxcclxuXHR0ZW1wbGF0ZVVybDogXCIuL3F1ZXN0aW9ucy5jb21wb25lbnQuaHRtbFwiLFxyXG5cdHN0eWxlVXJsczogWycuL3F1ZXN0aW9ucy5jb21wb25lbnQuY3NzJ11cclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBRdWVzdGlvbnNDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XHJcblx0QFZpZXdDaGlsZChSYWRTaWRlRHJhd2VyQ29tcG9uZW50KSBwdWJsaWMgZHJhd2VyQ29tcG9uZW50OiBSYWRTaWRlRHJhd2VyQ29tcG9uZW50O1xyXG5cdEBWaWV3Q2hpbGQoXCJhdmF0YXJcIikgYXZhdGFySW1hZ2U6RWxlbWVudFJlZjtcclxuXHRcclxuXHRvbk9wZW5EcmF3ZXJUYXAoKSB7XHJcblx0XHR0aGlzLmRyYXdlckNvbXBvbmVudC5zaWRlRHJhd2VyLnNob3dEcmF3ZXIoKTtcclxuXHR9XHJcblxyXG5cdHBhdGg6IHN0cmluZztcclxuXHRpbWFnZVBhdGg6IHN0cmluZyA9IFwifi9hc3NldHMvaW1hZ2VzL2RyX3NpbmhhL1wiO1xyXG5cdHF1ZXN0aW9uczogUXVlc3Rpb25bXTtcclxuXHRxdWVzdGlvbjogUXVlc3Rpb247XHJcblx0cW51bTogbnVtYmVyO1xyXG5cdHRpdGxlOnN0cmluZztcclxuXHR2YXJpYWJsZTogc3RyaW5nO1xyXG5cdHNob3dBbnN3ZXI6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHRzcGVha2luZzogYm9vbGVhbiA9IGZhbHNlO1xyXG5cdHNlbnRlbmNlSW5kZXg6IG51bWJlciA9IC0xO1xyXG5cdHNlbnRlbmNlczogQXJyYXk8c3RyaW5nPjtcclxuXHRzcGVha2ludGVydmFsOiBudW1iZXI7XHJcblx0c3BlYWtBbmRBbmltYXRlRmxhZzogbnVtYmVyID0gMTtcclxuXHRwcml2YXRlIHN1YjogYW55O1xyXG5cdEF2YXRhckltYWdlcyA9IFsnanVsaWFfZnVsbC5wbmcnLCdqdWxpYV9tb3V0aF93aWRlNS5wbmcnLCdqdWxpYV9tb3V0aF93aWRlNS5wbmcnLCdqdWxpYV9tb3V0aF9uYXJyb3dfby5wbmcnLCdqdWxpYV9tb3V0aF93aWRlX3kucG5nJyxcclxuXHQnanVsaWFfbW91dGhfd2lkZTUucG5nJywnanVsaWFfbW91dGhfd2lkZV9kX2Zfa19yX3MucG5nJywnanVsaWFfbW91dGhfbmFycm93X3cucG5nJywnanVsaWFfbW91dGhfbmFycm93X28ucG5nJyxcclxuXHQnanVsaWFfbW91dGhfd2lkZV9kX2Zfa19yX3MucG5nJywnanVsaWFfbW91dGhfbmFycm93X3UucG5nJywnanVsaWFfbW91dGhfd2lkZTUucG5nJywnanVsaWFfbW91dGhfd2lkZV9kX2Zfa19yX3MucG5nJywnanVsaWFfbW91dGhfd2lkZV9zaC5wbmcnLFxyXG5cdCdqdWxpYV9tb3V0aF93aWRlNS5wbmcnLCdqdWxpYV9tb3V0aF93aWRlX3NoLnBuZycsJ2p1bGlhX21vdXRoX3dpZGVfc2gucG5nJywnanVsaWFfbW91dGhfd2lkZV90aC5wbmcnLCdqdWxpYV9tb3V0aF93aWRlX2YucG5nJyxcclxuXHQnanVsaWFfbW91dGhfd2lkZV9zaC5wbmcnLCdqdWxpYV9tb3V0aF93aWRlX2RfZl9rX3Jfcy5wbmcnLCdqdWxpYV9tb3V0aF9jbG9zZWQucG5nJ107XHJcblx0c3BlZWNoUmF0ZSA9IDAuOTtcclxuXHQvLyBwcml2YXRlIHRleHQyc3BlZWNoOiBUTlNUZXh0VG9TcGVlY2g7XHJcblx0cHJpdmF0ZSBzcGVlY2gydGV4dDogU3BlZWNoUmVjb2duaXRpb247XHJcblx0c3BlYWtPcHRpb25zIDogU3BlYWtPcHRpb25zO1xyXG4gICAgbWljcm9waG9uZUVuYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHJlY29yZGluZzogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgbGFzdFRyYW5zY3JpcHRpb246IHN0cmluZyA9IG51bGw7XHJcbiAgICBzcG9rZW46IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHJlY29nbml6ZWRUZXh0OiBzdHJpbmc7XHJcbiAgICBwaXRjaDogbnVtYmVyID0gMTAwO1xyXG5cdHByaXZhdGUgcmVjb3JkaW5nQXZhaWxhYmxlOiBib29sZWFuO1xyXG5cdHByaXZhdGUgc3Bva2VuVGV4dDogc3RyaW5nO1xyXG5cclxuXHRjb25zdHJ1Y3Rvcihwcml2YXRlIHRleHQyc3BlZWNoOiBUTlNUZXh0VG9TcGVlY2gsIHByaXZhdGUgcGF0aHNlcnZpY2U6IFBhdGhTZXJ2aWNlLCBwcml2YXRlIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSwgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlcikge1xyXG5cdFx0dGhpcy5xdWVzdGlvbnMgPSBbXTtcclxuXHRcdHRoaXMucW51bSA9IDE7XHJcblx0XHR2YXIgdSA9IGRlY29kZVVSSShyb3V0ZXIudXJsKTtcclxuXHRcdHRoaXMudGl0bGUgPSB1LnN1YnN0cmluZyh1Lmxhc3RJbmRleE9mKCclMkYnKSszLCB1Lmxhc3RJbmRleE9mKCcuJykpO1xyXG5cdFx0dGhpcy5zcGVha09wdGlvbnMgPSB7XHJcblx0XHRcdHRleHQ6IFwiUXVlc3Rpb24gMSwgXCIsXHJcblx0XHRcdHBpdGNoOiAxLjAsXHJcblx0XHRcdHNwZWFrUmF0ZTogMC45LFxyXG5cdFx0XHR2b2x1bWU6IDEuMCxcclxuXHRcdFx0bGFuZ3VhZ2U6XCJlblwiLFxyXG5cdFx0XHRsb2NhbGU6XCJlbi1VU1wiLFxyXG5cdFx0XHRmaW5pc2hlZENhbGxiYWNrOiAoKT0+e3RoaXMuc3BlYWtOZXh0U2VudGVuY2UoKTt9XHJcblx0XHR9O1xyXG5cdH1cclxuXHJcblx0b25Td2lwZShhcmdzOiBTd2lwZUdlc3R1cmVFdmVudERhdGEpIHtcclxuXHRcdGlmIChhcmdzLmRpcmVjdGlvbiA9PSAxICYmIHRoaXMucW51bSA+IDApIHtcdFxyXG5cdFx0XHR0aGlzLnRleHQyc3BlZWNoLnBhdXNlKCk7XHJcblx0XHRcdHRoaXMuYXZhdGFySW1hZ2UubmF0aXZlRWxlbWVudC5zcmMgPSB0aGlzLmltYWdlUGF0aCArIHRoaXMuQXZhdGFySW1hZ2VzWzBdO1xyXG5cdFx0XHR0aGlzLnNob3dBbnN3ZXIgPSBmYWxzZTtcclxuXHRcdFx0dGhpcy5sb2FkUXVlc3Rpb24odGhpcy5xbnVtIC0gMSk7XHJcblx0XHR9IGVsc2UgaWYgKGFyZ3MuZGlyZWN0aW9uID09IDIgJiYgdGhpcy5xbnVtIDwgdGhpcy5xdWVzdGlvbnMubGVuZ3RoIC0gMSkge1xyXG5cdFx0XHR0aGlzLnRleHQyc3BlZWNoLnBhdXNlKCk7XHJcblx0XHRcdHRoaXMuYXZhdGFySW1hZ2UubmF0aXZlRWxlbWVudC5zcmMgPSB0aGlzLmltYWdlUGF0aCArIHRoaXMuQXZhdGFySW1hZ2VzWzBdO1xyXG5cdFx0XHR0aGlzLnNob3dBbnN3ZXIgPSBmYWxzZTtcclxuXHRcdFx0dGhpcy5sb2FkUXVlc3Rpb24odGhpcy5xbnVtICsgMSk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRsb2FkUXVlc3Rpb24oaTogbnVtYmVyKSB7XHJcblx0XHR0aGlzLnF1ZXN0aW9uID0gdGhpcy5xdWVzdGlvbnNbaV07XHJcblx0XHR0aGlzLnZhcmlhYmxlID0gdGhpcy5xdWVzdGlvbi5xdWVzdDtcclxuXHRcdHRoaXMudmFyaWFibGUucmVwbGFjZShcIi5cIixcIj9cIik7XHJcblx0XHR0aGlzLnNlbnRlbmNlcyA9IHRoaXMudmFyaWFibGUuc3BsaXQoXCI/IFwiKTtcclxuXHRcdGNvbnNvbGUubG9nKHRoaXMuc2VudGVuY2VzKTtcclxuXHRcdHRoaXMuc2VudGVuY2VJbmRleCA9IC0xO1xyXG5cdFx0aWYodGhpcy5zcGVha2ludGVydmFsKSBjbGVhckludGVydmFsKHRoaXMuc3BlYWtpbnRlcnZhbCk7XHJcblx0XHR0aGlzLnNwZWFraW5nID0gZmFsc2U7XHJcblx0XHR0aGlzLnNwZWFrQW5kQW5pbWF0ZUZsYWcgPSAxO1xyXG5cdFx0dGhpcy5xbnVtID0gaTtcclxuXHRcdC8vIHRoaXMuc3BlYWtUaXRsZSgpO1xyXG5cdH1cclxuXHJcblx0ZGlzcGxheUFuc3dlcigpe1xyXG5cdFx0dGhpcy5zaG93QW5zd2VyID0gIXRoaXMuc2hvd0Fuc3dlcjtcclxuXHR9XHJcblx0XHJcblx0c3BlYWtOZXh0U2VudGVuY2UoKXtcclxuXHRcdGNvbnNvbGUubG9nKFwic3BlYWtOZXh0U2VudGVuY2UgY2FsbGVkIFwiLCB0aGlzLnNwZWFrQW5kQW5pbWF0ZUZsYWcsIHRoaXMuc3BlYWtpbmcsIHRoaXMuc2VudGVuY2VJbmRleCk7XHJcblx0XHR0aGlzLnNwZWFrQW5kQW5pbWF0ZUZsYWcrKztcclxuXHRcdGlmKHRoaXMuc3BlYWtpbmcgJiYgdGhpcy5zcGVha0FuZEFuaW1hdGVGbGFnID09IDIpIHtcclxuXHRcdFx0dGhpcy5zcGVha0FuZEFuaW1hdGVGbGFnID0gMDtcclxuXHRcdFx0dGhpcy5zZW50ZW5jZUluZGV4Kys7XHJcblx0XHRcdGlmKHRoaXMuc2VudGVuY2VJbmRleDx0aGlzLnNlbnRlbmNlcy5sZW5ndGgpIHtcclxuXHRcdFx0XHR0aGlzLnNwZWFrT3B0aW9ucy50ZXh0ID0gdGhpcy5zZW50ZW5jZXNbdGhpcy5zZW50ZW5jZUluZGV4XTtcclxuXHRcdFx0XHR0aGlzLnRleHQyc3BlZWNoLnNwZWFrKHRoaXMuc3BlYWtPcHRpb25zKVxyXG5cdFx0XHRcdC50aGVuKCgpPT57XHJcblx0XHRcdFx0XHR0aGlzLmFuaW1hdGVBdmF0YXIoKTtcclxuXHRcdFx0XHRcdGNvbnNvbGUubG9nKFwiaW4gdGhlblwiKTt9LCBcclxuXHRcdFx0XHRcdChlcnIpPT57Y29uc29sZS5sb2coZXJyKTt9KTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHR0aGlzLnNlbnRlbmNlSW5kZXggPSAtMTtcclxuXHRcdFx0XHR0aGlzLnNwZWFraW5nID0gZmFsc2U7XHJcblx0XHRcdFx0dGhpcy5zcGVha0FuZEFuaW1hdGVGbGFnID0gMTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0YW5pbWF0ZUF2YXRhcigpOiB2b2lkIHtcclxuXHRcdGxldCBpID0gMDtcclxuICAgICAgICB0aGlzLnNwZWFraW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKSA9PiB7IFxyXG5cdFx0XHR0aGlzLmF2YXRhckltYWdlLm5hdGl2ZUVsZW1lbnQuc3JjID0gdGhpcy5pbWFnZVBhdGggKyB0aGlzLkF2YXRhckltYWdlc1t0aGlzLnF1ZXN0aW9uLnZpc2VtZXNbdGhpcy5zZW50ZW5jZUluZGV4XVtpXV07XHJcblx0XHRcdFxyXG4gICAgICAgICAgICBpKys7XHJcbiAgICAgICAgICAgIGlmIChpID09IHRoaXMucXVlc3Rpb24udmlzZW1lc1t0aGlzLnNlbnRlbmNlSW5kZXhdLmxlbmd0aCkge1xyXG5cdFx0XHRcdGNsZWFySW50ZXJ2YWwodGhpcy5zcGVha2ludGVydmFsKTtcclxuXHRcdFx0XHR0aGlzLnNwZWFrTmV4dFNlbnRlbmNlKCk7XHJcblx0XHRcdH1cclxuXHRcdH0sIHRoaXMuc3BlZWNoUmF0ZSo4NSk7XHJcblx0fVxyXG5cclxuXHR0ZXh0VG9TcGVlY2goKXtcclxuXHRcdHRoaXMudGV4dDJzcGVlY2gucGF1c2UoKTtcclxuXHRcdHZhciBfdGhpcyA9IHRoaXM7XHJcblx0XHR0aGlzLnNwZWFraW5nID0gdHJ1ZTtcclxuXHRcdHRoaXMuc3BlYWtOZXh0U2VudGVuY2UoKTtcclxuXHR9XHJcblxyXG5cdHNwZWFrVGV4dE9ubHkoKXtcclxuXHRcdHRoaXMudGV4dDJzcGVlY2gucGF1c2UoKTtcclxuXHRcdGxldCBvcHRpb25zOiBTcGVha09wdGlvbnMgPSB7XHJcblx0XHRcdHRleHQ6IHRoaXMucXVlc3Rpb24udGV4dCxcclxuXHRcdFx0cGl0Y2g6IDEuMCxcclxuXHRcdFx0c3BlYWtSYXRlOiAwLjksXHJcblx0XHRcdHZvbHVtZTogMS4wLFxyXG5cdFx0XHRsYW5ndWFnZTogXCJlblwiLFxyXG5cdFx0XHRsb2NhbGU6IFwiZW4tVVNcIixcclxuXHRcdFx0ZmluaXNoZWRDYWxsYmFjazogKCk9PntcclxuXHRcdFx0XHRjb25zb2xlLmxvZyhcInJlYWQgdGhlIGFuc3dlclwiKTtcclxuXHRcdFx0fVxyXG5cdFx0fTtcclxuXHRcdHRoaXMudGV4dDJzcGVlY2guc3BlYWsob3B0aW9ucyk7XHJcblx0fVxyXG4gICBcclxuXHR0b2dnbGVSZWNvcmRpbmcoKTogdm9pZCB7XHJcblx0XHR0aGlzLnJlY29yZGluZyA9ICF0aGlzLnJlY29yZGluZztcclxuXHRcdC8vIGNvbnNvbGUubG9nKHRoaXMucmVjb3JkaW5nKTtcclxuICAgICAgICBpZiAodGhpcy5yZWNvcmRpbmcpIHtcclxuXHRcdFx0Ly8gY29uc29sZS5sb2coXCJ0b2dnbGVSZWNvcmRpbmcgdHJ1ZSBwYXJ0XCIpO1xyXG5cdFx0XHR0aGlzLnNwb2tlbiA9IGZhbHNlO1xyXG4gICAgICAgICAgXHR0aGlzLmxhc3RUcmFuc2NyaXB0aW9uID0gbnVsbDtcclxuICAgICAgICAgIFx0dGhpcy5zdGFydExpc3RlbmluZygpO1xyXG5cdFx0fSBcclxuXHRcdGVsc2Uge1xyXG5cdFx0XHQvLyBjb25zb2xlLmxvZyhcInRvZ2dsZVJlY29yZGluZyB0cnVlIHBhcnRcIik7XHJcbiAgICAgICAgICBcdHRoaXMuc3RvcExpc3RlbmluZygpO1xyXG4gICAgICAgICAgXHRpZiAoIXRoaXMuc3Bva2VuICYmIHRoaXMubGFzdFRyYW5zY3JpcHRpb24gIT09IG51bGwpIHtcclxuICAgICAgICAgICAgXHRhbGVydCh0aGlzLmxhc3RUcmFuc2NyaXB0aW9uKTtcclxuICAgICAgICAgIFx0fVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG5cdHByaXZhdGUgc3RhcnRMaXN0ZW5pbmcoKTogdm9pZCB7XHJcblx0XHQvLyBjb25zb2xlLmxvZyhcIkluc2lkZSBzdGFydGxpc3RlbmluZ1wiKTtcclxuXHRcdGlmICghdGhpcy5yZWNvcmRpbmdBdmFpbGFibGUpIHtcclxuXHRcdFx0Y29uc29sZS5sb2coXCJpbnNpZGUgaWZcIik7XHJcblx0XHRcdGFsZXJ0KHtcclxuXHRcdFx0dGl0bGU6IFwiTm90IHN1cHBvcnRlZFwiLFxyXG5cdFx0XHRtZXNzYWdlOiBcIlNwZWVjaCByZWNvZ25pdGlvbiBub3Qgc3VwcG9ydGVkIG9uIHRoaXMgZGV2aWNlLiBUcnkgYSBkaWZmZXJlbnQgZGV2aWNlIHBsZWFzZS5cIixcclxuXHRcdFx0b2tCdXR0b25UZXh0OiBcIk9oLCBidW1tZXJcIlxyXG5cdFx0XHR9KTtcclxuXHRcdFx0dGhpcy5yZWNvZ25pemVkVGV4dCA9IFwiTm8gc3VwcG9ydCwgU29ycnlcIjtcclxuXHRcdFx0dGhpcy5yZWNvcmRpbmcgPSBmYWxzZTtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cdFx0Ly8gY29uc29sZS5sb2coXCJlbHNlIHBhcnRcIik7XHJcblx0XHR0aGlzLnJlY29yZGluZyA9IHRydWU7XHJcblx0XHR0aGlzLnNwZWVjaDJ0ZXh0LnN0YXJ0TGlzdGVuaW5nKHtcclxuXHRcdFx0bG9jYWxlOiBcImVuLVVTXCIsXHJcblx0XHRcdHJldHVyblBhcnRpYWxSZXN1bHRzOiB0cnVlLFxyXG5cdFx0XHRvblJlc3VsdDogKHRyYW5zY3JpcHRpb246IFNwZWVjaFJlY29nbml0aW9uVHJhbnNjcmlwdGlvbikgPT4ge1xyXG5cdFx0XHRcdC8vIHRoaXMuem9uZS5ydW4oKCkgPT4gdGhpcy5yZWNvZ25pemVkVGV4dCA9IHRyYW5zY3JpcHRpb24udGV4dCk7XHJcblx0XHRcdFx0dGhpcy5sYXN0VHJhbnNjcmlwdGlvbiA9IHRyYW5zY3JpcHRpb24udGV4dDtcclxuXHRcdFx0XHRpZiAodHJhbnNjcmlwdGlvbi5maW5pc2hlZCkge1xyXG5cdFx0XHRcdFx0dGhpcy5zcG9rZW4gPSB0cnVlO1xyXG5cdFx0XHRcdFx0c2V0VGltZW91dCgoKSA9PiBhbGVydCh0cmFuc2NyaXB0aW9uLnRleHQpLCAzMDApO1xyXG5cdFx0XHRcdFx0dGhpcy5zcG9rZW5UZXh0ID0gdHJhbnNjcmlwdGlvbi50ZXh0O1xyXG5cdFx0XHRcdFx0YWxlcnQodHJhbnNjcmlwdGlvbi50ZXh0KTtcclxuXHRcdFx0XHRcdHRoaXMuZ2VuZXJhdGVTY29yZSgpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSxcclxuXHRcdH0pLnRoZW4oXHJcblx0XHRcdChzdGFydGVkOiBib29sZWFuKSA9PiB7Y29uc29sZS5sb2coXCJzdGFydGVkIGxpc3RlbmluZ1wiKTt9LFxyXG5cdFx0XHQoZXJyb3JNZXNzYWdlOiBzdHJpbmcpID0+IHtjb25zb2xlLmxvZyhgRXJyb3I6ICR7ZXJyb3JNZXNzYWdlfWApO31cclxuXHRcdCk7XHJcblx0fVxyXG5cclxuXHRwcml2YXRlIGdlbmVyYXRlU2NvcmUoKTogdm9pZCB7XHJcblx0XHRsZXQgc3Bva2VuU2VudGVuY2VzID0gdGhpcy5zcG9rZW5UZXh0LnNwbGl0KFwiIFwiKTtcclxuXHRcdGxldCBnaXZlblNlbnRlbmNlcyA9IHRoaXMucXVlc3Rpb24udGV4dC5zcGxpdChcIiBcIik7XHJcblx0XHRsZXQgdj0wO1xyXG5cdFx0d2hpbGUodjxnaXZlblNlbnRlbmNlcy5sZW5ndGgpe1xyXG5cdFx0XHRnaXZlblNlbnRlbmNlc1t2XS5yZXBsYWNlKCcuJywnJyk7XHJcblx0XHRcdHYrKztcclxuXHRcdH1cclxuXHRcdGxldCBpPTA7XHJcblx0XHRsZXQgaj0wO1xyXG5cdFx0bGV0IGNvdW50PTA7XHJcblx0XHR3aGlsZShpPHNwb2tlblNlbnRlbmNlcy5sZW5ndGggJiYgajxnaXZlblNlbnRlbmNlcy5sZW5ndGgpe1xyXG5cdFx0XHQvLyBjb25zb2xlLmxvZyhzcG9rZW5TZW50ZW5jZXNbaV0udG9Mb3dlckNhc2UoKSk7XHJcblx0XHRcdC8vIGNvbnNvbGUubG9nKGdpdmVuU2VudGVuY2VzW2pdLnRvTG93ZXJDYXNlKCkpO1xyXG5cdFx0XHRpZihzcG9rZW5TZW50ZW5jZXNbaV0udG9Mb3dlckNhc2UoKSAhPSBnaXZlblNlbnRlbmNlc1tqXS50b0xvd2VyQ2FzZSgpKXtcclxuXHRcdFx0XHRqKys7XHJcblx0XHRcdFx0Y29udGludWU7XHJcblx0XHRcdH1cclxuXHRcdFx0aSsrOyBqKys7IGNvdW50Kys7XHJcblx0XHR9XHJcblx0XHQvLyBjb25zb2xlLmxvZyhnaXZlblNlbnRlbmNlcylcclxuXHRcdC8vIGNvbnNvbGUubG9nKHNwb2tlblNlbnRlbmNlcylcclxuXHRcdC8vIGNvbnNvbGUubG9nKGdpdmVuU2VudGVuY2VzLmxlbmd0aClcclxuXHRcdC8vIGNvbnNvbGUubG9nKHNwb2tlblNlbnRlbmNlcy5sZW5ndGgpXHJcblx0XHQvLyBjb25zb2xlLmxvZyhjb3VudCk7XHJcblx0XHRhbGVydCgoY291bnQvZ2l2ZW5TZW50ZW5jZXMubGVuZ3RoKSoxMDApO1xyXG5cdH1cclxuICAgIFxyXG4gICAgcHJpdmF0ZSBzdG9wTGlzdGVuaW5nKCk6IHZvaWQge1xyXG5cdFx0Ly8gY29uc29sZS5sb2coXCJzdG9wTGlzdGVuaW5nXCIpO1xyXG4gICAgICAgIHRoaXMucmVjb3JkaW5nID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5zcGVlY2gydGV4dC5zdG9wTGlzdGVuaW5nKCkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICBcdGNvbnNvbGUubG9nKFwiU3RvcHBlZCBsaXN0ZW5pbmdcIik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG5cdG5nT25Jbml0KCk6IHZvaWQge1xyXG5cdFx0dGhpcy5zcGVlY2gydGV4dCA9IG5ldyBTcGVlY2hSZWNvZ25pdGlvbigpO1xyXG4gICAgXHR0aGlzLnNwZWVjaDJ0ZXh0LmF2YWlsYWJsZSgpLnRoZW4oYXZhaWwgPT4ge1xyXG4gICAgICBcdFx0dGhpcy5yZWNvcmRpbmdBdmFpbGFibGUgPSBhdmFpbDtcclxuICAgIFx0fSk7XHJcblx0XHQvLyB0aGlzLnRleHQyc3BlZWNoID0gbmV3IFROU1RleHRUb1NwZWVjaCgpO1xyXG5cdFx0dGhpcy5zdWIgPSB0aGlzLnJvdXRlLnBhcmFtcy5zdWJzY3JpYmUocGFyYW1zID0+IHtcclxuXHRcdFx0dGhpcy5wYXRoID0gcGFyYW1zWydwYXRoJ107XHJcblx0XHRcdHRoaXMucGF0aHNlcnZpY2UuZ2V0UXVlc3Rpb25zKHRoaXMucGF0aClcclxuXHRcdFx0XHQuc3Vic2NyaWJlKFxyXG5cdFx0XHRcdFx0KGQ6IFF1ZXN0aW9uW10pID0+IHtcclxuXHRcdFx0XHRcdFx0dGhpcy5xdWVzdGlvbiA9IGRbMF07XHJcblx0XHRcdFx0XHRcdHRoaXMucXVlc3Rpb25zID0gZDtcclxuXHRcdFx0XHRcdFx0dGhpcy52YXJpYWJsZSA9IHRoaXMucXVlc3Rpb24ucXVlc3Q7XHJcblx0XHRcdFx0XHRcdHRoaXMudmFyaWFibGUucmVwbGFjZShcIi5cIixcIj9cIik7XHJcblx0XHRcdFx0XHRcdHRoaXMuc2VudGVuY2VzID0gdGhpcy52YXJpYWJsZS5zcGxpdChcIj8gXCIpO1xyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdChlcnJvcikgPT4ge1xyXG5cdFx0XHRcdFx0XHRjb25zb2xlLmxvZyhlcnJvcik7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0KVxyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHRuZ09uRGVzdHJveSgpIHtcclxuXHRcdHRoaXMuc3ViLnVuc3Vic2NyaWJlKCk7XHJcblx0fVxyXG59Il19