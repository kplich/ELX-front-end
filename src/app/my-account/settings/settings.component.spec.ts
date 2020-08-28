import {async, ComponentFixture, TestBed} from '@angular/core/testing';

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
import {HarnessLoader} from '@angular/cdk/testing';
import {MaterialModule} from 'src/app/material/material.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ReactiveFormsModule} from '@angular/forms';
import {AuthenticationService} from 'src/app/authentication/authentication-service/authentication.service';
import {Router} from '@angular/router';
import {SnackBarService} from 'src/app/shared/snack-bar-service/snack-bar.service';
import {MatFormFieldHarness} from '@angular/material/form-field/testing';
import {MatInputHarness} from '@angular/material/input/testing';
import {MatButtonHarness} from '@angular/material/button/testing';
import {TestbedHarnessEnvironment} from '@angular/cdk/testing/testbed';

describe('SettingsComponent', () => {
    const authenticationServiceSpy = jasmine.createSpyObj(
        'AuthenticationService',
        ['signUp']
    );
    const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
    const snackBarServiceSpy = jasmine.createSpyObj('SnackBarService', [
        'openSnackBar',
    ]);

    let fixture: ComponentFixture<SettingsComponent>;
    let loader: HarnessLoader;

    let oldPasswordFormField: MatFormFieldHarness;
    let oldPasswordInput: MatInputHarness;
    let newPasswordFormField: MatFormFieldHarness;
    let newPasswordInput: MatInputHarness;
    let changePasswordButton: MatButtonHarness;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [MaterialModule, BrowserAnimationsModule, ReactiveFormsModule],
            declarations: [SettingsComponent],
            providers: [
                {provide: AuthenticationService, useValue: authenticationServiceSpy},
                {provide: Router, useValue: routerSpy},
                {provide: SnackBarService, useValue: snackBarServiceSpy},
            ],
        })
            .compileComponents()
            .then(() => {
                fixture = TestBed.createComponent(SettingsComponent);
                loader = TestbedHarnessEnvironment.loader(fixture);

                loader
                    .getHarness(
                        MatFormFieldHarness.with({selector: '#old-password-form-field'})
                    )
                    .then((harness) => {
                        oldPasswordFormField = harness;
                    });
                loader
                    .getHarness(
                        MatInputHarness.with({selector: '#old-password-form-field input'})
                    )
                    .then((harness) => {
                        oldPasswordInput = harness;
                    });
                loader
                    .getHarness(
                        MatFormFieldHarness.with({selector: '#new-password-form-field'})
                    )
                    .then((harness) => {
                        newPasswordFormField = harness;
                    });
                loader
                    .getHarness(
                        MatInputHarness.with({selector: '#new-password-form-field input'})
                    )
                    .then((harness) => {
                        newPasswordInput = harness;
                    });
                loader
                    .getHarness(
                        MatButtonHarness.with({selector: '#change-password-button'})
                    )
                    .then((harness) => {
                        changePasswordButton = harness;
                    });
            });
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SettingsComponent);
        fixture.detectChanges();
    });

    it('should be created and displayed correctly', async(async () => {
        expect(fixture.componentInstance).toBeTruthy();

        expect(await oldPasswordFormField.getLabel()).toEqual(OLD_PASSWORD_LABEL);

        expect(await newPasswordFormField.getLabel()).toEqual(NEW_PASSWORD_LABEL);
        expect((await newPasswordFormField.getTextHints())[0]).toEqual(
            NEW_PASSWORD_HINT
        );

        expect(fixture.componentInstance.form.valid).toBeFalsy();

        expect(await changePasswordButton.getText()).toEqual(
            BUTTON_CHANGE_PASSWORD_TEXT
        );
        expect(await changePasswordButton.isDisabled()).toBeTruthy();
    }));

    it('should display errors after touching the fields', async () => {
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
    });

    it('should show an error when new password doesn\'t match the pattern', async () => {
        await newPasswordInput.setValue('password');
        await newPasswordInput.blur();

        expect(await newPasswordFormField.isControlValid()).toBeFalsy();
        expect(await newPasswordFormField.hasErrors()).toBeTruthy();
        expect((await newPasswordFormField.getTextErrors())[0]).toEqual(
            PASSWORD_PATTERN_MESSAGE
        );
    });

    it('should show an error when new passwords match', async () => {
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
    });
});
