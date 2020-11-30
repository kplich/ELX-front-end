import {SimpleUser, SimpleUserResponse} from "@my-account/data/SimpleUser";

export class SimpleMessage {
    id: number;
    sendingUser: SimpleUser;
    sentOn: Date;
    textContent: string | undefined;

    constructor(response: SimpleMessageResponse) {
        this.id = response.id;
        this.sendingUser = new SimpleUser(response.sendingUser);
        this.sentOn = new Date(response.sentOn);
        this.textContent = response.textContent !== null ? response.textContent : undefined;
    }

    equals(other: SimpleMessage): boolean {
        return this.id === other.id
            && this.sendingUser.equals(other.sendingUser)
            && this.sentOn.getTime() === other.sentOn.getTime()
            && this.textContent === other.textContent;
    }
}

export interface SimpleMessageResponse {
    id: number;
    sendingUser: SimpleUserResponse;
    sentOn: string;
    textContent: string | null;
}
