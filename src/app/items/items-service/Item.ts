import {DomSanitizer, SafeUrl} from '@angular/platform-browser';

export class Item {
  public readonly title: string;
  public readonly description: string;
  public readonly price: number;
  public readonly addedBy: string;
  public readonly added: Date;
  public readonly category: string;
  public readonly usedStatus: string;
  public readonly photoUrls: string[];

  constructor(resp: ItemResponse) {
    this.title = resp.title;
    this.description = resp.description;
    this.price = resp.price;
    this.addedBy = resp.addedBy;
    this.added = new Date(resp.added);
    this.category = resp.category;
    this.usedStatus = resp.usedStatus;
    this.photoUrls = resp.photoUrls;
  }

  public getSafePhotoUrls(domSanitizer: DomSanitizer): SafeUrl[] {
    return this.photoUrls.map(url => domSanitizer.bypassSecurityTrustUrl(url));
  }
}


/**
 * Interface for a response from back end.
 */
export interface ItemResponse {
  readonly title: string;
  readonly description: string;
  readonly price: number;
  readonly addedBy: string;
  readonly added: string;
  readonly category: string;
  readonly usedStatus: string;
  readonly photoUrls: string[];
}
