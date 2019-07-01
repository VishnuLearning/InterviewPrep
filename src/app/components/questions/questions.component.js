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
        if (l2 < 5) {
            this.recognizedText = undefined;
            this.score = 0;
            ;
            alert("We did not hear you. Please check your Microphone, Voice input setting. Then repeat your answer loudly and clearly!");
        }
        else {
            var count = this.getLongestCommonSubsequence(givenWords, spokenWords, l1, l2);
            this.score = Math.round(100 * count / l1);
            var tag = '';
            if (this.score > 90)
                tag = "Excellent!";
            else if (this.score > 80)
                tag = "Very Good!";
            else if (this.score > 70)
                tag = "Keep it Up";
            else if (this.score > 60)
                tag = "You did Decent, Keep trying";
            else
                tag = "Please concentrate and Try again";
            alert("Your Score: " + this.score + "%" + "\n\n" + tag + "\n\nYour answer: \n" + this.recognizedText);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlc3Rpb25zLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInF1ZXN0aW9ucy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBOEQ7QUFDOUQsOERBQTRGO0FBQzVGLHNDQUE2RDtBQUM3RCw0Q0FBNEM7QUFDNUMsaUVBQStEO0FBQy9ELDBDQUF5RDtBQUd6RCx1RUFBMEU7QUFDMUUsbUZBQW9HO0FBQ3BHLHdEQUF3RDtBQUN4RCxxREFBcUQ7QUFVckQ7SUEwQ0MsNEJBQW9CLFdBQTRCLEVBQVUsV0FBd0IsRUFBVSxLQUFxQixFQUFVLE1BQWMsRUFBVSxJQUFZO1FBQS9KLG1CQWNDO1FBZG1CLGdCQUFXLEdBQVgsV0FBVyxDQUFpQjtRQUFVLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQVUsVUFBSyxHQUFMLEtBQUssQ0FBZ0I7UUFBVSxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQVUsU0FBSSxHQUFKLElBQUksQ0FBUTtRQWpDL0osY0FBUyxHQUFXLHFDQUFxQyxDQUFDO1FBTTFELGVBQVUsR0FBWSxLQUFLLENBQUM7UUFDNUIsYUFBUSxHQUFZLEtBQUssQ0FBQztRQUMxQixrQkFBYSxHQUFXLENBQUMsQ0FBQyxDQUFDO1FBRzNCLHdCQUFtQixHQUFXLENBQUMsQ0FBQztRQUVoQyxVQUFLLEdBQUcsQ0FBQyxDQUFDO1FBQ1YsaUJBQVksR0FBRyxDQUFDLGVBQWUsRUFBQyxzQkFBc0IsRUFBQyxzQkFBc0IsRUFBQyx5QkFBeUIsRUFBQyx1QkFBdUI7WUFDL0gsc0JBQXNCLEVBQUMsK0JBQStCLEVBQUMseUJBQXlCLEVBQUMseUJBQXlCO1lBQzFHLCtCQUErQixFQUFDLHlCQUF5QixFQUFDLHNCQUFzQixFQUFDLCtCQUErQixFQUFDLHdCQUF3QjtZQUN6SSxzQkFBc0IsRUFBQyx3QkFBd0IsRUFBQyx3QkFBd0IsRUFBQyx3QkFBd0IsRUFBQyx1QkFBdUI7WUFDekgsd0JBQXdCLEVBQUMsK0JBQStCLEVB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S0FBSztnQkFDTCxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3BCLENBQUMsQ0FDRCxDQUFBO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDSixDQUFDO0lBRUQsd0NBQVcsR0FBWDtRQUNDLElBQUksQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDeEIsQ0FBQztJQTlTa0M7UUFBbEMsZ0JBQVMsQ0FBQyxnQ0FBc0IsQ0FBQztrQ0FBeUIsZ0NBQXNCOytEQUFDO0lBQzdEO1FBQXBCLGdCQUFTLENBQUMsUUFBUSxDQUFDO2tDQUFhLGlCQUFVOzJEQUFDO0lBRmhDLGtCQUFrQjtRQVI5QixnQkFBUyxDQUFDO1lBQ1YsUUFBUSxFQUFFLFdBQVc7WUFDckIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFNBQVMsRUFBRSxDQUFDLDBCQUFXLENBQUM7WUFDeEIsV0FBVyxFQUFFLDRCQUE0QjtZQUN6QyxTQUFTLEVBQUUsQ0FBQywyQkFBMkIsQ0FBQztTQUN4QyxDQUFDO3lDQTRDZ0MsMkNBQWUsRUFBdUIsMEJBQVcsRUFBaUIsdUJBQWMsRUFBa0IsZUFBTSxFQUFnQixhQUFNO09BMUNuSixrQkFBa0IsQ0FnVDlCO0lBQUQseUJBQUM7Q0FBQSxBQWhURCxJQWdUQztBQWhUWSxnREFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBWaWV3Q2hpbGQsIEVsZW1lbnRSZWYsIE5nWm9uZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IFJhZFNpZGVEcmF3ZXJDb21wb25lbnQsIFNpZGVEcmF3ZXJUeXBlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC11aS1zaWRlZHJhd2VyL2FuZ3VsYXJcIjtcclxuaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIE9uRGVzdHJveSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbi8vIGltcG9ydCB7IFJlc3BvbnNlIH0gZnJvbSBcIkBhbmd1bGFyL2h0dHBcIjtcclxuaW1wb3J0IHsgUGF0aFNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvcGF0aC9wYXRoLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgUm91dGVyLCBBY3RpdmF0ZWRSb3V0ZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCB7IFF1ZXN0aW9uIH0gZnJvbSBcIi4uLy4uL2NsYXNzZXMvcXVlc3Rpb25cIjtcclxuaW1wb3J0IHsgU3dpcGVHZXN0dXJlRXZlbnREYXRhIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvZ2VzdHVyZXNcIjtcclxuaW1wb3J0IHsgVE5TVGV4dFRvU3BlZWNoLCBTcGVha09wdGlvbnMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LXRleHR0b3NwZWVjaFwiO1xyXG5pbXBvcnQgeyBTcGVlY2hSZWNvZ25pdGlvbiwgU3BlZWNoUmVjb2duaXRpb25UcmFuc2NyaXB0aW9uIH0gZnJvbSAnbmF0aXZlc2NyaXB0LXNwZWVjaC1yZWNvZ25pdGlvbic7XHJcbi8vIGltcG9ydCB7IGVycm9yIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdHJhY2UvdHJhY2VcIjtcclxuLy8gaW1wb3J0IHtTbGlkZXJ9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL3NsaWRlclwiO1xyXG5cclxuQENvbXBvbmVudCh7XHJcblx0c2VsZWN0b3I6IFwiUXVlc3Rpb25zXCIsXHJcblx0bW9kdWxlSWQ6IG1vZHVsZS5pZCxcclxuXHRwcm92aWRlcnM6IFtQYXRoU2VydmljZV0sXHJcblx0dGVtcGxhdGVVcmw6IFwiLi9xdWVzdGlvbnMuY29tcG9uZW50Lmh0bWxcIixcclxuXHRzdHlsZVVybHM6IFsnLi9xdWVzdGlvbnMuY29tcG9uZW50LmNzcyddXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgUXVlc3Rpb25zQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xyXG5cdEBWaWV3Q2hpbGQoUmFkU2lkZURyYXdlckNvbXBvbmVudCkgcHVibGljIGRyYXdlckNvbXBvbmVudDogUmFkU2lkZURyYXdlckNvbXBvbmVudDtcclxuXHRAVmlld0NoaWxkKFwiYXZhdGFyXCIpIGF2YXRhckltYWdlOkVsZW1lbnRSZWY7XHJcblxyXG5cdG9uT3BlbkRyYXdlclRhcCgpIHtcclxuXHRcdHRoaXMuZHJhd2VyQ29tcG9uZW50LnNpZGVEcmF3ZXIuc2hvd0RyYXdlcigpO1xyXG5cdH1cclxuXHJcblx0cGF0aDogc3RyaW5nO1xyXG5cdGltYWdlUGF0aDogc3RyaW5nID0gXCJ+L2Fzc2V0cy9pbWFnZXMvRmluYWxfQXZhdGFyX3NtYWxsL1wiO1xyXG5cdHF1ZXN0aW9uczogUXVlc3Rpb25bXTtcclxuXHRxdWVzdGlvbjogUXVlc3Rpb247XHJcblx0cW51bTogbnVtYmVyO1xyXG5cdHRpdGxlOnN0cmluZztcclxuXHR2YXJpYWJsZTogc3RyaW5nO1xyXG5cdHNob3dBbnN3ZXI6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHRzcGVha2luZzogYm9vbGVhbiA9IGZhbHNlO1xyXG5cdHNlbnRlbmNlSW5kZXg6IG51bWJlciA9IC0xO1xyXG5cdHNlbnRlbmNlczogQXJyYXk8c3RyaW5nPjtcclxuXHRzcGVha2ludGVydmFsOiBudW1iZXI7XHJcblx0c3BlYWtBbmRBbmltYXRlRmxhZzogbnVtYmVyID0gMTtcclxuXHRwcml2YXRlIHN1YjogYW55O1xyXG5cdHNjb3JlID0gMDtcclxuXHRBdmF0YXJJbWFnZXMgPSBbJ2pvYnNfZnVsbC5wbmcnLCdqb2JzX21vdXRoX3dpZGU1LnBuZycsJ2pvYnNfbW91dGhfd2lkZTUucG5nJywnam9ic19tb3V0aF9uYXJyb3dfby5wbmcnLCdqb2JzX21vdXRoX3dpZGVfeS5wbmcnLFxyXG5cdCdqb2JzX21vdXRoX3dpZGU1LnBuZycsJ2pvYnNfbW91dGhfd2lkZV9kX2Zfa19yX3MucG5nJywnam9ic19tb3V0aF9uYXJyb3dfdy5wbmcnLCdqb2JzX21vdXRoX25hcnJvd19vLnBuZycsXHJcblx0J2pvYnNfbW91dGhfd2lkZV9kX2Zfa19yX3MucG5nJywnam9ic19tb3V0aF9uYXJyb3dfdS5wbmcnLCdqb2JzX21vdXRoX3dpZGU1LnBuZycsJ2pvYnNfbW91dGhfd2lkZV9kX2Zfa19yX3MucG5nJywnam9ic19tb3V0aF93aWRlX3NoLnBuZycsXHJcblx0J2pvYnNfbW91dGhfd2lkZTUucG5nJywnam9ic19tb3V0aF93aWRlX3NoLnBuZycsJ2pvYnNfbW91dGhfd2lkZV9zaC5wbmcnLCdqb2JzX21vdXRoX3dpZGVfdGgucG5nJywnam9ic19tb3V0aF93aWRlX2YucG5nJyxcclxuXHQnam9ic19tb3V0aF93aWRlX3NoLnBuZycsJ2pvYnNfbW91dGhfd2lkZV9kX2Zfa19yX3MucG5nJywnam9ic19tb3V0aF9jbG9zZWQucG5nJ107XHJcblx0c3BlZWNoUmF0ZSA9IDAuOTtcclxuXHQvLyBwcml2YXRlIHRleHQyc3BlZWNoOiBUTlNUZXh0VG9TcGVlY2g7XHJcblx0cHJpdmF0ZSBzcGVlY2gydGV4dDogU3BlZWNoUmVjb2duaXRpb247XHJcblx0c3BlYWtPcHRpb25zIDogU3BlYWtPcHRpb25zO1xyXG4gICAgbWljcm9waG9uZUVuYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHJlY29yZGluZzogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgbGFzdFRyYW5zY3JpcHRpb246IHN0cmluZyA9IG51bGw7XHJcbiAgICBzcG9rZW46IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHJlY29nbml6ZWRUZXh0OiBzdHJpbmc7XHJcbiAgICBwaXRjaDogbnVtYmVyID0gMTAwO1xyXG5cdHByaXZhdGUgcmVjb3JkaW5nQXZhaWxhYmxlOiBib29sZWFuO1xyXG5cdHByaXZhdGUgc3Bva2VuVGV4dDogc3RyaW5nO1xyXG5cdGZsYWc6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcblx0Y29uc3RydWN0b3IocHJpdmF0ZSB0ZXh0MnNwZWVjaDogVE5TVGV4dFRvU3BlZWNoLCBwcml2YXRlIHBhdGhzZXJ2aWNlOiBQYXRoU2VydmljZSwgcHJpdmF0ZSByb3V0ZTogQWN0aXZhdGVkUm91dGUsIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsIHByaXZhdGUgem9uZTogTmdab25lKSB7XHJcblx0XHR0aGlzLnF1ZXN0aW9ucyA9IFtdO1xyXG5cdFx0dGhpcy5xbnVtID0gMTtcclxuXHRcdHZhciB1ID0gZGVjb2RlVVJJKHJvdXRlci51cmwpO1xyXG5cdFx0dGhpcy50aXRsZSA9IHUuc3Vic3RyaW5nKHUubGFzdEluZGV4T2YoJyUyRicpKzMsIHUubGFzdEluZGV4T2YoJy4nKSk7XHJcblx0XHR0aGlzLnNwZWFrT3B0aW9ucyA9IHtcclxuXHRcdFx0dGV4dDogXCJRdWVzdGlvbiAxLCBcIixcclxuXHRcdFx0cGl0Y2g6IDEuMCxcclxuXHRcdFx0c3BlYWtSYXRlOiAwLjksXHJcblx0XHRcdHZvbHVtZTogMS4wLFxyXG5cdFx0XHRsYW5ndWFnZTpcImVuXCIsXHJcblx0XHRcdGxvY2FsZTpcImVuLVVTXCIsXHJcblx0XHRcdGZpbmlzaGVkQ2FsbGJhY2s6ICgpPT57dGhpcy5zcGVha05leHRTZW50ZW5jZSgpO31cclxuXHRcdH07XHJcblx0fVxyXG5cclxuXHRvblN3aXBlKGFyZ3M6IFN3aXBlR2VzdHVyZUV2ZW50RGF0YSkge1xyXG5cdFx0aWYgKGFyZ3MuZGlyZWN0aW9uID09IDEpIHtcdFxyXG5cdFx0XHR0aGlzLmdvTGVmdCgpO1xyXG5cdFx0fSBlbHNlIGlmIChhcmdzLmRpcmVjdGlvbiA9PSAyKSB7XHJcblx0XHRcdHRoaXMuZ29SaWdodCgpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHRnb0xlZnQoKXtcclxuXHRcdGlmICh0aGlzLnFudW0gPiAwKSB7XHRcclxuXHRcdFx0dGhpcy5yZWNvZ25pemVkVGV4dCA9IHVuZGVmaW5lZDtcclxuXHRcdFx0dGhpcy5yZWNvcmRpbmcgPSBmYWxzZTtcclxuXHRcdFx0dGhpcy50ZXh0MnNwZWVjaC5wYXVzZSgpO1xyXG5cdFx0XHR0aGlzLmF2YXRhckltYWdlLm5hdGl2ZUVsZW1lbnQuc3JjID0gdGhpcy5pbWFnZVBhdGggKyB0aGlzLkF2YXRhckltYWdlc1swXTtcclxuXHRcdFx0dGhpcy5zaG93QW5zd2VyID0gZmFsc2U7XHJcblx0XHRcdHRoaXMubG9hZFF1ZXN0aW9uKHRoaXMucW51bSAtIDEpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHRnb1JpZ2h0KCl7XHJcblx0XHRpZiAodGhpcy5xbnVtIDwgdGhpcy5xdWVzdGlvbnMubGVuZ3RoIC0gMSkge1xyXG5cdFx0XHR0aGlzLnJlY29nbml6ZWRUZXh0ID0gdW5kZWZpbmVkO1xyXG5cdFx0XHR0aGlzLnJlY29yZGluZyA9IGZhbHNlO1xyXG5cdFx0XHR0aGlzLnRleHQyc3BlZWNoLnBhdXNlKCk7XHJcblx0XHRcdHRoaXMuYXZhdGFySW1hZ2UubmF0aXZlRWxlbWVudC5zcmMgPSB0aGlzLmltYWdlUGF0aCArIHRoaXMuQXZhdGFySW1hZ2VzWzBdO1xyXG5cdFx0XHR0aGlzLnNob3dBbnN3ZXIgPSBmYWxzZTtcclxuXHRcdFx0dGhpcy5sb2FkUXVlc3Rpb24odGhpcy5xbnVtICsgMSk7XHJcblx0XHR9XHJcblx0fSBcclxuXHJcblx0Ly9sb2FkaW5nIHF1ZXN0aW9uIGRpcmVjdGx5IGZyb20gbmF2aWdhdGlvbiB0YWJcclxuXHRsb2FkUXVlc3Rpb24oaTogbnVtYmVyKSB7XHJcblx0XHR0aGlzLmRyYXdlckNvbXBvbmVudC5zaWRlRHJhd2VyLmNsb3NlRHJhd2VyKCk7XHJcblx0XHR0aGlzLnF1ZXN0aW9uID0gdGhpcy5xdWVzdGlvbnNbaV07XHJcblx0XHR0aGlzLnZhcmlhYmxlID0gdGhpcy5xdWVzdGlvbi5xdWVzdDtcclxuXHRcdGxldCB2YWx1ZSA9IHRoaXMudmFyaWFibGUucmVwbGFjZSgvXFwuL2dpLFwiP1wiKTtcclxuXHRcdHRoaXMuc2VudGVuY2VzID0gdmFsdWUuc3BsaXQoXCI/IFwiKTtcclxuXHRcdGZvcih2YXIgdj0wO3Y8dGhpcy5zZW50ZW5jZXMubGVuZ3RoO3YrKylcclxuXHRcdFx0Y29uc29sZS5sb2codGhpcy5zZW50ZW5jZXNbdl0pO1xyXG5cdFx0Y29uc29sZS5sb2codGhpcy5zZW50ZW5jZXMpO1xyXG5cdFx0dGhpcy5zZW50ZW5jZUluZGV4ID0gLTE7XHJcblx0XHRpZih0aGlzLnNwZWFraW50ZXJ2YWwpIGNsZWFySW50ZXJ2YWwodGhpcy5zcGVha2ludGVydmFsKTtcclxuXHRcdHRoaXMuc3BlYWtpbmcgPSBmYWxzZTtcclxuXHRcdHRoaXMuc3BlYWtBbmRBbmltYXRlRmxhZyA9IDE7XHJcblx0XHR0aGlzLnFudW0gPSBpO1xyXG5cdFx0Ly8gdGhpcy5zcGVha1RpdGxlKCk7XHJcblx0fVxyXG5cclxuXHRkaXNwbGF5QW5zd2VyKCl7XHJcblx0XHR0aGlzLnNob3dBbnN3ZXIgPSAhdGhpcy5zaG93QW5zd2VyO1xyXG5cdH1cclxuXHRcclxuXHRzcGVha05leHRTZW50ZW5jZSgpe1xyXG5cdFx0Y29uc29sZS5sb2coXCJzcGVha05leHRTZW50ZW5jZSBjYWxsZWQgXCIsIHRoaXMuc3BlYWtBbmRBbmltYXRlRmxhZywgdGhpcy5zcGVha2luZywgdGhpcy5zZW50ZW5jZUluZGV4KTtcclxuXHRcdHRoaXMuc3BlYWtBbmRBbmltYXRlRmxhZysrO1xyXG5cdFx0aWYodGhpcy5zcGVha2luZyAmJiB0aGlzLnNwZWFrQW5kQW5pbWF0ZUZsYWcgPT0gMikge1xyXG5cdFx0XHR0aGlzLnNwZWFrQW5kQW5pbWF0ZUZsYWcgPSAwO1xyXG5cdFx0XHR0aGlzLnNlbnRlbmNlSW5kZXgrKztcclxuXHRcdFx0aWYodGhpcy5zZW50ZW5jZUluZGV4PHRoaXMuc2VudGVuY2VzLmxlbmd0aCkge1xyXG5cdFx0XHRcdHRoaXMuc3BlYWtPcHRpb25zLnRleHQgPSB0aGlzLnNlbnRlbmNlc1t0aGlzLnNlbnRlbmNlSW5kZXhdO1xyXG5cdFx0XHRcdHRoaXMudGV4dDJzcGVlY2guc3BlYWsodGhpcy5zcGVha09wdGlvbnMpXHJcblx0XHRcdFx0LnRoZW4oKCk9PntcclxuXHRcdFx0XHRcdHRoaXMuYW5pbWF0ZUF2YXRhcigpO1xyXG5cdFx0XHRcdFx0Y29uc29sZS5sb2coXCJpbiB0aGVuXCIpO30sIFxyXG5cdFx0XHRcdFx0KGVycik9Pntjb25zb2xlLmxvZyhlcnIpO30pO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHRoaXMuc2VudGVuY2VJbmRleCA9IC0xO1xyXG5cdFx0XHRcdHRoaXMuc3BlYWtpbmcgPSBmYWxzZTtcclxuXHRcdFx0XHR0aGlzLnNwZWFrQW5kQW5pbWF0ZUZsYWcgPSAxO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRhbmltYXRlQXZhdGFyKCk6IHZvaWQge1xyXG5cdFx0bGV0IGkgPSAwO1xyXG4gICAgICAgIHRoaXMuc3BlYWtpbnRlcnZhbCA9IHNldEludGVydmFsKCgpID0+IHsgXHJcblx0XHRcdHRoaXMuYXZhdGFySW1hZ2UubmF0aXZlRWxlbWVudC5zcmMgPSB0aGlzLmltYWdlUGF0aCArIHRoaXMuQXZhdGFySW1hZ2VzW3RoaXMucXVlc3Rpb24udmlzZW1lc1t0aGlzLnNlbnRlbmNlSW5kZXhdW2ldXTtcclxuXHRcdFx0XHJcbiAgICAgICAgICAgIGkrKztcclxuICAgICAgICAgICAgaWYgKGkgPT0gdGhpcy5xdWVzdGlvbi52aXNlbWVzW3RoaXMuc2VudGVuY2VJbmRleF0ubGVuZ3RoKSB7XHJcblx0XHRcdFx0Y2xlYXJJbnRlcnZhbCh0aGlzLnNwZWFraW50ZXJ2YWwpO1xyXG5cdFx0XHRcdHRoaXMuc3BlYWtOZXh0U2VudGVuY2UoKTtcclxuXHRcdFx0fVxyXG5cdFx0fSwgdGhpcy5zcGVlY2hSYXRlKjg1KTtcclxuXHR9XHJcblxyXG5cdHRleHRUb1NwZWVjaCgpe1xyXG5cdFx0Ly8gdGhpcy50ZXh0MnNwZWVjaC5wYXVzZSgpO1xyXG5cdFx0dmFyIF90aGlzID0gdGhpcztcclxuXHRcdHRoaXMuc3BlYWtpbmcgPSB0cnVlO1xyXG5cdFx0dGhpcy5zcGVha05leHRTZW50ZW5jZSgpO1xyXG5cdH1cclxuXHJcblx0c3BlYWtUZXh0T25seSgpe1xyXG5cdFx0dGhpcy50ZXh0MnNwZWVjaC5wYXVzZSgpO1xyXG5cdFx0bGV0IG9wdGlvbnM6IFNwZWFrT3B0aW9ucyA9IHtcclxuXHRcdFx0dGV4dDogdGhpcy5xdWVzdGlvbi50ZXh0LFxyXG5cdFx0XHRwaXRjaDogMS4zLFxyXG5cdFx0XHRzcGVha1JhdGU6IDAuOSxcclxuXHRcdFx0dm9sdW1lOiAxLjAsXHJcblx0XHRcdGxhbmd1YWdlOiBcImVuXCIsXHJcblx0XHRcdGxvY2FsZTogXCJlbi1VU1wiLFxyXG5cdFx0XHRmaW5pc2hlZENhbGxiYWNrOiAoKT0+e1xyXG5cdFx0XHRcdGNvbnNvbGUubG9nKFwicmVhZCB0aGUgYW5zd2VyXCIpO1xyXG5cdFx0XHR9XHJcblx0XHR9O1xyXG5cdFx0dGhpcy50ZXh0MnNwZWVjaC5zcGVhayhvcHRpb25zKTtcclxuXHR9XHJcbiAgIFxyXG5cdC8vdG8gaW5pdGFpbGl6ZSB0aGUgc3BlZWNoIHJlY29yZGluZ1xyXG5cdHRvZ2dsZVJlY29yZGluZygpOiB2b2lkIHtcclxuXHRcdHRoaXMucmVjb3JkaW5nID0gIXRoaXMucmVjb3JkaW5nO1xyXG4gICAgICAgIGlmICh0aGlzLnJlY29yZGluZykge1xyXG5cdFx0XHR0aGlzLnNwb2tlbiA9IGZhbHNlO1xyXG4gICAgICAgICAgXHR0aGlzLmxhc3RUcmFuc2NyaXB0aW9uID0gbnVsbDtcclxuICAgICAgICAgIFx0dGhpcy5zdGFydExpc3RlbmluZygpO1xyXG5cdFx0fSBcclxuXHRcdGVsc2Uge1xyXG4gICAgICAgICAgXHR0aGlzLnN0b3BMaXN0ZW5pbmcoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuXHRwcml2YXRlIHN0YXJ0TGlzdGVuaW5nKCk6IHZvaWQge1xyXG5cdFx0Ly8gY29uc29sZS5sb2coXCJJbnNpZGUgc3RhcnRsaXN0ZW5pbmdcIik7XHJcblx0XHRpZiAoIXRoaXMucmVjb3JkaW5nQXZhaWxhYmxlKSB7XHJcblx0XHRcdGNvbnNvbGUubG9nKFwiaW5zaWRlIGlmXCIpO1xyXG5cdFx0XHRhbGVydCh7XHJcblx0XHRcdHRpdGxlOiBcIk5vdCBzdXBwb3J0ZWRcIixcclxuXHRcdFx0bWVzc2FnZTogXCJTcGVlY2ggcmVjb2duaXRpb24gbm90IHN1cHBvcnRlZCBvbiB0aGlzIGRldmljZS4gVHJ5IGEgZGlmZmVyZW50IGRldmljZSBwbGVhc2UuXCIsXHJcblx0XHRcdG9rQnV0dG9uVGV4dDogXCJPaCwgYnVtbWVyXCJcclxuXHRcdFx0fSk7XHJcblx0XHRcdHRoaXMucmVjb2duaXplZFRleHQgPSBcIk5vIHN1cHBvcnQsIFNvcnJ5XCI7XHJcblx0XHRcdHRoaXMucmVjb3JkaW5nID0gZmFsc2U7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHRcdC8vIHRoaXMucmVjb3JkaW5nID0gdHJ1ZTtcclxuXHRcdHRoaXMuc3BlZWNoMnRleHQuc3RhcnRMaXN0ZW5pbmcoe1xyXG5cdFx0XHRsb2NhbGU6IFwiZW4tVVNcIixcclxuXHRcdFx0cmV0dXJuUGFydGlhbFJlc3VsdHM6IHRydWUsXHJcblx0XHRcdG9uUmVzdWx0OiAodHJhbnNjcmlwdGlvbjogU3BlZWNoUmVjb2duaXRpb25UcmFuc2NyaXB0aW9uKSA9PiB7XHJcblx0XHRcdFx0dGhpcy56b25lLnJ1bigoKSA9PiB0aGlzLnJlY29nbml6ZWRUZXh0ID0gdHJhbnNjcmlwdGlvbi50ZXh0KTtcclxuXHRcdFx0XHR0aGlzLmxhc3RUcmFuc2NyaXB0aW9uID0gdHJhbnNjcmlwdGlvbi50ZXh0O1xyXG5cdFx0XHRcdGlmICh0cmFuc2NyaXB0aW9uLmZpbmlzaGVkKSB7XHJcblx0XHRcdFx0XHR0aGlzLnNwb2tlbiA9IHRydWU7XHJcblx0XHRcdFx0XHR0aGlzLnNwb2tlblRleHQgPSB0cmFuc2NyaXB0aW9uLnRleHQ7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9LFxyXG5cdFx0fSkudGhlbihcclxuXHRcdFx0KHN0YXJ0ZWQ6IGJvb2xlYW4pID0+IHtjb25zb2xlLmxvZyhcInN0YXJ0ZWQgbGlzdGVuaW5nXCIpO30sXHJcblx0XHRcdChlcnJvck1lc3NhZ2U6IHN0cmluZykgPT4ge2NvbnNvbGUubG9nKGBFcnJvcjogJHtlcnJvck1lc3NhZ2V9YCk7fVxyXG5cdFx0KTtcclxuXHR9XHJcblxyXG5cdC8vIGxvZ2ljIHRvIGNoZWNrIG51bWJlciBvZiB3b3JkcyBtYXRjaGluZ1xyXG5cdGdldExvbmdlc3RDb21tb25TdWJzZXF1ZW5jZShBLCBCLCBtLCBuKXtcclxuICAgICAgICB2YXIgTCA9IFtdO1xyXG4gICAgICAgIGxldCBpPTAsIGo9MDtcclxuICAgICAgICBmb3IoaT0wO2k8PW07aSsrKXtcclxuICAgICAgICAgIEwucHVzaChbXSk7XHJcbiAgICAgICAgICBmb3Ioaj0wO2o8PW47aisrKXtcclxuICAgICAgICAgICAgTFtpXS5wdXNoKDApO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKGk9MDsgaTw9bTsgaSsrKSBcclxuICAgICAgICB7IFxyXG4gICAgICAgICAgZm9yIChqPTA7IGo8PW47IGorKykgXHJcbiAgICAgICAgICB7IFxyXG4gICAgICAgICAgICBpZiAoaSA9PSAwIHx8IGogPT0gMCkgXHJcbiAgICAgICAgICAgICAgTFtpXVtqXSA9IDA7IFxyXG4gICAgICAgIFxyXG4gICAgICAgICAgICBlbHNlIGlmIChBW2ktMV0gPT0gQltqLTFdKSBcclxuICAgICAgICAgICAgICBMW2ldW2pdID0gTFtpLTFdW2otMV0gKyAxOyBcclxuICAgICAgICBcclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgIExbaV1bal0gPSBNYXRoLm1heChMW2ktMV1bal0sIExbaV1bai0xXSk7IFxyXG4gICAgICAgICAgfSBcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIExbbV1bbl07XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZW5lcmF0ZVNjb3JlKCk6IHZvaWQge1xyXG4gICAgICAgIGxldCBzcG9rZW5TZW50ZW5jZXMgPSB0aGlzLnJlY29nbml6ZWRUZXh0O1xyXG4gICAgICAgIGxldCBnaXZlblNlbnRlbmNlcyA9IHRoaXMucXVlc3Rpb24udGV4dDtcclxuICAgICAgICBsZXQgcmUgPSAvXFwuL2dpO1xyXG4gICAgICAgIHNwb2tlblNlbnRlbmNlcyA9IHNwb2tlblNlbnRlbmNlcy5yZXBsYWNlKHJlLCAnJyk7XHJcbiAgICAgICAgZ2l2ZW5TZW50ZW5jZXMgPSBnaXZlblNlbnRlbmNlcy5yZXBsYWNlKHJlLCAnJyk7XHJcbiAgICAgICAgcmUgPSAvXFwsL2dpO1xyXG4gICAgICAgIHNwb2tlblNlbnRlbmNlcyA9IHNwb2tlblNlbnRlbmNlcy5yZXBsYWNlKHJlLCAnJyk7XHJcbiAgICAgICAgZ2l2ZW5TZW50ZW5jZXMgPSBnaXZlblNlbnRlbmNlcy5yZXBsYWNlKHJlLCAnJyk7XHJcbiAgICAgICAgbGV0IGdpdmVuV29yZHMgPSBnaXZlblNlbnRlbmNlcy5zcGxpdCgnICcpO1xyXG4gICAgICAgIGxldCBzcG9rZW5Xb3JkcyA9IHNwb2tlblNlbnRlbmNlcy5zcGxpdCgnICcpO1xyXG4gICAgICAgIGxldCBsMSA9IGdpdmVuV29yZHMubGVuZ3RoO1xyXG4gICAgICAgIGxldCBsMiA9IHNwb2tlbldvcmRzLmxlbmd0aDtcclxuICAgICAgICBpZihsMjw1KXtcclxuXHRcdFx0dGhpcy5yZWNvZ25pemVkVGV4dCA9IHVuZGVmaW5lZDtcclxuXHRcdFx0dGhpcy5zY29yZSA9IDA7O1xyXG4gICAgICAgICAgICBhbGVydChcIldlIGRpZCBub3QgaGVhciB5b3UuIFBsZWFzZSBjaGVjayB5b3VyIE1pY3JvcGhvbmUsIFZvaWNlIGlucHV0IHNldHRpbmcuIFRoZW4gcmVwZWF0IHlvdXIgYW5zd2VyIGxvdWRseSBhbmQgY2xlYXJseSFcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBsZXQgY291bnQgPSB0aGlzLmdldExvbmdlc3RDb21tb25TdWJzZXF1ZW5jZShnaXZlbldvcmRzLCBzcG9rZW5Xb3JkcywgbDEsIGwyKTtcclxuXHRcdFx0dGhpcy5zY29yZSA9IE1hdGgucm91bmQoMTAwKmNvdW50L2wxKTtcclxuXHRcdFx0bGV0IHRhZyA9ICcnO1xyXG5cdFx0XHRpZih0aGlzLnNjb3JlPjkwKSB0YWcgPSBcIkV4Y2VsbGVudCFcIjtcclxuXHRcdFx0ZWxzZSBpZiAodGhpcy5zY29yZT44MCkgdGFnID0gXCJWZXJ5IEdvb2QhXCI7XHJcblx0XHRcdGVsc2UgaWYgKHRoaXMuc2NvcmU+NzApIHRhZyA9IFwiS2VlcCBpdCBVcFwiO1xyXG5cdFx0XHRlbHNlIGlmICh0aGlzLnNjb3JlPjYwKSB0YWcgPSBcIllvdSBkaWQgRGVjZW50LCBLZWVwIHRyeWluZ1wiO1xyXG5cdFx0XHRlbHNlIHRhZyA9IFwiUGxlYXNlIGNvbmNlbnRyYXRlIGFuZCBUcnkgYWdhaW5cIjtcclxuXHRcdFx0YWxlcnQoXCJZb3VyIFNjb3JlOiBcIiArIHRoaXMuc2NvcmUrIFwiJVwiICtcIlxcblxcblwiK3RhZyArIFwiXFxuXFxuWW91ciBhbnN3ZXI6IFxcblwiICsgdGhpcy5yZWNvZ25pemVkVGV4dCApO1xyXG5cdFx0XHR0aGlzLnJlY29nbml6ZWRUZXh0ID0gdW5kZWZpbmVkO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgcHJpdmF0ZSBzdG9wTGlzdGVuaW5nKCk6IHZvaWQge1xyXG5cdFx0aWYodGhpcy5yZWNvcmRpbmc9PWZhbHNlKXtcclxuXHRcdFx0Ly8gdGhpcy5yZWNvcmRpbmcgPSB0cnVlO1xyXG5cdFx0XHR0aGlzLnNwZWVjaDJ0ZXh0LnN0b3BMaXN0ZW5pbmcoKS50aGVuKCgpID0+IHtcclxuXHRcdFx0XHRjb25zb2xlLmxvZyhcIlN0b3BwZWQgbGlzdGVuaW5nXCIpO1xyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuICAgIH1cclxuXHJcblx0bmdPbkluaXQoKTogdm9pZCB7XHJcblx0XHR0aGlzLnNwZWVjaDJ0ZXh0ID0gbmV3IFNwZWVjaFJlY29nbml0aW9uKCk7XHJcbiAgICBcdHRoaXMuc3BlZWNoMnRleHQuYXZhaWxhYmxlKCkudGhlbihhdmFpbCA9PiB7XHJcbiAgICAgIFx0XHR0aGlzLnJlY29yZGluZ0F2YWlsYWJsZSA9IGF2YWlsO1xyXG4gICAgXHR9KTtcclxuXHRcdC8vIHRoaXMudGV4dDJzcGVlY2ggPSBuZXcgVE5TVGV4dFRvU3BlZWNoKCk7XHJcblx0XHR0aGlzLnN1YiA9IHRoaXMucm91dGUucGFyYW1zLnN1YnNjcmliZShwYXJhbXMgPT4ge1xyXG5cdFx0XHR0aGlzLnBhdGggPSBwYXJhbXNbJ3BhdGgnXTtcclxuXHRcdFx0dGhpcy5wYXRoc2VydmljZS5nZXRRdWVzdGlvbnModGhpcy5wYXRoKVxyXG5cdFx0XHRcdC5zdWJzY3JpYmUoXHJcblx0XHRcdFx0XHQoZDogUXVlc3Rpb25bXSkgPT4ge1xyXG5cdFx0XHRcdFx0XHR0aGlzLnF1ZXN0aW9uID0gZFswXTtcclxuXHRcdFx0XHRcdFx0dGhpcy5xdWVzdGlvbnMgPSBkO1xyXG5cdFx0XHRcdFx0XHR0aGlzLnZhcmlhYmxlID0gdGhpcy5xdWVzdGlvbi5xdWVzdDtcclxuXHRcdFx0XHRcdFx0dGhpcy52YXJpYWJsZS5yZXBsYWNlKFwiLlwiLFwiP1wiKTtcclxuXHRcdFx0XHRcdFx0dGhpcy5zZW50ZW5jZXMgPSB0aGlzLnZhcmlhYmxlLnNwbGl0KFwiPyBcIik7XHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0KGVycm9yKSA9PiB7XHJcblx0XHRcdFx0XHRcdGNvbnNvbGUubG9nKGVycm9yKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHQpXHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdG5nT25EZXN0cm95KCkge1xyXG5cdFx0dGhpcy5zdWIudW5zdWJzY3JpYmUoKTtcclxuXHR9XHJcbn0iXX0=