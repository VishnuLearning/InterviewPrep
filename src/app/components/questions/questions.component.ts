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
// import { error } from "tns-core-modules/trace/trace";
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
	AvatarImages = ['julia_full.png','julia_mouth_wide5.png','julia_mouth_wide5.png','julia_mouth_narrow_o.png','julia_mouth_wide_y.png',
	'julia_mouth_wide5.png','julia_mouth_wide_d_f_k_r_s.png','julia_mouth_narrow_w.png','julia_mouth_narrow_o.png',
	'julia_mouth_wide_d_f_k_r_s.png','julia_mouth_narrow_u.png','julia_mouth_wide5.png','julia_mouth_wide_d_f_k_r_s.png','julia_mouth_wide_sh.png',
	'julia_mouth_wide5.png','julia_mouth_wide_sh.png','julia_mouth_wide_sh.png','julia_mouth_wide_th.png','julia_mouth_wide_f.png',
	'julia_mouth_wide_sh.png','julia_mouth_wide_d_f_k_r_s.png','julia_mouth_closed.png'];
	speechRate = 0.9;
	// private text2speech: TNSTextToSpeech;
	private speech2text: SpeechRecognition;
	speakOptions : SpeakOptions;
    microphoneEnabled: boolean = false;
    recording: boolean = false;
    lastTranscription: string = null;
    spoken: boolean = false;
    recognizedText: string;
    pitch: number = 100;
	private recordingAvailable: boolean;
	private spokenText: string;

	constructor(private text2speech: TNSTextToSpeech, private pathservice: PathService, private route: ActivatedRoute, private router: Router) {
		this.questions = [];
		this.qnum = 1;
		var u = decodeURI(router.url);
		this.title = u.substring(u.lastIndexOf('%2F')+3, u.lastIndexOf('.'));
		this.speakOptions = {
			text: "Question 1, ",
			pitch: 1.0,
			speakRate: 0.9,
			volume: 1.0,
			language:"en",
			locale:"en-US",
			finishedCallback: ()=>{this.speakNextSentence();}
		};
	}

	onSwipe(args: SwipeGestureEventData) {
		if (args.direction == 1 && this.qnum > 0) {	
			this.text2speech.pause();
			this.avatarImage.nativeElement.src = this.imagePath + this.AvatarImages[0];
			this.showAnswer = false;
			this.loadQuestion(this.qnum - 1);
		} else if (args.direction == 2 && this.qnum < this.questions.length - 1) {
			this.text2speech.pause();
			this.avatarImage.nativeElement.src = this.imagePath + this.AvatarImages[0];
			this.showAnswer = false;
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
				this.speakOptions.text = this.sentences[this.sentenceIndex];
				this.text2speech.speak(this.speakOptions)
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
		this.text2speech.pause();
		var _this = this;
		this.speaking = true;
		this.speakNextSentence();
	}

	speakTextOnly(){
		this.text2speech.pause();
		let options: SpeakOptions = {
			text: this.question.text,
			pitch: 1.0,
			speakRate: 0.9,
			volume: 1.0,
			language: "en",
			locale: "en-US",
			finishedCallback: ()=>{
				console.log("read the answer");
			}
		};
		this.text2speech.speak(options);
	}
   
	toggleRecording(): void {
		this.recording = !this.recording;
		// console.log(this.recording);
        if (this.recording) {
			// console.log("toggleRecording true part");
			this.spoken = false;
          	this.lastTranscription = null;
          	this.startListening();
		} 
		else {
			// console.log("toggleRecording true part");
          	this.stopListening();
          	if (!this.spoken && this.lastTranscription !== null) {
            	alert(this.lastTranscription);
          	}
        }
    }
    
	private startListening(): void {
		// console.log("Inside startlistening");
		if (!this.recordingAvailable) {
			console.log("inside if");
			alert({
			title: "Not supported",
			message: "Speech recognition not supported on this device. Try a different device please.",
			okButtonText: "Oh, bummer"
			});
			this.recognizedText = "No support, Sorry";
			this.recording = false;
			return;
		}
		// console.log("else part");
		this.recording = true;
		this.speech2text.startListening({
			locale: "en-US",
			returnPartialResults: true,
			onResult: (transcription: SpeechRecognitionTranscription) => {
				// this.zone.run(() => this.recognizedText = transcription.text);
				this.lastTranscription = transcription.text;
				if (transcription.finished) {
					this.spoken = true;
					setTimeout(() => alert(transcription.text), 300);
					this.spokenText = transcription.text;
					alert(transcription.text);
					this.generateScore();
				}
			},
		}).then(
			(started: boolean) => {console.log("started listening");},
			(errorMessage: string) => {console.log(`Error: ${errorMessage}`);}
		);
	}

	private generateScore(): void {
		let spokenSentences = this.spokenText.split(" ");
		let givenSentences = this.question.text.split(" ");
		let v=0;
		while(v<givenSentences.length){
			givenSentences[v].replace('.','');
			v++;
		}
		let i=0;
		let j=0;
		let count=0;
		while(i<spokenSentences.length && j<givenSentences.length){
			// console.log(spokenSentences[i].toLowerCase());
			// console.log(givenSentences[j].toLowerCase());
			if(spokenSentences[i].toLowerCase() != givenSentences[j].toLowerCase()){
				j++;
				continue;
			}
			i++; j++; count++;
		}
		// console.log(givenSentences)
		// console.log(spokenSentences)
		// console.log(givenSentences.length)
		// console.log(spokenSentences.length)
		// console.log(count);
		alert((count/givenSentences.length)*100);
	}
    
    private stopListening(): void {
		// console.log("stopListening");
        this.recording = false;
        this.speech2text.stopListening().then(() => {
          	console.log("Stopped listening");
        });
    }

	ngOnInit(): void {
		this.speech2text = new SpeechRecognition();
    	this.speech2text.available().then(avail => {
      		this.recordingAvailable = avail;
    	});
		// this.text2speech = new TNSTextToSpeech();
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