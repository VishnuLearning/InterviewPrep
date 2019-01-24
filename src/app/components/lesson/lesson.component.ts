import { Component, OnInit, OnDestroy } from "@angular/core";
import { Response } from "@angular/http";
import { PathService } from "../../services/path.service";
import { Router, ActivatedRoute } from '@angular/router';

@Component({
	selector: "ns-lesson",
	moduleId: module.id,
	providers: [PathService],
	templateUrl: "./lesson.component.html",
	styleUrls: ['./lesson.component.css']
})
export class LessonComponent implements OnInit, OnDestroy {
	path: string;
	lessons: any;
	private sub: any;


	constructor(private pathservice: PathService, private route: ActivatedRoute) {
		this.lessons = [];
	}

	ngOnInit(): void {
		this.sub = this.route.params.subscribe(params => {
			this.path = params['path'];
			if (this.path == undefined) this.path = "~/assets/Lessons";
			//console.log(this.path);
			this.pathservice.getLessons(this.path)
				.subscribe(
					(d: Response) => {
						this.lessons = JSON.parse(d.text());
						console.log(this.lessons);
					},
					(error) => {
						console.log(error);
					}
				)
		})

	}

	ngOnDestroy() {
		this.sub.unsubscribe();
	}
}