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
    function QuestionsComponent(text2speech, pathservice, route, router, zone) {
        var _this_1 = this;
        this.text2speech = text2speech;
        this.pathservice = pathservice;
        this.route = route;
        this.router = router;
        this.zone = zone;
        this.imagePath = "~/assets/images/Final_Avatar_small/";
        this.showAnswer = false;
        this.speaking = false;
        this.sentenceIndex = -1;
        this.speakAndAnimateFlag = 1;
        this.score = 0;
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
    // @ViewChild("micoff") micImage:ElementRef ;
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
            this.recognizedText = undefined;
            this.text2speech.pause();
            this.avatarImage.nativeElement.src = this.imagePath + this.AvatarImages[0];
            this.showAnswer = false;
            this.loadQuestion(this.qnum - 1);
        }
    };
    QuestionsComponent.prototype.goRight = function () {
        if (this.qnum < this.questions.length - 1) {
            this.recognizedText = undefined;
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
                alert("We understood that you said: " + "'" + this.lastTranscription + "'");
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
                _this_1.zone.run(function () { return _this_1.recognizedText = transcription.text; });
                _this_1.lastTranscription = transcription.text;
                if (transcription.finished) {
                    _this_1.spoken = true;
                    _this_1.spokenText = transcription.text;
                    alert("We understood that you said: \n" + _this_1.lastTranscription);
                    _this_1.stopListening();
                }
            },
        }).then(function (started) { console.log("started listening"); }, function (errorMessage) { console.log("Error: " + errorMessage); });
    };
    QuestionsComponent.prototype.getLongestCommonSubsequence = function (A, B, m, n) {
        var L = [];
        var i = 0, j = 0;
        for (i = 0; i <= m; i++) {
            L.push([]);
            for (j = 0; j <= n; j++) {
                L[i].push(0);
            }
        }
        for (i = 0; i <= m; i++) {
            for (j = 0; j <= n; j++) {
                if (i == 0 || j == 0)
                    L[i][j] = 0;
                else if (A[i - 1] == B[j - 1])
                    L[i][j] = L[i - 1][j - 1] + 1;
                else
                    L[i][j] = Math.max(L[i - 1][j], L[i][j - 1]);
            }
        }
        return L[m][n];
    };
    QuestionsComponent.prototype.generateScore = function () {
        var spokenSentences = this.spokenText;
        var givenSentences = this.question.text;
        var re = /\./gi;
        spokenSentences = spokenSentences.replace(re, '');
        givenSentences = givenSentences.replace(re, '');
        re = /\,/gi;
        spokenSentences = spokenSentences.replace(re, '');
        givenSentences = givenSentences.replace(re, '');
        var givenWords = givenSentences.split(' ');
        var spokenWords = spokenSentences.split(' ');
        var l1 = givenWords.length;
        var l2 = spokenWords.length;
        if (l2 - l1 > 10 || l1 - l2 > 10) {
            this.recognizedText = undefined;
            alert("Please re-check your answer!");
            this.score = 0;
        }
        else {
            var count = this.getLongestCommonSubsequence(givenWords, spokenWords, l1, l2);
            this.score = Math.round(100 * count / l1);
            alert(this.score);
        }
    };
    QuestionsComponent.prototype.stopListening = function () {
        // console.log("stopListening");
        if (this.recording == true) {
            this.recording = false;
            // this.micImage.nativeElement.src = "~/assets/images/mic.png";
            this.speech2text.stopListening().then(function () {
                console.log("Stopped listening");
            });
        }
        this.generateScore();
        this.recognizedText = undefined;
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
        __metadata("design:paramtypes", [nativescript_texttospeech_1.TNSTextToSpeech, path_service_1.PathService, router_1.ActivatedRoute, router_1.Router, core_1.NgZone])
    ], QuestionsComponent);
    return QuestionsComponent;
}());
exports.QuestionsComponent = QuestionsComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlc3Rpb25zLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInF1ZXN0aW9ucy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBOEQ7QUFDOUQsOERBQTRGO0FBQzVGLHNDQUE2RDtBQUM3RCw0Q0FBNEM7QUFDNUMsaUVBQStEO0FBQy9ELDBDQUF5RDtBQUd6RCx1RUFBMEU7QUFDMUUsbUZBQW9HO0FBQ3BHLHdEQUF3RDtBQUN4RCxxREFBcUQ7QUFVckQ7SUEwQ0MsNEJBQW9CLFdBQTRCLEVBQVUsV0FBd0IsRUFBVSxLQUFxQixFQUFVLE1BQWMsRUFBVSxJQUFZO1FBQS9KLG1CQWNDO1FBZG1CLGdCQUFXLEdBQVgsV0FBVyxDQUFpQjtRQUFVLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQVUsVUFBSyxHQUFMLEtBQUssQ0FBZ0I7UUFBVSxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQVUsU0FBSSxHQUFKLElBQUksQ0FBUTtRQWhDL0osY0FBUyxHQUFXLHFDQUFxQyxDQUFDO1FBTTFELGVBQVUsR0FBWSxLQUFLLENBQUM7UUFDNUIsYUFBUSxHQUFZLEtBQUssQ0FBQztRQUMxQixrQkFBYSxHQUFXLENBQUMsQ0FBQyxDQUFDO1FBRzNCLHdCQUFtQixHQUFXLENBQUMsQ0FBQztRQUVoQyxVQUFLLEdBQUcsQ0FBQyxDQUFDO1FBQ1YsaUJBQVksR0FBRyxDQUFDLGVBQWUsRUFBQyxzQkFBc0IsRUFBQyxzQkFBc0IsRUFBQyx5QkFBeUIsRUFBQyx1QkFBdUI7WUFDL0gsc0JBQXNCLEVBQUMsK0JBQStCLEVBQUMseUJBQXlCLEVBQUMseUJBQXlCO1lBQzFHLCtCQUErQixFQUFDLHlCQUF5QixFQUFDLHNCQUFzQixFQUFDLCtCQUErQixFQUFDLHdCQUF3QjtZQUN6SSxzQkFBc0IsRUFBQyx3QkFBd0IsRUFBQyx3QkFBd0IsRUFBQyx3QkFBd0IsRUFBQyx1QkFBdUI7WUFDekgsd0JBQXdCLEVBQUMsK0JBQStCLEVB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Q0FBQyxDQUFDLENBQUM7SUFDSixDQUFDO0lBRUQsd0NBQVcsR0FBWDtRQUNDLElBQUksQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDeEIsQ0FBQztJQS9Ta0M7UUFBbEMsZ0JBQVMsQ0FBQyxnQ0FBc0IsQ0FBQztrQ0FBeUIsZ0NBQXNCOytEQUFDO0lBQzdEO1FBQXBCLGdCQUFTLENBQUMsUUFBUSxDQUFDO2tDQUFhLGlCQUFVOzJEQUFDO0lBRmhDLGtCQUFrQjtRQVI5QixnQkFBUyxDQUFDO1lBQ1YsUUFBUSxFQUFFLFdBQVc7WUFDckIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFNBQVMsRUFBRSxDQUFDLDBCQUFXLENBQUM7WUFDeEIsV0FBVyxFQUFFLDRCQUE0QjtZQUN6QyxTQUFTLEVBQUUsQ0FBQywyQkFBMkIsQ0FBQztTQUN4QyxDQUFDO3lDQTRDZ0MsMkNBQWUsRUFBdUIsMEJBQVcsRUFBaUIsdUJBQWMsRUFBa0IsZUFBTSxFQUFnQixhQUFNO09BMUNuSixrQkFBa0IsQ0FpVDlCO0lBQUQseUJBQUM7Q0FBQSxBQWpURCxJQWlUQztBQWpUWSxnREFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBWaWV3Q2hpbGQsIEVsZW1lbnRSZWYsIE5nWm9uZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IFJhZFNpZGVEcmF3ZXJDb21wb25lbnQsIFNpZGVEcmF3ZXJUeXBlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC11aS1zaWRlZHJhd2VyL2FuZ3VsYXJcIjtcclxuaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIE9uRGVzdHJveSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbi8vIGltcG9ydCB7IFJlc3BvbnNlIH0gZnJvbSBcIkBhbmd1bGFyL2h0dHBcIjtcclxuaW1wb3J0IHsgUGF0aFNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvcGF0aC9wYXRoLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgUm91dGVyLCBBY3RpdmF0ZWRSb3V0ZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCB7IFF1ZXN0aW9uIH0gZnJvbSBcIi4uLy4uL2NsYXNzZXMvcXVlc3Rpb25cIjtcclxuaW1wb3J0IHsgU3dpcGVHZXN0dXJlRXZlbnREYXRhIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvZ2VzdHVyZXNcIjtcclxuaW1wb3J0IHsgVE5TVGV4dFRvU3BlZWNoLCBTcGVha09wdGlvbnMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LXRleHR0b3NwZWVjaFwiO1xyXG5pbXBvcnQgeyBTcGVlY2hSZWNvZ25pdGlvbiwgU3BlZWNoUmVjb2duaXRpb25UcmFuc2NyaXB0aW9uIH0gZnJvbSAnbmF0aXZlc2NyaXB0LXNwZWVjaC1yZWNvZ25pdGlvbic7XHJcbi8vIGltcG9ydCB7IGVycm9yIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdHJhY2UvdHJhY2VcIjtcclxuLy8gaW1wb3J0IHtTbGlkZXJ9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL3NsaWRlclwiO1xyXG5cclxuQENvbXBvbmVudCh7XHJcblx0c2VsZWN0b3I6IFwiUXVlc3Rpb25zXCIsXHJcblx0bW9kdWxlSWQ6IG1vZHVsZS5pZCxcclxuXHRwcm92aWRlcnM6IFtQYXRoU2VydmljZV0sXHJcblx0dGVtcGxhdGVVcmw6IFwiLi9xdWVzdGlvbnMuY29tcG9uZW50Lmh0bWxcIixcclxuXHRzdHlsZVVybHM6IFsnLi9xdWVzdGlvbnMuY29tcG9uZW50LmNzcyddXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgUXVlc3Rpb25zQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xyXG5cdEBWaWV3Q2hpbGQoUmFkU2lkZURyYXdlckNvbXBvbmVudCkgcHVibGljIGRyYXdlckNvbXBvbmVudDogUmFkU2lkZURyYXdlckNvbXBvbmVudDtcclxuXHRAVmlld0NoaWxkKFwiYXZhdGFyXCIpIGF2YXRhckltYWdlOkVsZW1lbnRSZWY7XHJcblx0Ly8gQFZpZXdDaGlsZChcIm1pY29mZlwiKSBtaWNJbWFnZTpFbGVtZW50UmVmIDtcclxuXHJcblx0b25PcGVuRHJhd2VyVGFwKCkge1xyXG5cdFx0dGhpcy5kcmF3ZXJDb21wb25lbnQuc2lkZURyYXdlci5zaG93RHJhd2VyKCk7XHJcblx0fVxyXG5cclxuXHRwYXRoOiBzdHJpbmc7XHJcblx0aW1hZ2VQYXRoOiBzdHJpbmcgPSBcIn4vYXNzZXRzL2ltYWdlcy9GaW5hbF9BdmF0YXJfc21hbGwvXCI7XHJcblx0cXVlc3Rpb25zOiBRdWVzdGlvbltdO1xyXG5cdHF1ZXN0aW9uOiBRdWVzdGlvbjtcclxuXHRxbnVtOiBudW1iZXI7XHJcblx0dGl0bGU6c3RyaW5nO1xyXG5cdHZhcmlhYmxlOiBzdHJpbmc7XHJcblx0c2hvd0Fuc3dlcjogYm9vbGVhbiA9IGZhbHNlO1xyXG5cdHNwZWFraW5nOiBib29sZWFuID0gZmFsc2U7XHJcblx0c2VudGVuY2VJbmRleDogbnVtYmVyID0gLTE7XHJcblx0c2VudGVuY2VzOiBBcnJheTxzdHJpbmc+O1xyXG5cdHNwZWFraW50ZXJ2YWw6IG51bWJlcjtcclxuXHRzcGVha0FuZEFuaW1hdGVGbGFnOiBudW1iZXIgPSAxO1xyXG5cdHByaXZhdGUgc3ViOiBhbnk7XHJcblx0c2NvcmUgPSAwO1xyXG5cdEF2YXRhckltYWdlcyA9IFsnam9ic19mdWxsLnBuZycsJ2pvYnNfbW91dGhfd2lkZTUucG5nJywnam9ic19tb3V0aF93aWRlNS5wbmcnLCdqb2JzX21vdXRoX25hcnJvd19vLnBuZycsJ2pvYnNfbW91dGhfd2lkZV95LnBuZycsXHJcblx0J2pvYnNfbW91dGhfd2lkZTUucG5nJywnam9ic19tb3V0aF93aWRlX2RfZl9rX3Jfcy5wbmcnLCdqb2JzX21vdXRoX25hcnJvd193LnBuZycsJ2pvYnNfbW91dGhfbmFycm93X28ucG5nJyxcclxuXHQnam9ic19tb3V0aF93aWRlX2RfZl9rX3Jfcy5wbmcnLCdqb2JzX21vdXRoX25hcnJvd191LnBuZycsJ2pvYnNfbW91dGhfd2lkZTUucG5nJywnam9ic19tb3V0aF93aWRlX2RfZl9rX3Jfcy5wbmcnLCdqb2JzX21vdXRoX3dpZGVfc2gucG5nJyxcclxuXHQnam9ic19tb3V0aF93aWRlNS5wbmcnLCdqb2JzX21vdXRoX3dpZGVfc2gucG5nJywnam9ic19tb3V0aF93aWRlX3NoLnBuZycsJ2pvYnNfbW91dGhfd2lkZV90aC5wbmcnLCdqb2JzX21vdXRoX3dpZGVfZi5wbmcnLFxyXG5cdCdqb2JzX21vdXRoX3dpZGVfc2gucG5nJywnam9ic19tb3V0aF93aWRlX2RfZl9rX3Jfcy5wbmcnLCdqb2JzX21vdXRoX2Nsb3NlZC5wbmcnXTtcclxuXHRzcGVlY2hSYXRlID0gMC45O1xyXG5cdC8vIHByaXZhdGUgdGV4dDJzcGVlY2g6IFROU1RleHRUb1NwZWVjaDtcclxuXHRwcml2YXRlIHNwZWVjaDJ0ZXh0OiBTcGVlY2hSZWNvZ25pdGlvbjtcclxuXHRzcGVha09wdGlvbnMgOiBTcGVha09wdGlvbnM7XHJcbiAgICBtaWNyb3Bob25lRW5hYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgcmVjb3JkaW5nOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBsYXN0VHJhbnNjcmlwdGlvbjogc3RyaW5nID0gbnVsbDtcclxuICAgIHNwb2tlbjogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgcmVjb2duaXplZFRleHQ6IHN0cmluZztcclxuICAgIHBpdGNoOiBudW1iZXIgPSAxMDA7XHJcblx0cHJpdmF0ZSByZWNvcmRpbmdBdmFpbGFibGU6IGJvb2xlYW47XHJcblx0cHJpdmF0ZSBzcG9rZW5UZXh0OiBzdHJpbmc7XHJcblxyXG5cdGNvbnN0cnVjdG9yKHByaXZhdGUgdGV4dDJzcGVlY2g6IFROU1RleHRUb1NwZWVjaCwgcHJpdmF0ZSBwYXRoc2VydmljZTogUGF0aFNlcnZpY2UsIHByaXZhdGUgcm91dGU6IEFjdGl2YXRlZFJvdXRlLCBwcml2YXRlIHJvdXRlcjogUm91dGVyLCBwcml2YXRlIHpvbmU6IE5nWm9uZSkge1xyXG5cdFx0dGhpcy5xdWVzdGlvbnMgPSBbXTtcclxuXHRcdHRoaXMucW51bSA9IDE7XHJcblx0XHR2YXIgdSA9IGRlY29kZVVSSShyb3V0ZXIudXJsKTtcclxuXHRcdHRoaXMudGl0bGUgPSB1LnN1YnN0cmluZyh1Lmxhc3RJbmRleE9mKCclMkYnKSszLCB1Lmxhc3RJbmRleE9mKCcuJykpO1xyXG5cdFx0dGhpcy5zcGVha09wdGlvbnMgPSB7XHJcblx0XHRcdHRleHQ6IFwiUXVlc3Rpb24gMSwgXCIsXHJcblx0XHRcdHBpdGNoOiAxLjAsXHJcblx0XHRcdHNwZWFrUmF0ZTogMC45LFxyXG5cdFx0XHR2b2x1bWU6IDEuMCxcclxuXHRcdFx0bGFuZ3VhZ2U6XCJlblwiLFxyXG5cdFx0XHRsb2NhbGU6XCJlbi1VU1wiLFxyXG5cdFx0XHRmaW5pc2hlZENhbGxiYWNrOiAoKT0+e3RoaXMuc3BlYWtOZXh0U2VudGVuY2UoKTt9XHJcblx0XHR9O1xyXG5cdH1cclxuXHJcblx0b25Td2lwZShhcmdzOiBTd2lwZUdlc3R1cmVFdmVudERhdGEpIHtcclxuXHRcdGlmIChhcmdzLmRpcmVjdGlvbiA9PSAxKSB7XHRcclxuXHRcdFx0dGhpcy5nb0xlZnQoKTtcclxuXHRcdH0gZWxzZSBpZiAoYXJncy5kaXJlY3Rpb24gPT0gMikge1xyXG5cdFx0XHR0aGlzLmdvUmlnaHQoKTtcclxuXHRcdH1cclxuXHR9XHJcblx0Z29MZWZ0KCl7XHJcblx0XHRpZiAodGhpcy5xbnVtID4gMCkge1x0XHJcblx0XHRcdHRoaXMucmVjb2duaXplZFRleHQgPSB1bmRlZmluZWQ7XHJcblx0XHRcdHRoaXMudGV4dDJzcGVlY2gucGF1c2UoKTtcclxuXHRcdFx0dGhpcy5hdmF0YXJJbWFnZS5uYXRpdmVFbGVtZW50LnNyYyA9IHRoaXMuaW1hZ2VQYXRoICsgdGhpcy5BdmF0YXJJbWFnZXNbMF07XHJcblx0XHRcdHRoaXMuc2hvd0Fuc3dlciA9IGZhbHNlO1xyXG5cdFx0XHR0aGlzLmxvYWRRdWVzdGlvbih0aGlzLnFudW0gLSAxKTtcclxuXHRcdH1cclxuXHR9XHJcblx0Z29SaWdodCgpe1xyXG5cdFx0aWYgKHRoaXMucW51bSA8IHRoaXMucXVlc3Rpb25zLmxlbmd0aCAtIDEpIHtcclxuXHRcdFx0dGhpcy5yZWNvZ25pemVkVGV4dCA9IHVuZGVmaW5lZDtcclxuXHRcdFx0dGhpcy50ZXh0MnNwZWVjaC5wYXVzZSgpO1xyXG5cdFx0XHR0aGlzLmF2YXRhckltYWdlLm5hdGl2ZUVsZW1lbnQuc3JjID0gdGhpcy5pbWFnZVBhdGggKyB0aGlzLkF2YXRhckltYWdlc1swXTtcclxuXHRcdFx0dGhpcy5zaG93QW5zd2VyID0gZmFsc2U7XHJcblx0XHRcdHRoaXMubG9hZFF1ZXN0aW9uKHRoaXMucW51bSArIDEpO1xyXG5cdFx0fVxyXG5cdH0gXHJcblx0Ly9sb2FkaW5nIHF1ZXN0aW9uIGRpcmVjdGx5IGZyb20gbmF2aWdhdGlvbiB0YWJcclxuXHRsb2FkUXVlc3Rpb24oaTogbnVtYmVyKSB7XHJcblx0XHR0aGlzLmRyYXdlckNvbXBvbmVudC5zaWRlRHJhd2VyLmNsb3NlRHJhd2VyKCk7XHJcblx0XHR0aGlzLnF1ZXN0aW9uID0gdGhpcy5xdWVzdGlvbnNbaV07XHJcblx0XHR0aGlzLnZhcmlhYmxlID0gdGhpcy5xdWVzdGlvbi5xdWVzdDtcclxuXHRcdGxldCB2YWx1ZSA9IHRoaXMudmFyaWFibGUucmVwbGFjZSgvXFwuL2dpLFwiP1wiKTtcclxuXHRcdHRoaXMuc2VudGVuY2VzID0gdmFsdWUuc3BsaXQoXCI/IFwiKTtcclxuXHRcdGZvcih2YXIgdj0wO3Y8dGhpcy5zZW50ZW5jZXMubGVuZ3RoO3YrKylcclxuXHRcdFx0Y29uc29sZS5sb2codGhpcy5zZW50ZW5jZXNbdl0pO1xyXG5cdFx0Y29uc29sZS5sb2codGhpcy5zZW50ZW5jZXMpO1xyXG5cdFx0dGhpcy5zZW50ZW5jZUluZGV4ID0gLTE7XHJcblx0XHRpZih0aGlzLnNwZWFraW50ZXJ2YWwpIGNsZWFySW50ZXJ2YWwodGhpcy5zcGVha2ludGVydmFsKTtcclxuXHRcdHRoaXMuc3BlYWtpbmcgPSBmYWxzZTtcclxuXHRcdHRoaXMuc3BlYWtBbmRBbmltYXRlRmxhZyA9IDE7XHJcblx0XHR0aGlzLnFudW0gPSBpO1xyXG5cdFx0Ly8gdGhpcy5zcGVha1RpdGxlKCk7XHJcblx0fVxyXG5cclxuXHRkaXNwbGF5QW5zd2VyKCl7XHJcblx0XHR0aGlzLnNob3dBbnN3ZXIgPSAhdGhpcy5zaG93QW5zd2VyO1xyXG5cdH1cclxuXHRcclxuXHRzcGVha05leHRTZW50ZW5jZSgpe1xyXG5cdFx0Y29uc29sZS5sb2coXCJzcGVha05leHRTZW50ZW5jZSBjYWxsZWQgXCIsIHRoaXMuc3BlYWtBbmRBbmltYXRlRmxhZywgdGhpcy5zcGVha2luZywgdGhpcy5zZW50ZW5jZUluZGV4KTtcclxuXHRcdHRoaXMuc3BlYWtBbmRBbmltYXRlRmxhZysrO1xyXG5cdFx0aWYodGhpcy5zcGVha2luZyAmJiB0aGlzLnNwZWFrQW5kQW5pbWF0ZUZsYWcgPT0gMikge1xyXG5cdFx0XHR0aGlzLnNwZWFrQW5kQW5pbWF0ZUZsYWcgPSAwO1xyXG5cdFx0XHR0aGlzLnNlbnRlbmNlSW5kZXgrKztcclxuXHRcdFx0aWYodGhpcy5zZW50ZW5jZUluZGV4PHRoaXMuc2VudGVuY2VzLmxlbmd0aCkge1xyXG5cdFx0XHRcdHRoaXMuc3BlYWtPcHRpb25zLnRleHQgPSB0aGlzLnNlbnRlbmNlc1t0aGlzLnNlbnRlbmNlSW5kZXhdO1xyXG5cdFx0XHRcdHRoaXMudGV4dDJzcGVlY2guc3BlYWsodGhpcy5zcGVha09wdGlvbnMpXHJcblx0XHRcdFx0LnRoZW4oKCk9PntcclxuXHRcdFx0XHRcdHRoaXMuYW5pbWF0ZUF2YXRhcigpO1xyXG5cdFx0XHRcdFx0Y29uc29sZS5sb2coXCJpbiB0aGVuXCIpO30sIFxyXG5cdFx0XHRcdFx0KGVycik9Pntjb25zb2xlLmxvZyhlcnIpO30pO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHRoaXMuc2VudGVuY2VJbmRleCA9IC0xO1xyXG5cdFx0XHRcdHRoaXMuc3BlYWtpbmcgPSBmYWxzZTtcclxuXHRcdFx0XHR0aGlzLnNwZWFrQW5kQW5pbWF0ZUZsYWcgPSAxO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRhbmltYXRlQXZhdGFyKCk6IHZvaWQge1xyXG5cdFx0bGV0IGkgPSAwO1xyXG4gICAgICAgIHRoaXMuc3BlYWtpbnRlcnZhbCA9IHNldEludGVydmFsKCgpID0+IHsgXHJcblx0XHRcdHRoaXMuYXZhdGFySW1hZ2UubmF0aXZlRWxlbWVudC5zcmMgPSB0aGlzLmltYWdlUGF0aCArIHRoaXMuQXZhdGFySW1hZ2VzW3RoaXMucXVlc3Rpb24udmlzZW1lc1t0aGlzLnNlbnRlbmNlSW5kZXhdW2ldXTtcclxuXHRcdFx0XHJcbiAgICAgICAgICAgIGkrKztcclxuICAgICAgICAgICAgaWYgKGkgPT0gdGhpcy5xdWVzdGlvbi52aXNlbWVzW3RoaXMuc2VudGVuY2VJbmRleF0ubGVuZ3RoKSB7XHJcblx0XHRcdFx0Y2xlYXJJbnRlcnZhbCh0aGlzLnNwZWFraW50ZXJ2YWwpO1xyXG5cdFx0XHRcdHRoaXMuc3BlYWtOZXh0U2VudGVuY2UoKTtcclxuXHRcdFx0fVxyXG5cdFx0fSwgdGhpcy5zcGVlY2hSYXRlKjg1KTtcclxuXHR9XHJcblxyXG5cdHRleHRUb1NwZWVjaCgpe1xyXG5cdFx0Ly8gdGhpcy50ZXh0MnNwZWVjaC5wYXVzZSgpO1xyXG5cdFx0dmFyIF90aGlzID0gdGhpcztcclxuXHRcdHRoaXMuc3BlYWtpbmcgPSB0cnVlO1xyXG5cdFx0dGhpcy5zcGVha05leHRTZW50ZW5jZSgpO1xyXG5cdH1cclxuXHJcblx0c3BlYWtUZXh0T25seSgpe1xyXG5cdFx0dGhpcy50ZXh0MnNwZWVjaC5wYXVzZSgpO1xyXG5cdFx0bGV0IG9wdGlvbnM6IFNwZWFrT3B0aW9ucyA9IHtcclxuXHRcdFx0dGV4dDogdGhpcy5xdWVzdGlvbi50ZXh0LFxyXG5cdFx0XHRwaXRjaDogMS4wLFxyXG5cdFx0XHRzcGVha1JhdGU6IDAuOSxcclxuXHRcdFx0dm9sdW1lOiAxLjAsXHJcblx0XHRcdGxhbmd1YWdlOiBcImVuXCIsXHJcblx0XHRcdGxvY2FsZTogXCJlbi1VU1wiLFxyXG5cdFx0XHRmaW5pc2hlZENhbGxiYWNrOiAoKT0+e1xyXG5cdFx0XHRcdGNvbnNvbGUubG9nKFwicmVhZCB0aGUgYW5zd2VyXCIpO1xyXG5cdFx0XHR9XHJcblx0XHR9O1xyXG5cdFx0dGhpcy50ZXh0MnNwZWVjaC5zcGVhayhvcHRpb25zKTtcclxuXHR9XHJcbiAgIFxyXG5cdHRvZ2dsZVJlY29yZGluZygpOiB2b2lkIHtcclxuXHRcdHRoaXMucmVjb3JkaW5nID0gIXRoaXMucmVjb3JkaW5nO1xyXG5cdFx0Ly8gY29uc29sZS5sb2codGhpcy5yZWNvcmRpbmcpO1xyXG4gICAgICAgIGlmICh0aGlzLnJlY29yZGluZykge1xyXG5cdFx0XHQvLyBjb25zb2xlLmxvZyhcInRvZ2dsZVJlY29yZGluZyB0cnVlIHBhcnRcIik7XHJcblx0XHRcdHRoaXMuc3Bva2VuID0gZmFsc2U7XHJcbiAgICAgICAgICBcdHRoaXMubGFzdFRyYW5zY3JpcHRpb24gPSBudWxsO1xyXG4gICAgICAgICAgXHR0aGlzLnN0YXJ0TGlzdGVuaW5nKCk7XHJcblx0XHR9IFxyXG5cdFx0ZWxzZSB7XHJcblx0XHRcdC8vIGNvbnNvbGUubG9nKFwidG9nZ2xlUmVjb3JkaW5nIHRydWUgcGFydFwiKTtcclxuICAgICAgICAgIFx0dGhpcy5zdG9wTGlzdGVuaW5nKCk7XHJcbiAgICAgICAgICBcdGlmICghdGhpcy5zcG9rZW4gJiYgdGhpcy5sYXN0VHJhbnNjcmlwdGlvbiAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICBcdGFsZXJ0KFwiV2UgdW5kZXJzdG9vZCB0aGF0IHlvdSBzYWlkOiBcIisgXCInXCIgK3RoaXMubGFzdFRyYW5zY3JpcHRpb24rXCInXCIpO1xyXG4gICAgICAgICAgXHR9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcblx0cHJpdmF0ZSBzdGFydExpc3RlbmluZygpOiB2b2lkIHtcclxuXHRcdC8vIGNvbnNvbGUubG9nKFwiSW5zaWRlIHN0YXJ0bGlzdGVuaW5nXCIpO1xyXG5cdFx0aWYgKCF0aGlzLnJlY29yZGluZ0F2YWlsYWJsZSkge1xyXG5cdFx0XHRjb25zb2xlLmxvZyhcImluc2lkZSBpZlwiKTtcclxuXHRcdFx0YWxlcnQoe1xyXG5cdFx0XHR0aXRsZTogXCJOb3Qgc3VwcG9ydGVkXCIsXHJcblx0XHRcdG1lc3NhZ2U6IFwiU3BlZWNoIHJlY29nbml0aW9uIG5vdCBzdXBwb3J0ZWQgb24gdGhpcyBkZXZpY2UuIFRyeSBhIGRpZmZlcmVudCBkZXZpY2UgcGxlYXNlLlwiLFxyXG5cdFx0XHRva0J1dHRvblRleHQ6IFwiT2gsIGJ1bW1lclwiXHJcblx0XHRcdH0pO1xyXG5cdFx0XHR0aGlzLnJlY29nbml6ZWRUZXh0ID0gXCJObyBzdXBwb3J0LCBTb3JyeVwiO1xyXG5cdFx0XHR0aGlzLnJlY29yZGluZyA9IGZhbHNlO1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblx0XHQvLyBjb25zb2xlLmxvZyhcImVsc2UgcGFydFwiKTtcclxuXHRcdHRoaXMucmVjb3JkaW5nID0gdHJ1ZTtcclxuXHRcdHRoaXMuc3BlZWNoMnRleHQuc3RhcnRMaXN0ZW5pbmcoe1xyXG5cdFx0XHRsb2NhbGU6IFwiZW4tVVNcIixcclxuXHRcdFx0cmV0dXJuUGFydGlhbFJlc3VsdHM6IHRydWUsXHJcblx0XHRcdG9uUmVzdWx0OiAodHJhbnNjcmlwdGlvbjogU3BlZWNoUmVjb2duaXRpb25UcmFuc2NyaXB0aW9uKSA9PiB7XHJcblx0XHRcdFx0dGhpcy56b25lLnJ1bigoKSA9PiB0aGlzLnJlY29nbml6ZWRUZXh0ID0gdHJhbnNjcmlwdGlvbi50ZXh0KTtcclxuXHRcdFx0XHR0aGlzLmxhc3RUcmFuc2NyaXB0aW9uID0gdHJhbnNjcmlwdGlvbi50ZXh0O1xyXG5cdFx0XHRcdGlmICh0cmFuc2NyaXB0aW9uLmZpbmlzaGVkKSB7XHJcblx0XHRcdFx0XHR0aGlzLnNwb2tlbiA9IHRydWU7XHJcblx0XHRcdFx0XHR0aGlzLnNwb2tlblRleHQgPSB0cmFuc2NyaXB0aW9uLnRleHQ7XHJcblx0XHRcdFx0XHRhbGVydChcIldlIHVuZGVyc3Rvb2QgdGhhdCB5b3Ugc2FpZDogXFxuXCIrIHRoaXMubGFzdFRyYW5zY3JpcHRpb24pO1xyXG5cdFx0XHRcdFx0dGhpcy5zdG9wTGlzdGVuaW5nKCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9LFxyXG5cdFx0fSkudGhlbihcclxuXHRcdFx0KHN0YXJ0ZWQ6IGJvb2xlYW4pID0+IHtjb25zb2xlLmxvZyhcInN0YXJ0ZWQgbGlzdGVuaW5nXCIpO30sXHJcblx0XHRcdChlcnJvck1lc3NhZ2U6IHN0cmluZykgPT4ge2NvbnNvbGUubG9nKGBFcnJvcjogJHtlcnJvck1lc3NhZ2V9YCk7fVxyXG5cdFx0KTtcclxuXHR9XHJcblxyXG5cdGdldExvbmdlc3RDb21tb25TdWJzZXF1ZW5jZShBLCBCLCBtLCBuKXtcclxuICAgICAgICB2YXIgTCA9IFtdO1xyXG4gICAgICAgIGxldCBpPTAsIGo9MDtcclxuICAgICAgICBmb3IoaT0wO2k8PW07aSsrKXtcclxuICAgICAgICAgIEwucHVzaChbXSk7XHJcbiAgICAgICAgICBmb3Ioaj0wO2o8PW47aisrKXtcclxuICAgICAgICAgICAgTFtpXS5wdXNoKDApO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKGk9MDsgaTw9bTsgaSsrKSBcclxuICAgICAgICB7IFxyXG4gICAgICAgICAgZm9yIChqPTA7IGo8PW47IGorKykgXHJcbiAgICAgICAgICB7IFxyXG4gICAgICAgICAgICBpZiAoaSA9PSAwIHx8IGogPT0gMCkgXHJcbiAgICAgICAgICAgICAgTFtpXVtqXSA9IDA7IFxyXG4gICAgICAgIFxyXG4gICAgICAgICAgICBlbHNlIGlmIChBW2ktMV0gPT0gQltqLTFdKSBcclxuICAgICAgICAgICAgICBMW2ldW2pdID0gTFtpLTFdW2otMV0gKyAxOyBcclxuICAgICAgICBcclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgIExbaV1bal0gPSBNYXRoLm1heChMW2ktMV1bal0sIExbaV1bai0xXSk7IFxyXG4gICAgICAgICAgfSBcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIExbbV1bbl07XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZW5lcmF0ZVNjb3JlKCk6IHZvaWQge1xyXG4gICAgICAgIGxldCBzcG9rZW5TZW50ZW5jZXMgPSB0aGlzLnNwb2tlblRleHQ7XHJcbiAgICAgICAgbGV0IGdpdmVuU2VudGVuY2VzID0gdGhpcy5xdWVzdGlvbi50ZXh0O1xyXG4gICAgICAgIGxldCByZSA9IC9cXC4vZ2k7XHJcbiAgICAgICAgc3Bva2VuU2VudGVuY2VzID0gc3Bva2VuU2VudGVuY2VzLnJlcGxhY2UocmUsICcnKTtcclxuICAgICAgICBnaXZlblNlbnRlbmNlcyA9IGdpdmVuU2VudGVuY2VzLnJlcGxhY2UocmUsICcnKTtcclxuICAgICAgICByZSA9IC9cXCwvZ2k7XHJcbiAgICAgICAgc3Bva2VuU2VudGVuY2VzID0gc3Bva2VuU2VudGVuY2VzLnJlcGxhY2UocmUsICcnKTtcclxuICAgICAgICBnaXZlblNlbnRlbmNlcyA9IGdpdmVuU2VudGVuY2VzLnJlcGxhY2UocmUsICcnKTtcclxuICAgICAgICBsZXQgZ2l2ZW5Xb3JkcyA9IGdpdmVuU2VudGVuY2VzLnNwbGl0KCcgJyk7XHJcbiAgICAgICAgbGV0IHNwb2tlbldvcmRzID0gc3Bva2VuU2VudGVuY2VzLnNwbGl0KCcgJyk7XHJcbiAgICAgICAgbGV0IGwxID0gZ2l2ZW5Xb3Jkcy5sZW5ndGg7XHJcbiAgICAgICAgbGV0IGwyID0gc3Bva2VuV29yZHMubGVuZ3RoO1xyXG4gICAgICAgIGlmKGwyLWwxPjEwIHx8IGwxLWwyPjEwKXtcclxuICAgICAgICAgICAgdGhpcy5yZWNvZ25pemVkVGV4dCA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgYWxlcnQoXCJQbGVhc2UgcmUtY2hlY2sgeW91ciBhbnN3ZXIhXCIpO1xyXG4gICAgICAgICAgICB0aGlzLnNjb3JlID0gMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGxldCBjb3VudCA9IHRoaXMuZ2V0TG9uZ2VzdENvbW1vblN1YnNlcXVlbmNlKGdpdmVuV29yZHMsIHNwb2tlbldvcmRzLCBsMSwgbDIpO1xyXG4gICAgICAgICAgICB0aGlzLnNjb3JlID0gTWF0aC5yb3VuZCgxMDAqY291bnQvbDEpO1xyXG4gICAgICAgICAgICBhbGVydCh0aGlzLnNjb3JlKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgcHJpdmF0ZSBzdG9wTGlzdGVuaW5nKCk6IHZvaWQge1xyXG5cdFx0Ly8gY29uc29sZS5sb2coXCJzdG9wTGlzdGVuaW5nXCIpO1xyXG5cdFx0aWYodGhpcy5yZWNvcmRpbmc9PXRydWUpe1xyXG5cdFx0XHR0aGlzLnJlY29yZGluZyA9IGZhbHNlO1xyXG5cdFx0XHQvLyB0aGlzLm1pY0ltYWdlLm5hdGl2ZUVsZW1lbnQuc3JjID0gXCJ+L2Fzc2V0cy9pbWFnZXMvbWljLnBuZ1wiO1xyXG5cdFx0XHR0aGlzLnNwZWVjaDJ0ZXh0LnN0b3BMaXN0ZW5pbmcoKS50aGVuKCgpID0+IHtcclxuXHRcdFx0XHRjb25zb2xlLmxvZyhcIlN0b3BwZWQgbGlzdGVuaW5nXCIpO1xyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHRcdHRoaXMuZ2VuZXJhdGVTY29yZSgpO1xyXG5cdFx0dGhpcy5yZWNvZ25pemVkVGV4dCA9IHVuZGVmaW5lZDtcclxuICAgIH1cclxuXHJcblx0bmdPbkluaXQoKTogdm9pZCB7XHJcblx0XHR0aGlzLnNwZWVjaDJ0ZXh0ID0gbmV3IFNwZWVjaFJlY29nbml0aW9uKCk7XHJcbiAgICBcdHRoaXMuc3BlZWNoMnRleHQuYXZhaWxhYmxlKCkudGhlbihhdmFpbCA9PiB7XHJcbiAgICAgIFx0XHR0aGlzLnJlY29yZGluZ0F2YWlsYWJsZSA9IGF2YWlsO1xyXG4gICAgXHR9KTtcclxuXHRcdC8vIHRoaXMudGV4dDJzcGVlY2ggPSBuZXcgVE5TVGV4dFRvU3BlZWNoKCk7XHJcblx0XHR0aGlzLnN1YiA9IHRoaXMucm91dGUucGFyYW1zLnN1YnNjcmliZShwYXJhbXMgPT4ge1xyXG5cdFx0XHR0aGlzLnBhdGggPSBwYXJhbXNbJ3BhdGgnXTtcclxuXHRcdFx0dGhpcy5wYXRoc2VydmljZS5nZXRRdWVzdGlvbnModGhpcy5wYXRoKVxyXG5cdFx0XHRcdC5zdWJzY3JpYmUoXHJcblx0XHRcdFx0XHQoZDogUXVlc3Rpb25bXSkgPT4ge1xyXG5cdFx0XHRcdFx0XHR0aGlzLnF1ZXN0aW9uID0gZFswXTtcclxuXHRcdFx0XHRcdFx0dGhpcy5xdWVzdGlvbnMgPSBkO1xyXG5cdFx0XHRcdFx0XHR0aGlzLnZhcmlhYmxlID0gdGhpcy5xdWVzdGlvbi5xdWVzdDtcclxuXHRcdFx0XHRcdFx0dGhpcy52YXJpYWJsZS5yZXBsYWNlKFwiLlwiLFwiP1wiKTtcclxuXHRcdFx0XHRcdFx0dGhpcy5zZW50ZW5jZXMgPSB0aGlzLnZhcmlhYmxlLnNwbGl0KFwiPyBcIik7XHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0KGVycm9yKSA9PiB7XHJcblx0XHRcdFx0XHRcdGNvbnNvbGUubG9nKGVycm9yKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHQpXHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdG5nT25EZXN0cm95KCkge1xyXG5cdFx0dGhpcy5zdWIudW5zdWJzY3JpYmUoKTtcclxuXHR9XHJcbn0iXX0=