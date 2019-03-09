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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlc3Rpb25zLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInF1ZXN0aW9ucy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBc0Q7QUFDdEQsOERBQTRGO0FBQzVGLHNDQUE2RDtBQUM3RCw0Q0FBNEM7QUFDNUMsNERBQTBEO0FBQzFELDBDQUF5RDtBQUd6RCx1RUFBMEU7QUFDMUUsbUZBQThIO0FBRzlILHdEQUF3RDtBQUN4RCxxREFBcUQ7QUFVckQ7SUF3Q0MsNEJBQW9CLFdBQTRCLEVBQVUsV0FBd0IsRUFBVSxLQUFxQixFQUFVLE1BQWM7UUFBekksbUJBY0M7UUFkbUIsZ0JBQVcsR0FBWCxXQUFXLENBQWlCO1FBQVUsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFBVSxVQUFLLEdBQUwsS0FBSyxDQUFnQjtRQUFVLFdBQU0sR0FBTixNQUFNLENBQVE7UUEvQnpJLGNBQVMsR0FBVywyQkFBMkIsQ0FBQztRQU1oRCxlQUFVLEdBQVksS0FBSyxDQUFDO1FBQzVCLGFBQVEsR0FBWSxLQUFLLENBQUM7UUFDMUIsa0JBQWEsR0FBVyxDQUFDLENBQUMsQ0FBQztRQUczQix3QkFBbUIsR0FBVyxDQUFDLENBQUM7UUFFaEMsaUJBQVksR0FBRyxDQUFDLGdCQUFnQixFQUFDLHVCQUF1QixFQUFDLHVCQUF1QixFQUFDLDBCQUEwQixFQUFDLHdCQUF3QjtZQUNwSSx1QkFBdUIsRUFBQyxnQ0FBZ0MsRUFBQywwQkFBMEIsRUFBQywwQkFBMEI7WUFDOUcsZ0NBQWdDLEVBQUMsMEJBQTBCLEVBQUMsdUJBQXVCLEVBQUMsZ0NBQWdDLEVBQUMseUJBQXlCO1lBQzlJLHVCQUF1QixFQUFDLHlCQUF5QixFQUFDLHlCQUF5QixFQUFDLHlCQUF5QixFQUFDLHdCQUF3QjtZQUM5SCx5QkFBeUIsRUFBQyxnQ0FBZ0MsRUFBQyx3QkFBd0IsQ0FBQyxDQUFDO1FBQ3JGLGVBQVUsR0FBRyxHQUFHLENBQUM7UUFJZCxzQkFBaUIs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LENBQUMsUUFBUSxHQUFHLE9BQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDO2dCQUNwQyxPQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQy9CLE9BQUksQ0FBQyxTQUFTLEdBQUcsT0FBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDNUMsQ0FBQyxFQUNELFVBQUMsS0FBSztnQkFDTCxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3BCLENBQUMsQ0FDRCxDQUFBO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDSixDQUFDO0lBRUQsd0NBQVcsR0FBWDtRQUNDLElBQUksQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDeEIsQ0FBQztJQTdRa0M7UUFBbEMsZ0JBQVMsQ0FBQyxnQ0FBc0IsQ0FBQztrQ0FBeUIsZ0NBQXNCOytEQUFDO0lBQzdEO1FBQXBCLGdCQUFTLENBQUMsUUFBUSxDQUFDO2tDQUFhLGlCQUFVOzJEQUFDO0lBRmhDLGtCQUFrQjtRQVI5QixnQkFBUyxDQUFDO1lBQ1YsUUFBUSxFQUFFLFdBQVc7WUFDckIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFNBQVMsRUFBRSxDQUFDLDBCQUFXLENBQUM7WUFDeEIsV0FBVyxFQUFFLDRCQUE0QjtZQUN6QyxTQUFTLEVBQUUsQ0FBQywyQkFBMkIsQ0FBQztTQUN4QyxDQUFDO3lDQTBDZ0MsMkNBQWUsRUFBdUIsMEJBQVcsRUFBaUIsdUJBQWMsRUFBa0IsZUFBTTtPQXhDN0gsa0JBQWtCLENBK1E5QjtJQUFELHlCQUFDO0NBQUEsQUEvUUQsSUErUUM7QUEvUVksZ0RBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVmlld0NoaWxkLCBFbGVtZW50UmVmIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgUmFkU2lkZURyYXdlckNvbXBvbmVudCwgU2lkZURyYXdlclR5cGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LXVpLXNpZGVkcmF3ZXIvYW5ndWxhclwiO1xyXG5pbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgT25EZXN0cm95IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuLy8gaW1wb3J0IHsgUmVzcG9uc2UgfSBmcm9tIFwiQGFuZ3VsYXIvaHR0cFwiO1xyXG5pbXBvcnQgeyBQYXRoU2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9wYXRoLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgUm91dGVyLCBBY3RpdmF0ZWRSb3V0ZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCB7IFF1ZXN0aW9uIH0gZnJvbSBcIi4uLy4uL2NsYXNzZXMvcXVlc3Rpb25cIjtcclxuaW1wb3J0IHsgU3dpcGVHZXN0dXJlRXZlbnREYXRhIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvZ2VzdHVyZXNcIjtcclxuaW1wb3J0IHsgVE5TVGV4dFRvU3BlZWNoLCBTcGVha09wdGlvbnMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LXRleHR0b3NwZWVjaFwiO1xyXG5pbXBvcnQgeyBTcGVlY2hSZWNvZ25pdGlvbiwgU3BlZWNoUmVjb2duaXRpb25UcmFuc2NyaXB0aW9uLCBTcGVlY2hSZWNvZ25pdGlvbk9wdGlvbnMgfSBmcm9tICduYXRpdmVzY3JpcHQtc3BlZWNoLXJlY29nbml0aW9uJztcclxuaW1wb3J0IHsgdmFyaWFibGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29tcGlsZXIvc3JjL291dHB1dC9vdXRwdXRfYXN0XCI7XHJcbmltcG9ydCB7IFZhcmlhYmxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvbXBpbGVyL3NyYy9yZW5kZXIzL3IzX2FzdFwiO1xyXG4vLyBpbXBvcnQgeyBlcnJvciB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3RyYWNlL3RyYWNlXCI7XHJcbi8vIGltcG9ydCB7U2xpZGVyfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9zbGlkZXJcIjtcclxuXHJcbkBDb21wb25lbnQoe1xyXG5cdHNlbGVjdG9yOiBcIlF1ZXN0aW9uc1wiLFxyXG5cdG1vZHVsZUlkOiBtb2R1bGUuaWQsXHJcblx0cHJvdmlkZXJzOiBbUGF0aFNlcnZpY2VdLFxyXG5cdHRlbXBsYXRlVXJsOiBcIi4vcXVlc3Rpb25zLmNvbXBvbmVudC5odG1sXCIsXHJcblx0c3R5bGVVcmxzOiBbJy4vcXVlc3Rpb25zLmNvbXBvbmVudC5jc3MnXVxyXG59KVxyXG5cclxuZXhwb3J0IGNsYXNzIFF1ZXN0aW9uc0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcclxuXHRAVmlld0NoaWxkKFJhZFNpZGVEcmF3ZXJDb21wb25lbnQpIHB1YmxpYyBkcmF3ZXJDb21wb25lbnQ6IFJhZFNpZGVEcmF3ZXJDb21wb25lbnQ7XHJcblx0QFZpZXdDaGlsZChcImF2YXRhclwiKSBhdmF0YXJJbWFnZTpFbGVtZW50UmVmO1xyXG5cdFxyXG5cdG9uT3BlbkRyYXdlclRhcCgpIHtcclxuXHRcdHRoaXMuZHJhd2VyQ29tcG9uZW50LnNpZGVEcmF3ZXIuc2hvd0RyYXdlcigpO1xyXG5cdH1cclxuXHJcblx0cGF0aDogc3RyaW5nO1xyXG5cdGltYWdlUGF0aDogc3RyaW5nID0gXCJ+L2Fzc2V0cy9pbWFnZXMvZHJfc2luaGEvXCI7XHJcblx0cXVlc3Rpb25zOiBRdWVzdGlvbltdO1xyXG5cdHF1ZXN0aW9uOiBRdWVzdGlvbjtcclxuXHRxbnVtOiBudW1iZXI7XHJcblx0dGl0bGU6c3RyaW5nO1xyXG5cdHZhcmlhYmxlOiBzdHJpbmc7XHJcblx0c2hvd0Fuc3dlcjogYm9vbGVhbiA9IGZhbHNlO1xyXG5cdHNwZWFraW5nOiBib29sZWFuID0gZmFsc2U7XHJcblx0c2VudGVuY2VJbmRleDogbnVtYmVyID0gLTE7XHJcblx0c2VudGVuY2VzOiBBcnJheTxzdHJpbmc+O1xyXG5cdHNwZWFraW50ZXJ2YWw6IG51bWJlcjtcclxuXHRzcGVha0FuZEFuaW1hdGVGbGFnOiBudW1iZXIgPSAxO1xyXG5cdHByaXZhdGUgc3ViOiBhbnk7XHJcblx0QXZhdGFySW1hZ2VzID0gWydqdWxpYV9mdWxsLnBuZycsJ2p1bGlhX21vdXRoX3dpZGU1LnBuZycsJ2p1bGlhX21vdXRoX3dpZGU1LnBuZycsJ2p1bGlhX21vdXRoX25hcnJvd19vLnBuZycsJ2p1bGlhX21vdXRoX3dpZGVfeS5wbmcnLFxyXG5cdCdqdWxpYV9tb3V0aF93aWRlNS5wbmcnLCdqdWxpYV9tb3V0aF93aWRlX2RfZl9rX3Jfcy5wbmcnLCdqdWxpYV9tb3V0aF9uYXJyb3dfdy5wbmcnLCdqdWxpYV9tb3V0aF9uYXJyb3dfby5wbmcnLFxyXG5cdCdqdWxpYV9tb3V0aF93aWRlX2RfZl9rX3Jfcy5wbmcnLCdqdWxpYV9tb3V0aF9uYXJyb3dfdS5wbmcnLCdqdWxpYV9tb3V0aF93aWRlNS5wbmcnLCdqdWxpYV9tb3V0aF93aWRlX2RfZl9rX3Jfcy5wbmcnLCdqdWxpYV9tb3V0aF93aWRlX3NoLnBuZycsXHJcblx0J2p1bGlhX21vdXRoX3dpZGU1LnBuZycsJ2p1bGlhX21vdXRoX3dpZGVfc2gucG5nJywnanVsaWFfbW91dGhfd2lkZV9zaC5wbmcnLCdqdWxpYV9tb3V0aF93aWRlX3RoLnBuZycsJ2p1bGlhX21vdXRoX3dpZGVfZi5wbmcnLFxyXG5cdCdqdWxpYV9tb3V0aF93aWRlX3NoLnBuZycsJ2p1bGlhX21vdXRoX3dpZGVfZF9mX2tfcl9zLnBuZycsJ2p1bGlhX21vdXRoX2Nsb3NlZC5wbmcnXTtcclxuXHRzcGVlY2hSYXRlID0gMC45O1xyXG5cdC8vIHByaXZhdGUgdGV4dDJzcGVlY2g6IFROU1RleHRUb1NwZWVjaDtcclxuXHRwcml2YXRlIHNwZWVjaDJ0ZXh0OiBTcGVlY2hSZWNvZ25pdGlvbjtcclxuXHRzcGVha09wdGlvbnMgOiBTcGVha09wdGlvbnM7XHJcbiAgICBtaWNyb3Bob25lRW5hYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgcmVjb3JkaW5nOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBsYXN0VHJhbnNjcmlwdGlvbjogc3RyaW5nID0gbnVsbDtcclxuICAgIHNwb2tlbjogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgcmVjb2duaXplZFRleHQ6IHN0cmluZztcclxuICAgIHBpdGNoOiBudW1iZXIgPSAxMDA7XHJcblx0cHJpdmF0ZSByZWNvcmRpbmdBdmFpbGFibGU6IGJvb2xlYW47XHJcblx0cHJpdmF0ZSBzcG9rZW5UZXh0OiBzdHJpbmc7XHJcblxyXG5cdGNvbnN0cnVjdG9yKHByaXZhdGUgdGV4dDJzcGVlY2g6IFROU1RleHRUb1NwZWVjaCwgcHJpdmF0ZSBwYXRoc2VydmljZTogUGF0aFNlcnZpY2UsIHByaXZhdGUgcm91dGU6IEFjdGl2YXRlZFJvdXRlLCBwcml2YXRlIHJvdXRlcjogUm91dGVyKSB7XHJcblx0XHR0aGlzLnF1ZXN0aW9ucyA9IFtdO1xyXG5cdFx0dGhpcy5xbnVtID0gMTtcclxuXHRcdHZhciB1ID0gZGVjb2RlVVJJKHJvdXRlci51cmwpO1xyXG5cdFx0dGhpcy50aXRsZSA9IHUuc3Vic3RyaW5nKHUubGFzdEluZGV4T2YoJyUyRicpKzMsIHUubGFzdEluZGV4T2YoJy4nKSk7XHJcblx0XHR0aGlzLnNwZWFrT3B0aW9ucyA9IHtcclxuXHRcdFx0dGV4dDogXCJRdWVzdGlvbiAxLCBcIixcclxuXHRcdFx0cGl0Y2g6IDEuMCxcclxuXHRcdFx0c3BlYWtSYXRlOiAwLjksXHJcblx0XHRcdHZvbHVtZTogMS4wLFxyXG5cdFx0XHRsYW5ndWFnZTpcImVuXCIsXHJcblx0XHRcdGxvY2FsZTpcImVuLVVTXCIsXHJcblx0XHRcdGZpbmlzaGVkQ2FsbGJhY2s6ICgpPT57dGhpcy5zcGVha05leHRTZW50ZW5jZSgpO31cclxuXHRcdH07XHJcblx0fVxyXG5cclxuXHRvblN3aXBlKGFyZ3M6IFN3aXBlR2VzdHVyZUV2ZW50RGF0YSkge1xyXG5cdFx0aWYgKGFyZ3MuZGlyZWN0aW9uID09IDEpIHtcdFxyXG5cdFx0XHR0aGlzLmdvTGVmdCgpO1xyXG5cdFx0fSBlbHNlIGlmIChhcmdzLmRpcmVjdGlvbiA9PSAyKSB7XHJcblx0XHRcdHRoaXMuZ29SaWdodCgpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHRnb0xlZnQoKXtcclxuXHRcdGlmICh0aGlzLnFudW0gPiAwKSB7XHRcclxuXHRcdFx0dGhpcy50ZXh0MnNwZWVjaC5wYXVzZSgpO1xyXG5cdFx0XHR0aGlzLmF2YXRhckltYWdlLm5hdGl2ZUVsZW1lbnQuc3JjID0gdGhpcy5pbWFnZVBhdGggKyB0aGlzLkF2YXRhckltYWdlc1swXTtcclxuXHRcdFx0dGhpcy5zaG93QW5zd2VyID0gZmFsc2U7XHJcblx0XHRcdHRoaXMubG9hZFF1ZXN0aW9uKHRoaXMucW51bSAtIDEpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHRnb1JpZ2h0KCl7XHJcblx0XHRpZiAodGhpcy5xbnVtIDwgdGhpcy5xdWVzdGlvbnMubGVuZ3RoIC0gMSkge1xyXG5cdFx0XHR0aGlzLnRleHQyc3BlZWNoLnBhdXNlKCk7XHJcblx0XHRcdHRoaXMuYXZhdGFySW1hZ2UubmF0aXZlRWxlbWVudC5zcmMgPSB0aGlzLmltYWdlUGF0aCArIHRoaXMuQXZhdGFySW1hZ2VzWzBdO1xyXG5cdFx0XHR0aGlzLnNob3dBbnN3ZXIgPSBmYWxzZTtcclxuXHRcdFx0dGhpcy5sb2FkUXVlc3Rpb24odGhpcy5xbnVtICsgMSk7XHJcblx0XHR9XHJcblx0fVxyXG5cdC8vbG9hZGluZyBxdWVzdGlvbiBkaXJlY3RseSBmcm9tIG5hdmlnYXRpb24gdGFiXHJcblx0bG9hZFF1ZXN0aW9uKGk6IG51bWJlcikge1xyXG5cdFx0dGhpcy5kcmF3ZXJDb21wb25lbnQuc2lkZURyYXdlci5jbG9zZURyYXdlcigpO1xyXG5cdFx0dGhpcy5xdWVzdGlvbiA9IHRoaXMucXVlc3Rpb25zW2ldO1xyXG5cdFx0dGhpcy52YXJpYWJsZSA9IHRoaXMucXVlc3Rpb24ucXVlc3Q7XHJcblx0XHRsZXQgdmFsdWUgPSB0aGlzLnZhcmlhYmxlLnJlcGxhY2UoL1xcLi9naSxcIj9cIik7XHJcblx0XHR0aGlzLnNlbnRlbmNlcyA9IHZhbHVlLnNwbGl0KFwiPyBcIik7XHJcblx0XHRmb3IodmFyIHY9MDt2PHRoaXMuc2VudGVuY2VzLmxlbmd0aDt2KyspXHJcblx0XHRcdGNvbnNvbGUubG9nKHRoaXMuc2VudGVuY2VzW3ZdKTtcclxuXHRcdGNvbnNvbGUubG9nKHRoaXMuc2VudGVuY2VzKTtcclxuXHRcdHRoaXMuc2VudGVuY2VJbmRleCA9IC0xO1xyXG5cdFx0aWYodGhpcy5zcGVha2ludGVydmFsKSBjbGVhckludGVydmFsKHRoaXMuc3BlYWtpbnRlcnZhbCk7XHJcblx0XHR0aGlzLnNwZWFraW5nID0gZmFsc2U7XHJcblx0XHR0aGlzLnNwZWFrQW5kQW5pbWF0ZUZsYWcgPSAxO1xyXG5cdFx0dGhpcy5xbnVtID0gaTtcclxuXHRcdC8vIHRoaXMuc3BlYWtUaXRsZSgpO1xyXG5cdH1cclxuXHJcblx0ZGlzcGxheUFuc3dlcigpe1xyXG5cdFx0dGhpcy5zaG93QW5zd2VyID0gIXRoaXMuc2hvd0Fuc3dlcjtcclxuXHR9XHJcblx0XHJcblx0c3BlYWtOZXh0U2VudGVuY2UoKXtcclxuXHRcdGNvbnNvbGUubG9nKFwic3BlYWtOZXh0U2VudGVuY2UgY2FsbGVkIFwiLCB0aGlzLnNwZWFrQW5kQW5pbWF0ZUZsYWcsIHRoaXMuc3BlYWtpbmcsIHRoaXMuc2VudGVuY2VJbmRleCk7XHJcblx0XHR0aGlzLnNwZWFrQW5kQW5pbWF0ZUZsYWcrKztcclxuXHRcdGlmKHRoaXMuc3BlYWtpbmcgJiYgdGhpcy5zcGVha0FuZEFuaW1hdGVGbGFnID09IDIpIHtcclxuXHRcdFx0dGhpcy5zcGVha0FuZEFuaW1hdGVGbGFnID0gMDtcclxuXHRcdFx0dGhpcy5zZW50ZW5jZUluZGV4Kys7XHJcblx0XHRcdGlmKHRoaXMuc2VudGVuY2VJbmRleDx0aGlzLnNlbnRlbmNlcy5sZW5ndGgpIHtcclxuXHRcdFx0XHR0aGlzLnNwZWFrT3B0aW9ucy50ZXh0ID0gdGhpcy5zZW50ZW5jZXNbdGhpcy5zZW50ZW5jZUluZGV4XTtcclxuXHRcdFx0XHR0aGlzLnRleHQyc3BlZWNoLnNwZWFrKHRoaXMuc3BlYWtPcHRpb25zKVxyXG5cdFx0XHRcdC50aGVuKCgpPT57XHJcblx0XHRcdFx0XHR0aGlzLmFuaW1hdGVBdmF0YXIoKTtcclxuXHRcdFx0XHRcdGNvbnNvbGUubG9nKFwiaW4gdGhlblwiKTt9LCBcclxuXHRcdFx0XHRcdChlcnIpPT57Y29uc29sZS5sb2coZXJyKTt9KTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHR0aGlzLnNlbnRlbmNlSW5kZXggPSAtMTtcclxuXHRcdFx0XHR0aGlzLnNwZWFraW5nID0gZmFsc2U7XHJcblx0XHRcdFx0dGhpcy5zcGVha0FuZEFuaW1hdGVGbGFnID0gMTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0YW5pbWF0ZUF2YXRhcigpOiB2b2lkIHtcclxuXHRcdGxldCBpID0gMDtcclxuICAgICAgICB0aGlzLnNwZWFraW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKSA9PiB7IFxyXG5cdFx0XHR0aGlzLmF2YXRhckltYWdlLm5hdGl2ZUVsZW1lbnQuc3JjID0gdGhpcy5pbWFnZVBhdGggKyB0aGlzLkF2YXRhckltYWdlc1t0aGlzLnF1ZXN0aW9uLnZpc2VtZXNbdGhpcy5zZW50ZW5jZUluZGV4XVtpXV07XHJcblx0XHRcdFxyXG4gICAgICAgICAgICBpKys7XHJcbiAgICAgICAgICAgIGlmIChpID09IHRoaXMucXVlc3Rpb24udmlzZW1lc1t0aGlzLnNlbnRlbmNlSW5kZXhdLmxlbmd0aCkge1xyXG5cdFx0XHRcdGNsZWFySW50ZXJ2YWwodGhpcy5zcGVha2ludGVydmFsKTtcclxuXHRcdFx0XHR0aGlzLnNwZWFrTmV4dFNlbnRlbmNlKCk7XHJcblx0XHRcdH1cclxuXHRcdH0sIHRoaXMuc3BlZWNoUmF0ZSo4NSk7XHJcblx0fVxyXG5cclxuXHR0ZXh0VG9TcGVlY2goKXtcclxuXHRcdC8vIHRoaXMudGV4dDJzcGVlY2gucGF1c2UoKTtcclxuXHRcdHZhciBfdGhpcyA9IHRoaXM7XHJcblx0XHR0aGlzLnNwZWFraW5nID0gdHJ1ZTtcclxuXHRcdHRoaXMuc3BlYWtOZXh0U2VudGVuY2UoKTtcclxuXHR9XHJcblxyXG5cdHNwZWFrVGV4dE9ubHkoKXtcclxuXHRcdHRoaXMudGV4dDJzcGVlY2gucGF1c2UoKTtcclxuXHRcdGxldCBvcHRpb25zOiBTcGVha09wdGlvbnMgPSB7XHJcblx0XHRcdHRleHQ6IHRoaXMucXVlc3Rpb24udGV4dCxcclxuXHRcdFx0cGl0Y2g6IDEuMCxcclxuXHRcdFx0c3BlYWtSYXRlOiAwLjksXHJcblx0XHRcdHZvbHVtZTogMS4wLFxyXG5cdFx0XHRsYW5ndWFnZTogXCJlblwiLFxyXG5cdFx0XHRsb2NhbGU6IFwiZW4tVVNcIixcclxuXHRcdFx0ZmluaXNoZWRDYWxsYmFjazogKCk9PntcclxuXHRcdFx0XHRjb25zb2xlLmxvZyhcInJlYWQgdGhlIGFuc3dlclwiKTtcclxuXHRcdFx0fVxyXG5cdFx0fTtcclxuXHRcdHRoaXMudGV4dDJzcGVlY2guc3BlYWsob3B0aW9ucyk7XHJcblx0fVxyXG4gICBcclxuXHR0b2dnbGVSZWNvcmRpbmcoKTogdm9pZCB7XHJcblx0XHR0aGlzLnJlY29yZGluZyA9ICF0aGlzLnJlY29yZGluZztcclxuXHRcdC8vIGNvbnNvbGUubG9nKHRoaXMucmVjb3JkaW5nKTtcclxuICAgICAgICBpZiAodGhpcy5yZWNvcmRpbmcpIHtcclxuXHRcdFx0Ly8gY29uc29sZS5sb2coXCJ0b2dnbGVSZWNvcmRpbmcgdHJ1ZSBwYXJ0XCIpO1xyXG5cdFx0XHR0aGlzLnNwb2tlbiA9IGZhbHNlO1xyXG4gICAgICAgICAgXHR0aGlzLmxhc3RUcmFuc2NyaXB0aW9uID0gbnVsbDtcclxuICAgICAgICAgIFx0dGhpcy5zdGFydExpc3RlbmluZygpO1xyXG5cdFx0fSBcclxuXHRcdGVsc2Uge1xyXG5cdFx0XHQvLyBjb25zb2xlLmxvZyhcInRvZ2dsZVJlY29yZGluZyB0cnVlIHBhcnRcIik7XHJcbiAgICAgICAgICBcdHRoaXMuc3RvcExpc3RlbmluZygpO1xyXG4gICAgICAgICAgXHRpZiAoIXRoaXMuc3Bva2VuICYmIHRoaXMubGFzdFRyYW5zY3JpcHRpb24gIT09IG51bGwpIHtcclxuICAgICAgICAgICAgXHRhbGVydCh0aGlzLmxhc3RUcmFuc2NyaXB0aW9uKTtcclxuICAgICAgICAgIFx0fVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG5cdHByaXZhdGUgc3RhcnRMaXN0ZW5pbmcoKTogdm9pZCB7XHJcblx0XHQvLyBjb25zb2xlLmxvZyhcIkluc2lkZSBzdGFydGxpc3RlbmluZ1wiKTtcclxuXHRcdGlmICghdGhpcy5yZWNvcmRpbmdBdmFpbGFibGUpIHtcclxuXHRcdFx0Y29uc29sZS5sb2coXCJpbnNpZGUgaWZcIik7XHJcblx0XHRcdGFsZXJ0KHtcclxuXHRcdFx0dGl0bGU6IFwiTm90IHN1cHBvcnRlZFwiLFxyXG5cdFx0XHRtZXNzYWdlOiBcIlNwZWVjaCByZWNvZ25pdGlvbiBub3Qgc3VwcG9ydGVkIG9uIHRoaXMgZGV2aWNlLiBUcnkgYSBkaWZmZXJlbnQgZGV2aWNlIHBsZWFzZS5cIixcclxuXHRcdFx0b2tCdXR0b25UZXh0OiBcIk9oLCBidW1tZXJcIlxyXG5cdFx0XHR9KTtcclxuXHRcdFx0dGhpcy5yZWNvZ25pemVkVGV4dCA9IFwiTm8gc3VwcG9ydCwgU29ycnlcIjtcclxuXHRcdFx0dGhpcy5yZWNvcmRpbmcgPSBmYWxzZTtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cdFx0Ly8gY29uc29sZS5sb2coXCJlbHNlIHBhcnRcIik7XHJcblx0XHR0aGlzLnJlY29yZGluZyA9IHRydWU7XHJcblx0XHR0aGlzLnNwZWVjaDJ0ZXh0LnN0YXJ0TGlzdGVuaW5nKHtcclxuXHRcdFx0bG9jYWxlOiBcImVuLVVTXCIsXHJcblx0XHRcdHJldHVyblBhcnRpYWxSZXN1bHRzOiB0cnVlLFxyXG5cdFx0XHRvblJlc3VsdDogKHRyYW5zY3JpcHRpb246IFNwZWVjaFJlY29nbml0aW9uVHJhbnNjcmlwdGlvbikgPT4ge1xyXG5cdFx0XHRcdC8vIHRoaXMuem9uZS5ydW4oKCkgPT4gdGhpcy5yZWNvZ25pemVkVGV4dCA9IHRyYW5zY3JpcHRpb24udGV4dCk7XHJcblx0XHRcdFx0dGhpcy5sYXN0VHJhbnNjcmlwdGlvbiA9IHRyYW5zY3JpcHRpb24udGV4dDtcclxuXHRcdFx0XHRpZiAodHJhbnNjcmlwdGlvbi5maW5pc2hlZCkge1xyXG5cdFx0XHRcdFx0dGhpcy5zcG9rZW4gPSB0cnVlO1xyXG5cdFx0XHRcdFx0c2V0VGltZW91dCgoKSA9PiBhbGVydCh0cmFuc2NyaXB0aW9uLnRleHQpLCAzMDApO1xyXG5cdFx0XHRcdFx0dGhpcy5zcG9rZW5UZXh0ID0gdHJhbnNjcmlwdGlvbi50ZXh0O1xyXG5cdFx0XHRcdFx0Ly8gYWxlcnQodHJhbnNjcmlwdGlvbi50ZXh0KTtcclxuXHRcdFx0XHRcdHRoaXMuZ2VuZXJhdGVTY29yZSgpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSxcclxuXHRcdH0pLnRoZW4oXHJcblx0XHRcdChzdGFydGVkOiBib29sZWFuKSA9PiB7Y29uc29sZS5sb2coXCJzdGFydGVkIGxpc3RlbmluZ1wiKTt9LFxyXG5cdFx0XHQoZXJyb3JNZXNzYWdlOiBzdHJpbmcpID0+IHtjb25zb2xlLmxvZyhgRXJyb3I6ICR7ZXJyb3JNZXNzYWdlfWApO31cclxuXHRcdCk7XHJcblx0fVxyXG5cclxuXHRwcml2YXRlIGdlbmVyYXRlU2NvcmUoKTogdm9pZCB7XHJcblx0XHRsZXQgc3Bva2VuU2VudGVuY2VzID0gdGhpcy5zcG9rZW5UZXh0LnNwbGl0KFwiIFwiKTtcclxuXHRcdGxldCBnaXZlblNlbnRlbmNlcyA9IHRoaXMucXVlc3Rpb24udGV4dC5zcGxpdChcIiBcIik7XHJcblx0XHRsZXQgdj0wO1xyXG5cdFx0d2hpbGUodjxnaXZlblNlbnRlbmNlcy5sZW5ndGgpe1xyXG5cdFx0XHRnaXZlblNlbnRlbmNlc1t2XS5yZXBsYWNlKCcuJywnJyk7XHJcblx0XHRcdGdpdmVuU2VudGVuY2VzW3ZdLnJlcGxhY2UoJywnLCcnKTtcclxuXHRcdFx0disrO1xyXG5cdFx0fVxyXG5cdFx0bGV0IGk9MDtcclxuXHRcdGxldCBqPTA7XHJcblx0XHRsZXQgY291bnQ9MDtcclxuXHRcdHdoaWxlKGk8c3Bva2VuU2VudGVuY2VzLmxlbmd0aCApe1xyXG5cdFx0XHR3aGlsZShqPGdpdmVuU2VudGVuY2VzLmxlbmd0aCl7XHJcblx0XHRcdFx0aWYoc3Bva2VuU2VudGVuY2VzW2ldLnRvTG93ZXJDYXNlKCkgPT0gZ2l2ZW5TZW50ZW5jZXNbal0udG9Mb3dlckNhc2UoKSl7XHJcblx0XHRcdFx0XHRjb3VudCsrO1xyXG5cdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGorKztcclxuXHRcdFx0fVxyXG5cdFx0XHRpKys7IGo9MDtcclxuXHRcdH1cclxuXHRcdGFsZXJ0KCgoY291bnQvZ2l2ZW5TZW50ZW5jZXMubGVuZ3RoKSoxMDApLnRvRml4ZWQoMikpO1xyXG5cdH1cclxuICAgIFxyXG4gICAgcHJpdmF0ZSBzdG9wTGlzdGVuaW5nKCk6IHZvaWQge1xyXG5cdFx0Ly8gY29uc29sZS5sb2coXCJzdG9wTGlzdGVuaW5nXCIpO1xyXG4gICAgICAgIHRoaXMucmVjb3JkaW5nID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5zcGVlY2gydGV4dC5zdG9wTGlzdGVuaW5nKCkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICBcdGNvbnNvbGUubG9nKFwiU3RvcHBlZCBsaXN0ZW5pbmdcIik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG5cdG5nT25Jbml0KCk6IHZvaWQge1xyXG5cdFx0dGhpcy5zcGVlY2gydGV4dCA9IG5ldyBTcGVlY2hSZWNvZ25pdGlvbigpO1xyXG4gICAgXHR0aGlzLnNwZWVjaDJ0ZXh0LmF2YWlsYWJsZSgpLnRoZW4oYXZhaWwgPT4ge1xyXG4gICAgICBcdFx0dGhpcy5yZWNvcmRpbmdBdmFpbGFibGUgPSBhdmFpbDtcclxuICAgIFx0fSk7XHJcblx0XHQvLyB0aGlzLnRleHQyc3BlZWNoID0gbmV3IFROU1RleHRUb1NwZWVjaCgpO1xyXG5cdFx0dGhpcy5zdWIgPSB0aGlzLnJvdXRlLnBhcmFtcy5zdWJzY3JpYmUocGFyYW1zID0+IHtcclxuXHRcdFx0dGhpcy5wYXRoID0gcGFyYW1zWydwYXRoJ107XHJcblx0XHRcdHRoaXMucGF0aHNlcnZpY2UuZ2V0UXVlc3Rpb25zKHRoaXMucGF0aClcclxuXHRcdFx0XHQuc3Vic2NyaWJlKFxyXG5cdFx0XHRcdFx0KGQ6IFF1ZXN0aW9uW10pID0+IHtcclxuXHRcdFx0XHRcdFx0dGhpcy5xdWVzdGlvbiA9IGRbMF07XHJcblx0XHRcdFx0XHRcdHRoaXMucXVlc3Rpb25zID0gZDtcclxuXHRcdFx0XHRcdFx0dGhpcy52YXJpYWJsZSA9IHRoaXMucXVlc3Rpb24ucXVlc3Q7XHJcblx0XHRcdFx0XHRcdHRoaXMudmFyaWFibGUucmVwbGFjZShcIi5cIixcIj9cIik7XHJcblx0XHRcdFx0XHRcdHRoaXMuc2VudGVuY2VzID0gdGhpcy52YXJpYWJsZS5zcGxpdChcIj8gXCIpO1xyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdChlcnJvcikgPT4ge1xyXG5cdFx0XHRcdFx0XHRjb25zb2xlLmxvZyhlcnJvcik7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0KVxyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHRuZ09uRGVzdHJveSgpIHtcclxuXHRcdHRoaXMuc3ViLnVuc3Vic2NyaWJlKCk7XHJcblx0fVxyXG59Il19