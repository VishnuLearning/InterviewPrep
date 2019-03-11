"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var path_service_1 = require("../../services/path/path.service");
var router_1 = require("@angular/router");
var nativescript_texttospeech_1 = require("nativescript-texttospeech");
var LessonComponent = /** @class */ (function () {
    function LessonComponent(tts, pathservice, route, router) {
        this.tts = tts;
        this.pathservice = pathservice;
        this.route = route;
        this.router = router;
        this.lessons = [];
        this.path = "";
        var u = decodeURI(router.url).replace("%2F", "");
        this.topic = u.substring(u.lastIndexOf('/') + 1);
    }
    LessonComponent.prototype.gotoLesson = function (lesson) {
        this.speak(lesson);
        console.log(lesson);
    };
    LessonComponent.prototype.speak = function (lesson) {
        var _this = this;
        var options = {
            text: lesson.name,
            pitch: 1.0,
            speakRate: 0.9,
            volume: 1.0,
            locale: "en-US",
            finishedCallback: function () {
                //enable speak button
                console.log("routing" + " " + _this.path);
                if (lesson.path.endsWith(".json")) {
                    _this.router.navigate(['/questions', _this.path + '/' + lesson.path]);
                }
                else {
                    _this.router.navigate(['/lesson', _this.path + '/' + lesson.path]);
                }
            }
        };
        this.tts.speak(options);
    };
    LessonComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sub = this.route.params.subscribe(function (params) {
            if (params['path'])
                _this.path = params['path'];
            _this.pathservice.getLessons(_this.path)
                .subscribe(function (d) {
                _this.lessons = JSON.parse(d.text());
                console.log(_this.lessons);
            }, function (error) {
                console.log(error);
            });
        });
    };
    LessonComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    LessonComponent = __decorate([
        core_1.Component({
            selector: "ns-lesson",
            moduleId: module.id,
            providers: [path_service_1.PathService],
            templateUrl: "./lesson.component.html",
            styleUrls: ['./lesson.component.css']
        }),
        __metadata("design:paramtypes", [nativescript_texttospeech_1.TNSTextToSpeech, path_service_1.PathService, router_1.ActivatedRoute, router_1.Router])
    ], LessonComponent);
    return LessonComponent;
}());
exports.LessonComponent = LessonComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGVzc29uLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImxlc3Nvbi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBNkQ7QUFFN0QsaUVBQStEO0FBQy9ELDBDQUF5RDtBQUN6RCx1RUFBMEU7QUFTMUU7SUFPQyx5QkFBb0IsR0FBb0IsRUFBVSxXQUF3QixFQUFVLEtBQXFCLEVBQVUsTUFBYztRQUE3RyxRQUFHLEdBQUgsR0FBRyxDQUFpQjtRQUFVLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQVUsVUFBSyxHQUFMLEtBQUssQ0FBZ0I7UUFBVSxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQ2hJLElBQUksQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxJQUFJLEdBQUMsRUFBRSxDQUFDO1FBQ2IsSUFBSSxDQUFDLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ2hELElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2hELENBQUM7SUFFRCxvQ0FBVSxHQUFWLFVBQVcsTUFBVTtRQUNwQixJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ25CLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDckIsQ0FBQztJQUVELCtCQUFLLEdBQUwsVUFBTSxNQUFVO1FBQWhCLGlCQW1CQztRQWxCQSxJQUFJLE9BQU8sR0FBRztZQUNiLElBQUksRUFBRSxNQUFNLENBQUMsSUFBSTtZQUNqQixLQUFLLEVBQUUsR0FBRztZQUNWLFNBQVMsRUFBRSxHQUFHO1lBQ2QsTUFBTSxFQUFFLEdBQUc7WUFDWCxNQUFNLEVBQUMsT0FBTztZQUNkLGdCQUFnQixFQUFFO2dCQUNqQixxQkFBcUI7Z0JBQ3JCLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxHQUFHLEdBQUcsR0FBRyxLQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ3pDLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEVBQUU7b0JBQ2xDLEtBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsWUFBWSxFQUFFLEtBQUksQ0FBQyxJQUFJLEdBQUMsR0FBRyxHQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO2lCQUNoRTtxQkFBTTtvQkFDTixLQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLFNBQVMsRUFBRSxLQUFJLENBQUMsSUFBSSxHQUFDLEdBQUcsR0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztpQkFDN0Q7WUFDRixDQUFDO1NBQ0QsQ0FBQztRQUVGLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3pCLENBQUM7SUFFRCxrQ0FBUSxHQUFSO1FBQUEsaUJBZ0JDO1FBZkEsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsVUFBQSxNQUFNO1lBQzVDLElBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQztnQkFBRSxLQUFJLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUU5QyxLQUFJLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxLQUFJLENBQUMsSUFBSSxDQUFDO2lCQUNwQyxTQUFTLENBQ1QsVUFBQyxDQUFXO2dCQUNYLEtBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztnQkFDcEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDM0IsQ0FBQyxFQUNELFVBQUMsS0FBSztnQkFDTCxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3BCLENBQUMsQ0FDRCxDQUFBO1FBQ0gsQ0FBQyxDQUFDLENBQUE7SUFFSCxDQUFDO0lBRUQscUNBQVcsR0FBWDtRQUNDLElBQUksQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDeEIsQ0FBQztJQTVEVyxlQUFlO1FBUDNCLGdCQUFTLENBQUM7WUFDVixRQUFRLEVBQUUsV0FBVztZQUNyQixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsU0FBUyxFQUFFLENBQUMsMEJBQVcsQ0FBQztZQUN4QixXQUFXLEVBQUUseUJBQXlCO1lBQ3RDLFNBQVMsRUFBRSxDQUFDLHdCQUF3QixDQUFDO1NBQ3JDLENBQUM7eUNBUXdCLDJDQUFlLEVBQXVCLDBCQUFXLEVBQWlCLHVCQUFjLEVBQWtCLGVBQU07T0FQckgsZUFBZSxDQTZEM0I7SUFBRCxzQkFBQztDQUFBLEFBN0RELElBNkRDO0FBN0RZLDBDQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIE9uRGVzdHJveSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IFJlc3BvbnNlIH0gZnJvbSBcIkBhbmd1bGFyL2h0dHBcIjtcclxuaW1wb3J0IHsgUGF0aFNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvcGF0aC9wYXRoLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgUm91dGVyLCBBY3RpdmF0ZWRSb3V0ZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCB7IFROU1RleHRUb1NwZWVjaCwgU3BlYWtPcHRpb25zIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC10ZXh0dG9zcGVlY2hcIjtcclxuXHJcbkBDb21wb25lbnQoe1xyXG5cdHNlbGVjdG9yOiBcIm5zLWxlc3NvblwiLFxyXG5cdG1vZHVsZUlkOiBtb2R1bGUuaWQsXHJcblx0cHJvdmlkZXJzOiBbUGF0aFNlcnZpY2VdLFxyXG5cdHRlbXBsYXRlVXJsOiBcIi4vbGVzc29uLmNvbXBvbmVudC5odG1sXCIsXHJcblx0c3R5bGVVcmxzOiBbJy4vbGVzc29uLmNvbXBvbmVudC5jc3MnXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgTGVzc29uQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xyXG5cdHBhdGg6IHN0cmluZztcclxuXHRsZXNzb25zOiBhbnk7XHJcblx0dG9waWM6IHN0cmluZztcclxuXHRwcml2YXRlIHN1YjogYW55O1xyXG5cclxuXHJcblx0Y29uc3RydWN0b3IocHJpdmF0ZSB0dHM6IFROU1RleHRUb1NwZWVjaCwgcHJpdmF0ZSBwYXRoc2VydmljZTogUGF0aFNlcnZpY2UsIHByaXZhdGUgcm91dGU6IEFjdGl2YXRlZFJvdXRlLCBwcml2YXRlIHJvdXRlcjogUm91dGVyICkge1xyXG5cdFx0dGhpcy5sZXNzb25zID0gW107XHJcblx0XHR0aGlzLnBhdGg9XCJcIjtcclxuXHRcdGxldCB1ID0gZGVjb2RlVVJJKHJvdXRlci51cmwpLnJlcGxhY2UoXCIlMkZcIixcIlwiKTtcclxuXHRcdHRoaXMudG9waWMgPSB1LnN1YnN0cmluZyh1Lmxhc3RJbmRleE9mKCcvJykrMSk7XHJcblx0fVxyXG5cclxuXHRnb3RvTGVzc29uKGxlc3NvbjphbnkpIHtcclxuXHRcdHRoaXMuc3BlYWsobGVzc29uKTtcclxuXHRcdGNvbnNvbGUubG9nKGxlc3Nvbik7XHJcblx0fVxyXG5cclxuXHRzcGVhayhsZXNzb246YW55KSB7XHJcblx0XHRsZXQgb3B0aW9ucyA9IHtcclxuXHRcdFx0dGV4dDogbGVzc29uLm5hbWUsXHJcblx0XHRcdHBpdGNoOiAxLjAsXHJcblx0XHRcdHNwZWFrUmF0ZTogMC45LFxyXG5cdFx0XHR2b2x1bWU6IDEuMCxcclxuXHRcdFx0bG9jYWxlOlwiZW4tVVNcIixcclxuXHRcdFx0ZmluaXNoZWRDYWxsYmFjazogKCk9PntcclxuXHRcdFx0XHQvL2VuYWJsZSBzcGVhayBidXR0b25cclxuXHRcdFx0XHRjb25zb2xlLmxvZyhcInJvdXRpbmdcIiArIFwiIFwiICsgdGhpcy5wYXRoKTtcclxuXHRcdFx0XHRpZiAobGVzc29uLnBhdGguZW5kc1dpdGgoXCIuanNvblwiKSkge1xyXG5cdFx0XHRcdFx0dGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvcXVlc3Rpb25zJywgdGhpcy5wYXRoKycvJytsZXNzb24ucGF0aF0pO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHR0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy9sZXNzb24nLCB0aGlzLnBhdGgrJy8nK2xlc3Nvbi5wYXRoXSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9O1xyXG5cdFx0XHJcblx0XHR0aGlzLnR0cy5zcGVhayhvcHRpb25zKTtcclxuXHR9XHJcblxyXG5cdG5nT25Jbml0KCk6IHZvaWQge1xyXG5cdFx0dGhpcy5zdWIgPSB0aGlzLnJvdXRlLnBhcmFtcy5zdWJzY3JpYmUocGFyYW1zID0+IHtcclxuXHRcdFx0aWYocGFyYW1zWydwYXRoJ10pIHRoaXMucGF0aCA9IHBhcmFtc1sncGF0aCddO1xyXG5cdFx0XHRcclxuXHRcdFx0dGhpcy5wYXRoc2VydmljZS5nZXRMZXNzb25zKHRoaXMucGF0aClcclxuXHRcdFx0XHQuc3Vic2NyaWJlKFxyXG5cdFx0XHRcdFx0KGQ6IFJlc3BvbnNlKSA9PiB7XHJcblx0XHRcdFx0XHRcdHRoaXMubGVzc29ucyA9IEpTT04ucGFyc2UoZC50ZXh0KCkpO1xyXG5cdFx0XHRcdFx0XHRjb25zb2xlLmxvZyh0aGlzLmxlc3NvbnMpO1xyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdChlcnJvcikgPT4ge1xyXG5cdFx0XHRcdFx0XHRjb25zb2xlLmxvZyhlcnJvcik7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0KVxyXG5cdFx0fSlcclxuXHJcblx0fVxyXG5cclxuXHRuZ09uRGVzdHJveSgpIHtcclxuXHRcdHRoaXMuc3ViLnVuc3Vic2NyaWJlKCk7XHJcblx0fVxyXG59Il19