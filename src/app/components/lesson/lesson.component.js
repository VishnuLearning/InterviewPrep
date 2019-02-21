"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var path_service_1 = require("../../services/path.service");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGVzc29uLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImxlc3Nvbi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBNkQ7QUFFN0QsNERBQTBEO0FBQzFELDBDQUF5RDtBQUN6RCx1RUFBMEU7QUFTMUU7SUFPQyx5QkFBb0IsR0FBb0IsRUFBVSxXQUF3QixFQUFVLEtBQXFCLEVBQVUsTUFBYztRQUE3RyxRQUFHLEdBQUgsR0FBRyxDQUFpQjtRQUFVLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQVUsVUFBSyxHQUFMLEtBQUssQ0FBZ0I7UUFBVSxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQ2hJLElBQUksQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxJQUFJLEdBQUMsRUFBRSxDQUFDO1FBQ2IsSUFBSSxDQUFDLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ2hELElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2hELENBQUM7SUFFRCxvQ0FBVSxHQUFWLFVBQVcsTUFBVTtRQUNwQixJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ25CLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDckIsQ0FBQztJQUVELCtCQUFLLEdBQUwsVUFBTSxNQUFVO1FBQWhCLGlCQW1CQztRQWxCQSxJQUFJLE9BQU8sR0FBRztZQUNiLElBQUksRUFBRSxNQUFNLENBQUMsSUFBSTtZQUNqQixLQUFLLEVBQUUsR0FBRztZQUNWLFNBQVMsRUFBRSxHQUFHO1lBQ2QsTUFBTSxFQUFFLEdBQUc7WUFDWCxNQUFNLEVBQUMsT0FBTztZQUNkLGdCQUFnQixFQUFFO2dCQUNqQixxQkFBcUI7Z0JBQ3JCLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxHQUFHLEdBQUcsR0FBRyxLQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ3pDLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEVBQUU7b0JBQ2xDLEtBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsWUFBWSxFQUFFLEtBQUksQ0FBQyxJQUFJLEdBQUMsR0FBRyxHQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO2lCQUNoRTtxQkFBTTtvQkFDTixLQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLFNBQVMsRUFBRSxLQUFJLENBQUMsSUFBSSxHQUFDLEdBQUcsR0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztpQkFDN0Q7WUFDRixDQUFDO1NBQ0QsQ0FBQztRQUVGLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3pCLENBQUM7SUFFRCxrQ0FBUSxHQUFSO1FBQUEsaUJBZ0JDO1FBZkEsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsVUFBQSxNQUFNO1lBQzVDLElBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQztnQkFBRSxLQUFJLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUU5QyxLQUFJLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxLQUFJLENBQUMsSUFBSSxDQUFDO2lCQUNwQyxTQUFTLENBQ1QsVUFBQyxDQUFXO2dCQUNYLEtBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztnQkFDcEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDM0IsQ0FBQyxFQUNELFVBQUMsS0FBSztnQkFDTCxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3BCLENBQUMsQ0FDRCxDQUFBO1FBQ0gsQ0FBQyxDQUFDLENBQUE7SUFFSCxDQUFDO0lBRUQscUNBQVcsR0FBWDtRQUNDLElBQUksQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDeEIsQ0FBQztJQTVEVyxlQUFlO1FBUDNCLGdCQUFTLENBQUM7WUFDVixRQUFRLEVBQUUsV0FBVztZQUNyQixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsU0FBUyxFQUFFLENBQUMsMEJBQVcsQ0FBQztZQUN4QixXQUFXLEVBQUUseUJBQXlCO1lBQ3RDLFNBQVMsRUFBRSxDQUFDLHdCQUF3QixDQUFDO1NBQ3JDLENBQUM7eUNBUXdCLDJDQUFlLEVBQXVCLDBCQUFXLEVBQWlCLHVCQUFjLEVBQWtCLGVBQU07T0FQckgsZUFBZSxDQTZEM0I7SUFBRCxzQkFBQztDQUFBLEFBN0RELElBNkRDO0FBN0RZLDBDQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIE9uRGVzdHJveSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IFJlc3BvbnNlIH0gZnJvbSBcIkBhbmd1bGFyL2h0dHBcIjtcclxuaW1wb3J0IHsgUGF0aFNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvcGF0aC5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IFJvdXRlciwgQWN0aXZhdGVkUm91dGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5pbXBvcnQgeyBUTlNUZXh0VG9TcGVlY2gsIFNwZWFrT3B0aW9ucyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtdGV4dHRvc3BlZWNoXCI7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuXHRzZWxlY3RvcjogXCJucy1sZXNzb25cIixcclxuXHRtb2R1bGVJZDogbW9kdWxlLmlkLFxyXG5cdHByb3ZpZGVyczogW1BhdGhTZXJ2aWNlXSxcclxuXHR0ZW1wbGF0ZVVybDogXCIuL2xlc3Nvbi5jb21wb25lbnQuaHRtbFwiLFxyXG5cdHN0eWxlVXJsczogWycuL2xlc3Nvbi5jb21wb25lbnQuY3NzJ11cclxufSlcclxuZXhwb3J0IGNsYXNzIExlc3NvbkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcclxuXHRwYXRoOiBzdHJpbmc7XHJcblx0bGVzc29uczogYW55O1xyXG5cdHRvcGljOiBzdHJpbmc7XHJcblx0cHJpdmF0ZSBzdWI6IGFueTtcclxuXHJcblxyXG5cdGNvbnN0cnVjdG9yKHByaXZhdGUgdHRzOiBUTlNUZXh0VG9TcGVlY2gsIHByaXZhdGUgcGF0aHNlcnZpY2U6IFBhdGhTZXJ2aWNlLCBwcml2YXRlIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSwgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlciApIHtcclxuXHRcdHRoaXMubGVzc29ucyA9IFtdO1xyXG5cdFx0dGhpcy5wYXRoPVwiXCI7XHJcblx0XHRsZXQgdSA9IGRlY29kZVVSSShyb3V0ZXIudXJsKS5yZXBsYWNlKFwiJTJGXCIsXCJcIik7XHJcblx0XHR0aGlzLnRvcGljID0gdS5zdWJzdHJpbmcodS5sYXN0SW5kZXhPZignLycpKzEpO1xyXG5cdH1cclxuXHJcblx0Z290b0xlc3NvbihsZXNzb246YW55KSB7XHJcblx0XHR0aGlzLnNwZWFrKGxlc3Nvbik7XHJcblx0XHRjb25zb2xlLmxvZyhsZXNzb24pO1xyXG5cdH1cclxuXHJcblx0c3BlYWsobGVzc29uOmFueSkge1xyXG5cdFx0bGV0IG9wdGlvbnMgPSB7XHJcblx0XHRcdHRleHQ6IGxlc3Nvbi5uYW1lLFxyXG5cdFx0XHRwaXRjaDogMS4wLFxyXG5cdFx0XHRzcGVha1JhdGU6IDAuOSxcclxuXHRcdFx0dm9sdW1lOiAxLjAsXHJcblx0XHRcdGxvY2FsZTpcImVuLVVTXCIsXHJcblx0XHRcdGZpbmlzaGVkQ2FsbGJhY2s6ICgpPT57XHJcblx0XHRcdFx0Ly9lbmFibGUgc3BlYWsgYnV0dG9uXHJcblx0XHRcdFx0Y29uc29sZS5sb2coXCJyb3V0aW5nXCIgKyBcIiBcIiArIHRoaXMucGF0aCk7XHJcblx0XHRcdFx0aWYgKGxlc3Nvbi5wYXRoLmVuZHNXaXRoKFwiLmpzb25cIikpIHtcclxuXHRcdFx0XHRcdHRoaXMucm91dGVyLm5hdmlnYXRlKFsnL3F1ZXN0aW9ucycsIHRoaXMucGF0aCsnLycrbGVzc29uLnBhdGhdKTtcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0dGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvbGVzc29uJywgdGhpcy5wYXRoKycvJytsZXNzb24ucGF0aF0pO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fTtcclxuXHRcdFxyXG5cdFx0dGhpcy50dHMuc3BlYWsob3B0aW9ucyk7XHJcblx0fVxyXG5cclxuXHRuZ09uSW5pdCgpOiB2b2lkIHtcclxuXHRcdHRoaXMuc3ViID0gdGhpcy5yb3V0ZS5wYXJhbXMuc3Vic2NyaWJlKHBhcmFtcyA9PiB7XHJcblx0XHRcdGlmKHBhcmFtc1sncGF0aCddKSB0aGlzLnBhdGggPSBwYXJhbXNbJ3BhdGgnXTtcclxuXHRcdFx0XHJcblx0XHRcdHRoaXMucGF0aHNlcnZpY2UuZ2V0TGVzc29ucyh0aGlzLnBhdGgpXHJcblx0XHRcdFx0LnN1YnNjcmliZShcclxuXHRcdFx0XHRcdChkOiBSZXNwb25zZSkgPT4ge1xyXG5cdFx0XHRcdFx0XHR0aGlzLmxlc3NvbnMgPSBKU09OLnBhcnNlKGQudGV4dCgpKTtcclxuXHRcdFx0XHRcdFx0Y29uc29sZS5sb2codGhpcy5sZXNzb25zKTtcclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHQoZXJyb3IpID0+IHtcclxuXHRcdFx0XHRcdFx0Y29uc29sZS5sb2coZXJyb3IpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdClcclxuXHRcdH0pXHJcblxyXG5cdH1cclxuXHJcblx0bmdPbkRlc3Ryb3koKSB7XHJcblx0XHR0aGlzLnN1Yi51bnN1YnNjcmliZSgpO1xyXG5cdH1cclxufSJdfQ==