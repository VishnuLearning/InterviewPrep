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
            // this.pathservice.getQuestions(this.path)
            // 	.subscribe(
            // 		(d: Question[]) => {
            // 			this.question = d[0];
            // 			this.questions = d;
            // 		},
            // 		(error) => {
            // 			console.log(error);
            // 		}
            // 	)
            _this.pathservice.getQuestions2(_this.path)
                .subscribe(function (d) {
                var x = JSON.parse(d.text()).data;
                console.log(x);
                _this.questions = [];
                _this.question = _this.questions[0];
            }, function (error) {
                console.log(error);
            });
        });
        console.log(this.questions);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlc3Rpb25zLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInF1ZXN0aW9ucy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMEM7QUFDMUMsOERBQTRGO0FBQzVGLHNDQUE2RDtBQUU3RCw0REFBMEQ7QUFDMUQsMENBQXlEO0FBWXpEO0lBWUMsNEJBQW9CLFdBQXdCLEVBQVUsS0FBcUI7UUFBdkQsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFBVSxVQUFLLEdBQUwsS0FBSyxDQUFnQjtRQUMxRSxJQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQztRQUNwQixJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQztJQUNmLENBQUM7SUFiRCw0Q0FBZSxHQUFmO1FBQ0MsSUFBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDOUMsQ0FBQztJQWFELG9DQUFPLEdBQVAsVUFBUSxJQUEyQjtRQUNsQyxJQUFJLElBQUksQ0FBQyxTQUFTLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxFQUFFO1lBQ3pDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQztTQUNqQzthQUFNLElBQUksSUFBSSxDQUFDLFNBQVMsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDeEUsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDO1NBQ2pDO0lBQ0YsQ0FBQztJQUVELHlDQUFZLEdBQVosVUFBYSxDQUFTO1FBQ3JCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNsQyxJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQztJQUNmLENBQUM7SUFFRCxxQ0FBUSxHQUFSO1FBQUEsaUJBNkJDO1FBNUJBLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLFVBQUEsTUFBTTtZQUM1QyxLQUFJLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUMzQixPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN2QiwyQ0FBMkM7WUFDM0MsZUFBZTtZQUNmLHlCQUF5QjtZQUN6QiwyQkFBMkI7WUFDM0IseUJBQXlCO1lBRXpCLE9BQU87WUFDUCxpQkFBaUI7WUFDakIseUJBQXlCO1lBQ3pCLE1BQU07WUFDTixLQUFLO1lBQ0wsS0FBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsS0FBSSxDQUFDLElBQUksQ0FBQztpQkFDdkMsU0FBUyxDQUNULFVBQUMsQ0FBVztnQkFDWCxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQztnQkFDbEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDZixLQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQztnQkFDcEIsS0FBSSxDQUFDLFFBQVEsR0FBQyxLQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2pDLENBQUMsRUFDRCxVQUFDLEtBQUs7Z0JBQ0wsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNwQixDQUFDLENBQ0QsQ0FBQTtRQUNILENBQUMsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDN0IsQ0FBQztJQUVELHdDQUFXLEdBQVg7UUFDQyxJQUFJLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3hCLENBQUM7SUE5RGtDO1FBQWxDLGdCQUFTLENBQUMsZ0NBQXNCLENBQUM7a0NBQXlCLGdDQUFzQjsrREFBQztJQUR0RSxrQkFBa0I7UUFSOUIsZ0JBQVMsQ0FBQztZQUNWLFFBQVEsRUFBRSxXQUFXO1lBQ3JCLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixTQUFTLEVBQUUsQ0FBQywwQkFBVyxDQUFDO1lBQ3hCLFdBQVcsRUFBRSw0QkFBNEI7WUFDekMsU0FBUyxFQUFFLENBQUMsMkJBQTJCLENBQUM7U0FDeEMsQ0FBQzt5Q0FjZ0MsMEJBQVcsRUFBaUIsdUJBQWM7T0FaL0Qsa0JBQWtCLENBZ0U5QjtJQUFELHlCQUFDO0NBQUEsQUFoRUQsSUFnRUM7QUFoRVksZ0RBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVmlld0NoaWxkIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgUmFkU2lkZURyYXdlckNvbXBvbmVudCwgU2lkZURyYXdlclR5cGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LXVpLXNpZGVkcmF3ZXIvYW5ndWxhclwiO1xyXG5pbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgT25EZXN0cm95IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgUmVzcG9uc2UgfSBmcm9tIFwiQGFuZ3VsYXIvaHR0cFwiO1xyXG5pbXBvcnQgeyBQYXRoU2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9wYXRoLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgUm91dGVyLCBBY3RpdmF0ZWRSb3V0ZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCB7IFF1ZXN0aW9uIH0gZnJvbSBcIi4uLy4uL2NsYXNzZXMvcXVlc3Rpb25cIjtcclxuaW1wb3J0IHsgU3dpcGVHZXN0dXJlRXZlbnREYXRhIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvZ2VzdHVyZXNcIjtcclxuXHJcbkBDb21wb25lbnQoe1xyXG5cdHNlbGVjdG9yOiBcIlF1ZXN0aW9uc1wiLFxyXG5cdG1vZHVsZUlkOiBtb2R1bGUuaWQsXHJcblx0cHJvdmlkZXJzOiBbUGF0aFNlcnZpY2VdLFxyXG5cdHRlbXBsYXRlVXJsOiBcIi4vcXVlc3Rpb25zLmNvbXBvbmVudC5odG1sXCIsXHJcblx0c3R5bGVVcmxzOiBbJy4vcXVlc3Rpb25zLmNvbXBvbmVudC5jc3MnXVxyXG59KVxyXG5cclxuZXhwb3J0IGNsYXNzIFF1ZXN0aW9uc0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcclxuXHRAVmlld0NoaWxkKFJhZFNpZGVEcmF3ZXJDb21wb25lbnQpIHB1YmxpYyBkcmF3ZXJDb21wb25lbnQ6IFJhZFNpZGVEcmF3ZXJDb21wb25lbnQ7XHJcblx0b25PcGVuRHJhd2VyVGFwKCkge1xyXG5cdFx0dGhpcy5kcmF3ZXJDb21wb25lbnQuc2lkZURyYXdlci5zaG93RHJhd2VyKCk7XHJcblx0fVxyXG5cclxuXHRwYXRoOiBzdHJpbmc7XHJcblx0cXVlc3Rpb25zOiBhbnk7XHJcblx0cXVlc3Rpb246IFF1ZXN0aW9uO1xyXG5cdHFudW06IG51bWJlcjtcclxuXHRwcml2YXRlIHN1YjogYW55O1xyXG5cclxuXHRjb25zdHJ1Y3Rvcihwcml2YXRlIHBhdGhzZXJ2aWNlOiBQYXRoU2VydmljZSwgcHJpdmF0ZSByb3V0ZTogQWN0aXZhdGVkUm91dGUpIHtcclxuXHRcdHRoaXMucXVlc3Rpb25zID0gW107XHJcblx0XHR0aGlzLnFudW0gPSAwO1xyXG5cdH1cclxuXHJcblx0b25Td2lwZShhcmdzOiBTd2lwZUdlc3R1cmVFdmVudERhdGEpIHtcclxuXHRcdGlmIChhcmdzLmRpcmVjdGlvbiA9PSAxICYmIHRoaXMucW51bSA+IDApIHtcclxuXHRcdFx0dGhpcy5sb2FkUXVlc3Rpb24odGhpcy5xbnVtIC0gMSk7XHJcblx0XHR9IGVsc2UgaWYgKGFyZ3MuZGlyZWN0aW9uID09IDIgJiYgdGhpcy5xbnVtIDwgdGhpcy5xdWVzdGlvbnMubGVuZ3RoIC0gMSkge1xyXG5cdFx0XHR0aGlzLmxvYWRRdWVzdGlvbih0aGlzLnFudW0gKyAxKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGxvYWRRdWVzdGlvbihpOiBudW1iZXIpIHtcclxuXHRcdHRoaXMucXVlc3Rpb24gPSB0aGlzLnF1ZXN0aW9uc1tpXTtcclxuXHRcdHRoaXMucW51bSA9IGk7XHJcblx0fVxyXG5cclxuXHRuZ09uSW5pdCgpOiB2b2lkIHtcclxuXHRcdHRoaXMuc3ViID0gdGhpcy5yb3V0ZS5wYXJhbXMuc3Vic2NyaWJlKHBhcmFtcyA9PiB7XHJcblx0XHRcdHRoaXMucGF0aCA9IHBhcmFtc1sncGF0aCddO1xyXG5cdFx0XHRjb25zb2xlLmxvZyh0aGlzLnBhdGgpO1xyXG5cdFx0XHQvLyB0aGlzLnBhdGhzZXJ2aWNlLmdldFF1ZXN0aW9ucyh0aGlzLnBhdGgpXHJcblx0XHRcdC8vIFx0LnN1YnNjcmliZShcclxuXHRcdFx0Ly8gXHRcdChkOiBRdWVzdGlvbltdKSA9PiB7XHJcblx0XHRcdC8vIFx0XHRcdHRoaXMucXVlc3Rpb24gPSBkWzBdO1xyXG5cdFx0XHQvLyBcdFx0XHR0aGlzLnF1ZXN0aW9ucyA9IGQ7XHJcblxyXG5cdFx0XHQvLyBcdFx0fSxcclxuXHRcdFx0Ly8gXHRcdChlcnJvcikgPT4ge1xyXG5cdFx0XHQvLyBcdFx0XHRjb25zb2xlLmxvZyhlcnJvcik7XHJcblx0XHRcdC8vIFx0XHR9XHJcblx0XHRcdC8vIFx0KVxyXG5cdFx0XHR0aGlzLnBhdGhzZXJ2aWNlLmdldFF1ZXN0aW9uczIodGhpcy5wYXRoKVxyXG5cdFx0XHRcdC5zdWJzY3JpYmUoXHJcblx0XHRcdFx0XHQoZDogUmVzcG9uc2UpID0+IHtcclxuXHRcdFx0XHRcdFx0dmFyIHggPSBKU09OLnBhcnNlKGQudGV4dCgpKS5kYXRhO1xyXG5cdFx0XHRcdFx0XHRjb25zb2xlLmxvZyh4KTtcclxuXHRcdFx0XHRcdFx0dGhpcy5xdWVzdGlvbnMgPSBbXTtcclxuXHRcdFx0XHRcdFx0dGhpcy5xdWVzdGlvbj10aGlzLnF1ZXN0aW9uc1swXTtcclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHQoZXJyb3IpID0+IHtcclxuXHRcdFx0XHRcdFx0Y29uc29sZS5sb2coZXJyb3IpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdClcclxuXHRcdH0pO1xyXG5cdFx0Y29uc29sZS5sb2codGhpcy5xdWVzdGlvbnMpO1xyXG5cdH1cclxuXHJcblx0bmdPbkRlc3Ryb3koKSB7XHJcblx0XHR0aGlzLnN1Yi51bnN1YnNjcmliZSgpO1xyXG5cdH1cclxufSJdfQ==