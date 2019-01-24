import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import { Observable, throwError } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";
import { Question } from "../classes/question";

@Injectable()
export class PathService {
    constructor(private http: Http) { }

    getLessons(path: string) {
        let url = path + "/Lessons.json";
        return this.http.get(url,
            { headers: this.getCommonHeaders() }
        ).pipe(
            catchError(this.handleErrors)
        );
    }

    getQuestions(path: string): Observable<Question[]> {
        return this.http.get(path,
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