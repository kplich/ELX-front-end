import {DomSanitizer, SafeUrl} from '@angular/platform-browser';

export class Item {
  public static readonly ETH_SYMBOL = 'Ξ';

  public readonly title: string;
  public readonly description: string;
  public readonly price: number;
  public readonly addedBy: string;
  public readonly added: Date;
  public readonly category: string;
  public readonly usedStatus: string;
  public readonly photoUrls: string[];
  public readonly closed: Date | null;

  constructor(resp: ItemResponse) {
    this.title = resp.title;
    this.description = resp.description;
    this.price = resp.price;
    this.addedBy = resp.addedBy;
    this.added = new Date(resp.added);
    this.category = resp.category;
    this.usedStatus = resp.usedStatus;
    this.photoUrls = resp.photoUrls;
    this.closed = resp.closed !== null ? new Date(resp.closed) : null;
  }

  public getSafePhotoUrls(domSanitizer: DomSanitizer): SafeUrl[] {
    return this.photoUrls.map(url => domSanitizer.bypassSecurityTrustUrl(url));
  }

  public get formattedPrice(): string {
    return `${this.price} ${Item.ETH_SYMBOL}`;
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
  readonly closed: string | null;
}

export interface NewItemRequest {
  readonly title: string;
  readonly description: string;
  readonly price: number;
  readonly category: number;
  readonly usedStatus: number;
  readonly photoUrls: string[];
}
