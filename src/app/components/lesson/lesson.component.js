"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var path_service_1 = require("../../services/path.service");
var router_1 = require("@angular/router");
var LessonComponent = /** @class */ (function () {
    function LessonComponent(pathservice, route) {
        this.pathservice = pathservice;
        this.route = route;
        this.lessons = [];
    }
    LessonComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sub = this.route.params.subscribe(function (params) {
            _this.path = params['path'];
            if (_this.path == undefined)
                _this.path = "~/Lessons";
            //console.log(this.path);
            _this.pathservice.getLessons(_this.path)
                .subscribe(function (d) {
                _this.lessons = JSON.parse(d.text());
                //console.log(this.lessons);
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
        __metadata("design:paramtypes", [path_service_1.PathService, router_1.ActivatedRoute])
    ], LessonComponent);
    return LessonComponent;
}());
exports.LessonComponent = LessonComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGVzc29uLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImxlc3Nvbi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBNkQ7QUFFN0QsNERBQTBEO0FBQzFELDBDQUF5RDtBQVN6RDtJQU1DLHlCQUFvQixXQUF3QixFQUFVLEtBQXFCO1FBQXZELGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQVUsVUFBSyxHQUFMLEtBQUssQ0FBZ0I7UUFDMUUsSUFBSSxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUM7SUFDbkIsQ0FBQztJQUVELGtDQUFRLEdBQVI7UUFBQSxpQkFpQkM7UUFoQkEsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsVUFBQSxNQUFNO1lBQzVDLEtBQUksQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQzNCLElBQUksS0FBSSxDQUFDLElBQUksSUFBSSxTQUFTO2dCQUFFLEtBQUksQ0FBQyxJQUFJLEdBQUcsV0FBVyxDQUFDO1lBQ3BELHlCQUF5QjtZQUN6QixLQUFJLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxLQUFJLENBQUMsSUFBSSxDQUFDO2lCQUNwQyxTQUFTLENBQ1QsVUFBQyxDQUFXO2dCQUNYLEtBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztnQkFDcEMsNEJBQTRCO1lBQzdCLENBQUMsRUFDRCxVQUFDLEtBQUs7Z0JBQ0wsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNwQixDQUFDLENBQ0QsQ0FBQTtRQUNILENBQUMsQ0FBQyxDQUFBO0lBRUgsQ0FBQztJQUVELHFDQUFXLEdBQVg7UUFDQyxJQUFJLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3hCLENBQUM7SUEvQlcsZUFBZTtRQVAzQixnQkFBUyxDQUFDO1lBQ1YsUUFBUSxFQUFFLFdBQVc7WUFDckIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFNBQVMsRUFBRSxDQUFDLDBCQUFXLENBQUM7WUFDeEIsV0FBVyxFQUFFLHlCQUF5QjtZQUN0QyxTQUFTLEVBQUUsQ0FBQyx3QkFBd0IsQ0FBQztTQUNyQyxDQUFDO3lDQU9nQywwQkFBVyxFQUFpQix1QkFBYztPQU4vRCxlQUFlLENBZ0MzQjtJQUFELHNCQUFDO0NBQUEsQUFoQ0QsSUFnQ0M7QUFoQ1ksMENBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgT25EZXN0cm95IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IFJlc3BvbnNlIH0gZnJvbSBcIkBhbmd1bGFyL2h0dHBcIjtcbmltcG9ydCB7IFBhdGhTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL3BhdGguc2VydmljZVwiO1xuaW1wb3J0IHsgUm91dGVyLCBBY3RpdmF0ZWRSb3V0ZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5cbkBDb21wb25lbnQoe1xuXHRzZWxlY3RvcjogXCJucy1sZXNzb25cIixcblx0bW9kdWxlSWQ6IG1vZHVsZS5pZCxcblx0cHJvdmlkZXJzOiBbUGF0aFNlcnZpY2VdLFxuXHR0ZW1wbGF0ZVVybDogXCIuL2xlc3Nvbi5jb21wb25lbnQuaHRtbFwiLFxuXHRzdHlsZVVybHM6IFsnLi9sZXNzb24uY29tcG9uZW50LmNzcyddXG59KVxuZXhwb3J0IGNsYXNzIExlc3NvbkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcblx0cGF0aDogc3RyaW5nO1xuXHRsZXNzb25zOiBhbnk7XG5cdHByaXZhdGUgc3ViOiBhbnk7XG5cblxuXHRjb25zdHJ1Y3Rvcihwcml2YXRlIHBhdGhzZXJ2aWNlOiBQYXRoU2VydmljZSwgcHJpdmF0ZSByb3V0ZTogQWN0aXZhdGVkUm91dGUpIHtcblx0XHR0aGlzLmxlc3NvbnMgPSBbXTtcblx0fVxuXG5cdG5nT25Jbml0KCk6IHZvaWQge1xuXHRcdHRoaXMuc3ViID0gdGhpcy5yb3V0ZS5wYXJhbXMuc3Vic2NyaWJlKHBhcmFtcyA9PiB7XG5cdFx0XHR0aGlzLnBhdGggPSBwYXJhbXNbJ3BhdGgnXTtcblx0XHRcdGlmICh0aGlzLnBhdGggPT0gdW5kZWZpbmVkKSB0aGlzLnBhdGggPSBcIn4vTGVzc29uc1wiO1xuXHRcdFx0Ly9jb25zb2xlLmxvZyh0aGlzLnBhdGgpO1xuXHRcdFx0dGhpcy5wYXRoc2VydmljZS5nZXRMZXNzb25zKHRoaXMucGF0aClcblx0XHRcdFx0LnN1YnNjcmliZShcblx0XHRcdFx0XHQoZDogUmVzcG9uc2UpID0+IHtcblx0XHRcdFx0XHRcdHRoaXMubGVzc29ucyA9IEpTT04ucGFyc2UoZC50ZXh0KCkpO1xuXHRcdFx0XHRcdFx0Ly9jb25zb2xlLmxvZyh0aGlzLmxlc3NvbnMpO1xuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0KGVycm9yKSA9PiB7XG5cdFx0XHRcdFx0XHRjb25zb2xlLmxvZyhlcnJvcik7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHQpXG5cdFx0fSlcblxuXHR9XG5cblx0bmdPbkRlc3Ryb3koKSB7XG5cdFx0dGhpcy5zdWIudW5zdWJzY3JpYmUoKTtcblx0fVxufSJdfQ==