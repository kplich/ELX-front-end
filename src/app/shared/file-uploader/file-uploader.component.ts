import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {AngularFireStorage} from "@angular/fire/storage";
import {SnackBarService} from "@shared/snack-bar-service/snack-bar.service";

export const BUTTON_TEXT = "Upload photos";
export const UPLOAD_SUCCESSFUL_MESSAGE = "File uploaded successfully!";
export const UPLOAD_ALL_SUCCESSFUL_MESSAGE = "Uploaded all files!";
export const UPLOAD_ERROR_MESSAGE = "Could not upload file!";
export const DELETE_SUCCESSFUL_MESSAGE = "File deleted successfully!";
export const DELETE_ERROR_MESSAGE = "Could not delete file!";

@Component({
    selector: "app-file-uploader",
    templateUrl: "./file-uploader.component.html",
    styleUrls: ["./file-uploader.component.scss"]
})
export class FileUploaderComponent implements OnInit {

    @Input()
    acceptedTypes = "image/*";

    @Input()
    buttonText = BUTTON_TEXT;

    @Input()
    disableUpload = false;

    @Output()
    fileUploaded = new EventEmitter<string>();

    isUploading = false;
    numberOfFilesToUpload!: number;

    constructor(
        private storage: AngularFireStorage,
        private snackBarService: SnackBarService) {
    }

    strings = {
        uploadSuccess: UPLOAD_SUCCESSFUL_MESSAGE,
        uploadAllSuccess: UPLOAD_ALL_SUCCESSFUL_MESSAGE,
        uploadError: UPLOAD_ERROR_MESSAGE,
        deleteSuccess: DELETE_SUCCESSFUL_MESSAGE,
        deleteError: DELETE_ERROR_MESSAGE
    };

    ngOnInit(): void {
    }

    onFileSelected(event: Event) {

        if (event.target == null) { return; }

        const files = (event.target as HTMLInputElement).files;
        if (files === null) { return; }

        this.numberOfFilesToUpload = files.length;

        const metadata = {
            contentType: this.acceptedTypes
        };

        for (let i = 0; i < this.numberOfFilesToUpload; i++) {
            const file = files.item(i);
            this.isUploading = true;
            const timestamp = Date.now();
            const fileRef = this.storage.ref(`items/${timestamp}`);

            fileRef.put(file, metadata)
                .then(snapshot => {
                    snapshot.ref.getDownloadURL().then(url => {
                        this.fileUploaded.emit(url);
                        this.snackBarService.openSnackBar(this.strings.uploadSuccess);

                        this.numberOfFilesToUpload--;

                        if (this.numberOfFilesToUpload === 0) {
                            this.isUploading = false;
                        }
                    });
                })
                .catch(() => {
                    this.snackBarService.openSnackBar(this.strings.uploadError);
                });
        }
    }

    deleteFile(fileUrl: string) {
        this.storage.storage.refFromURL(fileUrl).delete()
            .then(() => this.snackBarService.openSnackBar(this.strings.deleteSuccess))
            .catch(() => this.snackBarService.openSnackBar(this.strings.deleteError));
    }
}
