import {Item, ItemResponse} from "../../../items/items-service/data/Item";
import {SimpleUser, SimpleUserResponse} from "../../../my-account/user-service/data/SimpleUser";
import {Message, MessageResponse} from "./Message";

export class Conversation {
    id: number;
    item: Item;
    interestedUser: SimpleUser;
    messages: Message[];

    constructor(response: ConversationResponse) {
        this.id = response.id;
        this.item = new Item(response.item);
        this.interestedUser = new SimpleUser(response.interestedUser);
        this.messages = response.messages.map(message => new Message(message));
    }
}

export interface ConversationResponse {
    id: number,
    item: ItemResponse,
    interestedUser: SimpleUserResponse,
    messages: MessageResponse[],
}
