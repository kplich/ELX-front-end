import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-logging-in',
  templateUrl: './logging-in.component.html',
  styleUrls: ['./logging-in.component.scss']
})
export class LoggingInComponent implements OnInit {

  loggingInForm: FormGroup;

  constructor() {
    this.loggingInForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  ngOnInit() {
  }

  login() {

  }
}
