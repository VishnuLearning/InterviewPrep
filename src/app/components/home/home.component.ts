import { Component, OnInit } from '@angular/core';
import { TNSTextToSpeech, SpeakOptions } from "nativescript-texttospeech";

@Component({
  selector: 'ns-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  moduleId: module.id,
})
export class HomeComponent implements OnInit {

  constructor(private tts: TNSTextToSpeech) { }

  speak(text:string) {
		let options = {
			text: text,
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
  
  ngOnInit() {
    this.speak("Welcome to Interview Preparation. Please choose your track.");
  } 

}
