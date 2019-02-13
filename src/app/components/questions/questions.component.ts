import { ViewChild, ElementRef } from "@angular/core";
import { RadSideDrawerComponent, SideDrawerType } from "nativescript-ui-sidedrawer/angular";
import { Component, OnInit, OnDestroy } from "@angular/core";
// import { Response } from "@angular/http";
import { PathService } from "../../services/path.service";
import { Router, ActivatedRoute } from '@angular/router';
import { Question } from "../../classes/question";
import { SwipeGestureEventData } from "tns-core-modules/ui/gestures";
import { TNSTextToSpeech, SpeakOptions } from "nativescript-texttospeech";
// import {Slider} from "tns-core-modules/ui/slider";

@Component({
	selector: "Questions",
	moduleId: module.id,
	providers: [PathService],
	templateUrl: "./questions.component.html",
	styleUrls: ['./questions.component.css']
})

export class QuestionsComponent implements OnInit, OnDestroy {
	@ViewChild(RadSideDrawerComponent) public drawerComponent: RadSideDrawerComponent;
	@ViewChild("avatar") avatarImage:ElementRef;
	
	onOpenDrawerTap() {
		this.drawerComponent.sideDrawer.showDrawer();
	}

	path: string;
	imagePath: string = "~/assets/images/dr_sinha/";
	questions: Question[];
	question: Question;
	qnum: number;
	title:string;
	variable: string;

	showAnswer: boolean = false;
	
	speaking: boolean = false;
	sentenceIndex: number = -1;
	sentences: Array<string>;
	speakinterval: number;
	speakAndAnimateFlag: number = 1;

	private sub: any;
	ttsOptions: SpeakOptions;
	AvatarImages = ['julia_full.png','julia_mouth_wide5.png','julia_mouth_wide5.png','julia_mouth_narrow_o.png','julia_mouth_wide_y.png',
	'julia_mouth_wide5.png','julia_mouth_wide_d_f_k_r_s.png','julia_mouth_narrow_w.png','julia_mouth_narrow_o.png',
	'julia_mouth_wide_d_f_k_r_s.png','julia_mouth_narrow_u.png','julia_mouth_wide5.png','julia_mouth_wide_d_f_k_r_s.png','julia_mouth_wide_sh.png',
	'julia_mouth_wide5.png','julia_mouth_wide_sh.png','julia_mouth_wide_sh.png','julia_mouth_wide_th.png','julia_mouth_wide_f.png',
	'julia_mouth_wide_sh.png','julia_mouth_wide_d_f_k_r_s.png','julia_mouth_closed.png'];

	speechRate = 0.9;

	constructor(private tts: TNSTextToSpeech, private pathservice: PathService, private route: ActivatedRoute, private router: Router) {
		this.questions = [];
		this.qnum = 1;
		var u = decodeURI(router.url);
		this.title = u.substring(u.lastIndexOf('%2F')+3, u.lastIndexOf('.'));
		this.ttsOptions = {
			text: "Question 1, ",
			pitch: 1.0,
			speakRate: 0.9,
			volume: 1.0,
			language:"en",
			locale:"en-IN",
			finishedCallback: ()=>{this.speakNextSentence();}
		};
	}

	onSwipe(args: SwipeGestureEventData) {
		if (args.direction == 1 && this.qnum > 0) {
			this.loadQuestion(this.qnum - 1);
		} else if (args.direction == 2 && this.qnum < this.questions.length - 1) {
			this.loadQuestion(this.qnum + 1);
		}
	}

	// handle value change
	// onSliderLoaded(args) {
	// 	const sliderComponent: Slider = <Slider>args.object;
	// 	sliderComponent.on("valueChange", (sargs) => {
	// 		this.speechRate = (<Slider>sargs.object).value/10;
	// 	});
	// }

	loadQuestion(i: number) {
		this.question = this.questions[i];
		this.variable = this.question.quest;
		this.variable.replace(".","?");
		this.sentences = this.variable.split("? ");
		console.log(this.sentences);
		this.sentenceIndex = -1;
		if(this.speakinterval) clearInterval(this.speakinterval);
		this.speaking = false;
		this.speakAndAnimateFlag = 1;
		this.qnum = i;
		// this.speakTitle();
	}

	displayAnswer(){
		this.showAnswer = !this.showAnswer;
	}
	
	speakNextSentence(){
		console.log("speakNextSentence called ", this.speakAndAnimateFlag, this.speaking, this.sentenceIndex);
		this.speakAndAnimateFlag++;
		if(this.speaking && this.speakAndAnimateFlag == 2) {
			this.speakAndAnimateFlag = 0;
			this.sentenceIndex++;
			if(this.sentenceIndex<this.sentences.length) {
				this.ttsOptions.text = this.sentences[this.sentenceIndex];
				this.tts.speak(this.ttsOptions)
				.then(()=>{
					this.animateAvatar();
					console.log("in then");}, 
					(err)=>{console.log(err);});
			} else {
				this.sentenceIndex = -1;
				this.speaking = false;
				this.speakAndAnimateFlag = 1;
			}
		}
	}

	animateAvatar(): void {
		let i = 0;
        this.speakinterval = setInterval(() => { 
			this.avatarImage.nativeElement.src = this.imagePath + this.AvatarImages[this.question.visemes[this.sentenceIndex][i]];
			
            i++;
            if (i == this.question.visemes[this.sentenceIndex].length) {
				clearInterval(this.speakinterval);
				this.speakNextSentence();
			}
		}, this.speechRate*85);
	}

	textToSpeech(){
		var _this = this;
		// this.tts.getAvailableLanguages()
		// .then(function(res) {
		// 	console.log(res);
		// })
		// .catch(function(error){
		// 	console.log(error);
		// });
		// start speaking. This will do two things. speak a sentence and animate.
		// when both end, it should call a function
		this.speaking = true;
		this.speakNextSentence();
	}

	// speakTitle() {
	// 	let options = {
	// 		text: "Question " + String(this.qnum+1), //+ ", " + this.question.title,
	// 		pitch: 1.0,
	// 		speakRate: 0.9,
	// 		volume: 1.0,
	// 		language:"en",
	// 		locale:"en-IN",
	// 		finishedCallback: ()=>{
	// 			console.log("intro done");
	// 		}
	// 	};
		
	// 	this.tts.speak(options);
	// }

	speakTextOnly(){
		let options = {
			text: this.question.text,
			pitch: 1.0,
			speakRate: 0.8,
			volume: 1.0,
			language: "en",
			locale: "en-IN",
			finishedCallback: ()=>{
				console.log("read the answer");
			}
		};
		this.tts.speak(options);
	}

	ngOnInit(): void {
		this.sub = this.route.params.subscribe(params => {
			this.path = params['path'];
			this.pathservice.getQuestions(this.path)
				.subscribe(
					(d: Question[]) => {
						this.question = d[0];
						this.questions = d;
						this.variable = this.question.quest;
						this.variable.replace(".","?");
						this.sentences = this.variable.split("? ");
						// this.sentences = this.question.quest.split("? ");
						// this.speakTitle();
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