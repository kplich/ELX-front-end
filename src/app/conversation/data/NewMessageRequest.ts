import {NewOfferRequest} from "@conversation/data/NewOfferRequest";

export interface NewMessageRequest {
    content: string;
    offer?: NewOfferRequest;
}
