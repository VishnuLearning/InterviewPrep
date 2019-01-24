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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGF0aC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicGF0aC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTJDO0FBQzNDLHNDQUF3RDtBQUN4RCw2QkFBOEM7QUFDOUMsNENBQXNEO0FBSXREO0lBQ0kscUJBQW9CLElBQVU7UUFBVixTQUFJLEdBQUosSUFBSSxDQUFNO0lBQUksQ0FBQztJQUVuQyxnQ0FBVSxHQUFWLFVBQVcsSUFBWTtRQUNuQixJQUFJLEdBQUcsR0FBRyxJQUFJLEdBQUcsZUFBZSxDQUFDO1FBQ2pDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUNwQixFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsRUFBRSxDQUN2QyxDQUFDLElBQUksQ0FDRixzQkFBVSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FDaEMsQ0FBQztJQUNOLENBQUM7SUFFRCxrQ0FBWSxHQUFaLFVBQWEsSUFBWTtRQUNyQixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksRUFDckIsRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixFQUFFLEVBQUUsQ0FDdkMsQ0FBQyxJQUFJLENBQUMsZUFBRyxDQUFDLFVBQUMsUUFBa0IsSUFBSyxPQUFBLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLEVBQXBCLENBQW9CLENBQUMsQ0FBQyxDQUFDO0lBQzlELENBQUM7SUFFRCxzQ0FBZ0IsR0FBaEI7UUFDSSxJQUFJLE9BQU8sR0FBRyxJQUFJLGNBQU8sRUFBRSxDQUFDO1FBQzVCLE9BQU8sQ0FBQyxNQUFNLENBQUMsY0FBYyxFQUFFLGtCQUFrQixDQUFDLENBQUM7UUFDbkQsT0FBTyxPQUFPLENBQUM7SUFDbkIsQ0FBQztJQUVELGtDQUFZLEdBQVosVUFBYSxLQUFlO1FBQ3hCLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzFDLE9BQU8saUJBQVUsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDbkMsQ0FBQztJQTNCUSxXQUFXO1FBRHZCLGlCQUFVLEVBQUU7eUNBRWlCLFdBQUk7T0FEckIsV0FBVyxDQTRCdkI7SUFBRCxrQkFBQztDQUFBLEFBNUJELElBNEJDO0FBNUJZLGtDQUFXIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBIdHRwLCBIZWFkZXJzLCBSZXNwb25zZSB9IGZyb20gXCJAYW5ndWxhci9odHRwXCI7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCB0aHJvd0Vycm9yIH0gZnJvbSBcInJ4anNcIjtcbmltcG9ydCB7IGNhdGNoRXJyb3IsIG1hcCwgdGFwIH0gZnJvbSBcInJ4anMvb3BlcmF0b3JzXCI7XG5pbXBvcnQgeyBRdWVzdGlvbiB9IGZyb20gXCIuLi9jbGFzc2VzL3F1ZXN0aW9uXCI7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBQYXRoU2VydmljZSB7XG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwOiBIdHRwKSB7IH1cblxuICAgIGdldExlc3NvbnMocGF0aDogc3RyaW5nKSB7XG4gICAgICAgIGxldCB1cmwgPSBwYXRoICsgXCIvTGVzc29ucy5qc29uXCI7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KHVybCxcbiAgICAgICAgICAgIHsgaGVhZGVyczogdGhpcy5nZXRDb21tb25IZWFkZXJzKCkgfVxuICAgICAgICApLnBpcGUoXG4gICAgICAgICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlRXJyb3JzKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIGdldFF1ZXN0aW9ucyhwYXRoOiBzdHJpbmcpOiBPYnNlcnZhYmxlPFF1ZXN0aW9uW10+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQocGF0aCxcbiAgICAgICAgICAgIHsgaGVhZGVyczogdGhpcy5nZXRDb21tb25IZWFkZXJzKCkgfVxuICAgICAgICApLnBpcGUobWFwKChyZXNwb25zZTogUmVzcG9uc2UpID0+IHJlc3BvbnNlLmpzb24oKS5kYXRhKSk7XG4gICAgfVxuXG4gICAgZ2V0Q29tbW9uSGVhZGVycygpIHtcbiAgICAgICAgbGV0IGhlYWRlcnMgPSBuZXcgSGVhZGVycygpO1xuICAgICAgICBoZWFkZXJzLmFwcGVuZChcIkNvbnRlbnQtVHlwZVwiLCBcImFwcGxpY2F0aW9uL2pzb25cIik7XG4gICAgICAgIHJldHVybiBoZWFkZXJzO1xuICAgIH1cblxuICAgIGhhbmRsZUVycm9ycyhlcnJvcjogUmVzcG9uc2UpIHtcbiAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkoZXJyb3IuanNvbigpKSk7XG4gICAgICAgIHJldHVybiBPYnNlcnZhYmxlLnRocm93KGVycm9yKTtcbiAgICB9XG59Il19