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
                console.log("inside finishedCallBack");
            }
        };
        this.tts.speak(options)
            .then(function () {
            console.log("inside then");
            if (lesson.path.endsWith(".json")) {
                console.log('/questions' + _this.path + '/' + lesson.path);
                _this.router.navigate(['/questions', _this.path + '/' + lesson.path]);
            }
            else {
                console.log('/lessons' + _this.path + '/' + lesson.path);
                _this.router.navigate(['/lesson', _this.path + '/' + lesson.path]);
            }
        });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGVzc29uLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImxlc3Nvbi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBNkQ7QUFFN0QsaUVBQStEO0FBQy9ELDBDQUF5RDtBQUN6RCx1RUFBMEU7QUFTMUU7SUFPQyx5QkFBb0IsR0FBb0IsRUFBVSxXQUF3QixFQUFVLEtBQXFCLEVBQVUsTUFBYztRQUE3RyxRQUFHLEdBQUgsR0FBRyxDQUFpQjtRQUFVLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQVUsVUFBSyxHQUFMLEtBQUssQ0FBZ0I7UUFBVSxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQ2hJLElBQUksQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxJQUFJLEdBQUMsRUFBRSxDQUFDO1FBQ2IsSUFBSSxDQUFDLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ2hELElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2hELENBQUM7SUFFRCxvQ0FBVSxHQUFWLFVBQVcsTUFBVTtRQUNwQixJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ25CLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDckIsQ0FBQztJQUVELCtCQUFLLEdBQUwsVUFBTSxNQUFVO1FBQWhCLGlCQXdCQztRQXZCQSxJQUFJLE9BQU8sR0FBRztZQUNiLElBQUksRUFBRSxNQUFNLENBQUMsSUFBSTtZQUNqQixLQUFLLEVBQUUsR0FBRztZQUNWLFNBQVMsRUFBRSxHQUFHO1lBQ2QsTUFBTSxFQUFFLEdBQUc7WUFDWCxNQUFNLEVBQUMsT0FBTztZQUNkLGdCQUFnQixFQUFFO2dCQUNqQixxQkFBcUI7Z0JBQ3JCLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxHQUFHLEdBQUcsR0FBRyxLQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ3pDLE9BQU8sQ0FBQyxHQUFHLENBQUMseUJBQXlCLENBQUMsQ0FBQztZQUN4QyxDQUFDO1NBQ0QsQ0FBQztRQUNGLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQzthQUN0QixJQUFJLENBQUM7WUFDTCxPQUFPLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBQzNCLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEVBQUU7Z0JBQ2xDLE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxHQUFDLEtBQUksQ0FBQyxJQUFJLEdBQUMsR0FBRyxHQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDcEQsS0FBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxZQUFZLEVBQUUsS0FBSSxDQUFDLElBQUksR0FBQyxHQUFHLEdBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7YUFDaEU7aUJBQU07Z0JBQ04sT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLEdBQUMsS0FBSSxDQUFDLElBQUksR0FBQyxHQUFHLEdBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNsRCxLQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLFNBQVMsRUFBRSxLQUFJLENBQUMsSUFBSSxHQUFDLEdBQUcsR0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQzthQUM3RDtRQUNGLENBQUMsQ0FBQyxDQUFDO0lBQ0osQ0FBQztJQUVELGtDQUFRLEdBQVI7UUFBQSxpQkFnQkM7UUFmQSxJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxVQUFBLE1BQU07WUFDNUMsSUFBRyxNQUFNLENBQUMsTUFBTSxDQUFDO2dCQUFFLEtBQUksQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBRTlDLEtBQUksQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLEtBQUksQ0FBQyxJQUFJLENBQUM7aUJBQ3BDLFNBQVMsQ0FDVCxVQUFDLENBQVc7Z0JBQ1gsS0FBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO2dCQUNwQyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUMzQixDQUFDLEVBQ0QsVUFBQyxLQUFLO2dCQUNMLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDcEIsQ0FBQyxDQUNELENBQUE7UUFDSCxDQUFDLENBQUMsQ0FBQTtJQUVILENBQUM7SUFFRCxxQ0FBVyxHQUFYO1FBQ0MsSUFBSSxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUN4QixDQUFDO0lBakVXLGVBQWU7UUFQM0IsZ0JBQVMsQ0FBQztZQUNWLFFBQVEsRUFBRSxXQUFXO1lBQ3JCLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixTQUFTLEVBQUUsQ0FBQywwQkFBVyxDQUFDO1lBQ3hCLFdBQVcsRUFBRSx5QkFBeUI7WUFDdEMsU0FBUyxFQUFFLENBQUMsd0JBQXdCLENBQUM7U0FDckMsQ0FBQzt5Q0FRd0IsMkNBQWUsRUFBdUIsMEJBQVcsRUFBaUIsdUJBQWMsRUFBa0IsZUFBTTtPQVBySCxlQUFlLENBa0UzQjtJQUFELHNCQUFDO0NBQUEsQUFsRUQsSUFrRUM7QUFsRVksMENBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgT25EZXN0cm95IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgUmVzcG9uc2UgfSBmcm9tIFwiQGFuZ3VsYXIvaHR0cFwiO1xyXG5pbXBvcnQgeyBQYXRoU2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9wYXRoL3BhdGguc2VydmljZVwiO1xyXG5pbXBvcnQgeyBSb3V0ZXIsIEFjdGl2YXRlZFJvdXRlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHsgVE5TVGV4dFRvU3BlZWNoLCBTcGVha09wdGlvbnMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LXRleHR0b3NwZWVjaFwiO1xyXG5cclxuQENvbXBvbmVudCh7XHJcblx0c2VsZWN0b3I6IFwibnMtbGVzc29uXCIsXHJcblx0bW9kdWxlSWQ6IG1vZHVsZS5pZCxcclxuXHRwcm92aWRlcnM6IFtQYXRoU2VydmljZV0sXHJcblx0dGVtcGxhdGVVcmw6IFwiLi9sZXNzb24uY29tcG9uZW50Lmh0bWxcIixcclxuXHRzdHlsZVVybHM6IFsnLi9sZXNzb24uY29tcG9uZW50LmNzcyddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBMZXNzb25Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XHJcblx0cGF0aDogc3RyaW5nO1xyXG5cdGxlc3NvbnM6IGFueTtcclxuXHR0b3BpYzogc3RyaW5nO1xyXG5cdHByaXZhdGUgc3ViOiBhbnk7XHJcblxyXG5cclxuXHRjb25zdHJ1Y3Rvcihwcml2YXRlIHR0czogVE5TVGV4dFRvU3BlZWNoLCBwcml2YXRlIHBhdGhzZXJ2aWNlOiBQYXRoU2VydmljZSwgcHJpdmF0ZSByb3V0ZTogQWN0aXZhdGVkUm91dGUsIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIgKSB7XHJcblx0XHR0aGlzLmxlc3NvbnMgPSBbXTtcclxuXHRcdHRoaXMucGF0aD1cIlwiO1xyXG5cdFx0bGV0IHUgPSBkZWNvZGVVUkkocm91dGVyLnVybCkucmVwbGFjZShcIiUyRlwiLFwiXCIpO1xyXG5cdFx0dGhpcy50b3BpYyA9IHUuc3Vic3RyaW5nKHUubGFzdEluZGV4T2YoJy8nKSsxKTtcclxuXHR9XHJcblxyXG5cdGdvdG9MZXNzb24obGVzc29uOmFueSkge1xyXG5cdFx0dGhpcy5zcGVhayhsZXNzb24pO1xyXG5cdFx0Y29uc29sZS5sb2cobGVzc29uKTtcclxuXHR9XHJcbiBcclxuXHRzcGVhayhsZXNzb246YW55KSB7XHJcblx0XHRsZXQgb3B0aW9ucyA9IHtcclxuXHRcdFx0dGV4dDogbGVzc29uLm5hbWUsXHJcblx0XHRcdHBpdGNoOiAxLjAsXHJcblx0XHRcdHNwZWFrUmF0ZTogMC45LFxyXG5cdFx0XHR2b2x1bWU6IDEuMCxcclxuXHRcdFx0bG9jYWxlOlwiZW4tVVNcIixcclxuXHRcdFx0ZmluaXNoZWRDYWxsYmFjazogKCk9PntcclxuXHRcdFx0XHQvL2VuYWJsZSBzcGVhayBidXR0b25cclxuXHRcdFx0XHRjb25zb2xlLmxvZyhcInJvdXRpbmdcIiArIFwiIFwiICsgdGhpcy5wYXRoKTtcclxuXHRcdFx0XHRjb25zb2xlLmxvZyhcImluc2lkZSBmaW5pc2hlZENhbGxCYWNrXCIpO1xyXG5cdFx0XHR9XHJcblx0XHR9O1xyXG5cdFx0dGhpcy50dHMuc3BlYWsob3B0aW9ucylcclxuXHRcdC50aGVuKCgpID0+IHtcclxuXHRcdFx0Y29uc29sZS5sb2coXCJpbnNpZGUgdGhlblwiKTtcclxuXHRcdFx0aWYgKGxlc3Nvbi5wYXRoLmVuZHNXaXRoKFwiLmpzb25cIikpIHtcclxuXHRcdFx0XHRjb25zb2xlLmxvZygnL3F1ZXN0aW9ucycrdGhpcy5wYXRoKycvJytsZXNzb24ucGF0aCk7XHJcblx0XHRcdFx0dGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvcXVlc3Rpb25zJywgdGhpcy5wYXRoKycvJytsZXNzb24ucGF0aF0pO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdGNvbnNvbGUubG9nKCcvbGVzc29ucycrdGhpcy5wYXRoKycvJytsZXNzb24ucGF0aCk7XHJcblx0XHRcdFx0dGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvbGVzc29uJywgdGhpcy5wYXRoKycvJytsZXNzb24ucGF0aF0pO1xyXG5cdFx0XHR9XHJcblx0XHR9KTsgXHJcblx0fVxyXG5cclxuXHRuZ09uSW5pdCgpOiB2b2lkIHtcclxuXHRcdHRoaXMuc3ViID0gdGhpcy5yb3V0ZS5wYXJhbXMuc3Vic2NyaWJlKHBhcmFtcyA9PiB7XHJcblx0XHRcdGlmKHBhcmFtc1sncGF0aCddKSB0aGlzLnBhdGggPSBwYXJhbXNbJ3BhdGgnXTtcclxuXHRcdFx0XHJcblx0XHRcdHRoaXMucGF0aHNlcnZpY2UuZ2V0TGVzc29ucyh0aGlzLnBhdGgpXHJcblx0XHRcdFx0LnN1YnNjcmliZShcclxuXHRcdFx0XHRcdChkOiBSZXNwb25zZSkgPT4ge1xyXG5cdFx0XHRcdFx0XHR0aGlzLmxlc3NvbnMgPSBKU09OLnBhcnNlKGQudGV4dCgpKTtcclxuXHRcdFx0XHRcdFx0Y29uc29sZS5sb2codGhpcy5sZXNzb25zKTtcclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHQoZXJyb3IpID0+IHtcclxuXHRcdFx0XHRcdFx0Y29uc29sZS5sb2coZXJyb3IpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdClcclxuXHRcdH0pXHJcblxyXG5cdH1cclxuXHJcblx0bmdPbkRlc3Ryb3koKSB7XHJcblx0XHR0aGlzLnN1Yi51bnN1YnNjcmliZSgpO1xyXG5cdH1cclxufSJdfQ==