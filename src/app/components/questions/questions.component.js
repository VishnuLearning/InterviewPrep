"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var angular_1 = require("nativescript-ui-sidedrawer/angular");
var core_2 = require("@angular/core");
// import { Response } from "@angular/http";
var path_service_1 = require("../../services/path.service");
var router_1 = require("@angular/router");
var nativescript_texttospeech_1 = require("nativescript-texttospeech");
// import {Slider} from "tns-core-modules/ui/slider";
var QuestionsComponent = /** @class */ (function () {
    function QuestionsComponent(tts, pathservice, route, router) {
        var _this_1 = this;
        this.tts = tts;
        this.pathservice = pathservice;
        this.route = route;
        this.router = router;
        this.imagePath = "~/assets/images/dr_sinha/";
        this.speaking = false;
        this.sentenceIndex = -1;
        this.speakAndAnimateFlag = 1;
        this.AvatarImages = ['julia_full.png', 'julia_mouth_wide5.png', 'julia_mouth_wide5.png', 'julia_mouth_narrow_o.png', 'julia_mouth_wide_y.png',
            'julia_mouth_wide5.png', 'julia_mouth_wide_d_f_k_r_s.png', 'julia_mouth_narrow_w.png', 'julia_mouth_narrow_o.png',
            'julia_mouth_wide_d_f_k_r_s.png', 'julia_mouth_narrow_u.png', 'julia_mouth_wide5.png', 'julia_mouth_wide_d_f_k_r_s.png', 'julia_mouth_wide_sh.png',
            'julia_mouth_wide5.png', 'julia_mouth_wide_sh.png', 'julia_mouth_wide_sh.png', 'julia_mouth_wide_th.png', 'julia_mouth_wide_f.png',
            'julia_mouth_wide_sh.png', 'julia_mouth_wide_d_f_k_r_s.png', 'julia_mouth_closed.png'];
        this.speechRate = 0.9;
        this.questions = [];
        this.qnum = 0;
        var u = decodeURI(router.url);
        this.title = u.substring(u.lastIndexOf('%2F') + 3, u.lastIndexOf('.'));
        this.ttsOptions = {
            text: "Question 1, ",
            pitch: 1.0,
            speakRate: 0.9,
            volume: 1.0,
            language: "en",
            locale: "en-IN",
            finishedCallback: function () { _this_1.speakNextSentence(); }
        };
    }
    QuestionsComponent.prototype.onOpenDrawerTap = function () {
        this.drawerComponent.sideDrawer.showDrawer();
    };
    QuestionsComponent.prototype.onSwipe = function (args) {
        if (args.direction == 1 && this.qnum > 0) {
            this.loadQuestion(this.qnum - 1);
        }
        else if (args.direction == 2 && this.qnum < this.questions.length - 1) {
            this.loadQuestion(this.qnum + 1);
        }
    };
    // handle value change
    // onSliderLoaded(args) {
    // 	const sliderComponent: Slider = <Slider>args.object;
    // 	sliderComponent.on("valueChange", (sargs) => {
    // 		this.speechRate = (<Slider>sargs.object).value/10;
    // 	});
    // }
    QuestionsComponent.prototype.loadQuestion = function (i) {
        this.question = this.questions[i];
        this.sentences = this.question.text.split(". ");
        console.log(this.sentences);
        this.sentenceIndex = -1;
        if (this.speakinterval)
            clearInterval(this.speakinterval);
        this.speaking = false;
        this.speakAndAnimateFlag = 1;
        this.qnum = i;
        this.speakTitle();
    };
    QuestionsComponent.prototype.speakNextSentence = function () {
        var _this_1 = this;
        console.log("speakNextSentence called ", this.speakAndAnimateFlag, this.speaking, this.sentenceIndex);
        this.speakAndAnimateFlag++;
        if (this.speaking && this.speakAndAnimateFlag == 2) {
            this.speakAndAnimateFlag = 0;
            this.sentenceIndex++;
            if (this.sentenceIndex < this.sentences.length) {
                this.ttsOptions.text = this.sentences[this.sentenceIndex];
                this.tts.speak(this.ttsOptions)
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
        var _this = this;
        // this.tts.getAvailableLanguages()
        // .then(function(res) {
        // 	console.log(res);
        // })
        // .catch(function(error){
        // 	console.log(error);
        // });
        // start speaking. This will do two things. speak a sentence and animate.
        // when both end, it should call a function
        this.speaking = true;
        this.speakNextSentence();
    };
    QuestionsComponent.prototype.speakTitle = function () {
        var options = {
            text: "Question " + String(this.qnum + 1) + ", " + this.question.title,
            pitch: 1.0,
            speakRate: 0.9,
            volume: 1.0,
            language: "en",
            locale: "en-IN",
            finishedCallback: function () {
                console.log("intro done");
            }
        };
        this.tts.speak(options);
    };
    QuestionsComponent.prototype.ngOnInit = function () {
        var _this_1 = this;
        this.sub = this.route.params.subscribe(function (params) {
            _this_1.path = params['path'];
            _this_1.pathservice.getQuestions(_this_1.path)
                .subscribe(function (d) {
                _this_1.question = d[0];
                _this_1.questions = d;
                _this_1.sentences = _this_1.question.text.split(". ");
                _this_1.speakTitle();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlc3Rpb25zLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInF1ZXN0aW9ucy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBc0Q7QUFDdEQsOERBQTRGO0FBQzVGLHNDQUE2RDtBQUM3RCw0Q0FBNEM7QUFDNUMsNERBQTBEO0FBQzFELDBDQUF5RDtBQUd6RCx1RUFBMEU7QUFDMUUscURBQXFEO0FBVXJEO0lBK0JDLDRCQUFvQixHQUFvQixFQUFVLFdBQXdCLEVBQVUsS0FBcUIsRUFBVSxNQUFjO1FBQWpJLG1CQWNDO1FBZG1CLFFBQUcsR0FBSCxHQUFHLENBQWlCO1FBQVUsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFBVSxVQUFLLEdBQUwsS0FBSyxDQUFnQjtRQUFVLFdBQU0sR0FBTixNQUFNLENBQVE7UUF0QmpJLGNBQVMsR0FBVywyQkFBMkIsQ0FBQztRQU1oRCxhQUFRLEdBQVksS0FBSyxDQUFDO1FBQzFCLGtCQUFhLEdBQVcsQ0FBQyxDQUFDLENBQUM7UUFHM0Isd0JBQW1CLEdBQVcsQ0FBQyxDQUFDO1FBSWhDLGlCQUFZLEdBQUcsQ0FBQyxnQkFBZ0IsRUFBQyx1QkFBdUIsRUFBQyx1QkFBdUIsRUFBQywwQkFBMEIsRUFBQyx3QkFBd0I7WUFDcEksdUJBQXVCLEVBQUMsZ0NBQWdDLEVBQUMsMEJBQTBCLEVBQUMsMEJBQTBCO1lBQzlHLGdDQUFnQyxFQUFDLDBCQUEwQixFQUFDLHVCQUF1QixFQUFDLGdDQUFnQyxFQUFDLHlCQUF5QjtZQUM5SSx1QkFBdUIsRUFBQyx5QkFBeUIsRUFBQyx5QkFBeUIsRUFBQyx5QkFBeUIsRUFBQyx3QkFBd0I7WUFDOUgseUJBQXlCLEVBQUMsZ0NBQWdDLEVBQUMsd0JBQXdCLENBQUMsQ0FBQztRQUVyRixlQUFVLEdBQUcsR0FBRyxDQUFDO1FBR2hCLElBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FB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SSxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3JCLE9BQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDO2dCQUNuQixPQUFJLENBQUMsU0FBUyxHQUFHLE9BQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDaEQsT0FBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1lBQ25CLENBQUMsRUFDRCxVQUFDLEtBQUs7Z0JBQ0wsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNwQixDQUFDLENBQ0QsQ0FBQTtRQUNILENBQUMsQ0FBQyxDQUFDO0lBR0osQ0FBQztJQUVELHdDQUFXLEdBQVg7UUFDQyxJQUFJLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3hCLENBQUM7SUFuS2tDO1FBQWxDLGdCQUFTLENBQUMsZ0NBQXNCLENBQUM7a0NBQXlCLGdDQUFzQjsrREFBQztJQUM3RDtRQUFwQixnQkFBUyxDQUFDLFFBQVEsQ0FBQztrQ0FBYSxpQkFBVTsyREFBQztJQUZoQyxrQkFBa0I7UUFSOUIsZ0JBQVMsQ0FBQztZQUNWLFFBQVEsRUFBRSxXQUFXO1lBQ3JCLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixTQUFTLEVBQUUsQ0FBQywwQkFBVyxDQUFDO1lBQ3hCLFdBQVcsRUFBRSw0QkFBNEI7WUFDekMsU0FBUyxFQUFFLENBQUMsMkJBQTJCLENBQUM7U0FDeEMsQ0FBQzt5Q0FpQ3dCLDJDQUFlLEVBQXVCLDBCQUFXLEVBQWlCLHVCQUFjLEVBQWtCLGVBQU07T0EvQnJILGtCQUFrQixDQXFLOUI7SUFBRCx5QkFBQztDQUFBLEFBcktELElBcUtDO0FBcktZLGdEQUFrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFZpZXdDaGlsZCwgRWxlbWVudFJlZiB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IFJhZFNpZGVEcmF3ZXJDb21wb25lbnQsIFNpZGVEcmF3ZXJUeXBlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC11aS1zaWRlZHJhd2VyL2FuZ3VsYXJcIjtcclxuaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIE9uRGVzdHJveSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbi8vIGltcG9ydCB7IFJlc3BvbnNlIH0gZnJvbSBcIkBhbmd1bGFyL2h0dHBcIjtcclxuaW1wb3J0IHsgUGF0aFNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvcGF0aC5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IFJvdXRlciwgQWN0aXZhdGVkUm91dGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5pbXBvcnQgeyBRdWVzdGlvbiB9IGZyb20gXCIuLi8uLi9jbGFzc2VzL3F1ZXN0aW9uXCI7XHJcbmltcG9ydCB7IFN3aXBlR2VzdHVyZUV2ZW50RGF0YSB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2dlc3R1cmVzXCI7XHJcbmltcG9ydCB7IFROU1RleHRUb1NwZWVjaCwgU3BlYWtPcHRpb25zIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC10ZXh0dG9zcGVlY2hcIjtcclxuLy8gaW1wb3J0IHtTbGlkZXJ9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL3NsaWRlclwiO1xyXG5cclxuQENvbXBvbmVudCh7XHJcblx0c2VsZWN0b3I6IFwiUXVlc3Rpb25zXCIsXHJcblx0bW9kdWxlSWQ6IG1vZHVsZS5pZCxcclxuXHRwcm92aWRlcnM6IFtQYXRoU2VydmljZV0sXHJcblx0dGVtcGxhdGVVcmw6IFwiLi9xdWVzdGlvbnMuY29tcG9uZW50Lmh0bWxcIixcclxuXHRzdHlsZVVybHM6IFsnLi9xdWVzdGlvbnMuY29tcG9uZW50LmNzcyddXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgUXVlc3Rpb25zQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xyXG5cdEBWaWV3Q2hpbGQoUmFkU2lkZURyYXdlckNvbXBvbmVudCkgcHVibGljIGRyYXdlckNvbXBvbmVudDogUmFkU2lkZURyYXdlckNvbXBvbmVudDtcclxuXHRAVmlld0NoaWxkKFwiYXZhdGFyXCIpIGF2YXRhckltYWdlOkVsZW1lbnRSZWY7XHJcblx0XHJcblx0b25PcGVuRHJhd2VyVGFwKCkge1xyXG5cdFx0dGhpcy5kcmF3ZXJDb21wb25lbnQuc2lkZURyYXdlci5zaG93RHJhd2VyKCk7XHJcblx0fVxyXG5cclxuXHRwYXRoOiBzdHJpbmc7XHJcblx0aW1hZ2VQYXRoOiBzdHJpbmcgPSBcIn4vYXNzZXRzL2ltYWdlcy9kcl9zaW5oYS9cIjtcclxuXHRxdWVzdGlvbnM6IFF1ZXN0aW9uW107XHJcblx0cXVlc3Rpb246IFF1ZXN0aW9uO1xyXG5cdHFudW06IG51bWJlcjtcclxuXHR0aXRsZTpzdHJpbmc7XHJcblx0XHJcblx0c3BlYWtpbmc6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHRzZW50ZW5jZUluZGV4OiBudW1iZXIgPSAtMTtcclxuXHRzZW50ZW5jZXM6IEFycmF5PHN0cmluZz47XHJcblx0c3BlYWtpbnRlcnZhbDogbnVtYmVyO1xyXG5cdHNwZWFrQW5kQW5pbWF0ZUZsYWc6IG51bWJlciA9IDE7XHJcblxyXG5cdHByaXZhdGUgc3ViOiBhbnk7XHJcblx0dHRzT3B0aW9uczogU3BlYWtPcHRpb25zO1xyXG5cdEF2YXRhckltYWdlcyA9IFsnanVsaWFfZnVsbC5wbmcnLCdqdWxpYV9tb3V0aF93aWRlNS5wbmcnLCdqdWxpYV9tb3V0aF93aWRlNS5wbmcnLCdqdWxpYV9tb3V0aF9uYXJyb3dfby5wbmcnLCdqdWxpYV9tb3V0aF93aWRlX3kucG5nJyxcclxuXHQnanVsaWFfbW91dGhfd2lkZTUucG5nJywnanVsaWFfbW91dGhfd2lkZV9kX2Zfa19yX3MucG5nJywnanVsaWFfbW91dGhfbmFycm93X3cucG5nJywnanVsaWFfbW91dGhfbmFycm93X28ucG5nJyxcclxuXHQnanVsaWFfbW91dGhfd2lkZV9kX2Zfa19yX3MucG5nJywnanVsaWFfbW91dGhfbmFycm93X3UucG5nJywnanVsaWFfbW91dGhfd2lkZTUucG5nJywnanVsaWFfbW91dGhfd2lkZV9kX2Zfa19yX3MucG5nJywnanVsaWFfbW91dGhfd2lkZV9zaC5wbmcnLFxyXG5cdCdqdWxpYV9tb3V0aF93aWRlNS5wbmcnLCdqdWxpYV9tb3V0aF93aWRlX3NoLnBuZycsJ2p1bGlhX21vdXRoX3dpZGVfc2gucG5nJywnanVsaWFfbW91dGhfd2lkZV90aC5wbmcnLCdqdWxpYV9tb3V0aF93aWRlX2YucG5nJyxcclxuXHQnanVsaWFfbW91dGhfd2lkZV9zaC5wbmcnLCdqdWxpYV9tb3V0aF93aWRlX2RfZl9rX3Jfcy5wbmcnLCdqdWxpYV9tb3V0aF9jbG9zZWQucG5nJ107XHJcblxyXG5cdHNwZWVjaFJhdGUgPSAwLjk7XHJcblxyXG5cdGNvbnN0cnVjdG9yKHByaXZhdGUgdHRzOiBUTlNUZXh0VG9TcGVlY2gsIHByaXZhdGUgcGF0aHNlcnZpY2U6IFBhdGhTZXJ2aWNlLCBwcml2YXRlIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSwgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlcikge1xyXG5cdFx0dGhpcy5xdWVzdGlvbnMgPSBbXTtcclxuXHRcdHRoaXMucW51bSA9IDA7XHJcblx0XHR2YXIgdSA9IGRlY29kZVVSSShyb3V0ZXIudXJsKTtcclxuXHRcdHRoaXMudGl0bGUgPSB1LnN1YnN0cmluZyh1Lmxhc3RJbmRleE9mKCclMkYnKSszLCB1Lmxhc3RJbmRleE9mKCcuJykpO1xyXG5cdFx0dGhpcy50dHNPcHRpb25zID0ge1xyXG5cdFx0XHR0ZXh0OiBcIlF1ZXN0aW9uIDEsIFwiLFxyXG5cdFx0XHRwaXRjaDogMS4wLFxyXG5cdFx0XHRzcGVha1JhdGU6IDAuOSxcclxuXHRcdFx0dm9sdW1lOiAxLjAsXHJcblx0XHRcdGxhbmd1YWdlOlwiZW5cIixcclxuXHRcdFx0bG9jYWxlOlwiZW4tSU5cIixcclxuXHRcdFx0ZmluaXNoZWRDYWxsYmFjazogKCk9Pnt0aGlzLnNwZWFrTmV4dFNlbnRlbmNlKCk7fVxyXG5cdFx0fTtcclxuXHR9XHJcblxyXG5cdG9uU3dpcGUoYXJnczogU3dpcGVHZXN0dXJlRXZlbnREYXRhKSB7XHJcblx0XHRpZiAoYXJncy5kaXJlY3Rpb24gPT0gMSAmJiB0aGlzLnFudW0gPiAwKSB7XHJcblx0XHRcdHRoaXMubG9hZFF1ZXN0aW9uKHRoaXMucW51bSAtIDEpO1xyXG5cdFx0fSBlbHNlIGlmIChhcmdzLmRpcmVjdGlvbiA9PSAyICYmIHRoaXMucW51bSA8IHRoaXMucXVlc3Rpb25zLmxlbmd0aCAtIDEpIHtcclxuXHRcdFx0dGhpcy5sb2FkUXVlc3Rpb24odGhpcy5xbnVtICsgMSk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvLyBoYW5kbGUgdmFsdWUgY2hhbmdlXHJcblx0Ly8gb25TbGlkZXJMb2FkZWQoYXJncykge1xyXG5cdC8vIFx0Y29uc3Qgc2xpZGVyQ29tcG9uZW50OiBTbGlkZXIgPSA8U2xpZGVyPmFyZ3Mub2JqZWN0O1xyXG5cdC8vIFx0c2xpZGVyQ29tcG9uZW50Lm9uKFwidmFsdWVDaGFuZ2VcIiwgKHNhcmdzKSA9PiB7XHJcblx0Ly8gXHRcdHRoaXMuc3BlZWNoUmF0ZSA9ICg8U2xpZGVyPnNhcmdzLm9iamVjdCkudmFsdWUvMTA7XHJcblx0Ly8gXHR9KTtcclxuXHQvLyB9XHJcblxyXG5cdGxvYWRRdWVzdGlvbihpOiBudW1iZXIpIHtcclxuXHRcdHRoaXMucXVlc3Rpb24gPSB0aGlzLnF1ZXN0aW9uc1tpXTtcclxuXHRcdHRoaXMuc2VudGVuY2VzID0gdGhpcy5xdWVzdGlvbi50ZXh0LnNwbGl0KFwiLiBcIik7XHJcblx0XHRjb25zb2xlLmxvZyh0aGlzLnNlbnRlbmNlcyk7XHJcblx0XHR0aGlzLnNlbnRlbmNlSW5kZXggPSAtMTtcclxuXHRcdGlmKHRoaXMuc3BlYWtpbnRlcnZhbCkgY2xlYXJJbnRlcnZhbCh0aGlzLnNwZWFraW50ZXJ2YWwpO1xyXG5cdFx0dGhpcy5zcGVha2luZyA9IGZhbHNlO1xyXG5cdFx0dGhpcy5zcGVha0FuZEFuaW1hdGVGbGFnID0gMTtcclxuXHRcdHRoaXMucW51bSA9IGk7XHJcblx0XHR0aGlzLnNwZWFrVGl0bGUoKTtcclxuXHR9XHJcblxyXG5cdFxyXG5cdFxyXG5cdHNwZWFrTmV4dFNlbnRlbmNlKCl7XHJcblx0XHRjb25zb2xlLmxvZyhcInNwZWFrTmV4dFNlbnRlbmNlIGNhbGxlZCBcIiwgdGhpcy5zcGVha0FuZEFuaW1hdGVGbGFnLCB0aGlzLnNwZWFraW5nLCB0aGlzLnNlbnRlbmNlSW5kZXgpO1xyXG5cdFx0dGhpcy5zcGVha0FuZEFuaW1hdGVGbGFnKys7XHJcblx0XHRpZih0aGlzLnNwZWFraW5nICYmIHRoaXMuc3BlYWtBbmRBbmltYXRlRmxhZyA9PSAyKSB7XHJcblx0XHRcdHRoaXMuc3BlYWtBbmRBbmltYXRlRmxhZyA9IDA7XHJcblx0XHRcdHRoaXMuc2VudGVuY2VJbmRleCsrO1xyXG5cdFx0XHRpZih0aGlzLnNlbnRlbmNlSW5kZXg8dGhpcy5zZW50ZW5jZXMubGVuZ3RoKSB7XHJcblx0XHRcdFx0dGhpcy50dHNPcHRpb25zLnRleHQgPSB0aGlzLnNlbnRlbmNlc1t0aGlzLnNlbnRlbmNlSW5kZXhdO1xyXG5cdFx0XHRcdHRoaXMudHRzLnNwZWFrKHRoaXMudHRzT3B0aW9ucylcclxuXHRcdFx0XHQudGhlbigoKT0+e1xyXG5cdFx0XHRcdFx0dGhpcy5hbmltYXRlQXZhdGFyKCk7XHJcblx0XHRcdFx0XHRjb25zb2xlLmxvZyhcImluIHRoZW5cIik7fSwgXHJcblx0XHRcdFx0XHQoZXJyKT0+e2NvbnNvbGUubG9nKGVycik7fSk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0dGhpcy5zZW50ZW5jZUluZGV4ID0gLTE7XHJcblx0XHRcdFx0dGhpcy5zcGVha2luZyA9IGZhbHNlO1xyXG5cdFx0XHRcdHRoaXMuc3BlYWtBbmRBbmltYXRlRmxhZyA9IDE7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGFuaW1hdGVBdmF0YXIoKTogdm9pZCB7XHJcblx0XHRsZXQgaSA9IDA7XHJcbiAgICAgICAgdGhpcy5zcGVha2ludGVydmFsID0gc2V0SW50ZXJ2YWwoKCkgPT4geyBcclxuXHRcdFx0dGhpcy5hdmF0YXJJbWFnZS5uYXRpdmVFbGVtZW50LnNyYyA9IHRoaXMuaW1hZ2VQYXRoICsgdGhpcy5BdmF0YXJJbWFnZXNbdGhpcy5xdWVzdGlvbi52aXNlbWVzW3RoaXMuc2VudGVuY2VJbmRleF1baV1dO1xyXG5cdFx0XHRcclxuICAgICAgICAgICAgaSsrO1xyXG4gICAgICAgICAgICBpZiAoaSA9PSB0aGlzLnF1ZXN0aW9uLnZpc2VtZXNbdGhpcy5zZW50ZW5jZUluZGV4XS5sZW5ndGgpIHtcclxuXHRcdFx0XHRjbGVhckludGVydmFsKHRoaXMuc3BlYWtpbnRlcnZhbCk7XHJcblx0XHRcdFx0dGhpcy5zcGVha05leHRTZW50ZW5jZSgpO1xyXG5cdFx0XHR9XHJcblx0XHR9LCB0aGlzLnNwZWVjaFJhdGUqODUpO1xyXG5cdH1cclxuXHJcblx0dGV4dFRvU3BlZWNoKCl7XHJcblx0XHR2YXIgX3RoaXMgPSB0aGlzO1xyXG5cdFx0Ly8gdGhpcy50dHMuZ2V0QXZhaWxhYmxlTGFuZ3VhZ2VzKClcclxuXHRcdC8vIC50aGVuKGZ1bmN0aW9uKHJlcykge1xyXG5cdFx0Ly8gXHRjb25zb2xlLmxvZyhyZXMpO1xyXG5cdFx0Ly8gfSlcclxuXHRcdC8vIC5jYXRjaChmdW5jdGlvbihlcnJvcil7XHJcblx0XHQvLyBcdGNvbnNvbGUubG9nKGVycm9yKTtcclxuXHRcdC8vIH0pO1xyXG5cdFx0Ly8gc3RhcnQgc3BlYWtpbmcuIFRoaXMgd2lsbCBkbyB0d28gdGhpbmdzLiBzcGVhayBhIHNlbnRlbmNlIGFuZCBhbmltYXRlLlxyXG5cdFx0Ly8gd2hlbiBib3RoIGVuZCwgaXQgc2hvdWxkIGNhbGwgYSBmdW5jdGlvblxyXG5cdFx0dGhpcy5zcGVha2luZyA9IHRydWU7XHJcblx0XHR0aGlzLnNwZWFrTmV4dFNlbnRlbmNlKCk7XHJcblx0fVxyXG5cclxuXHRzcGVha1RpdGxlKCkge1xyXG5cdFx0bGV0IG9wdGlvbnMgPSB7XHJcblx0XHRcdHRleHQ6IFwiUXVlc3Rpb24gXCIgKyBTdHJpbmcodGhpcy5xbnVtKzEpICsgXCIsIFwiICsgdGhpcy5xdWVzdGlvbi50aXRsZSxcclxuXHRcdFx0cGl0Y2g6IDEuMCxcclxuXHRcdFx0c3BlYWtSYXRlOiAwLjksXHJcblx0XHRcdHZvbHVtZTogMS4wLFxyXG5cdFx0XHRsYW5ndWFnZTpcImVuXCIsXHJcblx0XHRcdGxvY2FsZTpcImVuLUlOXCIsXHJcblx0XHRcdGZpbmlzaGVkQ2FsbGJhY2s6ICgpPT57XHJcblx0XHRcdFx0Y29uc29sZS5sb2coXCJpbnRybyBkb25lXCIpO1xyXG5cdFx0XHR9XHJcblx0XHR9O1xyXG5cdFx0XHJcblx0XHR0aGlzLnR0cy5zcGVhayhvcHRpb25zKTtcclxuXHR9XHJcblxyXG5cdG5nT25Jbml0KCk6IHZvaWQge1xyXG5cdFx0dGhpcy5zdWIgPSB0aGlzLnJvdXRlLnBhcmFtcy5zdWJzY3JpYmUocGFyYW1zID0+IHtcclxuXHRcdFx0dGhpcy5wYXRoID0gcGFyYW1zWydwYXRoJ107XHJcblx0XHRcdHRoaXMucGF0aHNlcnZpY2UuZ2V0UXVlc3Rpb25zKHRoaXMucGF0aClcclxuXHRcdFx0XHQuc3Vic2NyaWJlKFxyXG5cdFx0XHRcdFx0KGQ6IFF1ZXN0aW9uW10pID0+IHtcclxuXHRcdFx0XHRcdFx0dGhpcy5xdWVzdGlvbiA9IGRbMF07XHJcblx0XHRcdFx0XHRcdHRoaXMucXVlc3Rpb25zID0gZDtcclxuXHRcdFx0XHRcdFx0dGhpcy5zZW50ZW5jZXMgPSB0aGlzLnF1ZXN0aW9uLnRleHQuc3BsaXQoXCIuIFwiKTtcclxuXHRcdFx0XHRcdFx0dGhpcy5zcGVha1RpdGxlKCk7XHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0KGVycm9yKSA9PiB7XHJcblx0XHRcdFx0XHRcdGNvbnNvbGUubG9nKGVycm9yKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHQpXHJcblx0XHR9KTtcclxuXHJcblx0XHRcclxuXHR9XHJcblxyXG5cdG5nT25EZXN0cm95KCkge1xyXG5cdFx0dGhpcy5zdWIudW5zdWJzY3JpYmUoKTtcclxuXHR9XHJcbn0iXX0=