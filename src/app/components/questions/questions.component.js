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
        this.flag = false;
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
            this.recognizedText = undefined;
            this.recording = false;
            this.text2speech.pause();
            this.avatarImage.nativeElement.src = this.imagePath + this.AvatarImages[0];
            this.showAnswer = false;
            this.loadQuestion(this.qnum - 1);
        }
    };
    QuestionsComponent.prototype.goRight = function () {
        if (this.qnum < this.questions.length - 1) {
            this.recognizedText = undefined;
            this.recording = false;
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
            pitch: 1.3,
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
    //to initailize the speech recording
    QuestionsComponent.prototype.toggleRecording = function () {
        this.recording = !this.recording;
        if (this.recording) {
            this.spoken = false;
            this.lastTranscription = null;
            this.startListening();
        }
        else {
            this.stopListening();
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
        // this.recording = true;
        this.speech2text.startListening({
            locale: "en-US",
            returnPartialResults: true,
            onResult: function (transcription) {
                _this_1.zone.run(function () { return _this_1.recognizedText = transcription.text; });
                _this_1.lastTranscription = transcription.text;
                if (transcription.finished) {
                    _this_1.spoken = true;
                    _this_1.spokenText = transcription.text;
                }
            },
        }).then(function (started) { console.log("started listening"); }, function (errorMessage) { console.log("Error: " + errorMessage); });
    };
    // logic to check number of words matching
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
        var spokenSentences = this.recognizedText;
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
            this.score = 0;
            alert("Please repeat your answer loudly and clearly! We did not hear you.");
        }
        else {
            var count = this.getLongestCommonSubsequence(givenWords, spokenWords, l1, l2);
            this.score = Math.round(100 * count / l1);
            alert("Your answer: \n" + this.recognizedText + "\n\n" + "Your Score: " + this.score);
            this.recognizedText = undefined;
        }
    };
    QuestionsComponent.prototype.stopListening = function () {
        if (this.recording == false) {
            // this.recording = true;
            this.speech2text.stopListening().then(function () {
                console.log("Stopped listening");
            });
        }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlc3Rpb25zLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInF1ZXN0aW9ucy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBOEQ7QUFDOUQsOERBQTRGO0FBQzVGLHNDQUE2RDtBQUM3RCw0Q0FBNEM7QUFDNUMsaUVBQStEO0FBQy9ELDBDQUF5RDtBQUd6RCx1RUFBMEU7QUFDMUUsbUZBQW9HO0FBQ3BHLHdEQUF3RDtBQUN4RCxxREFBcUQ7QUFVckQ7SUEwQ0MsNEJBQW9CLFdBQTRCLEVBQVUsV0FBd0IsRUFBVSxLQUFxQixFQUFVLE1BQWMsRUFBVSxJQUFZO1FBQS9KLG1CQWNDO1FBZG1CLGdCQUFXLEdBQVgsV0FBVyxDQUFpQjtRQUFVLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQVUsVUFBSyxHQUFMLEtBQUssQ0FBZ0I7UUFBVSxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQVUsU0FBSSxHQUFKLElBQUksQ0FBUTtRQWpDL0osY0FBUyxHQUFXLHFDQUFxQyxDQUFDO1FBTTFELGVBQVUsR0FBWSxLQUFLLENBQUM7UUFDNUIsYUFBUSxHQUFZLEtBQUssQ0FBQztRQUMxQixrQkFBYSxHQUFXLENBQUMsQ0FBQyxDQUFDO1FBRzNCLHdCQUFtQixHQUFXLENBQUMsQ0FBQztRQUVoQyxVQUFLLEdBQUcsQ0FBQyxDQUFDO1FBQ1YsaUJBQVksR0FBRyxDQUFDLGVBQWUsRUFBQyxzQkFBc0IsRUFBQyxzQkFBc0IsRUFBQyx5QkFBeUIsRUFBQyx1QkFBdUI7WUFDL0gsc0JBQXNCLEVBQUMsK0JBQStCLEVBQUMseUJBQXlCLEVBQUMseUJBQXlCO1lBQzFHLCtCQUErQixFQUFDLHlCQUF5QixFQUFDLHNCQUFzQixFQUFDLCtCQUErQixFQUFDLHdCQUF3QjtZQUN6SSxzQkFBc0IsRUFBQyx3QkFBd0IsRUFBQyx3QkFBd0IsRUFBQyx3QkFBd0IsRUFBQyx1QkFBdUI7WUFDekgsd0JBQXdCLEVBQUMsK0JBQStCLEVB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QUNWLFFBQVEsRUFBRSxXQUFXO1lBQ3JCLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixTQUFTLEVBQUUsQ0FBQywwQkFBVyxDQUFDO1lBQ3hCLFdBQVcsRUFBRSw0QkFBNEI7WUFDekMsU0FBUyxFQUFFLENBQUMsMkJBQTJCLENBQUM7U0FDeEMsQ0FBQzt5Q0E0Q2dDLDJDQUFlLEVBQXVCLDBCQUFXLEVBQWlCLHVCQUFjLEVBQWtCLGVBQU0sRUFBZ0IsYUFBTTtPQTFDbkosa0JBQWtCLENBMFM5QjtJQUFELHlCQUFDO0NBQUEsQUExU0QsSUEwU0M7QUExU1ksZ0RBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVmlld0NoaWxkLCBFbGVtZW50UmVmLCBOZ1pvbmUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBSYWRTaWRlRHJhd2VyQ29tcG9uZW50LCBTaWRlRHJhd2VyVHlwZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtdWktc2lkZWRyYXdlci9hbmd1bGFyXCI7XHJcbmltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBPbkRlc3Ryb3kgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG4vLyBpbXBvcnQgeyBSZXNwb25zZSB9IGZyb20gXCJAYW5ndWxhci9odHRwXCI7XHJcbmltcG9ydCB7IFBhdGhTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL3BhdGgvcGF0aC5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IFJvdXRlciwgQWN0aXZhdGVkUm91dGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5pbXBvcnQgeyBRdWVzdGlvbiB9IGZyb20gXCIuLi8uLi9jbGFzc2VzL3F1ZXN0aW9uXCI7XHJcbmltcG9ydCB7IFN3aXBlR2VzdHVyZUV2ZW50RGF0YSB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2dlc3R1cmVzXCI7XHJcbmltcG9ydCB7IFROU1RleHRUb1NwZWVjaCwgU3BlYWtPcHRpb25zIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC10ZXh0dG9zcGVlY2hcIjtcclxuaW1wb3J0IHsgU3BlZWNoUmVjb2duaXRpb24sIFNwZWVjaFJlY29nbml0aW9uVHJhbnNjcmlwdGlvbiB9IGZyb20gJ25hdGl2ZXNjcmlwdC1zcGVlY2gtcmVjb2duaXRpb24nO1xyXG4vLyBpbXBvcnQgeyBlcnJvciB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3RyYWNlL3RyYWNlXCI7XHJcbi8vIGltcG9ydCB7U2xpZGVyfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9zbGlkZXJcIjtcclxuXHJcbkBDb21wb25lbnQoe1xyXG5cdHNlbGVjdG9yOiBcIlF1ZXN0aW9uc1wiLFxyXG5cdG1vZHVsZUlkOiBtb2R1bGUuaWQsXHJcblx0cHJvdmlkZXJzOiBbUGF0aFNlcnZpY2VdLFxyXG5cdHRlbXBsYXRlVXJsOiBcIi4vcXVlc3Rpb25zLmNvbXBvbmVudC5odG1sXCIsXHJcblx0c3R5bGVVcmxzOiBbJy4vcXVlc3Rpb25zLmNvbXBvbmVudC5jc3MnXVxyXG59KVxyXG5cclxuZXhwb3J0IGNsYXNzIFF1ZXN0aW9uc0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcclxuXHRAVmlld0NoaWxkKFJhZFNpZGVEcmF3ZXJDb21wb25lbnQpIHB1YmxpYyBkcmF3ZXJDb21wb25lbnQ6IFJhZFNpZGVEcmF3ZXJDb21wb25lbnQ7XHJcblx0QFZpZXdDaGlsZChcImF2YXRhclwiKSBhdmF0YXJJbWFnZTpFbGVtZW50UmVmO1xyXG5cclxuXHRvbk9wZW5EcmF3ZXJUYXAoKSB7XHJcblx0XHR0aGlzLmRyYXdlckNvbXBvbmVudC5zaWRlRHJhd2VyLnNob3dEcmF3ZXIoKTtcclxuXHR9XHJcblxyXG5cdHBhdGg6IHN0cmluZztcclxuXHRpbWFnZVBhdGg6IHN0cmluZyA9IFwifi9hc3NldHMvaW1hZ2VzL0ZpbmFsX0F2YXRhcl9zbWFsbC9cIjtcclxuXHRxdWVzdGlvbnM6IFF1ZXN0aW9uW107XHJcblx0cXVlc3Rpb246IFF1ZXN0aW9uO1xyXG5cdHFudW06IG51bWJlcjtcclxuXHR0aXRsZTpzdHJpbmc7XHJcblx0dmFyaWFibGU6IHN0cmluZztcclxuXHRzaG93QW5zd2VyOiBib29sZWFuID0gZmFsc2U7XHJcblx0c3BlYWtpbmc6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHRzZW50ZW5jZUluZGV4OiBudW1iZXIgPSAtMTtcclxuXHRzZW50ZW5jZXM6IEFycmF5PHN0cmluZz47XHJcblx0c3BlYWtpbnRlcnZhbDogbnVtYmVyO1xyXG5cdHNwZWFrQW5kQW5pbWF0ZUZsYWc6IG51bWJlciA9IDE7XHJcblx0cHJpdmF0ZSBzdWI6IGFueTtcclxuXHRzY29yZSA9IDA7XHJcblx0QXZhdGFySW1hZ2VzID0gWydqb2JzX2Z1bGwucG5nJywnam9ic19tb3V0aF93aWRlNS5wbmcnLCdqb2JzX21vdXRoX3dpZGU1LnBuZycsJ2pvYnNfbW91dGhfbmFycm93X28ucG5nJywnam9ic19tb3V0aF93aWRlX3kucG5nJyxcclxuXHQnam9ic19tb3V0aF93aWRlNS5wbmcnLCdqb2JzX21vdXRoX3dpZGVfZF9mX2tfcl9zLnBuZycsJ2pvYnNfbW91dGhfbmFycm93X3cucG5nJywnam9ic19tb3V0aF9uYXJyb3dfby5wbmcnLFxyXG5cdCdqb2JzX21vdXRoX3dpZGVfZF9mX2tfcl9zLnBuZycsJ2pvYnNfbW91dGhfbmFycm93X3UucG5nJywnam9ic19tb3V0aF93aWRlNS5wbmcnLCdqb2JzX21vdXRoX3dpZGVfZF9mX2tfcl9zLnBuZycsJ2pvYnNfbW91dGhfd2lkZV9zaC5wbmcnLFxyXG5cdCdqb2JzX21vdXRoX3dpZGU1LnBuZycsJ2pvYnNfbW91dGhfd2lkZV9zaC5wbmcnLCdqb2JzX21vdXRoX3dpZGVfc2gucG5nJywnam9ic19tb3V0aF93aWRlX3RoLnBuZycsJ2pvYnNfbW91dGhfd2lkZV9mLnBuZycsXHJcblx0J2pvYnNfbW91dGhfd2lkZV9zaC5wbmcnLCdqb2JzX21vdXRoX3dpZGVfZF9mX2tfcl9zLnBuZycsJ2pvYnNfbW91dGhfY2xvc2VkLnBuZyddO1xyXG5cdHNwZWVjaFJhdGUgPSAwLjk7XHJcblx0Ly8gcHJpdmF0ZSB0ZXh0MnNwZWVjaDogVE5TVGV4dFRvU3BlZWNoO1xyXG5cdHByaXZhdGUgc3BlZWNoMnRleHQ6IFNwZWVjaFJlY29nbml0aW9uO1xyXG5cdHNwZWFrT3B0aW9ucyA6IFNwZWFrT3B0aW9ucztcclxuICAgIG1pY3JvcGhvbmVFbmFibGVkOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICByZWNvcmRpbmc6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIGxhc3RUcmFuc2NyaXB0aW9uOiBzdHJpbmcgPSBudWxsO1xyXG4gICAgc3Bva2VuOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICByZWNvZ25pemVkVGV4dDogc3RyaW5nO1xyXG4gICAgcGl0Y2g6IG51bWJlciA9IDEwMDtcclxuXHRwcml2YXRlIHJlY29yZGluZ0F2YWlsYWJsZTogYm9vbGVhbjtcclxuXHRwcml2YXRlIHNwb2tlblRleHQ6IHN0cmluZztcclxuXHRmbGFnOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG5cdGNvbnN0cnVjdG9yKHByaXZhdGUgdGV4dDJzcGVlY2g6IFROU1RleHRUb1NwZWVjaCwgcHJpdmF0ZSBwYXRoc2VydmljZTogUGF0aFNlcnZpY2UsIHByaXZhdGUgcm91dGU6IEFjdGl2YXRlZFJvdXRlLCBwcml2YXRlIHJvdXRlcjogUm91dGVyLCBwcml2YXRlIHpvbmU6IE5nWm9uZSkge1xyXG5cdFx0dGhpcy5xdWVzdGlvbnMgPSBbXTtcclxuXHRcdHRoaXMucW51bSA9IDE7XHJcblx0XHR2YXIgdSA9IGRlY29kZVVSSShyb3V0ZXIudXJsKTtcclxuXHRcdHRoaXMudGl0bGUgPSB1LnN1YnN0cmluZyh1Lmxhc3RJbmRleE9mKCclMkYnKSszLCB1Lmxhc3RJbmRleE9mKCcuJykpO1xyXG5cdFx0dGhpcy5zcGVha09wdGlvbnMgPSB7XHJcblx0XHRcdHRleHQ6IFwiUXVlc3Rpb24gMSwgXCIsXHJcblx0XHRcdHBpdGNoOiAxLjAsXHJcblx0XHRcdHNwZWFrUmF0ZTogMC45LFxyXG5cdFx0XHR2b2x1bWU6IDEuMCxcclxuXHRcdFx0bGFuZ3VhZ2U6XCJlblwiLFxyXG5cdFx0XHRsb2NhbGU6XCJlbi1VU1wiLFxyXG5cdFx0XHRmaW5pc2hlZENhbGxiYWNrOiAoKT0+e3RoaXMuc3BlYWtOZXh0U2VudGVuY2UoKTt9XHJcblx0XHR9O1xyXG5cdH1cclxuXHJcblx0b25Td2lwZShhcmdzOiBTd2lwZUdlc3R1cmVFdmVudERhdGEpIHtcclxuXHRcdGlmIChhcmdzLmRpcmVjdGlvbiA9PSAxKSB7XHRcclxuXHRcdFx0dGhpcy5nb0xlZnQoKTtcclxuXHRcdH0gZWxzZSBpZiAoYXJncy5kaXJlY3Rpb24gPT0gMikge1xyXG5cdFx0XHR0aGlzLmdvUmlnaHQoKTtcclxuXHRcdH1cclxuXHR9XHJcblx0Z29MZWZ0KCl7XHJcblx0XHRpZiAodGhpcy5xbnVtID4gMCkge1x0XHJcblx0XHRcdHRoaXMucmVjb2duaXplZFRleHQgPSB1bmRlZmluZWQ7XHJcblx0XHRcdHRoaXMucmVjb3JkaW5nID0gZmFsc2U7XHJcblx0XHRcdHRoaXMudGV4dDJzcGVlY2gucGF1c2UoKTtcclxuXHRcdFx0dGhpcy5hdmF0YXJJbWFnZS5uYXRpdmVFbGVtZW50LnNyYyA9IHRoaXMuaW1hZ2VQYXRoICsgdGhpcy5BdmF0YXJJbWFnZXNbMF07XHJcblx0XHRcdHRoaXMuc2hvd0Fuc3dlciA9IGZhbHNlO1xyXG5cdFx0XHR0aGlzLmxvYWRRdWVzdGlvbih0aGlzLnFudW0gLSAxKTtcclxuXHRcdH1cclxuXHR9XHJcblx0Z29SaWdodCgpe1xyXG5cdFx0aWYgKHRoaXMucW51bSA8IHRoaXMucXVlc3Rpb25zLmxlbmd0aCAtIDEpIHtcclxuXHRcdFx0dGhpcy5yZWNvZ25pemVkVGV4dCA9IHVuZGVmaW5lZDtcclxuXHRcdFx0dGhpcy5yZWNvcmRpbmcgPSBmYWxzZTtcclxuXHRcdFx0dGhpcy50ZXh0MnNwZWVjaC5wYXVzZSgpO1xyXG5cdFx0XHR0aGlzLmF2YXRhckltYWdlLm5hdGl2ZUVsZW1lbnQuc3JjID0gdGhpcy5pbWFnZVBhdGggKyB0aGlzLkF2YXRhckltYWdlc1swXTtcclxuXHRcdFx0dGhpcy5zaG93QW5zd2VyID0gZmFsc2U7XHJcblx0XHRcdHRoaXMubG9hZFF1ZXN0aW9uKHRoaXMucW51bSArIDEpO1xyXG5cdFx0fVxyXG5cdH0gXHJcblxyXG5cdC8vbG9hZGluZyBxdWVzdGlvbiBkaXJlY3RseSBmcm9tIG5hdmlnYXRpb24gdGFiXHJcblx0bG9hZFF1ZXN0aW9uKGk6IG51bWJlcikge1xyXG5cdFx0dGhpcy5kcmF3ZXJDb21wb25lbnQuc2lkZURyYXdlci5jbG9zZURyYXdlcigpO1xyXG5cdFx0dGhpcy5xdWVzdGlvbiA9IHRoaXMucXVlc3Rpb25zW2ldO1xyXG5cdFx0dGhpcy52YXJpYWJsZSA9IHRoaXMucXVlc3Rpb24ucXVlc3Q7XHJcblx0XHRsZXQgdmFsdWUgPSB0aGlzLnZhcmlhYmxlLnJlcGxhY2UoL1xcLi9naSxcIj9cIik7XHJcblx0XHR0aGlzLnNlbnRlbmNlcyA9IHZhbHVlLnNwbGl0KFwiPyBcIik7XHJcblx0XHRmb3IodmFyIHY9MDt2PHRoaXMuc2VudGVuY2VzLmxlbmd0aDt2KyspXHJcblx0XHRcdGNvbnNvbGUubG9nKHRoaXMuc2VudGVuY2VzW3ZdKTtcclxuXHRcdGNvbnNvbGUubG9nKHRoaXMuc2VudGVuY2VzKTtcclxuXHRcdHRoaXMuc2VudGVuY2VJbmRleCA9IC0xO1xyXG5cdFx0aWYodGhpcy5zcGVha2ludGVydmFsKSBjbGVhckludGVydmFsKHRoaXMuc3BlYWtpbnRlcnZhbCk7XHJcblx0XHR0aGlzLnNwZWFraW5nID0gZmFsc2U7XHJcblx0XHR0aGlzLnNwZWFrQW5kQW5pbWF0ZUZsYWcgPSAxO1xyXG5cdFx0dGhpcy5xbnVtID0gaTtcclxuXHRcdC8vIHRoaXMuc3BlYWtUaXRsZSgpO1xyXG5cdH1cclxuXHJcblx0ZGlzcGxheUFuc3dlcigpe1xyXG5cdFx0dGhpcy5zaG93QW5zd2VyID0gIXRoaXMuc2hvd0Fuc3dlcjtcclxuXHR9XHJcblx0XHJcblx0c3BlYWtOZXh0U2VudGVuY2UoKXtcclxuXHRcdGNvbnNvbGUubG9nKFwic3BlYWtOZXh0U2VudGVuY2UgY2FsbGVkIFwiLCB0aGlzLnNwZWFrQW5kQW5pbWF0ZUZsYWcsIHRoaXMuc3BlYWtpbmcsIHRoaXMuc2VudGVuY2VJbmRleCk7XHJcblx0XHR0aGlzLnNwZWFrQW5kQW5pbWF0ZUZsYWcrKztcclxuXHRcdGlmKHRoaXMuc3BlYWtpbmcgJiYgdGhpcy5zcGVha0FuZEFuaW1hdGVGbGFnID09IDIpIHtcclxuXHRcdFx0dGhpcy5zcGVha0FuZEFuaW1hdGVGbGFnID0gMDtcclxuXHRcdFx0dGhpcy5zZW50ZW5jZUluZGV4Kys7XHJcblx0XHRcdGlmKHRoaXMuc2VudGVuY2VJbmRleDx0aGlzLnNlbnRlbmNlcy5sZW5ndGgpIHtcclxuXHRcdFx0XHR0aGlzLnNwZWFrT3B0aW9ucy50ZXh0ID0gdGhpcy5zZW50ZW5jZXNbdGhpcy5zZW50ZW5jZUluZGV4XTtcclxuXHRcdFx0XHR0aGlzLnRleHQyc3BlZWNoLnNwZWFrKHRoaXMuc3BlYWtPcHRpb25zKVxyXG5cdFx0XHRcdC50aGVuKCgpPT57XHJcblx0XHRcdFx0XHR0aGlzLmFuaW1hdGVBdmF0YXIoKTtcclxuXHRcdFx0XHRcdGNvbnNvbGUubG9nKFwiaW4gdGhlblwiKTt9LCBcclxuXHRcdFx0XHRcdChlcnIpPT57Y29uc29sZS5sb2coZXJyKTt9KTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHR0aGlzLnNlbnRlbmNlSW5kZXggPSAtMTtcclxuXHRcdFx0XHR0aGlzLnNwZWFraW5nID0gZmFsc2U7XHJcblx0XHRcdFx0dGhpcy5zcGVha0FuZEFuaW1hdGVGbGFnID0gMTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0YW5pbWF0ZUF2YXRhcigpOiB2b2lkIHtcclxuXHRcdGxldCBpID0gMDtcclxuICAgICAgICB0aGlzLnNwZWFraW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKSA9PiB7IFxyXG5cdFx0XHR0aGlzLmF2YXRhckltYWdlLm5hdGl2ZUVsZW1lbnQuc3JjID0gdGhpcy5pbWFnZVBhdGggKyB0aGlzLkF2YXRhckltYWdlc1t0aGlzLnF1ZXN0aW9uLnZpc2VtZXNbdGhpcy5zZW50ZW5jZUluZGV4XVtpXV07XHJcblx0XHRcdFxyXG4gICAgICAgICAgICBpKys7XHJcbiAgICAgICAgICAgIGlmIChpID09IHRoaXMucXVlc3Rpb24udmlzZW1lc1t0aGlzLnNlbnRlbmNlSW5kZXhdLmxlbmd0aCkge1xyXG5cdFx0XHRcdGNsZWFySW50ZXJ2YWwodGhpcy5zcGVha2ludGVydmFsKTtcclxuXHRcdFx0XHR0aGlzLnNwZWFrTmV4dFNlbnRlbmNlKCk7XHJcblx0XHRcdH1cclxuXHRcdH0sIHRoaXMuc3BlZWNoUmF0ZSo4NSk7XHJcblx0fVxyXG5cclxuXHR0ZXh0VG9TcGVlY2goKXtcclxuXHRcdC8vIHRoaXMudGV4dDJzcGVlY2gucGF1c2UoKTtcclxuXHRcdHZhciBfdGhpcyA9IHRoaXM7XHJcblx0XHR0aGlzLnNwZWFraW5nID0gdHJ1ZTtcclxuXHRcdHRoaXMuc3BlYWtOZXh0U2VudGVuY2UoKTtcclxuXHR9XHJcblxyXG5cdHNwZWFrVGV4dE9ubHkoKXtcclxuXHRcdHRoaXMudGV4dDJzcGVlY2gucGF1c2UoKTtcclxuXHRcdGxldCBvcHRpb25zOiBTcGVha09wdGlvbnMgPSB7XHJcblx0XHRcdHRleHQ6IHRoaXMucXVlc3Rpb24udGV4dCxcclxuXHRcdFx0cGl0Y2g6IDEuMyxcclxuXHRcdFx0c3BlYWtSYXRlOiAwLjksXHJcblx0XHRcdHZvbHVtZTogMS4wLFxyXG5cdFx0XHRsYW5ndWFnZTogXCJlblwiLFxyXG5cdFx0XHRsb2NhbGU6IFwiZW4tVVNcIixcclxuXHRcdFx0ZmluaXNoZWRDYWxsYmFjazogKCk9PntcclxuXHRcdFx0XHRjb25zb2xlLmxvZyhcInJlYWQgdGhlIGFuc3dlclwiKTtcclxuXHRcdFx0fVxyXG5cdFx0fTtcclxuXHRcdHRoaXMudGV4dDJzcGVlY2guc3BlYWsob3B0aW9ucyk7XHJcblx0fVxyXG4gICBcclxuXHQvL3RvIGluaXRhaWxpemUgdGhlIHNwZWVjaCByZWNvcmRpbmdcclxuXHR0b2dnbGVSZWNvcmRpbmcoKTogdm9pZCB7XHJcblx0XHR0aGlzLnJlY29yZGluZyA9ICF0aGlzLnJlY29yZGluZztcclxuICAgICAgICBpZiAodGhpcy5yZWNvcmRpbmcpIHtcclxuXHRcdFx0dGhpcy5zcG9rZW4gPSBmYWxzZTtcclxuICAgICAgICAgIFx0dGhpcy5sYXN0VHJhbnNjcmlwdGlvbiA9IG51bGw7XHJcbiAgICAgICAgICBcdHRoaXMuc3RhcnRMaXN0ZW5pbmcoKTtcclxuXHRcdH0gXHJcblx0XHRlbHNlIHtcclxuICAgICAgICAgIFx0dGhpcy5zdG9wTGlzdGVuaW5nKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcblx0cHJpdmF0ZSBzdGFydExpc3RlbmluZygpOiB2b2lkIHtcclxuXHRcdC8vIGNvbnNvbGUubG9nKFwiSW5zaWRlIHN0YXJ0bGlzdGVuaW5nXCIpO1xyXG5cdFx0aWYgKCF0aGlzLnJlY29yZGluZ0F2YWlsYWJsZSkge1xyXG5cdFx0XHRjb25zb2xlLmxvZyhcImluc2lkZSBpZlwiKTtcclxuXHRcdFx0YWxlcnQoe1xyXG5cdFx0XHR0aXRsZTogXCJOb3Qgc3VwcG9ydGVkXCIsXHJcblx0XHRcdG1lc3NhZ2U6IFwiU3BlZWNoIHJlY29nbml0aW9uIG5vdCBzdXBwb3J0ZWQgb24gdGhpcyBkZXZpY2UuIFRyeSBhIGRpZmZlcmVudCBkZXZpY2UgcGxlYXNlLlwiLFxyXG5cdFx0XHRva0J1dHRvblRleHQ6IFwiT2gsIGJ1bW1lclwiXHJcblx0XHRcdH0pO1xyXG5cdFx0XHR0aGlzLnJlY29nbml6ZWRUZXh0ID0gXCJObyBzdXBwb3J0LCBTb3JyeVwiO1xyXG5cdFx0XHR0aGlzLnJlY29yZGluZyA9IGZhbHNlO1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblx0XHQvLyB0aGlzLnJlY29yZGluZyA9IHRydWU7XHJcblx0XHR0aGlzLnNwZWVjaDJ0ZXh0LnN0YXJ0TGlzdGVuaW5nKHtcclxuXHRcdFx0bG9jYWxlOiBcImVuLVVTXCIsXHJcblx0XHRcdHJldHVyblBhcnRpYWxSZXN1bHRzOiB0cnVlLFxyXG5cdFx0XHRvblJlc3VsdDogKHRyYW5zY3JpcHRpb246IFNwZWVjaFJlY29nbml0aW9uVHJhbnNjcmlwdGlvbikgPT4ge1xyXG5cdFx0XHRcdHRoaXMuem9uZS5ydW4oKCkgPT4gdGhpcy5yZWNvZ25pemVkVGV4dCA9IHRyYW5zY3JpcHRpb24udGV4dCk7XHJcblx0XHRcdFx0dGhpcy5sYXN0VHJhbnNjcmlwdGlvbiA9IHRyYW5zY3JpcHRpb24udGV4dDtcclxuXHRcdFx0XHRpZiAodHJhbnNjcmlwdGlvbi5maW5pc2hlZCkge1xyXG5cdFx0XHRcdFx0dGhpcy5zcG9rZW4gPSB0cnVlO1xyXG5cdFx0XHRcdFx0dGhpcy5zcG9rZW5UZXh0ID0gdHJhbnNjcmlwdGlvbi50ZXh0O1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSxcclxuXHRcdH0pLnRoZW4oXHJcblx0XHRcdChzdGFydGVkOiBib29sZWFuKSA9PiB7Y29uc29sZS5sb2coXCJzdGFydGVkIGxpc3RlbmluZ1wiKTt9LFxyXG5cdFx0XHQoZXJyb3JNZXNzYWdlOiBzdHJpbmcpID0+IHtjb25zb2xlLmxvZyhgRXJyb3I6ICR7ZXJyb3JNZXNzYWdlfWApO31cclxuXHRcdCk7XHJcblx0fVxyXG5cclxuXHQvLyBsb2dpYyB0byBjaGVjayBudW1iZXIgb2Ygd29yZHMgbWF0Y2hpbmdcclxuXHRnZXRMb25nZXN0Q29tbW9uU3Vic2VxdWVuY2UoQSwgQiwgbSwgbil7XHJcbiAgICAgICAgdmFyIEwgPSBbXTtcclxuICAgICAgICBsZXQgaT0wLCBqPTA7XHJcbiAgICAgICAgZm9yKGk9MDtpPD1tO2krKyl7XHJcbiAgICAgICAgICBMLnB1c2goW10pO1xyXG4gICAgICAgICAgZm9yKGo9MDtqPD1uO2orKyl7XHJcbiAgICAgICAgICAgIExbaV0ucHVzaCgwKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yIChpPTA7IGk8PW07IGkrKykgXHJcbiAgICAgICAgeyBcclxuICAgICAgICAgIGZvciAoaj0wOyBqPD1uOyBqKyspIFxyXG4gICAgICAgICAgeyBcclxuICAgICAgICAgICAgaWYgKGkgPT0gMCB8fCBqID09IDApIFxyXG4gICAgICAgICAgICAgIExbaV1bal0gPSAwOyBcclxuICAgICAgICBcclxuICAgICAgICAgICAgZWxzZSBpZiAoQVtpLTFdID09IEJbai0xXSkgXHJcbiAgICAgICAgICAgICAgTFtpXVtqXSA9IExbaS0xXVtqLTFdICsgMTsgXHJcbiAgICAgICAgXHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICBMW2ldW2pdID0gTWF0aC5tYXgoTFtpLTFdW2pdLCBMW2ldW2otMV0pOyBcclxuICAgICAgICAgIH0gXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBMW21dW25dO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2VuZXJhdGVTY29yZSgpOiB2b2lkIHtcclxuICAgICAgICBsZXQgc3Bva2VuU2VudGVuY2VzID0gdGhpcy5yZWNvZ25pemVkVGV4dDtcclxuICAgICAgICBsZXQgZ2l2ZW5TZW50ZW5jZXMgPSB0aGlzLnF1ZXN0aW9uLnRleHQ7XHJcbiAgICAgICAgbGV0IHJlID0gL1xcLi9naTtcclxuICAgICAgICBzcG9rZW5TZW50ZW5jZXMgPSBzcG9rZW5TZW50ZW5jZXMucmVwbGFjZShyZSwgJycpO1xyXG4gICAgICAgIGdpdmVuU2VudGVuY2VzID0gZ2l2ZW5TZW50ZW5jZXMucmVwbGFjZShyZSwgJycpO1xyXG4gICAgICAgIHJlID0gL1xcLC9naTtcclxuICAgICAgICBzcG9rZW5TZW50ZW5jZXMgPSBzcG9rZW5TZW50ZW5jZXMucmVwbGFjZShyZSwgJycpO1xyXG4gICAgICAgIGdpdmVuU2VudGVuY2VzID0gZ2l2ZW5TZW50ZW5jZXMucmVwbGFjZShyZSwgJycpO1xyXG4gICAgICAgIGxldCBnaXZlbldvcmRzID0gZ2l2ZW5TZW50ZW5jZXMuc3BsaXQoJyAnKTtcclxuICAgICAgICBsZXQgc3Bva2VuV29yZHMgPSBzcG9rZW5TZW50ZW5jZXMuc3BsaXQoJyAnKTtcclxuICAgICAgICBsZXQgbDEgPSBnaXZlbldvcmRzLmxlbmd0aDtcclxuICAgICAgICBsZXQgbDIgPSBzcG9rZW5Xb3Jkcy5sZW5ndGg7XHJcbiAgICAgICAgaWYobDItbDE+MTAgfHwgbDEtbDI+MTApe1xyXG5cdFx0XHR0aGlzLnJlY29nbml6ZWRUZXh0ID0gdW5kZWZpbmVkO1xyXG5cdFx0XHR0aGlzLnNjb3JlID0gMDtcclxuICAgICAgICAgICAgYWxlcnQoXCJQbGVhc2UgcmVwZWF0IHlvdXIgYW5zd2VyIGxvdWRseSBhbmQgY2xlYXJseSEgV2UgZGlkIG5vdCBoZWFyIHlvdS5cIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBsZXQgY291bnQgPSB0aGlzLmdldExvbmdlc3RDb21tb25TdWJzZXF1ZW5jZShnaXZlbldvcmRzLCBzcG9rZW5Xb3JkcywgbDEsIGwyKTtcclxuXHRcdFx0dGhpcy5zY29yZSA9IE1hdGgucm91bmQoMTAwKmNvdW50L2wxKTtcclxuXHRcdFx0YWxlcnQoXCJZb3VyIGFuc3dlcjogXFxuXCIgKyB0aGlzLnJlY29nbml6ZWRUZXh0ICsgXCJcXG5cXG5cIiArIFwiWW91ciBTY29yZTogXCIgKyB0aGlzLnNjb3JlKTtcclxuXHRcdFx0dGhpcy5yZWNvZ25pemVkVGV4dCA9IHVuZGVmaW5lZDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHByaXZhdGUgc3RvcExpc3RlbmluZygpOiB2b2lkIHtcclxuXHRcdGlmKHRoaXMucmVjb3JkaW5nPT1mYWxzZSl7XHJcblx0XHRcdC8vIHRoaXMucmVjb3JkaW5nID0gdHJ1ZTtcclxuXHRcdFx0dGhpcy5zcGVlY2gydGV4dC5zdG9wTGlzdGVuaW5nKCkudGhlbigoKSA9PiB7XHJcblx0XHRcdFx0Y29uc29sZS5sb2coXCJTdG9wcGVkIGxpc3RlbmluZ1wiKTtcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcbiAgICB9XHJcblxyXG5cdG5nT25Jbml0KCk6IHZvaWQge1xyXG5cdFx0dGhpcy5zcGVlY2gydGV4dCA9IG5ldyBTcGVlY2hSZWNvZ25pdGlvbigpO1xyXG4gICAgXHR0aGlzLnNwZWVjaDJ0ZXh0LmF2YWlsYWJsZSgpLnRoZW4oYXZhaWwgPT4ge1xyXG4gICAgICBcdFx0dGhpcy5yZWNvcmRpbmdBdmFpbGFibGUgPSBhdmFpbDtcclxuICAgIFx0fSk7XHJcblx0XHQvLyB0aGlzLnRleHQyc3BlZWNoID0gbmV3IFROU1RleHRUb1NwZWVjaCgpO1xyXG5cdFx0dGhpcy5zdWIgPSB0aGlzLnJvdXRlLnBhcmFtcy5zdWJzY3JpYmUocGFyYW1zID0+IHtcclxuXHRcdFx0dGhpcy5wYXRoID0gcGFyYW1zWydwYXRoJ107XHJcblx0XHRcdHRoaXMucGF0aHNlcnZpY2UuZ2V0UXVlc3Rpb25zKHRoaXMucGF0aClcclxuXHRcdFx0XHQuc3Vic2NyaWJlKFxyXG5cdFx0XHRcdFx0KGQ6IFF1ZXN0aW9uW10pID0+IHtcclxuXHRcdFx0XHRcdFx0dGhpcy5xdWVzdGlvbiA9IGRbMF07XHJcblx0XHRcdFx0XHRcdHRoaXMucXVlc3Rpb25zID0gZDtcclxuXHRcdFx0XHRcdFx0dGhpcy52YXJpYWJsZSA9IHRoaXMucXVlc3Rpb24ucXVlc3Q7XHJcblx0XHRcdFx0XHRcdHRoaXMudmFyaWFibGUucmVwbGFjZShcIi5cIixcIj9cIik7XHJcblx0XHRcdFx0XHRcdHRoaXMuc2VudGVuY2VzID0gdGhpcy52YXJpYWJsZS5zcGxpdChcIj8gXCIpO1xyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdChlcnJvcikgPT4ge1xyXG5cdFx0XHRcdFx0XHRjb25zb2xlLmxvZyhlcnJvcik7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0KVxyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHRuZ09uRGVzdHJveSgpIHtcclxuXHRcdHRoaXMuc3ViLnVuc3Vic2NyaWJlKCk7XHJcblx0fVxyXG59Il19