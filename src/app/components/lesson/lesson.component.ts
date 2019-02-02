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
	topic: string;
	private sub: any;


	constructor(private pathservice: PathService, private route: ActivatedRoute, private router: Router ) {
		this.lessons = [];
		this.path="";
		let u = decodeURI(router.url).replace("%2F","");
		this.topic = u.substring(u.lastIndexOf('/')+1);
	}

	ngOnInit(): void {
		this.sub = this.route.params.subscribe(params => {
			if(params['path']) this.path = params['path'];
			
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