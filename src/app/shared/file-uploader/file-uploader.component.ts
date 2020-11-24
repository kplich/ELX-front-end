import {Component, EventEmitter, Input, Output} from "@angular/core";
import {AngularFireStorage} from "@angular/fire/storage";
import {SnackBarService} from "@shared/snack-bar-service/snack-bar.service";

/**
 * Labels and messages used in the component.
 */
export const STRINGS = {
    messages: {
        uploadSuccess: "File uploaded successfully!",
        uploadAllSuccess: "Uploaded all files!",
        uploadError: "Could not upload file!",
        deleteSuccess: "File deleted successfully!",
        deleteError: "Could not delete file!"
    },
    uploadButton: "Upload photos"
};

/**
 * A component for uploading files to Firebase. Works by hiding a usual file input
 * and delegating some of its functionality to a more visually appealing button.
 */
@Component({
    selector: "app-file-uploader",
    templateUrl: "./file-uploader.component.html",
    styleUrls: ["./file-uploader.component.scss"]
})
export class FileUploaderComponent {

    /**
     * Input types accepted by the uploader.
     */
    @Input() acceptedTypes = "image/*";

    /**
     * Text displayed on the upload button.
     */
    @Input() buttonText = STRINGS.uploadButton;

    /**
     * Disables the upload by disabling the button.
     */
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
                    this.snackBarService.openSnackBar(STRINGS.messages.uploadSuccess);

                    this.numberOfFilesToUpload--;

                    if (this.numberOfFilesToUpload === 0) {
                        this.isUploading = false;
                    }
                });
            }).catch(() => {
                this.snackBarService.openSnackBar(STRINGS.messages.uploadError);
            });
        }
    }

    deleteFile(fileUrl: string) {
        this.storage.storage.refFromURL(fileUrl).delete()
            .then(() => this.snackBarService.openSnackBar(STRINGS.messages.deleteSuccess))
            .catch(() => this.snackBarService.openSnackBar(STRINGS.messages.deleteError));
    }
}
