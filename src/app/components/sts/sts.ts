import { Component, OnInit } from "@angular/core";
import {SpeechRecognition, SpeechRecognitionOptions, SpeechRecognitionTranscription } from "nativescript-speech-recognition";


@Component({
    selector: "Sts",
    moduleId: module.id,
    templateUrl: "./sts.html"
})

export class StsComponent implements OnInit {
    // private text2speech: TNSTextToSpeech;
    private speech2text: SpeechRecognition;
    microphoneEnabled: boolean = false;
    recording: boolean = false;
    lastTranscription: string = null;
    spoken: boolean = false;
    recognizedText: string;
    pitch: number = 100;
    private recordingAvailable: boolean;

    constructor(){}

    ngOnInit(): void {
        this.speech2text = new SpeechRecognition();
        this.speech2text.available().then(avail => {
            this.recordingAvailable = avail;
            setTimeout(() => {
                this.speech2text.requestPermission().then((granted: boolean) => {
                this.microphoneEnabled = granted;
                    //   if (!isIOS) {
                    //     Camera.requestPermissions();
                    //   }
                });
            }, 1000);
        });
    }

    toggleRecording(): void {
        this.recording = !this.recording;
        if (this.recording) {
          this.spoken = false;
          this.lastTranscription = null;
          this.startListening();
        } else {
          this.stopListening();
          if (!this.spoken && this.lastTranscription !== null) {
            console.log(this.lastTranscription);
          }
        }
      }
    
      private startListening(): void {
        if (!this.recordingAvailable) {
          alert({
            title: "Not supported",
            message: "Speech recognition not supported on this device. Try a different device please.",
            okButtonText: "Oh, bummer"
          });
          this.recognizedText = "No support, Sorry";
          this.recording = false;
          return;
        }
    
        this.recording = true;
        this.speech2text.startListening({
          returnPartialResults: true,
          onResult: (transcription: SpeechRecognitionTranscription) => {
            // this.zone.run(() => this.recognizedText = transcription.text);
            this.lastTranscription = transcription.text;
            if (transcription.finished) {
              this.spoken = true;
              setTimeout(() => console.log(transcription.text), 300);
            }
          },
        }).then(
            (started: boolean) => {
              console.log("started listening");
            },
            (errorMessage: string) => {
              console.log(`Error: ${errorMessage}`);
            }
        );
      }
    
      private stopListening(): void {
        this.recording = false;
        this.speech2text.stopListening().then(() => {
          console.log("Stopped listening");
        });
      }
    
}


/* 
    speechOptions: SpeechRecognitionOptions;
    constructor( private speech: SpeechRecognition) {
        // Use the component constructor to inject providers.
        this.speechOptions = {
            locale: 'en-Us',
            onResult: (transcription: SpeechRecognitionTranscription) => {
                    this.textToSay = '';
                    this.textToSay = transcription.text;
                    alert(transcription.text);
                    console.log(transcription.text);
            }
        } 
    }

    ngOnInit(): void {
        // Init your component properties here.
    }
     //sppech to text
     speechToText(){
        this.speech.available().then(
            result => { result ? this.startListening(): alert('Speech recognization is not available');},
            err => { console.log(err);});
    }

    startListening(){
        this.speech.startListening(
            {
              // optional, uses the device locale by default
              locale: "en-US",
              // set to true to get results back continuously
              returnPartialResults: true,
              // this callback will be invoked repeatedly during recognition
              onResult: (transcription: SpeechRecognitionTranscription) => {
                console.log(`User said: ${transcription.text}`);
                console.log(`User finished?: ${transcription.finished}`);
              },
              onError: (error: string | number) => {
              }
            }
          ).then(
            (started: boolean) => { console.log(`started listening`) },
            (errorMessage: string) => { console.log(`Error: ${errorMessage}`); }
          ).catch((error: string | number) => {
          });
    }

    stopListening(){
        this.speech.stopListening().then(
          () => { console.log('stopped listening');},
          err => { console.log(err);}
        );
    }
       

   
*/