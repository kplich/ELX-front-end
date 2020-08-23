import {Offer} from "./Offer";
import {SimpleUser, SimpleUserResponse} from "../../../my-account/user-service/data/SimpleUser";

export class Message {
    id: number;
    sendingUser: SimpleUser;
    sentOn: Date;
    textContent: string;
    offer: Offer | null;

    constructor(response: MessageResponse) {
        this.id = response.id;
        this.sendingUser = new SimpleUser(response.sendingUser);
        this.sentOn = new Date(response.sentOn);
        this.textContent = response.textContent;
        this.offer = response.offer ? new Offer(response.offer) : null;
    }
}

export interface MessageResponse {
    id: number;
    sendingUser: SimpleUserResponse;
    sentOn: string;
    textContent: string;
    offer: Offer | null;
}
