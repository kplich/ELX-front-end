import {async, TestBed} from '@angular/core/testing';

import {
    BUTTON_CHANGE_PASSWORD_TEXT,
    NEW_PASSWORD_HINT,
    NEW_PASSWORD_LABEL,
    NEW_PASSWORD_REQUIRED_MESSAGE,
    OLD_PASSWORD_LABEL,
    OLD_PASSWORD_REQUIRED_MESSAGE,
    PASSWORD_PATTERN_MESSAGE,
    SettingsComponent,
} from './settings.component';
import {MaterialModule} from 'src/app/material/material.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ReactiveFormsModule} from '@angular/forms';
import {AuthenticationService} from 'src/app/identity-management/authentication-service/authentication.service';
import {Router} from '@angular/router';
import {SnackBarService} from 'src/app/shared/snack-bar-service/snack-bar.service';
import {MatFormFieldHarness} from '@angular/material/form-field/testing';
import {MatInputHarness} from '@angular/material/input/testing';
import {MatButtonHarness} from '@angular/material/button/testing';
import {TestbedHarnessEnvironment} from '@angular/cdk/testing/testbed';

describe('SettingsComponent', () => {
    const harnessPredicates = {
        oldPasswordFormField: MatFormFieldHarness.with({selector: '#old-password-form-field'}),
        oldPasswordInput: MatInputHarness.with({selector: '#old-password-form-field input'}),
        newPasswordFormField: MatFormFieldHarness.with({selector: '#new-password-form-field'}),
        newPasswordInput: MatInputHarness.with({selector: '#new-password-form-field input'}),
        changePasswordButton: MatButtonHarness.with({selector: '#change-password-button'})
    };

    const authenticationServiceSpy = jasmine.createSpyObj('AuthenticationService', ['signUp']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
    const snackBarServiceSpy = jasmine.createSpyObj('SnackBarService', [
        'openSnackBar',
    ]);


    let component: SettingsComponent;

    let oldPasswordFormField: MatFormFieldHarness;
    let oldPasswordInput: MatInputHarness;
    let newPasswordFormField: MatFormFieldHarness;
    let newPasswordInput: MatInputHarness;
    let changePasswordButton: MatButtonHarness;

    // configure testing module
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [MaterialModule, BrowserAnimationsModule, ReactiveFormsModule],
            declarations: [SettingsComponent],
            providers: [
                {provide: AuthenticationService, useValue: authenticationServiceSpy},
                {provide: Router, useValue: routerSpy},
                {provide: SnackBarService, useValue: snackBarServiceSpy}
            ]
        }).compileComponents();
    }));

    // configure component elements
    beforeEach(async(async () => {
        const fixture = TestBed.createComponent(SettingsComponent);
        const loader = TestbedHarnessEnvironment.loader(fixture);
        component = fixture.componentInstance;

        oldPasswordFormField = await loader.getHarness(harnessPredicates.oldPasswordFormField);
        oldPasswordInput = await loader.getHarness(harnessPredicates.oldPasswordInput);
        newPasswordFormField = await loader.getHarness(harnessPredicates.newPasswordFormField);
        newPasswordInput = await loader.getHarness(harnessPredicates.newPasswordInput);
        changePasswordButton = await loader.getHarness(harnessPredicates.changePasswordButton);

        fixture.detectChanges();
    }));

    it('should be created and displayed correctly', async(async () => {
        expect(component).toBeTruthy();

        expect(await oldPasswordFormField.getLabel()).toEqual(OLD_PASSWORD_LABEL);

        expect(await newPasswordFormField.getLabel()).toEqual(NEW_PASSWORD_LABEL);
        expect((await newPasswordFormField.getTextHints())[0]).toEqual(
            NEW_PASSWORD_HINT
        );

        expect(component.form.valid).toBeFalsy();

        expect(await changePasswordButton.getText()).toEqual(
            BUTTON_CHANGE_PASSWORD_TEXT
        );
        expect(await changePasswordButton.isDisabled()).toBeTruthy();
    }));

    it('should display errors after touching the fields', async(async () => {
        await oldPasswordInput.focus();
        await oldPasswordInput.blur();

        expect(await oldPasswordFormField.hasErrors()).toBeTruthy();
        expect((await oldPasswordFormField.getTextErrors())[0]).toEqual(
            OLD_PASSWORD_REQUIRED_MESSAGE
        );

        await newPasswordInput.focus();
        await newPasswordInput.blur();

        expect(await newPasswordFormField.hasErrors()).toBeTruthy();
        expect((await newPasswordFormField.getTextErrors())[0]).toEqual(
            NEW_PASSWORD_REQUIRED_MESSAGE
        );
    }));

    it('should show an error when new password doesn\'t match the pattern', async(async () => {
        await newPasswordInput.setValue('password');
        await newPasswordInput.blur();

        expect(await newPasswordFormField.isControlValid()).toBeFalsy();
        expect(await newPasswordFormField.hasErrors()).toBeTruthy();
        expect((await newPasswordFormField.getTextErrors())[0]).toEqual(
            PASSWORD_PATTERN_MESSAGE
        );
    }));

    it('should show an error when new passwords match', async(async () => {
        const matchingPassword = 'P@ssw0rd';
        await oldPasswordInput.setValue(matchingPassword);
        await oldPasswordInput.blur();

        await newPasswordInput.setValue(matchingPassword);
        await newPasswordInput.blur();

        expect(await oldPasswordFormField.isControlValid()).toBeTruthy(
            'Old password input should be valid!'
        );
        expect(await newPasswordFormField.isControlValid()).toBeTruthy(
            'New password input should be valid!'
        );
        expect(await newPasswordFormField.hasErrors()).toBeFalsy(
            'New password input shouldn\'t display errors!'
        );
        expect(await changePasswordButton.isDisabled()).toBeTruthy(
            'Password change button should be disabled!'
        );
    }));
});
