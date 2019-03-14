import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import { Observable, throwError } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";
import { Question } from "../../classes/question";

@Injectable()
export class PathService {
    constructor(private http: Http) { }

    getLessons(path: string) {
        let url = "~/assets/Lessons" + path + "/Lessons.json"; 
        return this.http.get(url, 
            { headers: this.getCommonHeaders() }
        ).pipe(
            catchError(this.handleErrors)
        );
    }

    getQuestions(path: string): Observable<Question[]> {
        let url = "~/assets/Lessons" + path;
        return this.http.get(url,
            { headers: this.getCommonHeaders() }
        ).pipe(map((response: Response) => response.json().data));
    }

    getCommonHeaders() {
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        return headers;
    }

    handleErrors(error: Response) {
        console.log(JSON.stringify(error.json()));
        return Observable.throw(error);
    }
}