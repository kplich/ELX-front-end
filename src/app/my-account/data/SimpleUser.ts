export class SimpleUser {
    id: number;
    username: string;

    constructor(response: SimpleUserResponse) {
        this.id = response.id;
        this.username = response.username;
    }
}

export interface SimpleUserResponse {
    id: number;
    username: string;
}
