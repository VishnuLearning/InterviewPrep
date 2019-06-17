import { Component, OnInit, OnDestroy } from "@angular/core";
import { Response } from "@angular/http";
import { PathService } from "../../services/path/path.service";
import { Router, ActivatedRoute } from '@angular/router';
import { TNSTextToSpeech, SpeakOptions } from "nativescript-texttospeech";

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


	constructor(private tts: TNSTextToSpeech, private pathservice: PathService, private route: ActivatedRoute, private router: Router ) {
		this.lessons = [];
		this.path="";
		let u = decodeURI(router.url).replace("%2F","");
		this.topic = u.substring(u.lastIndexOf('/')+1);
	}

	gotoLesson(lesson:any) {
		this.speak(lesson);
		console.log(lesson);
	}
 
	speak(lesson:any) {
		let options = {
			text: lesson.name,
			pitch: 1.0,
			speakRate: 0.9,
			volume: 1.0,
			locale:"en-US",
			finishedCallback: ()=>{
				//enable speak button
				console.log("routing" + " " + this.path);
				console.log("inside finishedCallBack");
			}
		};
		this.tts.speak(options)
		.then(() => {
			console.log("inside then");
			if (lesson.path.endsWith(".json")) {
				console.log('/questions'+this.path+'/'+lesson.path);
				this.router.navigate(['/questions', this.path+'/'+lesson.path]);
			} else {
				console.log('/lessons'+this.path+'/'+lesson.path);
				this.router.navigate(['/lesson', this.path+'/'+lesson.path]);
			}
		}); 
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