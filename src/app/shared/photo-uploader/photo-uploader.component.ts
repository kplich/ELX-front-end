import {Component, EventEmitter, Input, Output, ViewChild} from "@angular/core";
import {CdkDragDrop, moveItemInArray} from "@angular/cdk/drag-drop";
import {FileUploaderComponent} from "@shared/file-uploader/file-uploader.component";

/**
 * Labels and error messages.
 */
export const STRINGS = {
    tooFewPhotos: "More photos are necessary!",
    enoughPhotos: "You can't upload more photos.",
    tooManyPhotos: "You uploaded too many photos!"
};

/**
 * Component for uploading photos. Uses Angular Material's drag-and-drop directives for reordering of photos.
 */
@Component({
    selector: "app-photo-uploader",
    templateUrl: "./photo-uploader.component.html",
    styleUrls: ["./photo-uploader.component.scss"]
})
export class PhotoUploaderComponent {

    strings = STRINGS;

    /**
     * The message to be shown when no photos are added.
     */
    @Input() noPhotosPrompt: string | null = null;

    /**
     * Maximal number of photos to be allowed in the uploader
     */
    @Input() maximumPhotos = Number.MAX_SAFE_INTEGER;

    /**
     * Emits list of photos every time a photo is uploaded, deleted or reordered.
     */
    @Output() photoListChanged = new EventEmitter<string[]>();

    @ViewChild(FileUploaderComponent) private fileUploader!: FileUploaderComponent;

    photosList: string[] = [];

    get photosWereUploaded(): boolean {
        return this.photosList.length !== 0;
    }

    get enoughPhotosUploaded(): boolean {
        return this.photosList.length === this.maximumPhotos;
    }

    get tooManyPhotosUploaded(): boolean {
        return this.photosList.length > this.maximumPhotos;
    }

    get uploadShouldBeDisabled(): boolean {
        return this.enoughPhotosUploaded || this.tooManyPhotosUploaded;
    }

    drop(event: CdkDragDrop<string[]>) {
        moveItemInArray(this.photosList, event.previousIndex, event.currentIndex);
        this.photoListChanged.emit(this.photosList);
    }

    initPhotoUploader(downloadedPhotosList: string[]) {
        this.photosList = downloadedPhotosList;
    }

    fileUploaded(uploadedFileURL: string) {
        this.photosList.push(uploadedFileURL);
        this.photoListChanged.emit(this.photosList);
    }

    deletePhoto(index: number) {
        this.fileUploader.deleteFile(this.photosList[index]);
        this.photosList.splice(index, 1);
        this.photoListChanged.emit(this.photosList);
    }
}

