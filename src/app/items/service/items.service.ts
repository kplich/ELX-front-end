import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Item, CategoryResponse, ItemResponse, NewOrUpdatedItemRequest} from "@items/data/Item";
import {environment} from "@environments/environment";
import {map, shareReplay} from "rxjs/operators";

/**
 * API URL used to read and store information about items.
 */
export const ITEMS_API_URL = `${environment.apiUrl}/items`;

/**
 * API URL used to read information about categories.
 */
export const CATEGORIES_API_URL = `${environment.apiUrl}/categories`;

@Injectable({
    providedIn: "root"
})
export class ItemsService {

    constructor(private http: HttpClient) {
    }

    getAllItems(): Observable<Item[]> {
        return this.http.get<ItemResponse[]>(ITEMS_API_URL).pipe(
            map(responses => responses.map(response => new Item(response))),
            shareReplay(1)
        );
    }

    getItem(id: number): Observable<Item> {
        return this.http.get<ItemResponse>(`${ITEMS_API_URL}/${id}`).pipe(
            map(response => new Item(response)),
            shareReplay(1)
        );
    }

    getCategories(): Observable<CategoryResponse[]> {
        return this.http.get<CategoryResponse[]>(CATEGORIES_API_URL).pipe(
            shareReplay(1)
        );
    }

    addNewItem(requestData: NewOrUpdatedItemRequest): Observable<Item> {
        return this.http.post<ItemResponse>(ITEMS_API_URL, requestData).pipe(
            map(response => new Item(response)),
            shareReplay(1)
        );
    }

    closeItem(id: number): Observable<Item> {
        return this.http.put<ItemResponse>(`${ITEMS_API_URL}/${id}/close`, undefined).pipe(
            map(response => new Item(response)),
            shareReplay(1)
        );
    }

    updateItem(requestData: NewOrUpdatedItemRequest): Observable<Item> {
        return this.http.put<ItemResponse>(ITEMS_API_URL, requestData).pipe(
            map(response => new Item(response)),
            shareReplay(1)
        );
    }

}
