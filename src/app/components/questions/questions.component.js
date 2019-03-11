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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlc3Rpb25zLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInF1ZXN0aW9ucy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBc0Q7QUFDdEQsOERBQTRGO0FBQzVGLHNDQUE2RDtBQUM3RCw0Q0FBNEM7QUFDNUMsaUVBQStEO0FBQy9ELDBDQUF5RDtBQUd6RCx1RUFBMEU7QUFDMUUsbUZBQThIO0FBRzlILHdEQUF3RDtBQUN4RCxxREFBcUQ7QUFVckQ7SUF3Q0MsNEJBQW9CLFdBQTRCLEVBQVUsV0FBd0IsRUFBVSxLQUFxQixFQUFVLE1BQWM7UUFBekksbUJBY0M7UUFkbUIsZ0JBQVcsR0FBWCxXQUFXLENBQWlCO1FBQVUsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFBVSxVQUFLLEdBQUwsS0FBSyxDQUFnQjtRQUFVLFdBQU0sR0FBTixNQUFNLENBQVE7UUEvQnpJLGNBQVMsR0FBVywyQkFBMkIsQ0FBQztRQU1oRCxlQUFVLEdBQVksS0FBSyxDQUFDO1FBQzVCLGFBQVEsR0FBWSxLQUFLLENBQUM7UUFDMUIsa0JBQWEsR0FBVyxDQUFDLENBQUMsQ0FBQztRQUczQix3QkFBbUIsR0FBVyxDQUFDLENBQUM7UUFFaEMsaUJBQVksR0FBRyxDQUFDLGdCQUFnQixFQUFDLHVCQUF1QixFQUFDLHVCQUF1QixFQUFDLDBCQUEwQixFQUFDLHdCQUF3QjtZQUNwSSx1QkFBdUIsRUFBQyxnQ0FBZ0MsRUFBQywwQkFBMEIsRUFBQywwQkFBMEI7WUFDOUcsZ0NBQWdDLEVBQUMsMEJBQTBCLEVBQUMsdUJBQXVCLEVBQUMsZ0NBQWdDLEVBQUMseUJBQXlCO1lBQzlJLHVCQUF1QixFQUFDLHlCQUF5QixFQUFDLHlCQUF5QixFQUFDLHlCQUF5QixFQUFDLHdCQUF3QjtZQUM5SCx5QkFBeUIsRUFBQyxnQ0FBZ0MsRUFBQyx3QkFBd0IsQ0FBQyxDQUFDO1FBQ3JGLGVBQVUsR0FBRyxHQUFHLENBQUM7UUFJZCxzQkFBaUIs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LENBQUMsUUFBUSxHQUFHLE9BQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDO2dCQUNwQyxPQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQy9CLE9BQUksQ0FBQyxTQUFTLEdBQUcsT0FBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDNUMsQ0FBQyxFQUNELFVBQUMsS0FBSztnQkFDTCxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3BCLENBQUMsQ0FDRCxDQUFBO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDSixDQUFDO0lBRUQsd0NBQVcsR0FBWDtRQUNDLElBQUksQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDeEIsQ0FBQztJQTdRa0M7UUFBbEMsZ0JBQVMsQ0FBQyxnQ0FBc0IsQ0FBQztrQ0FBeUIsZ0NBQXNCOytEQUFDO0lBQzdEO1FBQXBCLGdCQUFTLENBQUMsUUFBUSxDQUFDO2tDQUFhLGlCQUFVOzJEQUFDO0lBRmhDLGtCQUFrQjtRQVI5QixnQkFBUyxDQUFDO1lBQ1YsUUFBUSxFQUFFLFdBQVc7WUFDckIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFNBQVMsRUFBRSxDQUFDLDBCQUFXLENBQUM7WUFDeEIsV0FBVyxFQUFFLDRCQUE0QjtZQUN6QyxTQUFTLEVBQUUsQ0FBQywyQkFBMkIsQ0FBQztTQUN4QyxDQUFDO3lDQTBDZ0MsMkNBQWUsRUFBdUIsMEJBQVcsRUFBaUIsdUJBQWMsRUFBa0IsZUFBTTtPQXhDN0gsa0JBQWtCLENBK1E5QjtJQUFELHlCQUFDO0NBQUEsQUEvUUQsSUErUUM7QUEvUVksZ0RBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVmlld0NoaWxkLCBFbGVtZW50UmVmIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgUmFkU2lkZURyYXdlckNvbXBvbmVudCwgU2lkZURyYXdlclR5cGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LXVpLXNpZGVkcmF3ZXIvYW5ndWxhclwiO1xyXG5pbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgT25EZXN0cm95IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuLy8gaW1wb3J0IHsgUmVzcG9uc2UgfSBmcm9tIFwiQGFuZ3VsYXIvaHR0cFwiO1xyXG5pbXBvcnQgeyBQYXRoU2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9wYXRoL3BhdGguc2VydmljZVwiO1xyXG5pbXBvcnQgeyBSb3V0ZXIsIEFjdGl2YXRlZFJvdXRlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHsgUXVlc3Rpb24gfSBmcm9tIFwiLi4vLi4vY2xhc3Nlcy9xdWVzdGlvblwiO1xyXG5pbXBvcnQgeyBTd2lwZUdlc3R1cmVFdmVudERhdGEgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9nZXN0dXJlc1wiO1xyXG5pbXBvcnQgeyBUTlNUZXh0VG9TcGVlY2gsIFNwZWFrT3B0aW9ucyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtdGV4dHRvc3BlZWNoXCI7XHJcbmltcG9ydCB7IFNwZWVjaFJlY29nbml0aW9uLCBTcGVlY2hSZWNvZ25pdGlvblRyYW5zY3JpcHRpb24sIFNwZWVjaFJlY29nbml0aW9uT3B0aW9ucyB9IGZyb20gJ25hdGl2ZXNjcmlwdC1zcGVlY2gtcmVjb2duaXRpb24nO1xyXG5pbXBvcnQgeyB2YXJpYWJsZSB9IGZyb20gXCJAYW5ndWxhci9jb21waWxlci9zcmMvb3V0cHV0L291dHB1dF9hc3RcIjtcclxuaW1wb3J0IHsgVmFyaWFibGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29tcGlsZXIvc3JjL3JlbmRlcjMvcjNfYXN0XCI7XHJcbi8vIGltcG9ydCB7IGVycm9yIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdHJhY2UvdHJhY2VcIjtcclxuLy8gaW1wb3J0IHtTbGlkZXJ9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL3NsaWRlclwiO1xyXG5cclxuQENvbXBvbmVudCh7XHJcblx0c2VsZWN0b3I6IFwiUXVlc3Rpb25zXCIsXHJcblx0bW9kdWxlSWQ6IG1vZHVsZS5pZCxcclxuXHRwcm92aWRlcnM6IFtQYXRoU2VydmljZV0sXHJcblx0dGVtcGxhdGVVcmw6IFwiLi9xdWVzdGlvbnMuY29tcG9uZW50Lmh0bWxcIixcclxuXHRzdHlsZVVybHM6IFsnLi9xdWVzdGlvbnMuY29tcG9uZW50LmNzcyddXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgUXVlc3Rpb25zQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xyXG5cdEBWaWV3Q2hpbGQoUmFkU2lkZURyYXdlckNvbXBvbmVudCkgcHVibGljIGRyYXdlckNvbXBvbmVudDogUmFkU2lkZURyYXdlckNvbXBvbmVudDtcclxuXHRAVmlld0NoaWxkKFwiYXZhdGFyXCIpIGF2YXRhckltYWdlOkVsZW1lbnRSZWY7XHJcblx0XHJcblx0b25PcGVuRHJhd2VyVGFwKCkge1xyXG5cdFx0dGhpcy5kcmF3ZXJDb21wb25lbnQuc2lkZURyYXdlci5zaG93RHJhd2VyKCk7XHJcblx0fVxyXG5cclxuXHRwYXRoOiBzdHJpbmc7XHJcblx0aW1hZ2VQYXRoOiBzdHJpbmcgPSBcIn4vYXNzZXRzL2ltYWdlcy9kcl9zaW5oYS9cIjtcclxuXHRxdWVzdGlvbnM6IFF1ZXN0aW9uW107XHJcblx0cXVlc3Rpb246IFF1ZXN0aW9uO1xyXG5cdHFudW06IG51bWJlcjtcclxuXHR0aXRsZTpzdHJpbmc7XHJcblx0dmFyaWFibGU6IHN0cmluZztcclxuXHRzaG93QW5zd2VyOiBib29sZWFuID0gZmFsc2U7XHJcblx0c3BlYWtpbmc6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHRzZW50ZW5jZUluZGV4OiBudW1iZXIgPSAtMTtcclxuXHRzZW50ZW5jZXM6IEFycmF5PHN0cmluZz47XHJcblx0c3BlYWtpbnRlcnZhbDogbnVtYmVyO1xyXG5cdHNwZWFrQW5kQW5pbWF0ZUZsYWc6IG51bWJlciA9IDE7XHJcblx0cHJpdmF0ZSBzdWI6IGFueTtcclxuXHRBdmF0YXJJbWFnZXMgPSBbJ2p1bGlhX2Z1bGwucG5nJywnanVsaWFfbW91dGhfd2lkZTUucG5nJywnanVsaWFfbW91dGhfd2lkZTUucG5nJywnanVsaWFfbW91dGhfbmFycm93X28ucG5nJywnanVsaWFfbW91dGhfd2lkZV95LnBuZycsXHJcblx0J2p1bGlhX21vdXRoX3dpZGU1LnBuZycsJ2p1bGlhX21vdXRoX3dpZGVfZF9mX2tfcl9zLnBuZycsJ2p1bGlhX21vdXRoX25hcnJvd193LnBuZycsJ2p1bGlhX21vdXRoX25hcnJvd19vLnBuZycsXHJcblx0J2p1bGlhX21vdXRoX3dpZGVfZF9mX2tfcl9zLnBuZycsJ2p1bGlhX21vdXRoX25hcnJvd191LnBuZycsJ2p1bGlhX21vdXRoX3dpZGU1LnBuZycsJ2p1bGlhX21vdXRoX3dpZGVfZF9mX2tfcl9zLnBuZycsJ2p1bGlhX21vdXRoX3dpZGVfc2gucG5nJyxcclxuXHQnanVsaWFfbW91dGhfd2lkZTUucG5nJywnanVsaWFfbW91dGhfd2lkZV9zaC5wbmcnLCdqdWxpYV9tb3V0aF93aWRlX3NoLnBuZycsJ2p1bGlhX21vdXRoX3dpZGVfdGgucG5nJywnanVsaWFfbW91dGhfd2lkZV9mLnBuZycsXHJcblx0J2p1bGlhX21vdXRoX3dpZGVfc2gucG5nJywnanVsaWFfbW91dGhfd2lkZV9kX2Zfa19yX3MucG5nJywnanVsaWFfbW91dGhfY2xvc2VkLnBuZyddO1xyXG5cdHNwZWVjaFJhdGUgPSAwLjk7XHJcblx0Ly8gcHJpdmF0ZSB0ZXh0MnNwZWVjaDogVE5TVGV4dFRvU3BlZWNoO1xyXG5cdHByaXZhdGUgc3BlZWNoMnRleHQ6IFNwZWVjaFJlY29nbml0aW9uO1xyXG5cdHNwZWFrT3B0aW9ucyA6IFNwZWFrT3B0aW9ucztcclxuICAgIG1pY3JvcGhvbmVFbmFibGVkOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICByZWNvcmRpbmc6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIGxhc3RUcmFuc2NyaXB0aW9uOiBzdHJpbmcgPSBudWxsO1xyXG4gICAgc3Bva2VuOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICByZWNvZ25pemVkVGV4dDogc3RyaW5nO1xyXG4gICAgcGl0Y2g6IG51bWJlciA9IDEwMDtcclxuXHRwcml2YXRlIHJlY29yZGluZ0F2YWlsYWJsZTogYm9vbGVhbjtcclxuXHRwcml2YXRlIHNwb2tlblRleHQ6IHN0cmluZztcclxuXHJcblx0Y29uc3RydWN0b3IocHJpdmF0ZSB0ZXh0MnNwZWVjaDogVE5TVGV4dFRvU3BlZWNoLCBwcml2YXRlIHBhdGhzZXJ2aWNlOiBQYXRoU2VydmljZSwgcHJpdmF0ZSByb3V0ZTogQWN0aXZhdGVkUm91dGUsIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIpIHtcclxuXHRcdHRoaXMucXVlc3Rpb25zID0gW107XHJcblx0XHR0aGlzLnFudW0gPSAxO1xyXG5cdFx0dmFyIHUgPSBkZWNvZGVVUkkocm91dGVyLnVybCk7XHJcblx0XHR0aGlzLnRpdGxlID0gdS5zdWJzdHJpbmcodS5sYXN0SW5kZXhPZignJTJGJykrMywgdS5sYXN0SW5kZXhPZignLicpKTtcclxuXHRcdHRoaXMuc3BlYWtPcHRpb25zID0ge1xyXG5cdFx0XHR0ZXh0OiBcIlF1ZXN0aW9uIDEsIFwiLFxyXG5cdFx0XHRwaXRjaDogMS4wLFxyXG5cdFx0XHRzcGVha1JhdGU6IDAuOSxcclxuXHRcdFx0dm9sdW1lOiAxLjAsXHJcblx0XHRcdGxhbmd1YWdlOlwiZW5cIixcclxuXHRcdFx0bG9jYWxlOlwiZW4tVVNcIixcclxuXHRcdFx0ZmluaXNoZWRDYWxsYmFjazogKCk9Pnt0aGlzLnNwZWFrTmV4dFNlbnRlbmNlKCk7fVxyXG5cdFx0fTtcclxuXHR9XHJcblxyXG5cdG9uU3dpcGUoYXJnczogU3dpcGVHZXN0dXJlRXZlbnREYXRhKSB7XHJcblx0XHRpZiAoYXJncy5kaXJlY3Rpb24gPT0gMSkge1x0XHJcblx0XHRcdHRoaXMuZ29MZWZ0KCk7XHJcblx0XHR9IGVsc2UgaWYgKGFyZ3MuZGlyZWN0aW9uID09IDIpIHtcclxuXHRcdFx0dGhpcy5nb1JpZ2h0KCk7XHJcblx0XHR9XHJcblx0fVxyXG5cdGdvTGVmdCgpe1xyXG5cdFx0aWYgKHRoaXMucW51bSA+IDApIHtcdFxyXG5cdFx0XHR0aGlzLnRleHQyc3BlZWNoLnBhdXNlKCk7XHJcblx0XHRcdHRoaXMuYXZhdGFySW1hZ2UubmF0aXZlRWxlbWVudC5zcmMgPSB0aGlzLmltYWdlUGF0aCArIHRoaXMuQXZhdGFySW1hZ2VzWzBdO1xyXG5cdFx0XHR0aGlzLnNob3dBbnN3ZXIgPSBmYWxzZTtcclxuXHRcdFx0dGhpcy5sb2FkUXVlc3Rpb24odGhpcy5xbnVtIC0gMSk7XHJcblx0XHR9XHJcblx0fVxyXG5cdGdvUmlnaHQoKXtcclxuXHRcdGlmICh0aGlzLnFudW0gPCB0aGlzLnF1ZXN0aW9ucy5sZW5ndGggLSAxKSB7XHJcblx0XHRcdHRoaXMudGV4dDJzcGVlY2gucGF1c2UoKTtcclxuXHRcdFx0dGhpcy5hdmF0YXJJbWFnZS5uYXRpdmVFbGVtZW50LnNyYyA9IHRoaXMuaW1hZ2VQYXRoICsgdGhpcy5BdmF0YXJJbWFnZXNbMF07XHJcblx0XHRcdHRoaXMuc2hvd0Fuc3dlciA9IGZhbHNlO1xyXG5cdFx0XHR0aGlzLmxvYWRRdWVzdGlvbih0aGlzLnFudW0gKyAxKTtcclxuXHRcdH1cclxuXHR9XHJcblx0Ly9sb2FkaW5nIHF1ZXN0aW9uIGRpcmVjdGx5IGZyb20gbmF2aWdhdGlvbiB0YWJcclxuXHRsb2FkUXVlc3Rpb24oaTogbnVtYmVyKSB7XHJcblx0XHR0aGlzLmRyYXdlckNvbXBvbmVudC5zaWRlRHJhd2VyLmNsb3NlRHJhd2VyKCk7XHJcblx0XHR0aGlzLnF1ZXN0aW9uID0gdGhpcy5xdWVzdGlvbnNbaV07XHJcblx0XHR0aGlzLnZhcmlhYmxlID0gdGhpcy5xdWVzdGlvbi5xdWVzdDtcclxuXHRcdGxldCB2YWx1ZSA9IHRoaXMudmFyaWFibGUucmVwbGFjZSgvXFwuL2dpLFwiP1wiKTtcclxuXHRcdHRoaXMuc2VudGVuY2VzID0gdmFsdWUuc3BsaXQoXCI/IFwiKTtcclxuXHRcdGZvcih2YXIgdj0wO3Y8dGhpcy5zZW50ZW5jZXMubGVuZ3RoO3YrKylcclxuXHRcdFx0Y29uc29sZS5sb2codGhpcy5zZW50ZW5jZXNbdl0pO1xyXG5cdFx0Y29uc29sZS5sb2codGhpcy5zZW50ZW5jZXMpO1xyXG5cdFx0dGhpcy5zZW50ZW5jZUluZGV4ID0gLTE7XHJcblx0XHRpZih0aGlzLnNwZWFraW50ZXJ2YWwpIGNsZWFySW50ZXJ2YWwodGhpcy5zcGVha2ludGVydmFsKTtcclxuXHRcdHRoaXMuc3BlYWtpbmcgPSBmYWxzZTtcclxuXHRcdHRoaXMuc3BlYWtBbmRBbmltYXRlRmxhZyA9IDE7XHJcblx0XHR0aGlzLnFudW0gPSBpO1xyXG5cdFx0Ly8gdGhpcy5zcGVha1RpdGxlKCk7XHJcblx0fVxyXG5cclxuXHRkaXNwbGF5QW5zd2VyKCl7XHJcblx0XHR0aGlzLnNob3dBbnN3ZXIgPSAhdGhpcy5zaG93QW5zd2VyO1xyXG5cdH1cclxuXHRcclxuXHRzcGVha05leHRTZW50ZW5jZSgpe1xyXG5cdFx0Y29uc29sZS5sb2coXCJzcGVha05leHRTZW50ZW5jZSBjYWxsZWQgXCIsIHRoaXMuc3BlYWtBbmRBbmltYXRlRmxhZywgdGhpcy5zcGVha2luZywgdGhpcy5zZW50ZW5jZUluZGV4KTtcclxuXHRcdHRoaXMuc3BlYWtBbmRBbmltYXRlRmxhZysrO1xyXG5cdFx0aWYodGhpcy5zcGVha2luZyAmJiB0aGlzLnNwZWFrQW5kQW5pbWF0ZUZsYWcgPT0gMikge1xyXG5cdFx0XHR0aGlzLnNwZWFrQW5kQW5pbWF0ZUZsYWcgPSAwO1xyXG5cdFx0XHR0aGlzLnNlbnRlbmNlSW5kZXgrKztcclxuXHRcdFx0aWYodGhpcy5zZW50ZW5jZUluZGV4PHRoaXMuc2VudGVuY2VzLmxlbmd0aCkge1xyXG5cdFx0XHRcdHRoaXMuc3BlYWtPcHRpb25zLnRleHQgPSB0aGlzLnNlbnRlbmNlc1t0aGlzLnNlbnRlbmNlSW5kZXhdO1xyXG5cdFx0XHRcdHRoaXMudGV4dDJzcGVlY2guc3BlYWsodGhpcy5zcGVha09wdGlvbnMpXHJcblx0XHRcdFx0LnRoZW4oKCk9PntcclxuXHRcdFx0XHRcdHRoaXMuYW5pbWF0ZUF2YXRhcigpO1xyXG5cdFx0XHRcdFx0Y29uc29sZS5sb2coXCJpbiB0aGVuXCIpO30sIFxyXG5cdFx0XHRcdFx0KGVycik9Pntjb25zb2xlLmxvZyhlcnIpO30pO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHRoaXMuc2VudGVuY2VJbmRleCA9IC0xO1xyXG5cdFx0XHRcdHRoaXMuc3BlYWtpbmcgPSBmYWxzZTtcclxuXHRcdFx0XHR0aGlzLnNwZWFrQW5kQW5pbWF0ZUZsYWcgPSAxO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRhbmltYXRlQXZhdGFyKCk6IHZvaWQge1xyXG5cdFx0bGV0IGkgPSAwO1xyXG4gICAgICAgIHRoaXMuc3BlYWtpbnRlcnZhbCA9IHNldEludGVydmFsKCgpID0+IHsgXHJcblx0XHRcdHRoaXMuYXZhdGFySW1hZ2UubmF0aXZlRWxlbWVudC5zcmMgPSB0aGlzLmltYWdlUGF0aCArIHRoaXMuQXZhdGFySW1hZ2VzW3RoaXMucXVlc3Rpb24udmlzZW1lc1t0aGlzLnNlbnRlbmNlSW5kZXhdW2ldXTtcclxuXHRcdFx0XHJcbiAgICAgICAgICAgIGkrKztcclxuICAgICAgICAgICAgaWYgKGkgPT0gdGhpcy5xdWVzdGlvbi52aXNlbWVzW3RoaXMuc2VudGVuY2VJbmRleF0ubGVuZ3RoKSB7XHJcblx0XHRcdFx0Y2xlYXJJbnRlcnZhbCh0aGlzLnNwZWFraW50ZXJ2YWwpO1xyXG5cdFx0XHRcdHRoaXMuc3BlYWtOZXh0U2VudGVuY2UoKTtcclxuXHRcdFx0fVxyXG5cdFx0fSwgdGhpcy5zcGVlY2hSYXRlKjg1KTtcclxuXHR9XHJcblxyXG5cdHRleHRUb1NwZWVjaCgpe1xyXG5cdFx0Ly8gdGhpcy50ZXh0MnNwZWVjaC5wYXVzZSgpO1xyXG5cdFx0dmFyIF90aGlzID0gdGhpcztcclxuXHRcdHRoaXMuc3BlYWtpbmcgPSB0cnVlO1xyXG5cdFx0dGhpcy5zcGVha05leHRTZW50ZW5jZSgpO1xyXG5cdH1cclxuXHJcblx0c3BlYWtUZXh0T25seSgpe1xyXG5cdFx0dGhpcy50ZXh0MnNwZWVjaC5wYXVzZSgpO1xyXG5cdFx0bGV0IG9wdGlvbnM6IFNwZWFrT3B0aW9ucyA9IHtcclxuXHRcdFx0dGV4dDogdGhpcy5xdWVzdGlvbi50ZXh0LFxyXG5cdFx0XHRwaXRjaDogMS4wLFxyXG5cdFx0XHRzcGVha1JhdGU6IDAuOSxcclxuXHRcdFx0dm9sdW1lOiAxLjAsXHJcblx0XHRcdGxhbmd1YWdlOiBcImVuXCIsXHJcblx0XHRcdGxvY2FsZTogXCJlbi1VU1wiLFxyXG5cdFx0XHRmaW5pc2hlZENhbGxiYWNrOiAoKT0+e1xyXG5cdFx0XHRcdGNvbnNvbGUubG9nKFwicmVhZCB0aGUgYW5zd2VyXCIpO1xyXG5cdFx0XHR9XHJcblx0XHR9O1xyXG5cdFx0dGhpcy50ZXh0MnNwZWVjaC5zcGVhayhvcHRpb25zKTtcclxuXHR9XHJcbiAgIFxyXG5cdHRvZ2dsZVJlY29yZGluZygpOiB2b2lkIHtcclxuXHRcdHRoaXMucmVjb3JkaW5nID0gIXRoaXMucmVjb3JkaW5nO1xyXG5cdFx0Ly8gY29uc29sZS5sb2codGhpcy5yZWNvcmRpbmcpO1xyXG4gICAgICAgIGlmICh0aGlzLnJlY29yZGluZykge1xyXG5cdFx0XHQvLyBjb25zb2xlLmxvZyhcInRvZ2dsZVJlY29yZGluZyB0cnVlIHBhcnRcIik7XHJcblx0XHRcdHRoaXMuc3Bva2VuID0gZmFsc2U7XHJcbiAgICAgICAgICBcdHRoaXMubGFzdFRyYW5zY3JpcHRpb24gPSBudWxsO1xyXG4gICAgICAgICAgXHR0aGlzLnN0YXJ0TGlzdGVuaW5nKCk7XHJcblx0XHR9IFxyXG5cdFx0ZWxzZSB7XHJcblx0XHRcdC8vIGNvbnNvbGUubG9nKFwidG9nZ2xlUmVjb3JkaW5nIHRydWUgcGFydFwiKTtcclxuICAgICAgICAgIFx0dGhpcy5zdG9wTGlzdGVuaW5nKCk7XHJcbiAgICAgICAgICBcdGlmICghdGhpcy5zcG9rZW4gJiYgdGhpcy5sYXN0VHJhbnNjcmlwdGlvbiAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICBcdGFsZXJ0KHRoaXMubGFzdFRyYW5zY3JpcHRpb24pO1xyXG4gICAgICAgICAgXHR9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcblx0cHJpdmF0ZSBzdGFydExpc3RlbmluZygpOiB2b2lkIHtcclxuXHRcdC8vIGNvbnNvbGUubG9nKFwiSW5zaWRlIHN0YXJ0bGlzdGVuaW5nXCIpO1xyXG5cdFx0aWYgKCF0aGlzLnJlY29yZGluZ0F2YWlsYWJsZSkge1xyXG5cdFx0XHRjb25zb2xlLmxvZyhcImluc2lkZSBpZlwiKTtcclxuXHRcdFx0YWxlcnQoe1xyXG5cdFx0XHR0aXRsZTogXCJOb3Qgc3VwcG9ydGVkXCIsXHJcblx0XHRcdG1lc3NhZ2U6IFwiU3BlZWNoIHJlY29nbml0aW9uIG5vdCBzdXBwb3J0ZWQgb24gdGhpcyBkZXZpY2UuIFRyeSBhIGRpZmZlcmVudCBkZXZpY2UgcGxlYXNlLlwiLFxyXG5cdFx0XHRva0J1dHRvblRleHQ6IFwiT2gsIGJ1bW1lclwiXHJcblx0XHRcdH0pO1xyXG5cdFx0XHR0aGlzLnJlY29nbml6ZWRUZXh0ID0gXCJObyBzdXBwb3J0LCBTb3JyeVwiO1xyXG5cdFx0XHR0aGlzLnJlY29yZGluZyA9IGZhbHNlO1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblx0XHQvLyBjb25zb2xlLmxvZyhcImVsc2UgcGFydFwiKTtcclxuXHRcdHRoaXMucmVjb3JkaW5nID0gdHJ1ZTtcclxuXHRcdHRoaXMuc3BlZWNoMnRleHQuc3RhcnRMaXN0ZW5pbmcoe1xyXG5cdFx0XHRsb2NhbGU6IFwiZW4tVVNcIixcclxuXHRcdFx0cmV0dXJuUGFydGlhbFJlc3VsdHM6IHRydWUsXHJcblx0XHRcdG9uUmVzdWx0OiAodHJhbnNjcmlwdGlvbjogU3BlZWNoUmVjb2duaXRpb25UcmFuc2NyaXB0aW9uKSA9PiB7XHJcblx0XHRcdFx0Ly8gdGhpcy56b25lLnJ1bigoKSA9PiB0aGlzLnJlY29nbml6ZWRUZXh0ID0gdHJhbnNjcmlwdGlvbi50ZXh0KTtcclxuXHRcdFx0XHR0aGlzLmxhc3RUcmFuc2NyaXB0aW9uID0gdHJhbnNjcmlwdGlvbi50ZXh0O1xyXG5cdFx0XHRcdGlmICh0cmFuc2NyaXB0aW9uLmZpbmlzaGVkKSB7XHJcblx0XHRcdFx0XHR0aGlzLnNwb2tlbiA9IHRydWU7XHJcblx0XHRcdFx0XHRzZXRUaW1lb3V0KCgpID0+IGFsZXJ0KHRyYW5zY3JpcHRpb24udGV4dCksIDMwMCk7XHJcblx0XHRcdFx0XHR0aGlzLnNwb2tlblRleHQgPSB0cmFuc2NyaXB0aW9uLnRleHQ7XHJcblx0XHRcdFx0XHQvLyBhbGVydCh0cmFuc2NyaXB0aW9uLnRleHQpO1xyXG5cdFx0XHRcdFx0dGhpcy5nZW5lcmF0ZVNjb3JlKCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9LFxyXG5cdFx0fSkudGhlbihcclxuXHRcdFx0KHN0YXJ0ZWQ6IGJvb2xlYW4pID0+IHtjb25zb2xlLmxvZyhcInN0YXJ0ZWQgbGlzdGVuaW5nXCIpO30sXHJcblx0XHRcdChlcnJvck1lc3NhZ2U6IHN0cmluZykgPT4ge2NvbnNvbGUubG9nKGBFcnJvcjogJHtlcnJvck1lc3NhZ2V9YCk7fVxyXG5cdFx0KTtcclxuXHR9XHJcblxyXG5cdHByaXZhdGUgZ2VuZXJhdGVTY29yZSgpOiB2b2lkIHtcclxuXHRcdGxldCBzcG9rZW5TZW50ZW5jZXMgPSB0aGlzLnNwb2tlblRleHQuc3BsaXQoXCIgXCIpO1xyXG5cdFx0bGV0IGdpdmVuU2VudGVuY2VzID0gdGhpcy5xdWVzdGlvbi50ZXh0LnNwbGl0KFwiIFwiKTtcclxuXHRcdGxldCB2PTA7XHJcblx0XHR3aGlsZSh2PGdpdmVuU2VudGVuY2VzLmxlbmd0aCl7XHJcblx0XHRcdGdpdmVuU2VudGVuY2VzW3ZdLnJlcGxhY2UoJy4nLCcnKTtcclxuXHRcdFx0Z2l2ZW5TZW50ZW5jZXNbdl0ucmVwbGFjZSgnLCcsJycpO1xyXG5cdFx0XHR2Kys7XHJcblx0XHR9XHJcblx0XHRsZXQgaT0wO1xyXG5cdFx0bGV0IGo9MDtcclxuXHRcdGxldCBjb3VudD0wO1xyXG5cdFx0d2hpbGUoaTxzcG9rZW5TZW50ZW5jZXMubGVuZ3RoICl7XHJcblx0XHRcdHdoaWxlKGo8Z2l2ZW5TZW50ZW5jZXMubGVuZ3RoKXtcclxuXHRcdFx0XHRpZihzcG9rZW5TZW50ZW5jZXNbaV0udG9Mb3dlckNhc2UoKSA9PSBnaXZlblNlbnRlbmNlc1tqXS50b0xvd2VyQ2FzZSgpKXtcclxuXHRcdFx0XHRcdGNvdW50Kys7XHJcblx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0aisrO1xyXG5cdFx0XHR9XHJcblx0XHRcdGkrKzsgaj0wO1xyXG5cdFx0fVxyXG5cdFx0YWxlcnQoKChjb3VudC9naXZlblNlbnRlbmNlcy5sZW5ndGgpKjEwMCkudG9GaXhlZCgyKSk7XHJcblx0fVxyXG4gICAgXHJcbiAgICBwcml2YXRlIHN0b3BMaXN0ZW5pbmcoKTogdm9pZCB7XHJcblx0XHQvLyBjb25zb2xlLmxvZyhcInN0b3BMaXN0ZW5pbmdcIik7XHJcbiAgICAgICAgdGhpcy5yZWNvcmRpbmcgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnNwZWVjaDJ0ZXh0LnN0b3BMaXN0ZW5pbmcoKS50aGVuKCgpID0+IHtcclxuICAgICAgICAgIFx0Y29uc29sZS5sb2coXCJTdG9wcGVkIGxpc3RlbmluZ1wiKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcblx0bmdPbkluaXQoKTogdm9pZCB7XHJcblx0XHR0aGlzLnNwZWVjaDJ0ZXh0ID0gbmV3IFNwZWVjaFJlY29nbml0aW9uKCk7XHJcbiAgICBcdHRoaXMuc3BlZWNoMnRleHQuYXZhaWxhYmxlKCkudGhlbihhdmFpbCA9PiB7XHJcbiAgICAgIFx0XHR0aGlzLnJlY29yZGluZ0F2YWlsYWJsZSA9IGF2YWlsO1xyXG4gICAgXHR9KTtcclxuXHRcdC8vIHRoaXMudGV4dDJzcGVlY2ggPSBuZXcgVE5TVGV4dFRvU3BlZWNoKCk7XHJcblx0XHR0aGlzLnN1YiA9IHRoaXMucm91dGUucGFyYW1zLnN1YnNjcmliZShwYXJhbXMgPT4ge1xyXG5cdFx0XHR0aGlzLnBhdGggPSBwYXJhbXNbJ3BhdGgnXTtcclxuXHRcdFx0dGhpcy5wYXRoc2VydmljZS5nZXRRdWVzdGlvbnModGhpcy5wYXRoKVxyXG5cdFx0XHRcdC5zdWJzY3JpYmUoXHJcblx0XHRcdFx0XHQoZDogUXVlc3Rpb25bXSkgPT4ge1xyXG5cdFx0XHRcdFx0XHR0aGlzLnF1ZXN0aW9uID0gZFswXTtcclxuXHRcdFx0XHRcdFx0dGhpcy5xdWVzdGlvbnMgPSBkO1xyXG5cdFx0XHRcdFx0XHR0aGlzLnZhcmlhYmxlID0gdGhpcy5xdWVzdGlvbi5xdWVzdDtcclxuXHRcdFx0XHRcdFx0dGhpcy52YXJpYWJsZS5yZXBsYWNlKFwiLlwiLFwiP1wiKTtcclxuXHRcdFx0XHRcdFx0dGhpcy5zZW50ZW5jZXMgPSB0aGlzLnZhcmlhYmxlLnNwbGl0KFwiPyBcIik7XHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0KGVycm9yKSA9PiB7XHJcblx0XHRcdFx0XHRcdGNvbnNvbGUubG9nKGVycm9yKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHQpXHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdG5nT25EZXN0cm95KCkge1xyXG5cdFx0dGhpcy5zdWIudW5zdWJzY3JpYmUoKTtcclxuXHR9XHJcbn0iXX0=