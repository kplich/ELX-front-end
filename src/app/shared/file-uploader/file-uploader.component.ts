import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Observable} from 'rxjs';
import {finalize} from 'rxjs/operators';
import {AngularFireStorage} from '@angular/fire/storage';


@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.scss']
})
export class FileUploaderComponent implements OnInit {

  title = 'cloudsStorage';
  finalUrl;
  downloadURL: Observable<string>;
  isUploading = false;
  filesToUploadNumber;

  constructor(private storage: AngularFireStorage) {
  }

  @Output()
  fileUploaded = new EventEmitter<string>();

  ngOnInit(): void {
  }

  onFileSelected(event) {
    this.isUploading = true;
    this.filesToUploadNumber = event.target.files.length;
    for (const file of event.target.files) {
      const n = Date.now();
      const filePath = `items/${n}`;
      const fileRef = this.storage.ref(filePath);
      const task = this.storage.upload(`items/${n}`, file);
      task
        .snapshotChanges()
        .pipe(
          finalize(() => {
            this.downloadURL = fileRef.getDownloadURL();
            this.downloadURL.subscribe(url => {
              if (url) {
                this.finalUrl = url;
                this.fileUploaded.emit(this.finalUrl);
              }
            });
          })
        )
        .subscribe({
          next: url => {
            if (this.filesToUploadNumber === 0) {
              this.isUploading = false;
            } else {
              this.filesToUploadNumber = this.filesToUploadNumber - 1;
            }
          },
          error: err => {
            console.error(err);
            this.isUploading = false;
          },
          complete: () => {
              console.log(this.finalUrl);
          }
        });
    }
  }

  deleteFile(fileUrl) {
    this.storage.storage.refFromURL(fileUrl).delete();
  }
}
