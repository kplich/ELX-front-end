import {dtoStringToStatus, UsedStatus, UsedStatusDto} from "@items/data/UsedStatus";
import {CategoryResponse} from "@items/data/Item";
import {SimpleConversation, SimpleConversationResponse} from "@my-account/data/SimpleConversation";

// TODO: seems that it might inherit from Item
export class ItemWantedToSell {
    public static readonly ETH_SYMBOL = "Ξ";

    id: number;
    title: string;
    description: string;
    price: number;
    addedOn: Date;
    category: CategoryResponse;
    usedStatus: UsedStatus;
    photoUrl: string;
    conversations: SimpleConversation[];

    constructor(response: ItemWantedToSellResponse) {
        this.id = response.id;
        this.title = response.title;
        this.description = response.description;
        this.price = response.price;
        this.addedOn = new Date(response.addedOn);
        this.category = response.category;
        this.usedStatus = dtoStringToStatus(response.usedStatus);
        this.photoUrl = response.photoUrl;
        this.conversations = response.conversations.map(conv => new SimpleConversation(conv));
    }

    get formattedPrice(): string {
        return `${this.price} ${ItemWantedToSell.ETH_SYMBOL}`;
    }

    public fixPhotoUrl() {
        this.photoUrl = "assets/error-photo.png";
    }

    public get usedStatusIsApplicable(): boolean {
        return this.usedStatus !== UsedStatus.NOT_APPLICABLE;
    }
}

export interface ItemWantedToSellResponse {
    id: number;
    title: string;
    description: string;
    price: number;
    addedOn: string;
    category: CategoryResponse;
    usedStatus: UsedStatusDto;
    photoUrl: string;
    conversations: SimpleConversationResponse[];
}
