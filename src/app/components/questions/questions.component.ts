import { ViewChild } from "@angular/core";
import { RadSideDrawerComponent, SideDrawerType } from "nativescript-ui-sidedrawer/angular";
import { Component, OnInit, OnDestroy } from "@angular/core";
// import { Response } from "@angular/http";
import { PathService } from "../../services/path.service";
import { Router, ActivatedRoute } from '@angular/router';
import { Question } from "../../classes/question";
import { SwipeGestureEventData } from "tns-core-modules/ui/gestures";
import { TNSTextToSpeech, SpeakOptions } from "nativescript-texttospeech";

@Component({
	selector: "Questions",
	moduleId: module.id,
	providers: [PathService],
	templateUrl: "./questions.component.html",
	styleUrls: ['./questions.component.css']
})

export class QuestionsComponent implements OnInit, OnDestroy {
	@ViewChild(RadSideDrawerComponent) public drawerComponent: RadSideDrawerComponent;
	onOpenDrawerTap() {
		this.drawerComponent.sideDrawer.showDrawer();
	}

	path: string;
	questions: Question[];
	question: Question;
	qnum: number;
	private sub: any;
	ttsOptions: SpeakOptions;
	AvatarImages = ['julia_full.png','julia_mouth_wide5.png','julia_mouth_wide5.png','julia_mouth_narrow_o.png','julia_mouth_wide_y.png',
	'julia_mouth_wide5.png','julia_mouth_wide_d_f_k_r_s.png','julia_mouth_narrow_w.png','julia_mouth_narrow_o.png',
	'julia_mouth_wide_d_f_k_r_s.png','julia_mouth_narrow_u.png','julia_mouth_wide5.png','julia_mouth_wide_d_f_k_r_s.png','julia_mouth_wide_sh.png',
	'julia_mouth_wide5.png','julia_mouth_wide_sh.png','julia_mouth_wide_sh.png','julia_mouth_wide_th.png','julia_mouth_wide_f.png',
	'julia_mouth_wide_sh.png','julia_mouth_wide_d_f_k_r_s.png','julia_mouth_closed.png'];
	avatar = "";
	timing = 160;

	constructor(private tts: TNSTextToSpeech, private pathservice: PathService, private route: ActivatedRoute) {
		this.questions = [];
		this.qnum = 0;
	}

	onSwipe(args: SwipeGestureEventData) {
		if (args.direction == 1 && this.qnum > 0) {
			this.loadQuestion(this.qnum - 1);
		} else if (args.direction == 2 && this.qnum < this.questions.length - 1) {
			this.loadQuestion(this.qnum + 1);
		}
	}

	loadQuestion(i: number) {
		this.question = this.questions[i];
		this.qnum = i;
	}

	animateAvatar(): void {
        console.log("Button was pressed");
        let i = 0;
        let speakinterval = setInterval(() => { 
            this.avatar = this.AvatarImages[this.question.visemes[i]];
            i++;
            if (i == this.question.visemes.length) clearInterval(speakinterval);
        }, this.timing);
    }

	textToSpeech(){
		this.animateAvatar();
		this.ttsOptions = {
			text: this.question.text,
			pitch: 1.0,
			finishedCallback: () => {
				console.log("I'm Done");
			}
		};
		this.tts.speak(this.ttsOptions);
	}

	ngOnInit(): void {
		this.sub = this.route.params.subscribe(params => {
			this.path = params['path'];
			console.log(this.path);
			this.pathservice.getQuestions(this.path)
				.subscribe(
					(d: Question[]) => {
						this.question = d[0];
						this.questions = d;

					},
					(error) => {
						console.log(error);
					}
				)
		});
	}

	ngOnDestroy() {
		this.sub.unsubscribe();
	}
}