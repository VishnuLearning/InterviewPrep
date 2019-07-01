import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ChangeDetectionStrategy } from "@angular/core";

class listpoints {
  constructor(public instruction: string) { }
}

@Component({
  selector: 'ns-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css'],
  moduleId: module.id,
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class InstructionsComponent implements OnInit {
  public data : Array<listpoints>;
  points = ['Go to your device settings and make sure English is selected as your input language for Text-to-Speech and voice input.',
    'Choose the Type of Interview, select subject/lesson ','Tap the speaker icon, listen to the question carefully and try to understand it.',
    'Click Show Answer and speaker button, listen to the answer, think about it.','Click the microphone button, allow access to the mic if asked.',
    'Read the answer clearly, loudly and continuously without any pause.','Click the Score button to see your score. If it is below 50%, repeat steps 4-5',
    'Tap Right arrow to go to the next question, REPEAT steps 3-7','When finished with a lesson, tap the return to go to the main page.','Choose another subject/lesson or tap return to exit the App.',
  '*HINT**','To become confident and fluent, try to read the answers imitating the way the App reads it, paying attention to the pronunciation and intonation.',
'Try to memorize the questions and answers as much as possible. You may want to rewrite the answers in your own words and practice reading them clearly, loudly and continuously.']

  constructor(private router: Router ) {
    this.data = [];

        for (let i = 0; i < this.points.length; i++) {
            this.data.push(new listpoints(this.points[i]));
            console.log(this.data);
        }

   }
   
  backToHomePage(){
    this.router.navigate(['/home']);
  }

  ngOnInit() {
  }

}
