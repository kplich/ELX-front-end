import {Item, ItemResponse} from '@items/data/Item';
import {SimpleUser, SimpleUserResponse} from '@my-account/data/SimpleUser';
import {Message, MessageResponse} from '@conversation/data/Message';

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
    id: number;
    item: ItemResponse;
    interestedUser: SimpleUserResponse;
    messages: MessageResponse[];
}
