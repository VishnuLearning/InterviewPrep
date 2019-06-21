import { Component, OnInit, AfterViewInit } from '@angular/core';
import { TNSTextToSpeech, SpeakOptions } from "nativescript-texttospeech";
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ns-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  moduleId: module.id,
})
export class HomeComponent implements OnInit, AfterViewInit {

  constructor(private tts: TNSTextToSpeech, private router: Router) { }

  speak(text:string) { 
		let options = {
			text: text, 
			pitch: 1.0,
			speakRate: 0.9,
			volume: 1.0,
			locale:"en-US",
			finishedCallback: ()=>{
				//enable speak button
				console.log("intro done");
			}
		};
		this.tts.speak(options);
	}
	
	ngAfterViewInit() {
		this.speak("Welcome to Job Interview Skill Training. Please Choose the Type of Interview");
	}

	goToInstructions(){
		this.router.navigate(['/instructions']);
	}

  ngOnInit() {} 

}
