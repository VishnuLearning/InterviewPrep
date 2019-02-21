import { ViewChild, ElementRef } from "@angular/core";
import { RadSideDrawerComponent, SideDrawerType } from "nativescript-ui-sidedrawer/angular";
import { Component, OnInit, OnDestroy } from "@angular/core";
// import { Response } from "@angular/http";
import { PathService } from "../../services/path.service";
import { Router, ActivatedRoute } from '@angular/router';
import { Question } from "../../classes/question";
import { SwipeGestureEventData } from "tns-core-modules/ui/gestures";
import { TNSTextToSpeech, SpeakOptions } from "nativescript-texttospeech";
import { SpeechRecognition, SpeechRecognitionTranscription, SpeechRecognitionOptions } from 'nativescript-speech-recognition';
import { error } from "tns-core-modules/trace/trace";
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
	sttoptions: SpeechRecognitionOptions;
	constructor(private speech: SpeechRecognition,private tts: TNSTextToSpeech, private pathservice: PathService, private route: ActivatedRoute, private router: Router) {
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
		this.sttoptions = {
			locale: 'en-US',
			onResult:(transcription: SpeechRecognitionTranscription)=>{
				console.log(transcription.text);
			}
		}
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
		this.speaking = true;
		this.speakNextSentence();
	}
	
	triggerListening(){
		this.speech.available().then(result=>{
			result ? this.startListening() : alert("Speech Recognition not available");
		},error=>{
			console.error(error);
		})
	}
	
	startListening(){
		this.speech.startListening(this.sttoptions).then(()=>{
			console.log('Recognition Strarted');
		},error=>{
			console.error(error);
		})
	}

	stopListening(){
		this.speech.stopListening().then(()=>{
			console.log('Recognition Stopped');
		},error=>{
			console.error(error);
		})
	}

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