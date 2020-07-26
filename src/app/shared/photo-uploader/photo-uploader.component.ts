import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {FileUploaderComponent} from '../file-uploader/file-uploader.component';

@Component({
  selector: 'app-photo-uploader',
  templateUrl: './photo-uploader.component.html',
  styleUrls: ['./photo-uploader.component.scss']
})
export class PhotoUploaderComponent implements OnInit {
  photosList: string[] = [
    'https://firebasestorage.googleapis.com/v0/b/elx-front-end.appspot.com/o/items%2F1595758407023?alt=media&token=437cec31-5cc5-405e-bc22-c2557572818c'
  ];
  @Output() photosListChanged = new EventEmitter<string[]>();
  @ViewChild(FileUploaderComponent) private fileUploader: FileUploaderComponent;

  constructor() {
  }

  ngOnInit(): void {
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.photosList, event.previousIndex, event.currentIndex);
    this.photosListChanged.emit(this.photosList);
  }

  initPhotoUploader(downloadedPhotosList: string[]) {
    this.photosList = downloadedPhotosList;
  }

  fileUploaded(uploadedFileURL: string) {
    this.photosList.push(uploadedFileURL);
    console.log(this.photosList);
    this.ngOnInit();
    this.photosListChanged.emit(this.photosList);
  }

  deletePhoto(index: number) {
    this.fileUploader.deleteFile(this.photosList[index]);
    this.photosList.splice(index, 1);
    this.photosListChanged.emit(this.photosList);
  }

  deletePhotos() {
    this.photosList.every((value, index) => this.deletePhoto(index));
  }
}

