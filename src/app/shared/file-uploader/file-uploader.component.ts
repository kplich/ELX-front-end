import {Component, EventEmitter, Input, Output} from "@angular/core";
import {AngularFireStorage} from "@angular/fire/storage";
import {SnackBarService} from "@shared/snack-bar-service/snack-bar.service";

export const BUTTON_TEXT = "Upload photos";

export const STRINGS = {
    uploadSuccess: "File uploaded successfully!",
    uploadAllSuccess: "Uploaded all files!",
    uploadError: "Could not upload file!",
    deleteSuccess: "File deleted successfully!",
    deleteError: "Could not delete file!"
};

@Component({
    selector: "app-file-uploader",
    templateUrl: "./file-uploader.component.html",
    styleUrls: ["./file-uploader.component.scss"]
})
export class FileUploaderComponent {

    @Input() acceptedTypes = "image/*";
    @Input() buttonText = BUTTON_TEXT;
    @Input() disableUpload = false;
    @Output() fileUploaded = new EventEmitter<string>();

    isUploading = false;
    numberOfFilesToUpload!: number;
    strings = STRINGS;

    constructor(
        private storage: AngularFireStorage,
        private snackBarService: SnackBarService
    ) {
    }

    onFileSelected(event: Event) {
        if (event.target == null) {
            return;
        }

        const files = (event.target as HTMLInputElement).files;
        if (files === null) {
            return;
        }

        this.numberOfFilesToUpload = files.length;

        const metadata = {
            contentType: this.acceptedTypes
        };

        for (let i = 0; i < this.numberOfFilesToUpload; i++) {
            const file = files.item(i);
            this.isUploading = true;
            const timestamp = Date.now();
            const fileRef = this.storage.ref(`items/${timestamp}`);

            fileRef.put(file, metadata).then(snapshot => {
                snapshot.ref.getDownloadURL().then(url => {
                    this.fileUploaded.emit(url);
                    this.snackBarService.openSnackBar(this.strings.uploadSuccess);

                    this.numberOfFilesToUpload--;

                    if (this.numberOfFilesToUpload === 0) {
                        this.isUploading = false;
                    }
                });
            }).catch(() => {
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
