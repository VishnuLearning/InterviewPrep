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
            language: "en",
            locale: "en-IN",
            finishedCallback: function () {
                //enable speak button
                console.log("routing");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGVzc29uLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImxlc3Nvbi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBNkQ7QUFFN0QsNERBQTBEO0FBQzFELDBDQUF5RDtBQUN6RCx1RUFBMEU7QUFTMUU7SUFPQyx5QkFBb0IsR0FBb0IsRUFBVSxXQUF3QixFQUFVLEtBQXFCLEVBQVUsTUFBYztRQUE3RyxRQUFHLEdBQUgsR0FBRyxDQUFpQjtRQUFVLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQVUsVUFBSyxHQUFMLEtBQUssQ0FBZ0I7UUFBVSxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQ2hJLElBQUksQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxJQUFJLEdBQUMsRUFBRSxDQUFDO1FBQ2IsSUFBSSxDQUFDLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ2hELElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2hELENBQUM7SUFFRCxvQ0FBVSxHQUFWLFVBQVcsTUFBVTtRQUNwQixJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ25CLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDckIsQ0FBQztJQUVELCtCQUFLLEdBQUwsVUFBTSxNQUFVO1FBQWhCLGlCQW9CQztRQW5CQSxJQUFJLE9BQU8sR0FBRztZQUNiLElBQUksRUFBRSxNQUFNLENBQUMsSUFBSTtZQUNqQixLQUFLLEVBQUUsR0FBRztZQUNWLFNBQVMsRUFBRSxHQUFHO1lBQ2QsTUFBTSxFQUFFLEdBQUc7WUFDWCxRQUFRLEVBQUMsSUFBSTtZQUNiLE1BQU0sRUFBQyxPQUFPO1lBQ2QsZ0JBQWdCLEVBQUU7Z0JBQ2pCLHFCQUFxQjtnQkFDckIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFDdkIsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsRUFBRTtvQkFDbEMsS0FBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxZQUFZLEVBQUUsS0FBSSxDQUFDLElBQUksR0FBQyxHQUFHLEdBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7aUJBQ2hFO3FCQUFNO29CQUNOLEtBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsU0FBUyxFQUFFLEtBQUksQ0FBQyxJQUFJLEdBQUMsR0FBRyxHQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO2lCQUM3RDtZQUNGLENBQUM7U0FDRCxDQUFDO1FBRUYsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDekIsQ0FBQztJQUVELGtDQUFRLEdBQVI7UUFBQSxpQkFnQkM7UUFmQSxJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxVQUFBLE1BQU07WUFDNUMsSUFBRyxNQUFNLENBQUMsTUFBTSxDQUFDO2dCQUFFLEtBQUksQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBRTlDLEtBQUksQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLEtBQUksQ0FBQyxJQUFJLENBQUM7aUJBQ3BDLFNBQVMsQ0FDVCxVQUFDLENBQVc7Z0JBQ1gsS0FBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO2dCQUNwQyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUMzQixDQUFDLEVBQ0QsVUFBQyxLQUFLO2dCQUNMLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDcEIsQ0FBQyxDQUNELENBQUE7UUFDSCxDQUFDLENBQUMsQ0FBQTtJQUVILENBQUM7SUFFRCxxQ0FBVyxHQUFYO1FBQ0MsSUFBSSxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUN4QixDQUFDO0lBN0RXLGVBQWU7UUFQM0IsZ0JBQVMsQ0FBQztZQUNWLFFBQVEsRUFBRSxXQUFXO1lBQ3JCLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixTQUFTLEVBQUUsQ0FBQywwQkFBVyxDQUFDO1lBQ3hCLFdBQVcsRUFBRSx5QkFBeUI7WUFDdEMsU0FBUyxFQUFFLENBQUMsd0JBQXdCLENBQUM7U0FDckMsQ0FBQzt5Q0FRd0IsMkNBQWUsRUFBdUIsMEJBQVcsRUFBaUIsdUJBQWMsRUFBa0IsZUFBTTtPQVBySCxlQUFlLENBOEQzQjtJQUFELHNCQUFDO0NBQUEsQUE5REQsSUE4REM7QUE5RFksMENBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgT25EZXN0cm95IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgUmVzcG9uc2UgfSBmcm9tIFwiQGFuZ3VsYXIvaHR0cFwiO1xyXG5pbXBvcnQgeyBQYXRoU2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9wYXRoLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgUm91dGVyLCBBY3RpdmF0ZWRSb3V0ZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCB7IFROU1RleHRUb1NwZWVjaCwgU3BlYWtPcHRpb25zIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC10ZXh0dG9zcGVlY2hcIjtcclxuXHJcbkBDb21wb25lbnQoe1xyXG5cdHNlbGVjdG9yOiBcIm5zLWxlc3NvblwiLFxyXG5cdG1vZHVsZUlkOiBtb2R1bGUuaWQsXHJcblx0cHJvdmlkZXJzOiBbUGF0aFNlcnZpY2VdLFxyXG5cdHRlbXBsYXRlVXJsOiBcIi4vbGVzc29uLmNvbXBvbmVudC5odG1sXCIsXHJcblx0c3R5bGVVcmxzOiBbJy4vbGVzc29uLmNvbXBvbmVudC5jc3MnXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgTGVzc29uQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xyXG5cdHBhdGg6IHN0cmluZztcclxuXHRsZXNzb25zOiBhbnk7XHJcblx0dG9waWM6IHN0cmluZztcclxuXHRwcml2YXRlIHN1YjogYW55O1xyXG5cclxuXHJcblx0Y29uc3RydWN0b3IocHJpdmF0ZSB0dHM6IFROU1RleHRUb1NwZWVjaCwgcHJpdmF0ZSBwYXRoc2VydmljZTogUGF0aFNlcnZpY2UsIHByaXZhdGUgcm91dGU6IEFjdGl2YXRlZFJvdXRlLCBwcml2YXRlIHJvdXRlcjogUm91dGVyICkge1xyXG5cdFx0dGhpcy5sZXNzb25zID0gW107XHJcblx0XHR0aGlzLnBhdGg9XCJcIjtcclxuXHRcdGxldCB1ID0gZGVjb2RlVVJJKHJvdXRlci51cmwpLnJlcGxhY2UoXCIlMkZcIixcIlwiKTtcclxuXHRcdHRoaXMudG9waWMgPSB1LnN1YnN0cmluZyh1Lmxhc3RJbmRleE9mKCcvJykrMSk7XHJcblx0fVxyXG5cclxuXHRnb3RvTGVzc29uKGxlc3NvbjphbnkpIHtcclxuXHRcdHRoaXMuc3BlYWsobGVzc29uKTtcclxuXHRcdGNvbnNvbGUubG9nKGxlc3Nvbik7XHJcblx0fVxyXG5cclxuXHRzcGVhayhsZXNzb246YW55KSB7XHJcblx0XHRsZXQgb3B0aW9ucyA9IHtcclxuXHRcdFx0dGV4dDogbGVzc29uLm5hbWUsXHJcblx0XHRcdHBpdGNoOiAxLjAsXHJcblx0XHRcdHNwZWFrUmF0ZTogMC45LFxyXG5cdFx0XHR2b2x1bWU6IDEuMCxcclxuXHRcdFx0bGFuZ3VhZ2U6XCJlblwiLFxyXG5cdFx0XHRsb2NhbGU6XCJlbi1JTlwiLFxyXG5cdFx0XHRmaW5pc2hlZENhbGxiYWNrOiAoKT0+e1xyXG5cdFx0XHRcdC8vZW5hYmxlIHNwZWFrIGJ1dHRvblxyXG5cdFx0XHRcdGNvbnNvbGUubG9nKFwicm91dGluZ1wiKTtcclxuXHRcdFx0XHRpZiAobGVzc29uLnBhdGguZW5kc1dpdGgoXCIuanNvblwiKSkge1xyXG5cdFx0XHRcdFx0dGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvcXVlc3Rpb25zJywgdGhpcy5wYXRoKycvJytsZXNzb24ucGF0aF0pO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHR0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy9sZXNzb24nLCB0aGlzLnBhdGgrJy8nK2xlc3Nvbi5wYXRoXSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9O1xyXG5cdFx0XHJcblx0XHR0aGlzLnR0cy5zcGVhayhvcHRpb25zKTtcclxuXHR9XHJcblxyXG5cdG5nT25Jbml0KCk6IHZvaWQge1xyXG5cdFx0dGhpcy5zdWIgPSB0aGlzLnJvdXRlLnBhcmFtcy5zdWJzY3JpYmUocGFyYW1zID0+IHtcclxuXHRcdFx0aWYocGFyYW1zWydwYXRoJ10pIHRoaXMucGF0aCA9IHBhcmFtc1sncGF0aCddO1xyXG5cdFx0XHRcclxuXHRcdFx0dGhpcy5wYXRoc2VydmljZS5nZXRMZXNzb25zKHRoaXMucGF0aClcclxuXHRcdFx0XHQuc3Vic2NyaWJlKFxyXG5cdFx0XHRcdFx0KGQ6IFJlc3BvbnNlKSA9PiB7XHJcblx0XHRcdFx0XHRcdHRoaXMubGVzc29ucyA9IEpTT04ucGFyc2UoZC50ZXh0KCkpO1xyXG5cdFx0XHRcdFx0XHRjb25zb2xlLmxvZyh0aGlzLmxlc3NvbnMpO1xyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdChlcnJvcikgPT4ge1xyXG5cdFx0XHRcdFx0XHRjb25zb2xlLmxvZyhlcnJvcik7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0KVxyXG5cdFx0fSlcclxuXHJcblx0fVxyXG5cclxuXHRuZ09uRGVzdHJveSgpIHtcclxuXHRcdHRoaXMuc3ViLnVuc3Vic2NyaWJlKCk7XHJcblx0fVxyXG59Il19