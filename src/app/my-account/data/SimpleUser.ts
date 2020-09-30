export class SimpleUser {
    id: number;
    ethereumAddress: string | null;
    username: string;

    constructor(response: SimpleUserResponse) {
        this.id = response.id;
        this.ethereumAddress = response.ethereumAddress;
        this.username = response.username;
    }
}

export interface SimpleUserResponse {
    id: number;
    ethereumAddress: string | null;
    username: string;
}
