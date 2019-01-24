"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var angular_1 = require("nativescript-ui-sidedrawer/angular");
var core_2 = require("@angular/core");
var path_service_1 = require("../../services/path.service");
var router_1 = require("@angular/router");
var QuestionsComponent = /** @class */ (function () {
    function QuestionsComponent(pathservice, route) {
        this.pathservice = pathservice;
        this.route = route;
        this.questions = [];
        this.qnum = 0;
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
    QuestionsComponent.prototype.loadQuestion = function (i) {
        this.question = this.questions[i];
        this.qnum = i;
    };
    QuestionsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sub = this.route.params.subscribe(function (params) {
            _this.path = params['path'];
            console.log(_this.path);
            _this.pathservice.getQuestions(_this.path)
                .subscribe(function (d) {
                _this.question = d[0];
                _this.questions = d;
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
    QuestionsComponent = __decorate([
        core_2.Component({
            selector: "Questions",
            moduleId: module.id,
            providers: [path_service_1.PathService],
            templateUrl: "./questions.component.html",
            styleUrls: ['./questions.component.css']
        }),
        __metadata("design:paramtypes", [path_service_1.PathService, router_1.ActivatedRoute])
    ], QuestionsComponent);
    return QuestionsComponent;
}());
exports.QuestionsComponent = QuestionsComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlc3Rpb25zLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInF1ZXN0aW9ucy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMEM7QUFDMUMsOERBQTRGO0FBQzVGLHNDQUE2RDtBQUU3RCw0REFBMEQ7QUFDMUQsMENBQXlEO0FBWXpEO0lBWUMsNEJBQW9CLFdBQXdCLEVBQVUsS0FBcUI7UUFBdkQsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFBVSxVQUFLLEdBQUwsS0FBSyxDQUFnQjtRQUMxRSxJQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQztRQUNwQixJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQztJQUNmLENBQUM7SUFiRCw0Q0FBZSxHQUFmO1FBQ0MsSUFBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDOUMsQ0FBQztJQWFELG9DQUFPLEdBQVAsVUFBUSxJQUEyQjtRQUNsQyxJQUFJLElBQUksQ0FBQyxTQUFTLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxFQUFFO1lBQ3pDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQztTQUNqQzthQUFNLElBQUksSUFBSSxDQUFDLFNBQVMsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDeEUsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDO1NBQ2pDO0lBQ0YsQ0FBQztJQUVELHlDQUFZLEdBQVosVUFBYSxDQUFTO1FBQ3JCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNsQyxJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQztJQUNmLENBQUM7SUFFRCxxQ0FBUSxHQUFSO1FBQUEsaUJBZ0JDO1FBZkEsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsVUFBQSxNQUFNO1lBQzVDLEtBQUksQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQzNCLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3ZCLEtBQUksQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLEtBQUksQ0FBQyxJQUFJLENBQUM7aUJBQ3RDLFNBQVMsQ0FDVCxVQUFDLENBQWE7Z0JBQ2IsS0FBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3JCLEtBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDO1lBRXBCLENBQUMsRUFDRCxVQUFDLEtBQUs7Z0JBQ0wsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNwQixDQUFDLENBQ0QsQ0FBQTtRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0osQ0FBQztJQUVELHdDQUFXLEdBQVg7UUFDQyxJQUFJLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3hCLENBQUM7SUFqRGtDO1FBQWxDLGdCQUFTLENBQUMsZ0NBQXNCLENBQUM7a0NBQXlCLGdDQUFzQjsrREFBQztJQUR0RSxrQkFBa0I7UUFSOUIsZ0JBQVMsQ0FBQztZQUNWLFFBQVEsRUFBRSxXQUFXO1lBQ3JCLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixTQUFTLEVBQUUsQ0FBQywwQkFBVyxDQUFDO1lBQ3hCLFdBQVcsRUFBRSw0QkFBNEI7WUFDekMsU0FBUyxFQUFFLENBQUMsMkJBQTJCLENBQUM7U0FDeEMsQ0FBQzt5Q0FjZ0MsMEJBQVcsRUFBaUIsdUJBQWM7T0FaL0Qsa0JBQWtCLENBbUQ5QjtJQUFELHlCQUFDO0NBQUEsQUFuREQsSUFtREM7QUFuRFksZ0RBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVmlld0NoaWxkIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgUmFkU2lkZURyYXdlckNvbXBvbmVudCwgU2lkZURyYXdlclR5cGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LXVpLXNpZGVkcmF3ZXIvYW5ndWxhclwiO1xyXG5pbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgT25EZXN0cm95IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgUmVzcG9uc2UgfSBmcm9tIFwiQGFuZ3VsYXIvaHR0cFwiO1xyXG5pbXBvcnQgeyBQYXRoU2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9wYXRoLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgUm91dGVyLCBBY3RpdmF0ZWRSb3V0ZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCB7IFF1ZXN0aW9uIH0gZnJvbSBcIi4uLy4uL2NsYXNzZXMvcXVlc3Rpb25cIjtcclxuaW1wb3J0IHsgU3dpcGVHZXN0dXJlRXZlbnREYXRhIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvZ2VzdHVyZXNcIjtcclxuXHJcbkBDb21wb25lbnQoe1xyXG5cdHNlbGVjdG9yOiBcIlF1ZXN0aW9uc1wiLFxyXG5cdG1vZHVsZUlkOiBtb2R1bGUuaWQsXHJcblx0cHJvdmlkZXJzOiBbUGF0aFNlcnZpY2VdLFxyXG5cdHRlbXBsYXRlVXJsOiBcIi4vcXVlc3Rpb25zLmNvbXBvbmVudC5odG1sXCIsXHJcblx0c3R5bGVVcmxzOiBbJy4vcXVlc3Rpb25zLmNvbXBvbmVudC5jc3MnXVxyXG59KVxyXG5cclxuZXhwb3J0IGNsYXNzIFF1ZXN0aW9uc0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcclxuXHRAVmlld0NoaWxkKFJhZFNpZGVEcmF3ZXJDb21wb25lbnQpIHB1YmxpYyBkcmF3ZXJDb21wb25lbnQ6IFJhZFNpZGVEcmF3ZXJDb21wb25lbnQ7XHJcblx0b25PcGVuRHJhd2VyVGFwKCkge1xyXG5cdFx0dGhpcy5kcmF3ZXJDb21wb25lbnQuc2lkZURyYXdlci5zaG93RHJhd2VyKCk7XHJcblx0fVxyXG5cclxuXHRwYXRoOiBzdHJpbmc7XHJcblx0cXVlc3Rpb25zOiBRdWVzdGlvbltdO1xyXG5cdHF1ZXN0aW9uOiBRdWVzdGlvbjtcclxuXHRxbnVtOiBudW1iZXI7XHJcblx0cHJpdmF0ZSBzdWI6IGFueTtcclxuXHJcblx0Y29uc3RydWN0b3IocHJpdmF0ZSBwYXRoc2VydmljZTogUGF0aFNlcnZpY2UsIHByaXZhdGUgcm91dGU6IEFjdGl2YXRlZFJvdXRlKSB7XHJcblx0XHR0aGlzLnF1ZXN0aW9ucyA9IFtdO1xyXG5cdFx0dGhpcy5xbnVtID0gMDtcclxuXHR9XHJcblxyXG5cdG9uU3dpcGUoYXJnczogU3dpcGVHZXN0dXJlRXZlbnREYXRhKSB7XHJcblx0XHRpZiAoYXJncy5kaXJlY3Rpb24gPT0gMSAmJiB0aGlzLnFudW0gPiAwKSB7XHJcblx0XHRcdHRoaXMubG9hZFF1ZXN0aW9uKHRoaXMucW51bSAtIDEpO1xyXG5cdFx0fSBlbHNlIGlmIChhcmdzLmRpcmVjdGlvbiA9PSAyICYmIHRoaXMucW51bSA8IHRoaXMucXVlc3Rpb25zLmxlbmd0aCAtIDEpIHtcclxuXHRcdFx0dGhpcy5sb2FkUXVlc3Rpb24odGhpcy5xbnVtICsgMSk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRsb2FkUXVlc3Rpb24oaTogbnVtYmVyKSB7XHJcblx0XHR0aGlzLnF1ZXN0aW9uID0gdGhpcy5xdWVzdGlvbnNbaV07XHJcblx0XHR0aGlzLnFudW0gPSBpO1xyXG5cdH1cclxuXHJcblx0bmdPbkluaXQoKTogdm9pZCB7XHJcblx0XHR0aGlzLnN1YiA9IHRoaXMucm91dGUucGFyYW1zLnN1YnNjcmliZShwYXJhbXMgPT4ge1xyXG5cdFx0XHR0aGlzLnBhdGggPSBwYXJhbXNbJ3BhdGgnXTtcclxuXHRcdFx0Y29uc29sZS5sb2codGhpcy5wYXRoKTtcclxuXHRcdFx0dGhpcy5wYXRoc2VydmljZS5nZXRRdWVzdGlvbnModGhpcy5wYXRoKVxyXG5cdFx0XHRcdC5zdWJzY3JpYmUoXHJcblx0XHRcdFx0XHQoZDogUXVlc3Rpb25bXSkgPT4ge1xyXG5cdFx0XHRcdFx0XHR0aGlzLnF1ZXN0aW9uID0gZFswXTtcclxuXHRcdFx0XHRcdFx0dGhpcy5xdWVzdGlvbnMgPSBkO1xyXG5cclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHQoZXJyb3IpID0+IHtcclxuXHRcdFx0XHRcdFx0Y29uc29sZS5sb2coZXJyb3IpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdClcclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0bmdPbkRlc3Ryb3koKSB7XHJcblx0XHR0aGlzLnN1Yi51bnN1YnNjcmliZSgpO1xyXG5cdH1cclxufSJdfQ==