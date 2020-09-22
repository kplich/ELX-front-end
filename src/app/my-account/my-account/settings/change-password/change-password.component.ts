import {Component, EventEmitter, Output} from "@angular/core";
import {MyErrorStateMatcher} from "@shared/MyErrorStateMatcher";
import {
    AbstractControl,
    FormControl,
    FormGroup,
    ValidationErrors,
    Validators
} from "@angular/forms";
import {ErrorStateMatcher} from "@angular/material/core";
import {PasswordChangeRequest} from "@authentication/data/PasswordChangeRequest";

export const MINIMUM_PASSWORD_LENGTH = 8;
export const MAXIMUM_PASSWORD_LENGTH = 40;

export const STRINGS = {
    title: "Change password",
    oldPassword: {
        label: "Old password",
        notProvided: "Old password is required!"
    },
    newPassword: {
        label: "New password",
        hint: `Password has to be ${MINIMUM_PASSWORD_LENGTH}-${MAXIMUM_PASSWORD_LENGTH} characters long
(including a lowercase letter, an uppercase letter, a digit and a special character)
and different from the old password.`,
        notProvided: "New password is required!",
        tooShort: `The password needs to be at least ${MINIMUM_PASSWORD_LENGTH} characters long.`,
        tooLong: `The password needs to be at most ${MAXIMUM_PASSWORD_LENGTH} characters long.`,
        doesntMatchPattern: "The password needs to have a lowercase and an uppercase letter, a digit and a special character."
    },
    passwordsEqual: "Passwords can't be equal.",
    button: "Change password"
};

export function passwordsNotEqualValidator(form: AbstractControl): ValidationErrors | null {
    const oldPassword = form.get("oldPassword");
    const newPassword = form.get("newPassword");

    if (oldPassword === null || newPassword === null) {
        throw new Error("form controls not found");
    }

    return oldPassword.value === newPassword.value ? {passwordsmatch: true} : null;
}

@Component({
    selector: "app-change-password",
    templateUrl: "./change-password.component.html",
    styleUrls: ["./change-password.component.scss"]
})
export class ChangePasswordComponent {

    @Output() changePasswordRequest = new EventEmitter<PasswordChangeRequest>();

    readonly strings = STRINGS;

    // language=JSRegexp
    readonly containsUppercaseLetterPattern = ".*[A-Z]+.*";
    // language=JSRegexp
    readonly containsLowercaseLetterPattern = ".*[a-z]+.*";
    // language=JSRegexp
    readonly containsDigitPattern = ".*\\d+.*";
    // language=JSRegexp
    readonly containsSpecialCharacterPattern = ".*[\\W_]+.*";

    readonly controls = {
        oldPassword: new FormControl("", [Validators.required]),
        newPassword: new FormControl("", [
            Validators.required,
            Validators.pattern(this.containsLowercaseLetterPattern),
            Validators.pattern(this.containsUppercaseLetterPattern),
            Validators.pattern(this.containsDigitPattern),
            Validators.pattern(this.containsSpecialCharacterPattern),
            Validators.minLength(MINIMUM_PASSWORD_LENGTH),
            Validators.maxLength(MAXIMUM_PASSWORD_LENGTH),
        ]),
    };

    readonly form: FormGroup = new FormGroup(
        this.controls,
        {validators: passwordsNotEqualValidator, updateOn: "change"}
    );

    readonly errorStateMatcher: ErrorStateMatcher = new MyErrorStateMatcher();

    constructor() {
    }

    public get errors() {
        return {
            oldPassword: {
                notProvided: this.controls.oldPassword.hasError("required")
            },
            newPassword: {
                notProvided: this.controls.newPassword.hasError("required"),
                tooShort: this.controls.newPassword.hasError("minlength"),
                tooLong: this.controls.newPassword.hasError("maxlength"),
                doesntMatchPattern: !this.controls.newPassword.hasError("minlength")
                    && !this.controls.newPassword.hasError("maxlength")
                    && this.controls.newPassword.hasError("pattern")
            },
            passwordsAreEqual: this.controls.oldPassword.dirty &&
                this.controls.newPassword.dirty &&
                !this.controls.newPassword.hasError("minlength") &&
                !this.controls.newPassword.hasError("maxlength") &&
                !this.controls.newPassword.hasError("pattern") &&
                this.form.hasError("passwordsmatch")
        };
    }

    private get passwordChangeRequest(): PasswordChangeRequest {
        return {
            oldPassword: this.controls.oldPassword.value,
            newPassword: this.controls.newPassword.value,
        };
    }

    emitPasswordChangeRequest() {
        this.changePasswordRequest.emit(this.passwordChangeRequest);
    }
}
