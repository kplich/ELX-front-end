import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Observable} from 'rxjs';
import {AngularFireStorage} from '@angular/fire/storage';
import {finalize} from 'rxjs/operators';


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
      const filePath = `event/${n}`;
      const fileRef = this.storage.ref(filePath);
      const task = this.storage.upload(`event/${n}`, file);
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
              console.log(this.finalUrl);
            });
          })
        )
        .subscribe(url => {
          if (url) {
            console.log(this.finalUrl);
          }
          if (this.filesToUploadNumber === 0) {
            this.isUploading = false;
          } else {
            this.filesToUploadNumber = this.filesToUploadNumber - 1;
          }
        });
    }
  }

  deleteFile(fileUrl) {
    this.storage.storage.refFromURL(fileUrl).delete();
  }


}
