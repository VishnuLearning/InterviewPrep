import { ViewChild } from "@angular/core";
import { RadSideDrawerComponent, SideDrawerType } from "nativescript-ui-sidedrawer/angular";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { Response } from "@angular/http";
import { PathService } from "../../services/path.service";
import { Router, ActivatedRoute } from '@angular/router';
import { Question } from "../../classes/question";
import { SwipeGestureEventData } from "tns-core-modules/ui/gestures";

@Component({
	selector: "Questions",
	moduleId: module.id,
	providers: [PathService],
	templateUrl: "./questions.component.html",
	styleUrls: ['./questions.component.css']
})

export class QuestionsComponent implements OnInit, OnDestroy {
	@ViewChild(RadSideDrawerComponent) public drawerComponent: RadSideDrawerComponent;
	onOpenDrawerTap() {
		this.drawerComponent.sideDrawer.showDrawer();
	}

	path: string;
	questions: Question[];
	question: Question;
	qnum: number;
	private sub: any;

	constructor(private pathservice: PathService, private route: ActivatedRoute) {
		this.questions = [];
		this.qnum = 0;
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
		this.qnum = i;
	}

	ngOnInit(): void {
		this.sub = this.route.params.subscribe(params => {
			this.path = params['path'];
			console.log(this.path);
			this.pathservice.getQuestions(this.path)
				.subscribe(
					(d: Question[]) => {
						this.question = d[0];
						this.questions = d;

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