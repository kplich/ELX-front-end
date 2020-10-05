import {ItemSoldByMe, ItemSoldByMeResponse} from "@my-account/data/ItemSoldByMe";
import {ItemWantedByMe, ItemWantedByMeResponse} from "@my-account/data/ItemWantedByMe";

export class FullUser {
    id: number;
    ethereumAddress: string | undefined;
    username: string;
    itemsSold: ItemSoldByMe[];
    itemsWanted: ItemWantedByMe[];

    constructor(response: FullUserResponse) {
        this.id = response.id;
        this.ethereumAddress = response.ethereumAddress;
        this.username = response.username;
        this.itemsSold = response.itemsSold.map(itemSoldResponse => new ItemSoldByMe(itemSoldResponse));
        this.itemsWanted = response.itemsWanted.map(itemWantedResponse => new ItemWantedByMe(itemWantedResponse));
    }
}

export interface FullUserResponse {
    id: number;
    ethereumAddress?: string;
    username: string;
    itemsSold: ItemSoldByMeResponse[];
    itemsWanted: ItemWantedByMeResponse[];
}
