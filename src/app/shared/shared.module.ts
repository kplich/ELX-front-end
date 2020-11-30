import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {PhotoUploaderComponent} from "@shared/photo-uploader/photo-uploader.component";
import {MaterialModule} from "@material/material.module";
import {FileUploaderComponent} from "@shared/file-uploader/file-uploader.component";
import {AngularFireModule} from "@angular/fire";
import {environment} from "@environments/environment";
import {AngularFireStorageModule} from "@angular/fire/storage";
import {NotFoundComponent} from "./not-found/not-found.component";
import {ErrorComponent} from "./error/error.component";

/**
 * Module for shared services and components.
 */
@NgModule({
    declarations: [PhotoUploaderComponent, FileUploaderComponent, NotFoundComponent, ErrorComponent],
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
export class SharedModule {}
