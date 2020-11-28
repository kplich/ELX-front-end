import {SimpleUser, SimpleUserResponse} from "@my-account/data/SimpleUser";
import {CategoryResponse, Item} from "@items/data/Item";
import {dtoStringToStatus, UsedStatus, UsedStatusDto} from "@items/data/UsedStatus";

export abstract class AbstractUserItem {

    id: number;
    title: string;
    description: string;
    price: number;
    addedBy: SimpleUser;
    addedOn: Date;
    category: CategoryResponse;
    usedStatus: UsedStatus;
    photoUrl: string;

    protected constructor(response: AbstractUserItemResponse) {
        this.id = response.id;
        this.title = response.title;
        this.description = response.description;
        this.price = response.price;
        this.addedBy = new SimpleUser(response.addedBy);
        this.addedOn = new Date(response.addedOn);
        this.category = response.category;
        this.usedStatus = dtoStringToStatus(response.usedStatus);
        this.photoUrl = response.photoUrl;
    }

    get formattedPrice(): string {
        return `${this.price} ${Item.ETH_SYMBOL}`;
    }

    public get usedStatusIsApplicable(): boolean {
        return this.usedStatus !== UsedStatus.NOT_APPLICABLE;
    }

    public fixPhotoUrl() {
        this.photoUrl = "assets/error-photo.png";
    }

    equals(other: AbstractUserItem): boolean {
        return this.id === other.id
            && this.title === other.title
            && this.description === other.description
            && this.price === other.price
            && this.addedBy.equals(other.addedBy)
            && this.addedOn.getTime() === other.addedOn.getTime()
            && this.category === other.category
            && this.usedStatus === other.usedStatus
            && this.photoUrl === other.photoUrl;
    }
}

export interface AbstractUserItemResponse {
    id: number;
    title: string;
    description: string;
    price: number;
    addedBy: SimpleUserResponse;
    addedOn: string;
    category: CategoryResponse;
    usedStatus: UsedStatusDto;
    photoUrl: string;
}


