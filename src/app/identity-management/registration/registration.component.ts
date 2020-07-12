import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';

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

  registrationForm: FormGroup;
  errorStateMatcher: ErrorStateMatcher = new MyErrorStateMatcher();

  constructor() {
    this.registrationForm = new FormGroup({
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
  }

  ngOnInit(): void {
  }

  register() {

  }

  get username(): FormControl {
    return this.registrationForm.get('username') as FormControl;
  }

  get password(): FormControl {
    return this.registrationForm.get('password') as FormControl;
  }

}
