"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var PathService = /** @class */ (function () {
    function PathService(http) {
        this.http = http;
    }
    PathService.prototype.getLessons = function (path) {
        var url = path + "/Lessons.json";
        return this.http.get(url, { headers: this.getCommonHeaders() }).pipe(operators_1.catchError(this.handleErrors));
    };
    PathService.prototype.getQuestions = function (path) {
        return this.http.get(path, { headers: this.getCommonHeaders() }).pipe(operators_1.map(function (response) { return response.json().data; }));
    };
    PathService.prototype.getQuestions2 = function (path) {
        return this.http.get(path, { headers: this.getCommonHeaders() }).pipe(operators_1.catchError(this.handleErrors));
    };
    PathService.prototype.getCommonHeaders = function () {
        var headers = new http_1.Headers();
        headers.append("Content-Type", "application/json");
        return headers;
    };
    PathService.prototype.handleErrors = function (error) {
        console.log(JSON.stringify(error.json()));
        return rxjs_1.Observable.throw(error);
    };
    PathService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http])
    ], PathService);
    return PathService;
}());
exports.PathService = PathService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGF0aC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicGF0aC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTJDO0FBQzNDLHNDQUF3RDtBQUN4RCw2QkFBOEM7QUFDOUMsNENBQXNEO0FBSXREO0lBQ0kscUJBQW9CLElBQVU7UUFBVixTQUFJLEdBQUosSUFBSSxDQUFNO0lBQUksQ0FBQztJQUVuQyxnQ0FBVSxHQUFWLFVBQVcsSUFBWTtRQUNuQixJQUFJLEdBQUcsR0FBRyxJQUFJLEdBQUcsZUFBZSxDQUFDO1FBQ2pDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUNwQixFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsRUFBRSxDQUN2QyxDQUFDLElBQUksQ0FDRixzQkFBVSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FDaEMsQ0FBQztJQUNOLENBQUM7SUFFRCxrQ0FBWSxHQUFaLFVBQWEsSUFBWTtRQUNyQixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksRUFDckIsRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixFQUFFLEVBQUUsQ0FDdkMsQ0FBQyxJQUFJLENBQUMsZUFBRyxDQUFDLFVBQUMsUUFBa0IsSUFBSyxPQUFBLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLEVBQXBCLENBQW9CLENBQUMsQ0FBQyxDQUFDO0lBQzlELENBQUM7SUFFRCxtQ0FBYSxHQUFiLFVBQWMsSUFBWTtRQUN0QixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksRUFDckIsRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixFQUFFLEVBQUUsQ0FDdkMsQ0FBQyxJQUFJLENBQUMsc0JBQVUsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztJQUMxQyxDQUFDO0lBRUQsc0NBQWdCLEdBQWhCO1FBQ0ksSUFBSSxPQUFPLEdBQUcsSUFBSSxjQUFPLEVBQUUsQ0FBQztRQUM1QixPQUFPLENBQUMsTUFBTSxDQUFDLGNBQWMsRUFBRSxrQkFBa0IsQ0FBQyxDQUFDO1FBQ25ELE9BQU8sT0FBTyxDQUFDO0lBQ25CLENBQUM7SUFFRCxrQ0FBWSxHQUFaLFVBQWEsS0FBZTtRQUN4QixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztRQUMxQyxPQUFPLGlCQUFVLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ25DLENBQUM7SUFqQ1EsV0FBVztRQUR2QixpQkFBVSxFQUFFO3lDQUVpQixXQUFJO09BRHJCLFdBQVcsQ0FrQ3ZCO0lBQUQsa0JBQUM7Q0FBQSxBQWxDRCxJQWtDQztBQWxDWSxrQ0FBVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBIdHRwLCBIZWFkZXJzLCBSZXNwb25zZSB9IGZyb20gXCJAYW5ndWxhci9odHRwXCI7XHJcbmltcG9ydCB7IE9ic2VydmFibGUsIHRocm93RXJyb3IgfSBmcm9tIFwicnhqc1wiO1xyXG5pbXBvcnQgeyBjYXRjaEVycm9yLCBtYXAsIHRhcCB9IGZyb20gXCJyeGpzL29wZXJhdG9yc1wiO1xyXG5pbXBvcnQgeyBRdWVzdGlvbiB9IGZyb20gXCIuLi9jbGFzc2VzL3F1ZXN0aW9uXCI7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBQYXRoU2VydmljZSB7XHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHA6IEh0dHApIHsgfVxyXG5cclxuICAgIGdldExlc3NvbnMocGF0aDogc3RyaW5nKSB7XHJcbiAgICAgICAgbGV0IHVybCA9IHBhdGggKyBcIi9MZXNzb25zLmpzb25cIjtcclxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldCh1cmwsXHJcbiAgICAgICAgICAgIHsgaGVhZGVyczogdGhpcy5nZXRDb21tb25IZWFkZXJzKCkgfVxyXG4gICAgICAgICkucGlwZShcclxuICAgICAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUVycm9ycylcclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFF1ZXN0aW9ucyhwYXRoOiBzdHJpbmcpOiBPYnNlcnZhYmxlPFF1ZXN0aW9uW10+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldChwYXRoLFxyXG4gICAgICAgICAgICB7IGhlYWRlcnM6IHRoaXMuZ2V0Q29tbW9uSGVhZGVycygpIH1cclxuICAgICAgICApLnBpcGUobWFwKChyZXNwb25zZTogUmVzcG9uc2UpID0+IHJlc3BvbnNlLmpzb24oKS5kYXRhKSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0UXVlc3Rpb25zMihwYXRoOiBzdHJpbmcpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldChwYXRoLFxyXG4gICAgICAgICAgICB7IGhlYWRlcnM6IHRoaXMuZ2V0Q29tbW9uSGVhZGVycygpIH1cclxuICAgICAgICApLnBpcGUoY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUVycm9ycykpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldENvbW1vbkhlYWRlcnMoKSB7XHJcbiAgICAgICAgbGV0IGhlYWRlcnMgPSBuZXcgSGVhZGVycygpO1xyXG4gICAgICAgIGhlYWRlcnMuYXBwZW5kKFwiQ29udGVudC1UeXBlXCIsIFwiYXBwbGljYXRpb24vanNvblwiKTtcclxuICAgICAgICByZXR1cm4gaGVhZGVycztcclxuICAgIH1cclxuXHJcbiAgICBoYW5kbGVFcnJvcnMoZXJyb3I6IFJlc3BvbnNlKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkoZXJyb3IuanNvbigpKSk7XHJcbiAgICAgICAgcmV0dXJuIE9ic2VydmFibGUudGhyb3coZXJyb3IpO1xyXG4gICAgfVxyXG59Il19