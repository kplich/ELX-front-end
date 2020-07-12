import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthenticationService} from '../authentication-service/authentication.service';
import {HttpErrorResponse} from '@angular/common/http';
import {SnackBarService} from '../../shared/snack-bar-service/snack-bar.service';

@Component({
  selector: 'app-logging-in',
  templateUrl: './logging-in.component.html',
  styleUrls: ['./logging-in.component.scss']
})
export class LoggingInComponent implements OnInit {

  loggingInForm: FormGroup;
  private errorResponse: HttpErrorResponse = undefined;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private snackBarService: SnackBarService) {
    this.loggingInForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  ngOnInit() {
  }

  login() {
    this.authenticationService.logIn({username: this.username.value, password: this.password.value}).subscribe({
      next: _ => {
        this.router.navigateByUrl('/browse-items').then(_ => {
          this.snackBarService.openSnackBar(`Welcome, ${this.username.value}`);
        });
      },
      error: errorResponse => this.openErrorSnackBar(errorResponse)
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

  get unauthorizedLogin(): boolean {
    return this.errorResponse !== undefined && (this.errorResponse.status === 401 || this.errorResponse.status === 400);
  }

  get serverError(): boolean {
    return this.errorResponse !== undefined && !this.unauthorizedLogin;
  }

  private openErrorSnackBar(errorResponse: HttpErrorResponse) {
    if (errorResponse.status === 401 || errorResponse.status === 400) {
      this.snackBarService.openSnackBar('Incorrect username or password!');
    }
    else {
      this.snackBarService.openSnackBar('Server error! Try again');
    }
  }
}
