"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var nativescript_speech_recognition_1 = require("nativescript-speech-recognition");
var StsComponent = /** @class */ (function () {
    function StsComponent() {
        this.microphoneEnabled = false;
        this.recording = false;
        this.lastTranscription = null;
        this.spoken = false;
        this.pitch = 100;
    }
    StsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.speech2text = new nativescript_speech_recognition_1.SpeechRecognition();
        this.speech2text.available().then(function (avail) {
            _this.recordingAvailable = avail;
            setTimeout(function () {
                _this.speech2text.requestPermission().then(function (granted) {
                    _this.microphoneEnabled = granted;
                    //   if (!isIOS) {
                    //     Camera.requestPermissions();
                    //   }
                });
            }, 1000);
        });
    };
    StsComponent.prototype.toggleRecording = function () {
        this.recording = !this.recording;
        if (this.recording) {
            this.spoken = false;
            this.lastTranscription = null;
            this.startListening();
        }
        else {
            this.stopListening();
            if (!this.spoken && this.lastTranscription !== null) {
                console.log(this.lastTranscription);
            }
        }
    };
    StsComponent.prototype.startListening = function () {
        var _this = this;
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
            onResult: function (transcription) {
                // this.zone.run(() => this.recognizedText = transcription.text);
                _this.lastTranscription = transcription.text;
                if (transcription.finished) {
                    _this.spoken = true;
                    setTimeout(function () { return console.log(transcription.text); }, 300);
                }
            },
        }).then(function (started) {
            console.log("started listening");
        }, function (errorMessage) {
            console.log("Error: " + errorMessage);
        });
    };
    StsComponent.prototype.stopListening = function () {
        this.recording = false;
        this.speech2text.stopListening().then(function () {
            console.log("Stopped listening");
        });
    };
    StsComponent = __decorate([
        core_1.Component({
            selector: "Sts",
            moduleId: module.id,
            templateUrl: "./sts.html"
        }),
        __metadata("design:paramtypes", [])
    ], StsComponent);
    return StsComponent;
}());
exports.StsComponent = StsComponent;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic3RzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtEO0FBQ2xELG1GQUE2SDtBQVM3SDtJQVdJO1FBUkEsc0JBQWlCLEdBQVksS0FBSyxDQUFDO1FBQ25DLGNBQVMsR0FBWSxLQUFLLENBQUM7UUFDM0Isc0JBQWlCLEdBQVcsSUFBSSxDQUFDO1FBQ2pDLFdBQU0sR0FBWSxLQUFLLENBQUM7UUFFeEIsVUFBSyxHQUFXLEdBQUcsQ0FBQztJQUdOLENBQUM7SUFFZiwrQkFBUSxHQUFSO1FBQUEsaUJBYUM7UUFaRyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksbURBQWlCLEVBQUUsQ0FBQztRQUMzQyxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFBLEtBQUs7WUFDbkMsS0FBSSxDQUFDLGtCQUFrQixHQUFHLEtBQUssQ0FBQztZQUNoQyxVQUFVLENBQUM7Z0JBQ1AsS0FBSSxDQUFDLFdBQVcsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFDLE9BQWdCO29CQUMzRCxLQUFJLENBQUMsaUJBQWlCLEdBQUcsT0FBTyxDQUFDO29CQUM3QixrQkFBa0I7b0JBQ2xCLG1DQUFtQztvQkFDbkMsTUFBTTtnQkFDVixDQUFDLENBQUMsQ0FBQztZQUNQLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNiLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELHNDQUFlLEdBQWY7UUFDSSxJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUNqQyxJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDbEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7WUFDcEIsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQztZQUM5QixJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7U0FDdkI7YUFBTTtZQUNMLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztZQUNyQixJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsaUJBQWlCLEtBQUssSUFBSSxFQUFFO2dCQUNuRCxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO2FBQ3JDO1NBQ0Y7SUFDSCxDQUFDO0lBRU8scUNBQWMsR0FBdEI7UUFBQSxpQkErQkM7UUE5QkMsSUFBSSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsRUFBRTtZQUM1QixLQUFLLENBQUM7Z0JBQ0osS0FBSyxFQUFFLGVBQWU7Z0JBQ3RCLE9BQU8sRUFBRSxpRkFBaUY7Z0JBQzFGLFlBQVksRUFBRSxZQUFZO2FBQzNCLENBQUMsQ0FBQztZQUNILElBQUksQ0FBQyxjQUFjLEdBQUcsbUJBQW1CLENBQUM7WUFDMUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7WUFDdkIsT0FBTztTQUNSO1FBRUQsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7UUFDdEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxjQUFjLENBQUM7WUFDOUIsb0JBQW9CLEVBQUUsSUFBSTtZQUMxQixRQUFRLEVBQUUsVUFBQyxhQUE2QztnQkFDdEQsaUVBQWlFO2dCQUNqRSxLQUFJLENBQUMsaUJBQWlCLEdBQUcsYUFBYSxDQUFDLElBQUksQ0FBQztnQkFDNUMsSUFBSSxhQUFhLENBQUMsUUFBUSxFQUFFO29CQUMxQixLQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztvQkFDbkIsVUFBVSxDQUFDLGNBQU0sT0FBQSxPQUFPLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsRUFBL0IsQ0FBK0IsRUFBRSxHQUFHLENBQUMsQ0FBQztpQkFDeEQ7WUFDSCxDQUFDO1NBQ0YsQ0FBQyxDQUFDLElBQUksQ0FDSCxVQUFDLE9BQWdCO1lBQ2YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1FBQ25DLENBQUMsRUFDRCxVQUFDLFlBQW9CO1lBQ25CLE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBVSxZQUFjLENBQUMsQ0FBQztRQUN4QyxDQUFDLENBQ0osQ0FBQztJQUNKLENBQUM7SUFFTyxvQ0FBYSxHQUFyQjtRQUNFLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxFQUFFLENBQUMsSUFBSSxDQUFDO1lBQ3BDLE9BQU8sQ0FBQyxHQUFHLENBQUMsbUJBQW1CLENBQUMsQ0FBQztRQUNuQyxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFoRk0sWUFBWTtRQU54QixnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLEtBQUs7WUFDZixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsV0FBVyxFQUFFLFlBQVk7U0FDNUIsQ0FBQzs7T0FFVyxZQUFZLENBa0Z4QjtJQUFELG1CQUFDO0NBQUEsQUFsRkQsSUFrRkM7QUFsRlksb0NBQVk7QUFxRnpCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztFQXdERSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHtTcGVlY2hSZWNvZ25pdGlvbiwgU3BlZWNoUmVjb2duaXRpb25PcHRpb25zLCBTcGVlY2hSZWNvZ25pdGlvblRyYW5zY3JpcHRpb24gfSBmcm9tIFwibmF0aXZlc2NyaXB0LXNwZWVjaC1yZWNvZ25pdGlvblwiO1xyXG5cclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6IFwiU3RzXCIsXHJcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxyXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9zdHMuaHRtbFwiXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgU3RzQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICAgIC8vIHByaXZhdGUgdGV4dDJzcGVlY2g6IFROU1RleHRUb1NwZWVjaDtcclxuICAgIHByaXZhdGUgc3BlZWNoMnRleHQ6IFNwZWVjaFJlY29nbml0aW9uO1xyXG4gICAgbWljcm9waG9uZUVuYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHJlY29yZGluZzogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgbGFzdFRyYW5zY3JpcHRpb246IHN0cmluZyA9IG51bGw7XHJcbiAgICBzcG9rZW46IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHJlY29nbml6ZWRUZXh0OiBzdHJpbmc7XHJcbiAgICBwaXRjaDogbnVtYmVyID0gMTAwO1xyXG4gICAgcHJpdmF0ZSByZWNvcmRpbmdBdmFpbGFibGU6IGJvb2xlYW47XHJcblxyXG4gICAgY29uc3RydWN0b3IoKXt9XHJcblxyXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5zcGVlY2gydGV4dCA9IG5ldyBTcGVlY2hSZWNvZ25pdGlvbigpO1xyXG4gICAgICAgIHRoaXMuc3BlZWNoMnRleHQuYXZhaWxhYmxlKCkudGhlbihhdmFpbCA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMucmVjb3JkaW5nQXZhaWxhYmxlID0gYXZhaWw7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zcGVlY2gydGV4dC5yZXF1ZXN0UGVybWlzc2lvbigpLnRoZW4oKGdyYW50ZWQ6IGJvb2xlYW4pID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMubWljcm9waG9uZUVuYWJsZWQgPSBncmFudGVkO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgaWYgKCFpc0lPUykge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICBDYW1lcmEucmVxdWVzdFBlcm1pc3Npb25zKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSwgMTAwMCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgdG9nZ2xlUmVjb3JkaW5nKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMucmVjb3JkaW5nID0gIXRoaXMucmVjb3JkaW5nO1xyXG4gICAgICAgIGlmICh0aGlzLnJlY29yZGluZykge1xyXG4gICAgICAgICAgdGhpcy5zcG9rZW4gPSBmYWxzZTtcclxuICAgICAgICAgIHRoaXMubGFzdFRyYW5zY3JpcHRpb24gPSBudWxsO1xyXG4gICAgICAgICAgdGhpcy5zdGFydExpc3RlbmluZygpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLnN0b3BMaXN0ZW5pbmcoKTtcclxuICAgICAgICAgIGlmICghdGhpcy5zcG9rZW4gJiYgdGhpcy5sYXN0VHJhbnNjcmlwdGlvbiAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmxhc3RUcmFuc2NyaXB0aW9uKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIFxyXG4gICAgICBwcml2YXRlIHN0YXJ0TGlzdGVuaW5nKCk6IHZvaWQge1xyXG4gICAgICAgIGlmICghdGhpcy5yZWNvcmRpbmdBdmFpbGFibGUpIHtcclxuICAgICAgICAgIGFsZXJ0KHtcclxuICAgICAgICAgICAgdGl0bGU6IFwiTm90IHN1cHBvcnRlZFwiLFxyXG4gICAgICAgICAgICBtZXNzYWdlOiBcIlNwZWVjaCByZWNvZ25pdGlvbiBub3Qgc3VwcG9ydGVkIG9uIHRoaXMgZGV2aWNlLiBUcnkgYSBkaWZmZXJlbnQgZGV2aWNlIHBsZWFzZS5cIixcclxuICAgICAgICAgICAgb2tCdXR0b25UZXh0OiBcIk9oLCBidW1tZXJcIlxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgICB0aGlzLnJlY29nbml6ZWRUZXh0ID0gXCJObyBzdXBwb3J0LCBTb3JyeVwiO1xyXG4gICAgICAgICAgdGhpcy5yZWNvcmRpbmcgPSBmYWxzZTtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICB0aGlzLnJlY29yZGluZyA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5zcGVlY2gydGV4dC5zdGFydExpc3RlbmluZyh7XHJcbiAgICAgICAgICByZXR1cm5QYXJ0aWFsUmVzdWx0czogdHJ1ZSxcclxuICAgICAgICAgIG9uUmVzdWx0OiAodHJhbnNjcmlwdGlvbjogU3BlZWNoUmVjb2duaXRpb25UcmFuc2NyaXB0aW9uKSA9PiB7XHJcbiAgICAgICAgICAgIC8vIHRoaXMuem9uZS5ydW4oKCkgPT4gdGhpcy5yZWNvZ25pemVkVGV4dCA9IHRyYW5zY3JpcHRpb24udGV4dCk7XHJcbiAgICAgICAgICAgIHRoaXMubGFzdFRyYW5zY3JpcHRpb24gPSB0cmFuc2NyaXB0aW9uLnRleHQ7XHJcbiAgICAgICAgICAgIGlmICh0cmFuc2NyaXB0aW9uLmZpbmlzaGVkKSB7XHJcbiAgICAgICAgICAgICAgdGhpcy5zcG9rZW4gPSB0cnVlO1xyXG4gICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gY29uc29sZS5sb2codHJhbnNjcmlwdGlvbi50ZXh0KSwgMzAwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSxcclxuICAgICAgICB9KS50aGVuKFxyXG4gICAgICAgICAgICAoc3RhcnRlZDogYm9vbGVhbikgPT4ge1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwic3RhcnRlZCBsaXN0ZW5pbmdcIik7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIChlcnJvck1lc3NhZ2U6IHN0cmluZykgPT4ge1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKGBFcnJvcjogJHtlcnJvck1lc3NhZ2V9YCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICApO1xyXG4gICAgICB9XHJcbiAgICBcclxuICAgICAgcHJpdmF0ZSBzdG9wTGlzdGVuaW5nKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMucmVjb3JkaW5nID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5zcGVlY2gydGV4dC5zdG9wTGlzdGVuaW5nKCkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcIlN0b3BwZWQgbGlzdGVuaW5nXCIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICBcclxufVxyXG5cclxuXHJcbi8qIFxyXG4gICAgc3BlZWNoT3B0aW9uczogU3BlZWNoUmVjb2duaXRpb25PcHRpb25zO1xyXG4gICAgY29uc3RydWN0b3IoIHByaXZhdGUgc3BlZWNoOiBTcGVlY2hSZWNvZ25pdGlvbikge1xyXG4gICAgICAgIC8vIFVzZSB0aGUgY29tcG9uZW50IGNvbnN0cnVjdG9yIHRvIGluamVjdCBwcm92aWRlcnMuXHJcbiAgICAgICAgdGhpcy5zcGVlY2hPcHRpb25zID0ge1xyXG4gICAgICAgICAgICBsb2NhbGU6ICdlbi1VcycsXHJcbiAgICAgICAgICAgIG9uUmVzdWx0OiAodHJhbnNjcmlwdGlvbjogU3BlZWNoUmVjb2duaXRpb25UcmFuc2NyaXB0aW9uKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50ZXh0VG9TYXkgPSAnJztcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRleHRUb1NheSA9IHRyYW5zY3JpcHRpb24udGV4dDtcclxuICAgICAgICAgICAgICAgICAgICBhbGVydCh0cmFuc2NyaXB0aW9uLnRleHQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRyYW5zY3JpcHRpb24udGV4dCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IFxyXG4gICAgfVxyXG5cclxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xyXG4gICAgICAgIC8vIEluaXQgeW91ciBjb21wb25lbnQgcHJvcGVydGllcyBoZXJlLlxyXG4gICAgfVxyXG4gICAgIC8vc3BwZWNoIHRvIHRleHRcclxuICAgICBzcGVlY2hUb1RleHQoKXtcclxuICAgICAgICB0aGlzLnNwZWVjaC5hdmFpbGFibGUoKS50aGVuKFxyXG4gICAgICAgICAgICByZXN1bHQgPT4geyByZXN1bHQgPyB0aGlzLnN0YXJ0TGlzdGVuaW5nKCk6IGFsZXJ0KCdTcGVlY2ggcmVjb2duaXphdGlvbiBpcyBub3QgYXZhaWxhYmxlJyk7fSxcclxuICAgICAgICAgICAgZXJyID0+IHsgY29uc29sZS5sb2coZXJyKTt9KTtcclxuICAgIH1cclxuXHJcbiAgICBzdGFydExpc3RlbmluZygpe1xyXG4gICAgICAgIHRoaXMuc3BlZWNoLnN0YXJ0TGlzdGVuaW5nKFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgLy8gb3B0aW9uYWwsIHVzZXMgdGhlIGRldmljZSBsb2NhbGUgYnkgZGVmYXVsdFxyXG4gICAgICAgICAgICAgIGxvY2FsZTogXCJlbi1VU1wiLFxyXG4gICAgICAgICAgICAgIC8vIHNldCB0byB0cnVlIHRvIGdldCByZXN1bHRzIGJhY2sgY29udGludW91c2x5XHJcbiAgICAgICAgICAgICAgcmV0dXJuUGFydGlhbFJlc3VsdHM6IHRydWUsXHJcbiAgICAgICAgICAgICAgLy8gdGhpcyBjYWxsYmFjayB3aWxsIGJlIGludm9rZWQgcmVwZWF0ZWRseSBkdXJpbmcgcmVjb2duaXRpb25cclxuICAgICAgICAgICAgICBvblJlc3VsdDogKHRyYW5zY3JpcHRpb246IFNwZWVjaFJlY29nbml0aW9uVHJhbnNjcmlwdGlvbikgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coYFVzZXIgc2FpZDogJHt0cmFuc2NyaXB0aW9uLnRleHR9YCk7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgVXNlciBmaW5pc2hlZD86ICR7dHJhbnNjcmlwdGlvbi5maW5pc2hlZH1gKTtcclxuICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgIG9uRXJyb3I6IChlcnJvcjogc3RyaW5nIHwgbnVtYmVyKSA9PiB7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICApLnRoZW4oXHJcbiAgICAgICAgICAgIChzdGFydGVkOiBib29sZWFuKSA9PiB7IGNvbnNvbGUubG9nKGBzdGFydGVkIGxpc3RlbmluZ2ApIH0sXHJcbiAgICAgICAgICAgIChlcnJvck1lc3NhZ2U6IHN0cmluZykgPT4geyBjb25zb2xlLmxvZyhgRXJyb3I6ICR7ZXJyb3JNZXNzYWdlfWApOyB9XHJcbiAgICAgICAgICApLmNhdGNoKChlcnJvcjogc3RyaW5nIHwgbnVtYmVyKSA9PiB7XHJcbiAgICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBzdG9wTGlzdGVuaW5nKCl7XHJcbiAgICAgICAgdGhpcy5zcGVlY2guc3RvcExpc3RlbmluZygpLnRoZW4oXHJcbiAgICAgICAgICAoKSA9PiB7IGNvbnNvbGUubG9nKCdzdG9wcGVkIGxpc3RlbmluZycpO30sXHJcbiAgICAgICAgICBlcnIgPT4geyBjb25zb2xlLmxvZyhlcnIpO31cclxuICAgICAgICApO1xyXG4gICAgfVxyXG4gICAgICAgXHJcblxyXG4gICBcclxuKi8iXX0=