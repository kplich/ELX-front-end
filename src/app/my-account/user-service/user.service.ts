import {Injectable} from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import {environment} from "@environments/environment";
import { map } from "rxjs/operators";
import {ItemWantedToSell, ItemWantedToSellResponse} from "@my-account/data/items/ItemWantedToSell";
import {ItemSold, ItemSoldResponse} from "@my-account/data/items/ItemSold";
import {ItemWantedToBuy, ItemWantedToBuyResponse} from "@my-account/data/items/ItemWantedToBuy";
import {ItemBought} from "@my-account/data/items/ItemBought";

/**
 * API URL used for reading data about the users.
 */
export const USER_API_URL = `${environment.apiUrl}/user`;

@Injectable({
    providedIn: "root"
})
export class UserService {

    constructor(private http: HttpClient) {
    }

    getItemsWantedToSell(): Observable<ItemWantedToSell[]> {
        return this.http.get<ItemWantedToSellResponse[]>(`${USER_API_URL}/wantedToSell`).pipe(
            map(responses => responses.map(response => new ItemWantedToSell(response)))
        );
    }

    getItemsSold(): Observable<ItemSold[]> {
        return this.http.get<ItemSoldResponse[]>(`${USER_API_URL}/sold`).pipe(
            map(response => response.map(resp => new ItemSold(resp)))
        );
    }

    getItemsWantedToBuy(): Observable<ItemWantedToBuy[]> {
        return this.http.get<ItemWantedToBuyResponse[]>(`${USER_API_URL}/wantedToBuy`).pipe(
            map(response => response.map(resp => new ItemWantedToBuy(resp)))
        );
    }

    getItemsBought(): Observable<ItemSold[]> {
        return this.http.get<ItemSoldResponse[]>(`${USER_API_URL}/bought`).pipe(
            map(response => response.map(resp => new ItemBought(resp)))
        );
    }
}
