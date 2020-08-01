import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
import {dtoStringToStatus, UsedStatus} from './UsedStatus';

export class Item {
  public static readonly ETH_SYMBOL = 'Ξ';
  public static readonly ADDED_BY = 'Added by';
  public static readonly ADDED_ON_LABEL = 'Item added';
  public static readonly CLOSED_ON_LABEL = 'Item closed';
  public static readonly CATEGORY_LABEL = 'Category';

  public readonly id: number;
  public readonly title: string;
  public readonly description: string;
  public readonly price: number;
  public readonly addedBy: ItemAddedBy;
  public readonly addedOn: Date;
  public readonly category: ItemCategory;
  public readonly usedStatus: UsedStatus;
  public readonly photoUrls: string[];
  public readonly closedOn: Date | null;

  constructor(resp: ItemResponse) {
    this.id = resp.id;
    this.title = resp.title;
    this.description = resp.description;
    this.price = resp.price;
    this.addedBy = resp.addedBy;
    this.addedOn = new Date(resp.addedOn);
    this.category = resp.category;
    this.usedStatus = dtoStringToStatus(resp.usedStatus);
    this.photoUrls = resp.photoUrls;
    this.closedOn = resp.closedOn !== null ? new Date(resp.closedOn) : null;
  }

  public getSafePhotoUrls(domSanitizer: DomSanitizer): SafeUrl[] {
    return this.photoUrls.map(url => domSanitizer.bypassSecurityTrustUrl(url));
  }

    public get formattedPrice(): string {
        return `${this.price} ${Item.ETH_SYMBOL}`;
    }

    public get usedStatusIsApplicable(): boolean {
        return this.usedStatus !== UsedStatus.NOT_APPLICABLE;
    }

    public get isClosed(): boolean {
        return this.closedOn !== null;
    }
}

/**
 * Interface for a response from back end.
 */
export interface ItemResponse {
  readonly id: number;
  readonly title: string;
  readonly description: string;
  readonly price: number;
  readonly addedBy: ItemAddedBy;
  readonly addedOn: string;
  readonly category: ItemCategory;
  readonly usedStatus: string;
  readonly photoUrls: string[];
  readonly closedOn: string | null;
}

export interface ItemAddedBy {
  readonly id: number;
  readonly username: string;
}

export interface ItemCategory {
  readonly id: number;
  readonly name: string;
}

export interface NewOrUpdatedItemRequest {
  readonly title: string;
  readonly description: string;
  readonly price: number;
  readonly category: number;
  readonly usedStatus: string;
  readonly photos: string[];
  readonly id?: number;
}
