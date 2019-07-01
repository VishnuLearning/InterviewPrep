import { ViewChild, ElementRef, NgZone } from "@angular/core";
import { RadSideDrawerComponent, SideDrawerType } from "nativescript-ui-sidedrawer/angular";
import { Component, OnInit, OnDestroy } from "@angular/core";
// import { Response } from "@angular/http";
import { PathService } from "../../services/path/path.service";
import { Router, ActivatedRoute } from '@angular/router';
import { Question } from "../../classes/question";
import { SwipeGestureEventData } from "tns-core-modules/ui/gestures";
import { TNSTextToSpeech, SpeakOptions } from "nativescript-texttospeech";
import { SpeechRecognition, SpeechRecognitionTranscription } from 'nativescript-speech-recognition';
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
	imagePath: string = "~/assets/images/Final_Avatar_small/";
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
	score = 0;
	AvatarImages = ['jobs_full.png','jobs_mouth_wide5.png','jobs_mouth_wide5.png','jobs_mouth_narrow_o.png','jobs_mouth_wide_y.png',
	'jobs_mouth_wide5.png','jobs_mouth_wide_d_f_k_r_s.png','jobs_mouth_narrow_w.png','jobs_mouth_narrow_o.png',
	'jobs_mouth_wide_d_f_k_r_s.png','jobs_mouth_narrow_u.png','jobs_mouth_wide5.png','jobs_mouth_wide_d_f_k_r_s.png','jobs_mouth_wide_sh.png',
	'jobs_mouth_wide5.png','jobs_mouth_wide_sh.png','jobs_mouth_wide_sh.png','jobs_mouth_wide_th.png','jobs_mouth_wide_f.png',
	'jobs_mouth_wide_sh.png','jobs_mouth_wide_d_f_k_r_s.png','jobs_mouth_closed.png'];
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
	flag: boolean = false;

	constructor(private text2speech: TNSTextToSpeech, private pathservice: PathService, private route: ActivatedRoute, private router: Router, private zone: NgZone) {
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
		if (args.direction == 1) {	
			this.goLeft();
		} else if (args.direction == 2) {
			this.goRight();
		}
	}
	goLeft(){
		if (this.qnum > 0) {	
			this.recognizedText = undefined;
			this.recording = false;
			this.text2speech.pause();
			this.avatarImage.nativeElement.src = this.imagePath + this.AvatarImages[0];
			this.showAnswer = false;
			this.loadQuestion(this.qnum - 1);
		}
	}
	goRight(){
		if (this.qnum < this.questions.length - 1) {
			this.recognizedText = undefined;
			this.recording = false;
			this.text2speech.pause();
			this.avatarImage.nativeElement.src = this.imagePath + this.AvatarImages[0];
			this.showAnswer = false;
			this.loadQuestion(this.qnum + 1);
		}
	} 

	//loading question directly from navigation tab
	loadQuestion(i: number) {
		this.drawerComponent.sideDrawer.closeDrawer();
		this.question = this.questions[i];
		this.variable = this.question.quest;
		let value = this.variable.replace(/\./gi,"?");
		this.sentences = value.split("? ");
		for(var v=0;v<this.sentences.length;v++)
			console.log(this.sentences[v]);
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
		// this.text2speech.pause();
		var _this = this;
		this.speaking = true;
		this.speakNextSentence();
	}

	speakTextOnly(){
		this.text2speech.pause();
		let options: SpeakOptions = {
			text: this.question.text,
			pitch: 1.3,
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
   
	//to initailize the speech recording
	toggleRecording(): void {
		this.recording = !this.recording;
        if (this.recording) {
			this.spoken = false;
          	this.lastTranscription = null;
          	this.startListening();
		} 
		else {
          	this.stopListening();
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
		// this.recording = true;
		this.speech2text.startListening({
			locale: "en-US",
			returnPartialResults: true,
			onResult: (transcription: SpeechRecognitionTranscription) => {
				this.zone.run(() => this.recognizedText = transcription.text);
				this.lastTranscription = transcription.text;
				if (transcription.finished) {
					this.spoken = true;
					this.spokenText = transcription.text;
				}
			},
		}).then(
			(started: boolean) => {console.log("started listening");},
			(errorMessage: string) => {console.log(`Error: ${errorMessage}`);}
		);
	}

	// logic to check number of words matching
	getLongestCommonSubsequence(A, B, m, n){
        var L = [];
        let i=0, j=0;
        for(i=0;i<=m;i++){
          L.push([]);
          for(j=0;j<=n;j++){
            L[i].push(0);
          }
        }
        for (i=0; i<=m; i++) 
        { 
          for (j=0; j<=n; j++) 
          { 
            if (i == 0 || j == 0) 
              L[i][j] = 0; 
        
            else if (A[i-1] == B[j-1]) 
              L[i][j] = L[i-1][j-1] + 1; 
        
            else
              L[i][j] = Math.max(L[i-1][j], L[i][j-1]); 
          } 
        }
        return L[m][n];
    }

    private generateScore(): void {
        let spokenSentences = this.recognizedText;
        let givenSentences = this.question.text;
        let re = /\./gi;
        spokenSentences = spokenSentences.replace(re, '');
        givenSentences = givenSentences.replace(re, '');
        re = /\,/gi;
        spokenSentences = spokenSentences.replace(re, '');
        givenSentences = givenSentences.replace(re, '');
        let givenWords = givenSentences.split(' ');
        let spokenWords = spokenSentences.split(' ');
        let l1 = givenWords.length;
        let l2 = spokenWords.length;
        if(l2<5){
			this.recognizedText = undefined;
			this.score = 0;;
            alert("We did not hear you. Please check your Microphone, Voice input setting. Then repeat your answer loudly and clearly!");
        }
        else {
            let count = this.getLongestCommonSubsequence(givenWords, spokenWords, l1, l2);
			this.score = Math.round(100*count/l1);
			let tag = '';
			if(this.score>90) tag = "Excellent!";
			else if (this.score>80) tag = "Very Good!";
			else if (this.score>70) tag = "Keep it Up";
			else if (this.score>60) tag = "You did Decent, Keep trying";
			else tag = "Please concentrate and Try again";
			alert("Your Score: " + this.score+ "%" +"\n\n"+tag + "\n\nYour answer: \n" + this.recognizedText );
			this.recognizedText = undefined;
        }
    }
    
    private stopListening(): void {
		if(this.recording==false){
			// this.recording = true;
			this.speech2text.stopListening().then(() => {
				console.log("Stopped listening");
			});
		}
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