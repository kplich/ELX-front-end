import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {AuthenticationService} from '../authentication-service/authentication.service';
import {Credentials} from '../authentication-service/Credentials';
import {SnackBarService} from '../../shared/snack-bar-service/snack-bar.service';
import {Router} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';

// https://material.angular.io/components/input/overview#changing-when-error-messages-are-shown
/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  minimumUsernameLength = 3;
  maximumUsernameLength = 20;
  // language=JSRegexp
  containsOnlyLettersDigitsAndUnderscoresPattern = '\\w*';

  // language=JSRegexp
  containsUppercaseLetterPattern = '.*[A-Z]+.*';
  // language=JSRegexp
  containsLowercaseLetterPattern = '.*[a-z]+.*';
  // language=JSRegexp
  containsDigitPattern = '.*\\d+.*';
  // language=JSRegexp
  containsSpecialCharacterPattern = '.*[\\W_]+.*';
  minimumPasswordLength = 8;
  maximumPasswordLength = 40;

  registrationForm: FormGroup = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(this.minimumUsernameLength),
      Validators.maxLength(this.maximumUsernameLength),
      Validators.pattern(this.containsOnlyLettersDigitsAndUnderscoresPattern)
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(this.containsLowercaseLetterPattern),
      Validators.pattern(this.containsUppercaseLetterPattern),
      Validators.pattern(this.containsDigitPattern),
      Validators.pattern(this.containsSpecialCharacterPattern),
      Validators.minLength(this.minimumPasswordLength),
      Validators.maxLength(this.maximumPasswordLength)
    ])
  });
  errorStateMatcher: ErrorStateMatcher = new MyErrorStateMatcher();

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private snackBarService: SnackBarService
  ) {
  }

  ngOnInit(): void {
  }

  register() {
    this.authenticationService.signUp(this.credentials).subscribe({
      // tslint:disable-next-line:no-shadowed-variable
      next: _ => this.router.navigateByUrl('/log-in').then(_ => {
        this.snackBarService.openSnackBar('Signed up successfully!');
      }),
      error: error => this.openSnackBarOnError(error)
    });
  }

  get username(): FormControl {
    return this.registrationForm.get('username') as FormControl;
  }

  get password(): FormControl {
    return this.registrationForm.get('password') as FormControl;
  }

  private get credentials(): Credentials {
    return {username: this.username.value, password: this.password.value};
  }

  private openSnackBarOnError(errorResponse: HttpErrorResponse) {
    switch (errorResponse.status) {
      case 400: {
        this.snackBarService.openSnackBar('Invalid request data!');
        break;
      }
      case 409: {
        this.snackBarService.openSnackBar('User with such username already exists!');
        break;
      }
      case 500: {
        this.snackBarService.openSnackBar('Server error, try again!');
        break;
      }
    }
  }

}
