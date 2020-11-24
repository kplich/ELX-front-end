import {Injectable} from "@angular/core";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {Item, CategoryResponse, ItemResponse, NewOrUpdatedItemRequest} from "@items/data/Item";
import {environment} from "@environments/environment";
import {map} from "rxjs/operators";

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

    private static transformToResponseWithEntity(
        response: HttpResponse<ItemResponse>): HttpResponse<Item> {
        if (response.body === null) { throw new Error("Empty response body!"); }
        return response.clone({body: new Item(response.body)});
    }

    private static transformToResponseWithEntities(
        response: HttpResponse<ItemResponse[]>): HttpResponse<Item[]> {
        if (response.body === null) { throw new Error("Empty response body!"); }
        return response.clone({body: response.body.map(itemResponse => new Item(itemResponse))});
    }

    getAllItems(): Observable<HttpResponse<Item[]>> {
        return this.http.get<ItemResponse[]>(ITEMS_API_URL, {observe: "response"}).pipe(
            map(ItemsService.transformToResponseWithEntities)
        );
    }

    getItem(id: number): Observable<HttpResponse<Item>> {
        return this.http.get<ItemResponse>(
            `${ITEMS_API_URL}/${id}`,
            {observe: "response"}).pipe(
            map(ItemsService.transformToResponseWithEntity)
        );
    }

    getCategories(): Observable<HttpResponse<CategoryResponse[]>> {
        return this.http.get<CategoryResponse[]>(CATEGORIES_API_URL, {observe: "response"});
    }

    addNewItem(requestData: NewOrUpdatedItemRequest): Observable<HttpResponse<Item>> {
        return this.http.post<ItemResponse>(
            `${ITEMS_API_URL}/`,
            requestData,
            {observe: "response"}).pipe(
            map(ItemsService.transformToResponseWithEntity)
        );
    }

    closeItem(id: number): Observable<HttpResponse<Item>> {
        return this.http.put<ItemResponse>(
            `${ITEMS_API_URL}/${id}/close`,
            undefined,
            {observe: "response"}).pipe(
            map(ItemsService.transformToResponseWithEntity)
        );
    }

    updateItem(requestData: NewOrUpdatedItemRequest): Observable<HttpResponse<Item>> {
        return this.http.put<ItemResponse>(
            `${ITEMS_API_URL}/`,
            requestData,
            {observe: "response"}).pipe(
            map(ItemsService.transformToResponseWithEntity)
        );
    }

}
