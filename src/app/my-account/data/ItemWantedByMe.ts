import {SimpleUserResponse, SimpleUser} from "@my-account/data/SimpleUser";
import {CategoryResponse} from "@items/data/Item";
import {UsedStatusDto, UsedStatus, dtoStringToStatus} from "@items/data/UsedStatus";
import {SimpleConversation, SimpleConversationResponse} from "@my-account/data/SimpleConversation";

export class ItemWantedByMe {
    id: number;
    title: string;
    description: string;
    price: number;
    addedBy: SimpleUser;
    addedOn: Date;
    category: CategoryResponse;
    usedStatus: UsedStatus;
    photoUrl: string;
    conversation: SimpleConversation;

    constructor(response: ItemWantedByMeResponse) {
        this.id = response.id;
        this.title = response.title;
        this.description = response.description;
        this.price = response.price;
        this.addedBy = new SimpleUser(response.addedBy);
        this.addedOn = new Date(response.addedOn);
        this.category = response.category;
        this.usedStatus = dtoStringToStatus(response.usedStatus);
        this.photoUrl = response.photoUrl;
        this.conversation = new SimpleConversation(response.conversation);
    }
}

export interface ItemWantedByMeResponse {
    id: number;
    title: string;
    description: string;
    price: number;
    addedBy: SimpleUserResponse;
    addedOn: string;
    category: CategoryResponse;
    usedStatus: UsedStatusDto;
    photoUrl: string;
    conversation: SimpleConversationResponse;
}
