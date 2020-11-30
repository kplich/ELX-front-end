export class SimpleUser {
    id: number;
    ethereumAddress: string | undefined;
    username: string;

    constructor(response: SimpleUserResponse) {
        this.id = response.id;
        this.ethereumAddress = response.ethereumAddress !== null ? response.ethereumAddress : undefined;
        this.username = response.username;
    }

    equals(other: SimpleUser): boolean {
        return this.id === other.id
            && this.ethereumAddress === other.ethereumAddress
            && this.username === other.username;
    }
}

export interface SimpleUserResponse {
    id: number;
    ethereumAddress: string | null;
    username: string;
}
