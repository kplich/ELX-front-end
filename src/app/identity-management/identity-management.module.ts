import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoggingInComponent } from './logging-in/logging-in.component';
import {MaterialModule} from '../material/material.module';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [LoggingInComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class IdentityManagementModule { }
