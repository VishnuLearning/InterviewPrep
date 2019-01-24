import { Component, OnInit, Input } from "@angular/core";
import { Question } from "../../classes/question";

@Component({
	selector: "Question",
	moduleId: module.id,
	templateUrl: "./question.component.html",
	styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
	@Input() question: Question;

	constructor() {
	}

	ngOnInit(): void {
		console.log("Q" + this.question);
	}
}