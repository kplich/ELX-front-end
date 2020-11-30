import {async, ComponentFixture, TestBed} from "@angular/core/testing";

import {ChangePasswordComponent, STRINGS} from "@my-account/settings/change-password/change-password.component";
import {HarnessLoader} from "@angular/cdk/testing";
import {MatFormFieldHarness} from "@angular/material/form-field/testing";
import {MatInputHarness} from "@angular/material/input/testing";
import {MatButtonHarness} from "@angular/material/button/testing";
import {TestbedHarnessEnvironment} from "@angular/cdk/testing/testbed";
import {MaterialModule} from "@material/material.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ReactiveFormsModule} from "@angular/forms";

describe("ChangePasswordComponent", () => {
    let fixture: ComponentFixture<ChangePasswordComponent>;
    let loader: HarnessLoader;

    let oldPasswordFormField: MatFormFieldHarness;
    let oldPasswordInput: MatInputHarness;
    let newPasswordFormField: MatFormFieldHarness;
    let newPasswordInput: MatInputHarness;
    let changePasswordButton: MatButtonHarness;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [MaterialModule, BrowserAnimationsModule, ReactiveFormsModule],
            declarations: [ChangePasswordComponent]
        })
            .compileComponents()
            .then(() => {
                fixture = TestBed.createComponent(ChangePasswordComponent);
                loader = TestbedHarnessEnvironment.loader(fixture);

                loader
                    .getHarness(MatFormFieldHarness.with({selector: "#old-password-form-field"}))
                    .then((harness) => {
                        oldPasswordFormField = harness;
                    });
                loader
                    .getHarness(MatInputHarness.with({selector: "#old-password-form-field input"}))
                    .then((harness) => {
                        oldPasswordInput = harness;
                    });
                loader
                    .getHarness(MatFormFieldHarness.with({selector: "#new-password-form-field"}))
                    .then((harness) => {
                        newPasswordFormField = harness;
                    });
                loader
                    .getHarness(MatInputHarness.with({selector: "#new-password-form-field input"}))
                    .then((harness) => {
                        newPasswordInput = harness;
                    });
                loader
                    .getHarness(MatButtonHarness.with({selector: "#change-password-button"}))
                    .then((harness) => {
                        changePasswordButton = harness;
                    });

                fixture.detectChanges();
            });
    }));

    it("should be created and displayed correctly", async(async () => {
        expect(fixture.componentInstance).toBeTruthy();

        expect(await oldPasswordFormField.getLabel()).toEqual(STRINGS.oldPassword.label);

        expect(await newPasswordFormField.getLabel()).toEqual(STRINGS.newPassword.label);
        expect((await newPasswordFormField.getTextHints())[0]).toEqual(STRINGS.newPassword.hint);

        expect(fixture.componentInstance.form.valid).toBeFalsy();

        expect(await changePasswordButton.getText()).toEqual(STRINGS.changePasswordButton);
        expect(await changePasswordButton.isDisabled()).toBeTruthy();
    }));

    it("should display errors after touching the fields", async () => {
        await oldPasswordInput.focus();
        await oldPasswordInput.blur();
        fixture.detectChanges();

        expect(await oldPasswordFormField.hasErrors()).toBeTruthy();
        expect((await oldPasswordFormField.getTextErrors())[0]).toEqual(STRINGS.oldPassword.notProvided);

        await newPasswordInput.focus();
        await newPasswordInput.blur();
        fixture.detectChanges();

        expect(await newPasswordFormField.hasErrors()).toBeTruthy();
        expect((await newPasswordFormField.getTextErrors())[0]).toEqual(STRINGS.newPassword.notProvided);
    });

    it("should show an error when new password doesn't match the pattern", async () => {
        await newPasswordInput.setValue("password");
        await newPasswordInput.blur();

        expect(await newPasswordFormField.isControlValid()).toBeFalsy();
        expect(await newPasswordFormField.hasErrors()).toBeTruthy();
        expect((await newPasswordFormField.getTextErrors())[0]).toEqual(STRINGS.newPassword.doesntMatchPattern);
    });

    it("should show an error when new passwords match", async () => {
        const matchingPassword = "P@ssw0rd";
        await oldPasswordInput.setValue(matchingPassword);
        await oldPasswordInput.blur();

        await newPasswordInput.setValue(matchingPassword);
        await newPasswordInput.blur();

        expect(await oldPasswordFormField.isControlValid()).toBeTruthy("Old password input should be valid!");
        expect(await newPasswordFormField.isControlValid()).toBeTruthy("New password input should be valid!");
        expect(await newPasswordFormField.hasErrors()).toBeFalsy("New password input shouldn't display errors!");
        expect(await changePasswordButton.isDisabled()).toBeTruthy("Password change button should be disabled!");
    });
});
