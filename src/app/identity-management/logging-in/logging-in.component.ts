import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthenticationService} from '../authentication-service/authentication.service';

@Component({
  selector: 'app-logging-in',
  templateUrl: './logging-in.component.html',
  styleUrls: ['./logging-in.component.scss']
})
export class LoggingInComponent implements OnInit {

  loggingInForm: FormGroup;

  constructor(private authenticationService: AuthenticationService, private router: Router) {
    this.loggingInForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  ngOnInit() {
  }

  login() {
    this.authenticationService.logIn({username: this.username.value, password: this.password.value}).subscribe({
      next: _ => this.router.navigateByUrl('/browse-items')
    });
  }

  routeToRegistration() {
    this.router.navigateByUrl('/register').then(_ => {});
  }

  get username(): FormControl {
    return this.loggingInForm.get('username') as FormControl;
  }

  get password(): FormControl {
    return this.loggingInForm.get('password') as FormControl;
  }
}
