import {ItemWantedToSell, ItemWantedToSellResponse} from "@my-account/data/ItemWantedToSell";
import {ItemWantedToBuy, ItemWantedToBuyResponse} from "@my-account/data/ItemWantedToBuy";
import {ItemBought, ItemBoughtResponse} from "@my-account/data/ItemBought";
import {ItemSold, ItemSoldResponse} from "@my-account/data/ItemSold";

export class FullUser {
    id: number;
    ethereumAddress: string | undefined;
    username: string;

    itemsWantedToSell: ItemWantedToSell[];
    itemsSold: ItemSold[];
    itemsWantedToBuy: ItemWantedToBuy[];
    itemsBought: ItemBought[];

    constructor(response: FullUserResponse) {
        this.id = response.id;
        this.ethereumAddress = response.ethereumAddress;
        this.username = response.username;
        this.itemsWantedToSell = response.itemsWantedToSell.map(resp => new ItemWantedToSell(resp));
        this.itemsSold = response.itemsSold.map(resp => new ItemSold(resp));
        this.itemsWantedToBuy = response.itemsWantedToBuy.map(resp => new ItemWantedToBuy(resp));
        this.itemsBought = response.itemsBought.map(resp => new ItemBought(resp));
    }
}

export interface FullUserResponse {
    id: number;
    ethereumAddress?: string;
    username: string;
    itemsWantedToSell: ItemWantedToSellResponse[];
    itemsSold: ItemSoldResponse[];
    itemsWantedToBuy: ItemWantedToBuyResponse[];
    itemsBought: ItemBoughtResponse[];
}
