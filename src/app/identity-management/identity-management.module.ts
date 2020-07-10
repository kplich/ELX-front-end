import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoggingInComponent } from './logging-in/logging-in.component';
import {MaterialModule} from '../material/material.module';
import {ReactiveFormsModule} from '@angular/forms';
import { RegistrationComponent } from './registration/registration.component';

@NgModule({
  declarations: [LoggingInComponent, RegistrationComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class IdentityManagementModule { }
