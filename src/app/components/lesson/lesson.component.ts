import { Component, OnInit, OnDestroy } from "@angular/core";
import { Response } from "@angular/http";
import { PathService } from "../../services/path.service";
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
		this.speakTitle();
	}

	speakTitle() {
		let options = {
			text: this.topic,
			pitch: 1.0,
			speakRate: 0.9,
			volume: 1.0,
			language:"en",
			locale:"en-IN",
			finishedCallback: ()=>{
				//enable speak button
				console.log("intro done");
			}
		};
		
		this.tts.speak(options);
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