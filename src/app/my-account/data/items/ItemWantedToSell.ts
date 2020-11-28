import {SimpleConversation, SimpleConversationResponse} from "../SimpleConversation";
import {AbstractUserItem, AbstractUserItemResponse} from "./AbstractUserItem";

export class ItemWantedToSell extends AbstractUserItem {
    conversations: SimpleConversation[];

    constructor(response: ItemWantedToSellResponse) {
        super(response);
        this.conversations = response.conversations.map(conv => new SimpleConversation(conv));
    }

    equals(other: ItemWantedToSell): boolean {
        return super.equals(other)
            && this.conversations.every((conversation, index) => {
                conversation.equals(other.conversations[index]);
            });
    }
}

export interface ItemWantedToSellResponse extends AbstractUserItemResponse {
    conversations: SimpleConversationResponse[];
}
