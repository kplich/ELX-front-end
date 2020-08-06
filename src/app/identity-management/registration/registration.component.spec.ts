import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {
    BUTTON_REGISTER_TEXT,
    MINIMUM_PASSWORD_LENGTH_MESSAGE,
    PASSWORD_HINT,
    PASSWORD_LABEL,
    PASSWORD_REQUIRED_MESSAGE,
    RegistrationComponent,
    USERNAME_HINT,
    USERNAME_LABEL,
    USERNAME_PATTERN_MESSAGE,
    USERNAME_REQUIRED_MESSAGE
} from './registration.component';
import {AuthenticationService} from '../authentication-service/authentication.service';
import {Router} from '@angular/router';
import {SnackBarService} from '../../shared/snack-bar-service/snack-bar.service';
import {MaterialModule} from '../../material/material.module';
import {HarnessLoader} from '@angular/cdk/testing';
import {TestbedHarnessEnvironment} from '@angular/cdk/testing/testbed';
import {MatButtonHarness} from '@angular/material/button/testing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldHarness} from '@angular/material/form-field/testing';
import {MatInputHarness} from '@angular/material/input/testing';
import {Observable} from 'rxjs';

describe('RegistrationComponent', () => {
    const authenticationServiceSpy = jasmine.createSpyObj('AuthenticationService', ['signUp']);
    authenticationServiceSpy.signUp.and.returnValue(new Observable(() => {
    }));
    const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
    const snackBarServiceSpy = jasmine.createSpyObj('SnackBarService', ['openSnackBar']);

    let fixture: ComponentFixture<RegistrationComponent>;
    let loader: HarnessLoader;

    let usernameFormField: MatFormFieldHarness;
    let usernameInput: MatInputHarness;
    let passwordFormField: MatFormFieldHarness;
    let passwordInput: MatInputHarness;
    let registrationButton: MatButtonHarness;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [MaterialModule, BrowserAnimationsModule, ReactiveFormsModule],
            declarations: [RegistrationComponent],
            providers: [
                {provide: AuthenticationService, useValue: authenticationServiceSpy},
                {provide: Router, useValue: routerSpy},
                {provide: SnackBarService, useValue: snackBarServiceSpy}
            ]
        }).compileComponents().then(async () => {
            fixture = TestBed.createComponent(RegistrationComponent);
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

            registrationButton = await loader.getHarness(MatButtonHarness);
        });
    }));

    it('should be created and displayed correctly', async(async () => {
        expect(fixture.componentInstance).toBeTruthy();

        // should display a label and a hint
        expect(await usernameFormField.getLabel()).toEqual(USERNAME_LABEL);
        expect((await usernameFormField.getTextHints())[0]).toEqual(USERNAME_HINT);

        expect(await passwordFormField.getLabel()).toEqual(PASSWORD_LABEL);
        expect((await passwordFormField.getTextHints())[0]).toEqual(PASSWORD_HINT);

        // the form should be invalid
        expect(fixture.componentInstance.form.valid).toBeFalsy();

        // the registration button should be disabled
        expect(await registrationButton.getText()).toEqual(BUTTON_REGISTER_TEXT);
        expect(await registrationButton.isDisabled()).toBeTruthy();
    }));

    it('should not be able to invoke service methods', async(async () => {
        // the form should be invalid and the registration button disabled
        expect(fixture.componentInstance.form.valid).toBeFalsy();
        expect(await registrationButton.isDisabled()).toBeTruthy();

        // click the button and check that the service hasn't been called
        await registrationButton.click();
        expect(authenticationServiceSpy.signUp).not.toHaveBeenCalled();
    }));

    it('should display errors after touching the fields', async(async () => {
        await usernameInput.focus();
        await usernameInput.blur();

        expect(await usernameFormField.hasErrors()).toBeTruthy();
        expect((await usernameFormField.getTextErrors())[0]).toEqual(USERNAME_REQUIRED_MESSAGE);

        await passwordInput.focus();
        await passwordInput.blur();

        expect(await passwordFormField.hasErrors()).toBeTruthy();
        expect((await passwordFormField.getTextErrors())[0]).toEqual(PASSWORD_REQUIRED_MESSAGE);
    }));

    it('should show an error when incorrect username is provided', async(async () => {
        await usernameInput.setValue('kplich^^^');
        expect(fixture.componentInstance.controls.username.valid).toBeFalsy();
        expect(await usernameFormField.hasErrors()).toBeTruthy();
        expect((await usernameFormField.getTextErrors())[0]).toEqual(USERNAME_PATTERN_MESSAGE);
    }));

    it('should show an error when password is too short', async(async () => {
        await passwordInput.setValue('pass');
        expect(fixture.componentInstance.controls.password.valid).toBeFalsy();
        expect(await passwordFormField.hasErrors()).toBeTruthy();
        expect((await passwordFormField.getTextErrors())[0])
            .toEqual(MINIMUM_PASSWORD_LENGTH_MESSAGE);
    }));

    it('should allow to sign up when credentials are correct', async(async () => {
        // when providing correct credentials
        await usernameInput.setValue('username');
        await usernameInput.blur();
        await passwordInput.setValue('P@ssw0rd');
        await passwordInput.blur();

        // the form should be valid
        expect(fixture.componentInstance.controls.username.valid).toBeTruthy();
        expect(fixture.componentInstance.controls.password.valid).toBeTruthy();
        expect(fixture.componentInstance.form.valid).toBeTruthy();

        // form fields should not display anything
        expect(await usernameFormField.hasErrors()).toBeFalsy();
        expect((await usernameFormField.getTextHints()).length).toEqual(0);
        expect(await passwordFormField.hasErrors()).toBeFalsy();
        expect((await passwordFormField.getTextHints()).length).toEqual(0);

        // the button should be active
        expect(await registrationButton.isDisabled()).toBeFalsy();

        await registrationButton.click();
        expect(authenticationServiceSpy.signUp).toHaveBeenCalled();
    }));
});
