// https://material.angular.io/components/input/overview#changing-when-error-messages-are-shown
import {ErrorStateMatcher} from "@angular/material/core";
import {FormControl} from "@angular/forms";

/** Error when invalid control is dirty, or touched. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, _: any): boolean {
    return !!(control && control.invalid && (control.dirty || control.touched));
  }
}
