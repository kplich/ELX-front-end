import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {PhotoUploaderComponent} from "@shared/photo-uploader/photo-uploader.component";
import {MaterialModule} from "@material/material.module";
import {FileUploaderComponent} from "@shared/file-uploader/file-uploader.component";
import {AngularFireModule} from "@angular/fire";
import {environment} from "@environments/environment";
import {AngularFireStorageModule} from "@angular/fire/storage";

@NgModule({
    declarations: [PhotoUploaderComponent, FileUploaderComponent],
    exports: [
        PhotoUploaderComponent,
    ],
    imports: [
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireStorageModule,
        CommonModule,
        MaterialModule
    ]
})
export class SharedModule {
}
