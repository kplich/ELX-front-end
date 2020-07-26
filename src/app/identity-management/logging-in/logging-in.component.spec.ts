import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {
  BUTTON_LOG_IN_TEXT,
  LoggingInComponent,
  PASSWORD_LABEL,
  PASSWORD_REQUIRED_MESSAGE,
  USERNAME_LABEL,
  USERNAME_REQUIRED_MESSAGE
} from './logging-in.component';
import {AuthenticationService} from '../authentication-service/authentication.service';
import {Router} from '@angular/router';
import {SnackBarService} from '../../shared/snack-bar-service/snack-bar.service';
import {MaterialModule} from '../../material/material.module';
import {HarnessLoader} from '@angular/cdk/testing';
import {MatFormFieldHarness} from '@angular/material/form-field/testing';
import {MatInputHarness} from '@angular/material/input/testing';
import {MatButtonHarness} from '@angular/material/button/testing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ReactiveFormsModule} from '@angular/forms';
import {TestbedHarnessEnvironment} from '@angular/cdk/testing/testbed';

describe('LoggingInComponent', () => {
  const authenticationServiceSpy = jasmine.createSpyObj('AuthenticationService', ['logIn']);
  const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
  const snackBarServiceSpy = jasmine.createSpyObj('SnackBarService', ['openSnackBar']);

  let fixture: ComponentFixture<LoggingInComponent>;
  let loader: HarnessLoader;

  let usernameFormField: MatFormFieldHarness;
  let usernameInput: MatInputHarness;
  let passwordFormField: MatFormFieldHarness;
  let passwordInput: MatInputHarness;
  let loggingInButton: MatButtonHarness;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule, BrowserAnimationsModule, ReactiveFormsModule],
      declarations: [LoggingInComponent],
      providers: [
        {provide: AuthenticationService, useValue: authenticationServiceSpy},
        {provide: Router, useValue: routerSpy},
        {provide: SnackBarService, useValue: snackBarServiceSpy}
      ]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(LoggingInComponent);
      loader = TestbedHarnessEnvironment.loader(fixture);

      loader.getHarness(MatFormFieldHarness.with({selector: '#username-form-field'}))
        .then(harness => {
          usernameFormField = harness;
        });
      loader.getHarness(MatInputHarness.with({selector: '#username-form-field input'}))
        .then(harness => {
          usernameInput = harness;
        });
      loader.getHarness(MatFormFieldHarness.with({selector: '#password-form-field'}))
        .then(harness => {
          passwordFormField = harness;
        });
      loader.getHarness(MatInputHarness.with({selector: '#password-form-field input'}))
        .then(harness => {
          passwordInput = harness;
        });
      loader.getHarness(MatButtonHarness.with({text: BUTTON_LOG_IN_TEXT}))
        .then(harness => {
          loggingInButton = harness;
        });
    });
  }));

  it('should be created and displayed correctly', async(async () => {
    expect(fixture.componentInstance).toBeTruthy();

    // should display labels on fields
    expect(await usernameFormField.getLabel()).toEqual(USERNAME_LABEL);
    expect(await passwordFormField.getLabel()).toEqual(PASSWORD_LABEL);

    // the form should be invalid
    expect(fixture.componentInstance.loggingInForm.valid).toBeFalsy();

    // the registration button should be disabled
    expect(await loggingInButton.getText()).toEqual(BUTTON_LOG_IN_TEXT);
    expect(await loggingInButton.isDisabled()).toBeTruthy();
  }));

  it('should display errors and not allow to log in after touching the fields', async () => {
    await usernameInput.focus();
    await usernameInput.blur();

    expect(await usernameFormField.hasErrors()).toBeTruthy();
    expect((await usernameFormField.getTextErrors())[0]).toEqual(USERNAME_REQUIRED_MESSAGE);

    await passwordInput.focus();
    await passwordInput.blur();

    expect(await passwordFormField.hasErrors()).toBeTruthy();
    expect((await passwordFormField.getTextErrors())[0]).toEqual(PASSWORD_REQUIRED_MESSAGE);

    await loggingInButton.click();
    expect(authenticationServiceSpy.logIn).not.toHaveBeenCalled();
  });

  it('should allow to log in when credentials are correct', async () => {
    // when providing correct credentials
    await usernameInput.setValue('username');
    await usernameInput.blur();
    await passwordInput.setValue('password');
    await passwordInput.blur();

    // the form should be valid
    expect(fixture.componentInstance.username.valid).toBeTruthy();
    expect(fixture.componentInstance.password.valid).toBeTruthy();
    expect(fixture.componentInstance.loggingInForm.valid).toBeTruthy();

    // form fields should not display anything
    expect(await usernameFormField.hasErrors()).toBeFalsy();
    expect(await passwordFormField.hasErrors()).toBeFalsy();

    // the button should be active
    expect(await loggingInButton.isDisabled()).toBeFalsy();

    await loggingInButton.click();
    expect(authenticationServiceSpy.logIn).toHaveBeenCalled();
  });
});
