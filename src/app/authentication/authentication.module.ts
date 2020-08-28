import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoggingInComponent} from '@authentication/logging-in/logging-in.component';
import {MaterialModule} from '@material/material.module';
import {ReactiveFormsModule} from '@angular/forms';
import {RegistrationComponent} from '@authentication/registration/registration.component';

@NgModule({
    declarations: [LoggingInComponent, RegistrationComponent],
    imports: [
        CommonModule,
        MaterialModule,
        ReactiveFormsModule
    ]
})
export class AuthenticationModule {
}
