import {SimpleConversation, SimpleConversationResponse} from "../SimpleConversation";
import {AbstractUserItem, AbstractUserItemResponse} from "./AbstractUserItem";

export class ItemWantedToBuy extends AbstractUserItem {
    conversation: SimpleConversation;

    constructor(response: ItemWantedToBuyResponse) {
        super(response);
        this.conversation = new SimpleConversation(response.conversation);
    }

    equals(other: ItemWantedToBuy): boolean {
        return super.equals(other)
            && this.conversation.equals(other.conversation);
    }
}

export interface ItemWantedToBuyResponse extends AbstractUserItemResponse{
    conversation: SimpleConversationResponse;
}
