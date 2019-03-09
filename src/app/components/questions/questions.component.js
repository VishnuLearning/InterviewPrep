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
        this.variable.replace(/./g, "?");
        this.sentences = this.variable.split("? ");
        for (var v = 0; v < this.sentences.length; v++)
            console.log(this.sentences[v]);
        // console.log(this.sentences);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlc3Rpb25zLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInF1ZXN0aW9ucy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBc0Q7QUFDdEQsOERBQTRGO0FBQzVGLHNDQUE2RDtBQUM3RCw0Q0FBNEM7QUFDNUMsNERBQTBEO0FBQzFELDBDQUF5RDtBQUd6RCx1RUFBMEU7QUFDMUUsbUZBQThIO0FBRzlILHdEQUF3RDtBQUN4RCxxREFBcUQ7QUFVckQ7SUF3Q0MsNEJBQW9CLFdBQTRCLEVBQVUsV0FBd0IsRUFBVSxLQUFxQixFQUFVLE1BQWM7UUFBekksbUJBY0M7UUFkbUIsZ0JBQVcsR0FBWCxXQUFXLENBQWlCO1FBQVUsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFBVSxVQUFLLEdBQUwsS0FBSyxDQUFnQjtRQUFVLFdBQU0sR0FBTixNQUFNLENBQVE7UUEvQnpJLGNBQVMsR0FBVywyQkFBMkIsQ0FBQztRQU1oRCxlQUFVLEdBQVksS0FBSyxDQUFDO1FBQzVCLGFBQVEsR0FBWSxLQUFLLENBQUM7UUFDMUIsa0JBQWEsR0FBVyxDQUFDLENBQUMsQ0FBQztRQUczQix3QkFBbUIsR0FBVyxDQUFDLENBQUM7UUFFaEMsaUJBQVksR0FBRyxDQUFDLGdCQUFnQixFQUFDLHVCQUF1QixFQUFDLHVCQUF1QixFQUFDLDBCQUEwQixFQUFDLHdCQUF3QjtZQUNwSSx1QkFBdUIsRUFBQyxnQ0FBZ0MsRUFBQywwQkFBMEIsRUFBQywwQkFBMEI7WUFDOUcsZ0NBQWdDLEVBQUMsMEJBQTBCLEVBQUMsdUJBQXVCLEVBQUMsZ0NBQWdDLEVBQUMseUJBQXlCO1lBQzlJLHVCQUF1QixFQUFDLHlCQUF5QixFQUFDLHlCQUF5QixFQUFDLHlCQUF5QixFQUFDLHdCQUF3QjtZQUM5SCx5QkFBeUIsRUFBQyxnQ0FBZ0MsRUFBQyx3QkFBd0IsQ0FBQyxDQUFDO1FBQ3JGLGVBQVUsR0FBRyxHQUFHLENBQUM7UUFJZCxzQkFBaUIs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QUM7Z0JBQ3BDLE9BQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBQyxHQUFHLENBQUMsQ0FBQztnQkFDL0IsT0FBSSxDQUFDLFNBQVMsR0FBRyxPQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUM1QyxDQUFDLEVBQ0QsVUFBQyxLQUFLO2dCQUNMLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDcEIsQ0FBQyxDQUNELENBQUE7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNKLENBQUM7SUFFRCx3Q0FBVyxHQUFYO1FBQ0MsSUFBSSxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUN4QixDQUFDO0lBN1FrQztRQUFsQyxnQkFBUyxDQUFDLGdDQUFzQixDQUFDO2tDQUF5QixnQ0FBc0I7K0RBQUM7SUFDN0Q7UUFBcEIsZ0JBQVMsQ0FBQyxRQUFRLENBQUM7a0NBQWEsaUJBQVU7MkRBQUM7SUFGaEMsa0JBQWtCO1FBUjlCLGdCQUFTLENBQUM7WUFDVixRQUFRLEVBQUUsV0FBVztZQUNyQixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsU0FBUyxFQUFFLENBQUMsMEJBQVcsQ0FBQztZQUN4QixXQUFXLEVBQUUsNEJBQTRCO1lBQ3pDLFNBQVMsRUFBRSxDQUFDLDJCQUEyQixDQUFDO1NBQ3hDLENBQUM7eUNBMENnQywyQ0FBZSxFQUF1QiwwQkFBVyxFQUFpQix1QkFBYyxFQUFrQixlQUFNO09BeEM3SCxrQkFBa0IsQ0ErUTlCO0lBQUQseUJBQUM7Q0FBQSxBQS9RRCxJQStRQztBQS9RWSxnREFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBWaWV3Q2hpbGQsIEVsZW1lbnRSZWYgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBSYWRTaWRlRHJhd2VyQ29tcG9uZW50LCBTaWRlRHJhd2VyVHlwZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtdWktc2lkZWRyYXdlci9hbmd1bGFyXCI7XHJcbmltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBPbkRlc3Ryb3kgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG4vLyBpbXBvcnQgeyBSZXNwb25zZSB9IGZyb20gXCJAYW5ndWxhci9odHRwXCI7XHJcbmltcG9ydCB7IFBhdGhTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL3BhdGguc2VydmljZVwiO1xyXG5pbXBvcnQgeyBSb3V0ZXIsIEFjdGl2YXRlZFJvdXRlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHsgUXVlc3Rpb24gfSBmcm9tIFwiLi4vLi4vY2xhc3Nlcy9xdWVzdGlvblwiO1xyXG5pbXBvcnQgeyBTd2lwZUdlc3R1cmVFdmVudERhdGEgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9nZXN0dXJlc1wiO1xyXG5pbXBvcnQgeyBUTlNUZXh0VG9TcGVlY2gsIFNwZWFrT3B0aW9ucyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtdGV4dHRvc3BlZWNoXCI7XHJcbmltcG9ydCB7IFNwZWVjaFJlY29nbml0aW9uLCBTcGVlY2hSZWNvZ25pdGlvblRyYW5zY3JpcHRpb24sIFNwZWVjaFJlY29nbml0aW9uT3B0aW9ucyB9IGZyb20gJ25hdGl2ZXNjcmlwdC1zcGVlY2gtcmVjb2duaXRpb24nO1xyXG5pbXBvcnQgeyB2YXJpYWJsZSB9IGZyb20gXCJAYW5ndWxhci9jb21waWxlci9zcmMvb3V0cHV0L291dHB1dF9hc3RcIjtcclxuaW1wb3J0IHsgVmFyaWFibGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29tcGlsZXIvc3JjL3JlbmRlcjMvcjNfYXN0XCI7XHJcbi8vIGltcG9ydCB7IGVycm9yIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdHJhY2UvdHJhY2VcIjtcclxuLy8gaW1wb3J0IHtTbGlkZXJ9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL3NsaWRlclwiO1xyXG5cclxuQENvbXBvbmVudCh7XHJcblx0c2VsZWN0b3I6IFwiUXVlc3Rpb25zXCIsXHJcblx0bW9kdWxlSWQ6IG1vZHVsZS5pZCxcclxuXHRwcm92aWRlcnM6IFtQYXRoU2VydmljZV0sXHJcblx0dGVtcGxhdGVVcmw6IFwiLi9xdWVzdGlvbnMuY29tcG9uZW50Lmh0bWxcIixcclxuXHRzdHlsZVVybHM6IFsnLi9xdWVzdGlvbnMuY29tcG9uZW50LmNzcyddXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgUXVlc3Rpb25zQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xyXG5cdEBWaWV3Q2hpbGQoUmFkU2lkZURyYXdlckNvbXBvbmVudCkgcHVibGljIGRyYXdlckNvbXBvbmVudDogUmFkU2lkZURyYXdlckNvbXBvbmVudDtcclxuXHRAVmlld0NoaWxkKFwiYXZhdGFyXCIpIGF2YXRhckltYWdlOkVsZW1lbnRSZWY7XHJcblx0XHJcblx0b25PcGVuRHJhd2VyVGFwKCkge1xyXG5cdFx0dGhpcy5kcmF3ZXJDb21wb25lbnQuc2lkZURyYXdlci5zaG93RHJhd2VyKCk7XHJcblx0fVxyXG5cclxuXHRwYXRoOiBzdHJpbmc7XHJcblx0aW1hZ2VQYXRoOiBzdHJpbmcgPSBcIn4vYXNzZXRzL2ltYWdlcy9kcl9zaW5oYS9cIjtcclxuXHRxdWVzdGlvbnM6IFF1ZXN0aW9uW107XHJcblx0cXVlc3Rpb246IFF1ZXN0aW9uO1xyXG5cdHFudW06IG51bWJlcjtcclxuXHR0aXRsZTpzdHJpbmc7XHJcblx0dmFyaWFibGU6IHN0cmluZztcclxuXHRzaG93QW5zd2VyOiBib29sZWFuID0gZmFsc2U7XHJcblx0c3BlYWtpbmc6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHRzZW50ZW5jZUluZGV4OiBudW1iZXIgPSAtMTtcclxuXHRzZW50ZW5jZXM6IEFycmF5PHN0cmluZz47XHJcblx0c3BlYWtpbnRlcnZhbDogbnVtYmVyO1xyXG5cdHNwZWFrQW5kQW5pbWF0ZUZsYWc6IG51bWJlciA9IDE7XHJcblx0cHJpdmF0ZSBzdWI6IGFueTtcclxuXHRBdmF0YXJJbWFnZXMgPSBbJ2p1bGlhX2Z1bGwucG5nJywnanVsaWFfbW91dGhfd2lkZTUucG5nJywnanVsaWFfbW91dGhfd2lkZTUucG5nJywnanVsaWFfbW91dGhfbmFycm93X28ucG5nJywnanVsaWFfbW91dGhfd2lkZV95LnBuZycsXHJcblx0J2p1bGlhX21vdXRoX3dpZGU1LnBuZycsJ2p1bGlhX21vdXRoX3dpZGVfZF9mX2tfcl9zLnBuZycsJ2p1bGlhX21vdXRoX25hcnJvd193LnBuZycsJ2p1bGlhX21vdXRoX25hcnJvd19vLnBuZycsXHJcblx0J2p1bGlhX21vdXRoX3dpZGVfZF9mX2tfcl9zLnBuZycsJ2p1bGlhX21vdXRoX25hcnJvd191LnBuZycsJ2p1bGlhX21vdXRoX3dpZGU1LnBuZycsJ2p1bGlhX21vdXRoX3dpZGVfZF9mX2tfcl9zLnBuZycsJ2p1bGlhX21vdXRoX3dpZGVfc2gucG5nJyxcclxuXHQnanVsaWFfbW91dGhfd2lkZTUucG5nJywnanVsaWFfbW91dGhfd2lkZV9zaC5wbmcnLCdqdWxpYV9tb3V0aF93aWRlX3NoLnBuZycsJ2p1bGlhX21vdXRoX3dpZGVfdGgucG5nJywnanVsaWFfbW91dGhfd2lkZV9mLnBuZycsXHJcblx0J2p1bGlhX21vdXRoX3dpZGVfc2gucG5nJywnanVsaWFfbW91dGhfd2lkZV9kX2Zfa19yX3MucG5nJywnanVsaWFfbW91dGhfY2xvc2VkLnBuZyddO1xyXG5cdHNwZWVjaFJhdGUgPSAwLjk7XHJcblx0Ly8gcHJpdmF0ZSB0ZXh0MnNwZWVjaDogVE5TVGV4dFRvU3BlZWNoO1xyXG5cdHByaXZhdGUgc3BlZWNoMnRleHQ6IFNwZWVjaFJlY29nbml0aW9uO1xyXG5cdHNwZWFrT3B0aW9ucyA6IFNwZWFrT3B0aW9ucztcclxuICAgIG1pY3JvcGhvbmVFbmFibGVkOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICByZWNvcmRpbmc6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIGxhc3RUcmFuc2NyaXB0aW9uOiBzdHJpbmcgPSBudWxsO1xyXG4gICAgc3Bva2VuOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICByZWNvZ25pemVkVGV4dDogc3RyaW5nO1xyXG4gICAgcGl0Y2g6IG51bWJlciA9IDEwMDtcclxuXHRwcml2YXRlIHJlY29yZGluZ0F2YWlsYWJsZTogYm9vbGVhbjtcclxuXHRwcml2YXRlIHNwb2tlblRleHQ6IHN0cmluZztcclxuXHJcblx0Y29uc3RydWN0b3IocHJpdmF0ZSB0ZXh0MnNwZWVjaDogVE5TVGV4dFRvU3BlZWNoLCBwcml2YXRlIHBhdGhzZXJ2aWNlOiBQYXRoU2VydmljZSwgcHJpdmF0ZSByb3V0ZTogQWN0aXZhdGVkUm91dGUsIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIpIHtcclxuXHRcdHRoaXMucXVlc3Rpb25zID0gW107XHJcblx0XHR0aGlzLnFudW0gPSAxO1xyXG5cdFx0dmFyIHUgPSBkZWNvZGVVUkkocm91dGVyLnVybCk7XHJcblx0XHR0aGlzLnRpdGxlID0gdS5zdWJzdHJpbmcodS5sYXN0SW5kZXhPZignJTJGJykrMywgdS5sYXN0SW5kZXhPZignLicpKTtcclxuXHRcdHRoaXMuc3BlYWtPcHRpb25zID0ge1xyXG5cdFx0XHR0ZXh0OiBcIlF1ZXN0aW9uIDEsIFwiLFxyXG5cdFx0XHRwaXRjaDogMS4wLFxyXG5cdFx0XHRzcGVha1JhdGU6IDAuOSxcclxuXHRcdFx0dm9sdW1lOiAxLjAsXHJcblx0XHRcdGxhbmd1YWdlOlwiZW5cIixcclxuXHRcdFx0bG9jYWxlOlwiZW4tVVNcIixcclxuXHRcdFx0ZmluaXNoZWRDYWxsYmFjazogKCk9Pnt0aGlzLnNwZWFrTmV4dFNlbnRlbmNlKCk7fVxyXG5cdFx0fTtcclxuXHR9XHJcblxyXG5cdG9uU3dpcGUoYXJnczogU3dpcGVHZXN0dXJlRXZlbnREYXRhKSB7XHJcblx0XHRpZiAoYXJncy5kaXJlY3Rpb24gPT0gMSkge1x0XHJcblx0XHRcdHRoaXMuZ29MZWZ0KCk7XHJcblx0XHR9IGVsc2UgaWYgKGFyZ3MuZGlyZWN0aW9uID09IDIpIHtcclxuXHRcdFx0dGhpcy5nb1JpZ2h0KCk7XHJcblx0XHR9XHJcblx0fVxyXG5cdGdvTGVmdCgpe1xyXG5cdFx0aWYgKHRoaXMucW51bSA+IDApIHtcdFxyXG5cdFx0XHR0aGlzLnRleHQyc3BlZWNoLnBhdXNlKCk7XHJcblx0XHRcdHRoaXMuYXZhdGFySW1hZ2UubmF0aXZlRWxlbWVudC5zcmMgPSB0aGlzLmltYWdlUGF0aCArIHRoaXMuQXZhdGFySW1hZ2VzWzBdO1xyXG5cdFx0XHR0aGlzLnNob3dBbnN3ZXIgPSBmYWxzZTtcclxuXHRcdFx0dGhpcy5sb2FkUXVlc3Rpb24odGhpcy5xbnVtIC0gMSk7XHJcblx0XHR9XHJcblx0fVxyXG5cdGdvUmlnaHQoKXtcclxuXHRcdGlmICh0aGlzLnFudW0gPCB0aGlzLnF1ZXN0aW9ucy5sZW5ndGggLSAxKSB7XHJcblx0XHRcdHRoaXMudGV4dDJzcGVlY2gucGF1c2UoKTtcclxuXHRcdFx0dGhpcy5hdmF0YXJJbWFnZS5uYXRpdmVFbGVtZW50LnNyYyA9IHRoaXMuaW1hZ2VQYXRoICsgdGhpcy5BdmF0YXJJbWFnZXNbMF07XHJcblx0XHRcdHRoaXMuc2hvd0Fuc3dlciA9IGZhbHNlO1xyXG5cdFx0XHR0aGlzLmxvYWRRdWVzdGlvbih0aGlzLnFudW0gKyAxKTtcclxuXHRcdH1cclxuXHR9XHJcblx0Ly9sb2FkaW5nIHF1ZXN0aW9uIGRpcmVjdGx5IGZyb20gbmF2aWdhdGlvbiB0YWJcclxuXHRsb2FkUXVlc3Rpb24oaTogbnVtYmVyKSB7XHJcblx0XHR0aGlzLmRyYXdlckNvbXBvbmVudC5zaWRlRHJhd2VyLmNsb3NlRHJhd2VyKCk7XHJcblx0XHR0aGlzLnF1ZXN0aW9uID0gdGhpcy5xdWVzdGlvbnNbaV07XHJcblx0XHR0aGlzLnZhcmlhYmxlID0gdGhpcy5xdWVzdGlvbi5xdWVzdDtcclxuXHRcdHRoaXMudmFyaWFibGUucmVwbGFjZSgvLi9nLFwiP1wiKTtcclxuXHRcdHRoaXMuc2VudGVuY2VzID0gdGhpcy52YXJpYWJsZS5zcGxpdChcIj8gXCIpO1xyXG5cdFx0Zm9yKHZhciB2PTA7djx0aGlzLnNlbnRlbmNlcy5sZW5ndGg7disrKVxyXG5cdFx0XHRjb25zb2xlLmxvZyh0aGlzLnNlbnRlbmNlc1t2XSk7XHJcblx0XHQvLyBjb25zb2xlLmxvZyh0aGlzLnNlbnRlbmNlcyk7XHJcblx0XHR0aGlzLnNlbnRlbmNlSW5kZXggPSAtMTtcclxuXHRcdGlmKHRoaXMuc3BlYWtpbnRlcnZhbCkgY2xlYXJJbnRlcnZhbCh0aGlzLnNwZWFraW50ZXJ2YWwpO1xyXG5cdFx0dGhpcy5zcGVha2luZyA9IGZhbHNlO1xyXG5cdFx0dGhpcy5zcGVha0FuZEFuaW1hdGVGbGFnID0gMTtcclxuXHRcdHRoaXMucW51bSA9IGk7XHJcblx0XHQvLyB0aGlzLnNwZWFrVGl0bGUoKTtcclxuXHR9XHJcblxyXG5cdGRpc3BsYXlBbnN3ZXIoKXtcclxuXHRcdHRoaXMuc2hvd0Fuc3dlciA9ICF0aGlzLnNob3dBbnN3ZXI7XHJcblx0fVxyXG5cdFxyXG5cdHNwZWFrTmV4dFNlbnRlbmNlKCl7XHJcblx0XHRjb25zb2xlLmxvZyhcInNwZWFrTmV4dFNlbnRlbmNlIGNhbGxlZCBcIiwgdGhpcy5zcGVha0FuZEFuaW1hdGVGbGFnLCB0aGlzLnNwZWFraW5nLCB0aGlzLnNlbnRlbmNlSW5kZXgpO1xyXG5cdFx0dGhpcy5zcGVha0FuZEFuaW1hdGVGbGFnKys7XHJcblx0XHRpZih0aGlzLnNwZWFraW5nICYmIHRoaXMuc3BlYWtBbmRBbmltYXRlRmxhZyA9PSAyKSB7XHJcblx0XHRcdHRoaXMuc3BlYWtBbmRBbmltYXRlRmxhZyA9IDA7XHJcblx0XHRcdHRoaXMuc2VudGVuY2VJbmRleCsrO1xyXG5cdFx0XHRpZih0aGlzLnNlbnRlbmNlSW5kZXg8dGhpcy5zZW50ZW5jZXMubGVuZ3RoKSB7XHJcblx0XHRcdFx0dGhpcy5zcGVha09wdGlvbnMudGV4dCA9IHRoaXMuc2VudGVuY2VzW3RoaXMuc2VudGVuY2VJbmRleF07XHJcblx0XHRcdFx0dGhpcy50ZXh0MnNwZWVjaC5zcGVhayh0aGlzLnNwZWFrT3B0aW9ucylcclxuXHRcdFx0XHQudGhlbigoKT0+e1xyXG5cdFx0XHRcdFx0dGhpcy5hbmltYXRlQXZhdGFyKCk7XHJcblx0XHRcdFx0XHRjb25zb2xlLmxvZyhcImluIHRoZW5cIik7fSwgXHJcblx0XHRcdFx0XHQoZXJyKT0+e2NvbnNvbGUubG9nKGVycik7fSk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0dGhpcy5zZW50ZW5jZUluZGV4ID0gLTE7XHJcblx0XHRcdFx0dGhpcy5zcGVha2luZyA9IGZhbHNlO1xyXG5cdFx0XHRcdHRoaXMuc3BlYWtBbmRBbmltYXRlRmxhZyA9IDE7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGFuaW1hdGVBdmF0YXIoKTogdm9pZCB7XHJcblx0XHRsZXQgaSA9IDA7XHJcbiAgICAgICAgdGhpcy5zcGVha2ludGVydmFsID0gc2V0SW50ZXJ2YWwoKCkgPT4geyBcclxuXHRcdFx0dGhpcy5hdmF0YXJJbWFnZS5uYXRpdmVFbGVtZW50LnNyYyA9IHRoaXMuaW1hZ2VQYXRoICsgdGhpcy5BdmF0YXJJbWFnZXNbdGhpcy5xdWVzdGlvbi52aXNlbWVzW3RoaXMuc2VudGVuY2VJbmRleF1baV1dO1xyXG5cdFx0XHRcclxuICAgICAgICAgICAgaSsrO1xyXG4gICAgICAgICAgICBpZiAoaSA9PSB0aGlzLnF1ZXN0aW9uLnZpc2VtZXNbdGhpcy5zZW50ZW5jZUluZGV4XS5sZW5ndGgpIHtcclxuXHRcdFx0XHRjbGVhckludGVydmFsKHRoaXMuc3BlYWtpbnRlcnZhbCk7XHJcblx0XHRcdFx0dGhpcy5zcGVha05leHRTZW50ZW5jZSgpO1xyXG5cdFx0XHR9XHJcblx0XHR9LCB0aGlzLnNwZWVjaFJhdGUqODUpO1xyXG5cdH1cclxuXHJcblx0dGV4dFRvU3BlZWNoKCl7XHJcblx0XHQvLyB0aGlzLnRleHQyc3BlZWNoLnBhdXNlKCk7XHJcblx0XHR2YXIgX3RoaXMgPSB0aGlzO1xyXG5cdFx0dGhpcy5zcGVha2luZyA9IHRydWU7XHJcblx0XHR0aGlzLnNwZWFrTmV4dFNlbnRlbmNlKCk7XHJcblx0fVxyXG5cclxuXHRzcGVha1RleHRPbmx5KCl7XHJcblx0XHR0aGlzLnRleHQyc3BlZWNoLnBhdXNlKCk7XHJcblx0XHRsZXQgb3B0aW9uczogU3BlYWtPcHRpb25zID0ge1xyXG5cdFx0XHR0ZXh0OiB0aGlzLnF1ZXN0aW9uLnRleHQsXHJcblx0XHRcdHBpdGNoOiAxLjAsXHJcblx0XHRcdHNwZWFrUmF0ZTogMC45LFxyXG5cdFx0XHR2b2x1bWU6IDEuMCxcclxuXHRcdFx0bGFuZ3VhZ2U6IFwiZW5cIixcclxuXHRcdFx0bG9jYWxlOiBcImVuLVVTXCIsXHJcblx0XHRcdGZpbmlzaGVkQ2FsbGJhY2s6ICgpPT57XHJcblx0XHRcdFx0Y29uc29sZS5sb2coXCJyZWFkIHRoZSBhbnN3ZXJcIik7XHJcblx0XHRcdH1cclxuXHRcdH07XHJcblx0XHR0aGlzLnRleHQyc3BlZWNoLnNwZWFrKG9wdGlvbnMpO1xyXG5cdH1cclxuICAgXHJcblx0dG9nZ2xlUmVjb3JkaW5nKCk6IHZvaWQge1xyXG5cdFx0dGhpcy5yZWNvcmRpbmcgPSAhdGhpcy5yZWNvcmRpbmc7XHJcblx0XHQvLyBjb25zb2xlLmxvZyh0aGlzLnJlY29yZGluZyk7XHJcbiAgICAgICAgaWYgKHRoaXMucmVjb3JkaW5nKSB7XHJcblx0XHRcdC8vIGNvbnNvbGUubG9nKFwidG9nZ2xlUmVjb3JkaW5nIHRydWUgcGFydFwiKTtcclxuXHRcdFx0dGhpcy5zcG9rZW4gPSBmYWxzZTtcclxuICAgICAgICAgIFx0dGhpcy5sYXN0VHJhbnNjcmlwdGlvbiA9IG51bGw7XHJcbiAgICAgICAgICBcdHRoaXMuc3RhcnRMaXN0ZW5pbmcoKTtcclxuXHRcdH0gXHJcblx0XHRlbHNlIHtcclxuXHRcdFx0Ly8gY29uc29sZS5sb2coXCJ0b2dnbGVSZWNvcmRpbmcgdHJ1ZSBwYXJ0XCIpO1xyXG4gICAgICAgICAgXHR0aGlzLnN0b3BMaXN0ZW5pbmcoKTtcclxuICAgICAgICAgIFx0aWYgKCF0aGlzLnNwb2tlbiAmJiB0aGlzLmxhc3RUcmFuc2NyaXB0aW9uICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIFx0YWxlcnQodGhpcy5sYXN0VHJhbnNjcmlwdGlvbik7XHJcbiAgICAgICAgICBcdH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuXHRwcml2YXRlIHN0YXJ0TGlzdGVuaW5nKCk6IHZvaWQge1xyXG5cdFx0Ly8gY29uc29sZS5sb2coXCJJbnNpZGUgc3RhcnRsaXN0ZW5pbmdcIik7XHJcblx0XHRpZiAoIXRoaXMucmVjb3JkaW5nQXZhaWxhYmxlKSB7XHJcblx0XHRcdGNvbnNvbGUubG9nKFwiaW5zaWRlIGlmXCIpO1xyXG5cdFx0XHRhbGVydCh7XHJcblx0XHRcdHRpdGxlOiBcIk5vdCBzdXBwb3J0ZWRcIixcclxuXHRcdFx0bWVzc2FnZTogXCJTcGVlY2ggcmVjb2duaXRpb24gbm90IHN1cHBvcnRlZCBvbiB0aGlzIGRldmljZS4gVHJ5IGEgZGlmZmVyZW50IGRldmljZSBwbGVhc2UuXCIsXHJcblx0XHRcdG9rQnV0dG9uVGV4dDogXCJPaCwgYnVtbWVyXCJcclxuXHRcdFx0fSk7XHJcblx0XHRcdHRoaXMucmVjb2duaXplZFRleHQgPSBcIk5vIHN1cHBvcnQsIFNvcnJ5XCI7XHJcblx0XHRcdHRoaXMucmVjb3JkaW5nID0gZmFsc2U7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHRcdC8vIGNvbnNvbGUubG9nKFwiZWxzZSBwYXJ0XCIpO1xyXG5cdFx0dGhpcy5yZWNvcmRpbmcgPSB0cnVlO1xyXG5cdFx0dGhpcy5zcGVlY2gydGV4dC5zdGFydExpc3RlbmluZyh7XHJcblx0XHRcdGxvY2FsZTogXCJlbi1VU1wiLFxyXG5cdFx0XHRyZXR1cm5QYXJ0aWFsUmVzdWx0czogdHJ1ZSxcclxuXHRcdFx0b25SZXN1bHQ6ICh0cmFuc2NyaXB0aW9uOiBTcGVlY2hSZWNvZ25pdGlvblRyYW5zY3JpcHRpb24pID0+IHtcclxuXHRcdFx0XHQvLyB0aGlzLnpvbmUucnVuKCgpID0+IHRoaXMucmVjb2duaXplZFRleHQgPSB0cmFuc2NyaXB0aW9uLnRleHQpO1xyXG5cdFx0XHRcdHRoaXMubGFzdFRyYW5zY3JpcHRpb24gPSB0cmFuc2NyaXB0aW9uLnRleHQ7XHJcblx0XHRcdFx0aWYgKHRyYW5zY3JpcHRpb24uZmluaXNoZWQpIHtcclxuXHRcdFx0XHRcdHRoaXMuc3Bva2VuID0gdHJ1ZTtcclxuXHRcdFx0XHRcdHNldFRpbWVvdXQoKCkgPT4gYWxlcnQodHJhbnNjcmlwdGlvbi50ZXh0KSwgMzAwKTtcclxuXHRcdFx0XHRcdHRoaXMuc3Bva2VuVGV4dCA9IHRyYW5zY3JpcHRpb24udGV4dDtcclxuXHRcdFx0XHRcdC8vIGFsZXJ0KHRyYW5zY3JpcHRpb24udGV4dCk7XHJcblx0XHRcdFx0XHR0aGlzLmdlbmVyYXRlU2NvcmUoKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0sXHJcblx0XHR9KS50aGVuKFxyXG5cdFx0XHQoc3RhcnRlZDogYm9vbGVhbikgPT4ge2NvbnNvbGUubG9nKFwic3RhcnRlZCBsaXN0ZW5pbmdcIik7fSxcclxuXHRcdFx0KGVycm9yTWVzc2FnZTogc3RyaW5nKSA9PiB7Y29uc29sZS5sb2coYEVycm9yOiAke2Vycm9yTWVzc2FnZX1gKTt9XHJcblx0XHQpO1xyXG5cdH1cclxuXHJcblx0cHJpdmF0ZSBnZW5lcmF0ZVNjb3JlKCk6IHZvaWQge1xyXG5cdFx0bGV0IHNwb2tlblNlbnRlbmNlcyA9IHRoaXMuc3Bva2VuVGV4dC5zcGxpdChcIiBcIik7XHJcblx0XHRsZXQgZ2l2ZW5TZW50ZW5jZXMgPSB0aGlzLnF1ZXN0aW9uLnRleHQuc3BsaXQoXCIgXCIpO1xyXG5cdFx0bGV0IHY9MDtcclxuXHRcdHdoaWxlKHY8Z2l2ZW5TZW50ZW5jZXMubGVuZ3RoKXtcclxuXHRcdFx0Z2l2ZW5TZW50ZW5jZXNbdl0ucmVwbGFjZSgnLicsJycpO1xyXG5cdFx0XHRnaXZlblNlbnRlbmNlc1t2XS5yZXBsYWNlKCcsJywnJyk7XHJcblx0XHRcdHYrKztcclxuXHRcdH1cclxuXHRcdGxldCBpPTA7XHJcblx0XHRsZXQgaj0wO1xyXG5cdFx0bGV0IGNvdW50PTA7XHJcblx0XHR3aGlsZShpPHNwb2tlblNlbnRlbmNlcy5sZW5ndGggKXtcclxuXHRcdFx0d2hpbGUoajxnaXZlblNlbnRlbmNlcy5sZW5ndGgpe1xyXG5cdFx0XHRcdGlmKHNwb2tlblNlbnRlbmNlc1tpXS50b0xvd2VyQ2FzZSgpID09IGdpdmVuU2VudGVuY2VzW2pdLnRvTG93ZXJDYXNlKCkpe1xyXG5cdFx0XHRcdFx0Y291bnQrKztcclxuXHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRqKys7XHJcblx0XHRcdH1cclxuXHRcdFx0aSsrOyBqPTA7XHJcblx0XHR9XHJcblx0XHRhbGVydCgoKGNvdW50L2dpdmVuU2VudGVuY2VzLmxlbmd0aCkqMTAwKS50b0ZpeGVkKDIpKTtcclxuXHR9XHJcbiAgICBcclxuICAgIHByaXZhdGUgc3RvcExpc3RlbmluZygpOiB2b2lkIHtcclxuXHRcdC8vIGNvbnNvbGUubG9nKFwic3RvcExpc3RlbmluZ1wiKTtcclxuICAgICAgICB0aGlzLnJlY29yZGluZyA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuc3BlZWNoMnRleHQuc3RvcExpc3RlbmluZygpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgXHRjb25zb2xlLmxvZyhcIlN0b3BwZWQgbGlzdGVuaW5nXCIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuXHRuZ09uSW5pdCgpOiB2b2lkIHtcclxuXHRcdHRoaXMuc3BlZWNoMnRleHQgPSBuZXcgU3BlZWNoUmVjb2duaXRpb24oKTtcclxuICAgIFx0dGhpcy5zcGVlY2gydGV4dC5hdmFpbGFibGUoKS50aGVuKGF2YWlsID0+IHtcclxuICAgICAgXHRcdHRoaXMucmVjb3JkaW5nQXZhaWxhYmxlID0gYXZhaWw7XHJcbiAgICBcdH0pO1xyXG5cdFx0Ly8gdGhpcy50ZXh0MnNwZWVjaCA9IG5ldyBUTlNUZXh0VG9TcGVlY2goKTtcclxuXHRcdHRoaXMuc3ViID0gdGhpcy5yb3V0ZS5wYXJhbXMuc3Vic2NyaWJlKHBhcmFtcyA9PiB7XHJcblx0XHRcdHRoaXMucGF0aCA9IHBhcmFtc1sncGF0aCddO1xyXG5cdFx0XHR0aGlzLnBhdGhzZXJ2aWNlLmdldFF1ZXN0aW9ucyh0aGlzLnBhdGgpXHJcblx0XHRcdFx0LnN1YnNjcmliZShcclxuXHRcdFx0XHRcdChkOiBRdWVzdGlvbltdKSA9PiB7XHJcblx0XHRcdFx0XHRcdHRoaXMucXVlc3Rpb24gPSBkWzBdO1xyXG5cdFx0XHRcdFx0XHR0aGlzLnF1ZXN0aW9ucyA9IGQ7XHJcblx0XHRcdFx0XHRcdHRoaXMudmFyaWFibGUgPSB0aGlzLnF1ZXN0aW9uLnF1ZXN0O1xyXG5cdFx0XHRcdFx0XHR0aGlzLnZhcmlhYmxlLnJlcGxhY2UoXCIuXCIsXCI/XCIpO1xyXG5cdFx0XHRcdFx0XHR0aGlzLnNlbnRlbmNlcyA9IHRoaXMudmFyaWFibGUuc3BsaXQoXCI/IFwiKTtcclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHQoZXJyb3IpID0+IHtcclxuXHRcdFx0XHRcdFx0Y29uc29sZS5sb2coZXJyb3IpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdClcclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0bmdPbkRlc3Ryb3koKSB7XHJcblx0XHR0aGlzLnN1Yi51bnN1YnNjcmliZSgpO1xyXG5cdH1cclxufSJdfQ==