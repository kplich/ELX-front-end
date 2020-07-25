import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PhotoUploaderComponent} from './photo-uploader/photo-uploader.component';
import {MaterialModule} from '../material/material.module';
import {FileUploaderComponent} from './file-uploader/file-uploader.component';

@NgModule({
  declarations: [PhotoUploaderComponent, FileUploaderComponent],
  imports: [
    CommonModule,
    MaterialModule
  ]
})
export class SharedModule { }
