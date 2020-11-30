import {DomSanitizer, SafeUrl} from "@angular/platform-browser";
import {dtoStringToStatus, UsedStatus, UsedStatusDto} from "@items/data/UsedStatus";
import {SimpleUser, SimpleUserResponse} from "@my-account/data/SimpleUser";

export class Item {
    public static readonly ETH_SYMBOL = "Ξ";
    public static readonly ADDED_BY = "added by";
    public static readonly ADDED_ON_LABEL = "Item added";
    public static readonly CLOSED_ON_LABEL = "Item closed";
    public static readonly CATEGORY_LABEL = "Category";

    public readonly id: number;
    public readonly title: string;
    public readonly description: string;
    public readonly price: number;
    public readonly addedBy: SimpleUser;
    public readonly addedOn: Date;
    public readonly category: CategoryResponse;
    public readonly usedStatus: UsedStatus;
    public readonly photoUrls: string[];
    public readonly closedOn: Date | null;

    constructor(resp: ItemResponse) {
        this.id = resp.id;
        this.title = resp.title;
        this.description = resp.description;
        this.price = resp.price;
        this.addedBy = new SimpleUser(resp.addedBy);
        this.addedOn = new Date(resp.addedOn);
        this.category = resp.category;
        this.usedStatus = dtoStringToStatus(resp.usedStatus);
        this.photoUrls = resp.photoUrls;
        this.closedOn = resp.closedOn !== null ? new Date(resp.closedOn) : null;
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

    public get hasAtMostOnePhoto(): boolean {
        return this.photoUrls.length <= 1;
    }

    public get doesNotHavePhotos(): boolean {
        return this.photoUrls.length === 0;
    }

    public getSafePhotoUrls(domSanitizer: DomSanitizer): SafeUrl[] {
        return this.photoUrls.map(url => domSanitizer.bypassSecurityTrustUrl(url));
    }

    public fixPhotoUrl(index: number) {
        this.photoUrls[index] = "assets/could-not-load.png";
    }

    equals(other: Item): boolean {
        return this.id === other.id
            && this.title === other.title
            && this.description === other.description
            && this.price === other.price
            && this.addedBy.equals(other.addedBy)
            && this.addedOn.getTime() === other.addedOn.getTime()
            && this.category === other.category
            && this.usedStatus === other.usedStatus
            && this.photoUrls.forEach((url, i) => url === other.photoUrls[i])
            && this.closedOn ? (this.closedOn.getTime() === other.closedOn?.getTime()) : other.closedOn === null;

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
    readonly addedBy: SimpleUserResponse;
    readonly addedOn: string;
    readonly category: CategoryResponse;
    readonly usedStatus: UsedStatusDto;
    readonly photoUrls: string[];
    readonly closedOn: string | null;
}

export interface CategoryResponse {
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
