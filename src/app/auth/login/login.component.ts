import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ns-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  moduleId: module.id,
})
export class LoginComponent implements OnInit {

  constructor(private router: Router) { }

  login(){
    this.router.navigate(["/home"]);
  }

  ngOnInit() {
  }

}
