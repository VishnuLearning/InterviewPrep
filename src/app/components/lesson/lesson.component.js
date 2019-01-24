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
                _this.path = "~/assets/Lessons";
            //console.log(this.path);
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
        __metadata("design:paramtypes", [path_service_1.PathService, router_1.ActivatedRoute])
    ], LessonComponent);
    return LessonComponent;
}());
exports.LessonComponent = LessonComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGVzc29uLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImxlc3Nvbi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBNkQ7QUFFN0QsNERBQTBEO0FBQzFELDBDQUF5RDtBQVN6RDtJQU1DLHlCQUFvQixXQUF3QixFQUFVLEtBQXFCO1FBQXZELGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQVUsVUFBSyxHQUFMLEtBQUssQ0FBZ0I7UUFDMUUsSUFBSSxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUM7SUFDbkIsQ0FBQztJQUVELGtDQUFRLEdBQVI7UUFBQSxpQkFpQkM7UUFoQkEsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsVUFBQSxNQUFNO1lBQzVDLEtBQUksQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQzNCLElBQUksS0FBSSxDQUFDLElBQUksSUFBSSxTQUFTO2dCQUFFLEtBQUksQ0FBQyxJQUFJLEdBQUcsa0JBQWtCLENBQUM7WUFDM0QseUJBQXlCO1lBQ3pCLEtBQUksQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLEtBQUksQ0FBQyxJQUFJLENBQUM7aUJBQ3BDLFNBQVMsQ0FDVCxVQUFDLENBQVc7Z0JBQ1gsS0FBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO2dCQUNwQyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUMzQixDQUFDLEVBQ0QsVUFBQyxLQUFLO2dCQUNMLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDcEIsQ0FBQyxDQUNELENBQUE7UUFDSCxDQUFDLENBQUMsQ0FBQTtJQUVILENBQUM7SUFFRCxxQ0FBVyxHQUFYO1FBQ0MsSUFBSSxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUN4QixDQUFDO0lBL0JXLGVBQWU7UUFQM0IsZ0JBQVMsQ0FBQztZQUNWLFFBQVEsRUFBRSxXQUFXO1lBQ3JCLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixTQUFTLEVBQUUsQ0FBQywwQkFBVyxDQUFDO1lBQ3hCLFdBQVcsRUFBRSx5QkFBeUI7WUFDdEMsU0FBUyxFQUFFLENBQUMsd0JBQXdCLENBQUM7U0FDckMsQ0FBQzt5Q0FPZ0MsMEJBQVcsRUFBaUIsdUJBQWM7T0FOL0QsZUFBZSxDQWdDM0I7SUFBRCxzQkFBQztDQUFBLEFBaENELElBZ0NDO0FBaENZLDBDQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIE9uRGVzdHJveSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IFJlc3BvbnNlIH0gZnJvbSBcIkBhbmd1bGFyL2h0dHBcIjtcclxuaW1wb3J0IHsgUGF0aFNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvcGF0aC5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IFJvdXRlciwgQWN0aXZhdGVkUm91dGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5cclxuQENvbXBvbmVudCh7XHJcblx0c2VsZWN0b3I6IFwibnMtbGVzc29uXCIsXHJcblx0bW9kdWxlSWQ6IG1vZHVsZS5pZCxcclxuXHRwcm92aWRlcnM6IFtQYXRoU2VydmljZV0sXHJcblx0dGVtcGxhdGVVcmw6IFwiLi9sZXNzb24uY29tcG9uZW50Lmh0bWxcIixcclxuXHRzdHlsZVVybHM6IFsnLi9sZXNzb24uY29tcG9uZW50LmNzcyddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBMZXNzb25Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XHJcblx0cGF0aDogc3RyaW5nO1xyXG5cdGxlc3NvbnM6IGFueTtcclxuXHRwcml2YXRlIHN1YjogYW55O1xyXG5cclxuXHJcblx0Y29uc3RydWN0b3IocHJpdmF0ZSBwYXRoc2VydmljZTogUGF0aFNlcnZpY2UsIHByaXZhdGUgcm91dGU6IEFjdGl2YXRlZFJvdXRlKSB7XHJcblx0XHR0aGlzLmxlc3NvbnMgPSBbXTtcclxuXHR9XHJcblxyXG5cdG5nT25Jbml0KCk6IHZvaWQge1xyXG5cdFx0dGhpcy5zdWIgPSB0aGlzLnJvdXRlLnBhcmFtcy5zdWJzY3JpYmUocGFyYW1zID0+IHtcclxuXHRcdFx0dGhpcy5wYXRoID0gcGFyYW1zWydwYXRoJ107XHJcblx0XHRcdGlmICh0aGlzLnBhdGggPT0gdW5kZWZpbmVkKSB0aGlzLnBhdGggPSBcIn4vYXNzZXRzL0xlc3NvbnNcIjtcclxuXHRcdFx0Ly9jb25zb2xlLmxvZyh0aGlzLnBhdGgpO1xyXG5cdFx0XHR0aGlzLnBhdGhzZXJ2aWNlLmdldExlc3NvbnModGhpcy5wYXRoKVxyXG5cdFx0XHRcdC5zdWJzY3JpYmUoXHJcblx0XHRcdFx0XHQoZDogUmVzcG9uc2UpID0+IHtcclxuXHRcdFx0XHRcdFx0dGhpcy5sZXNzb25zID0gSlNPTi5wYXJzZShkLnRleHQoKSk7XHJcblx0XHRcdFx0XHRcdGNvbnNvbGUubG9nKHRoaXMubGVzc29ucyk7XHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0KGVycm9yKSA9PiB7XHJcblx0XHRcdFx0XHRcdGNvbnNvbGUubG9nKGVycm9yKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHQpXHJcblx0XHR9KVxyXG5cclxuXHR9XHJcblxyXG5cdG5nT25EZXN0cm95KCkge1xyXG5cdFx0dGhpcy5zdWIudW5zdWJzY3JpYmUoKTtcclxuXHR9XHJcbn0iXX0=