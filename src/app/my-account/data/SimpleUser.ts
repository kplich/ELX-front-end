export class SimpleUser {
    id: number;
    ethereumAddress: string | undefined;
    username: string;

    constructor(response: SimpleUserResponse) {
        this.id = response.id;
        this.ethereumAddress = response.ethereumAddress !== null ? response.ethereumAddress : undefined;
        this.username = response.username;
    }
}

export interface SimpleUserResponse {
    id: number;
    ethereumAddress: string | null;
    username: string;
}
