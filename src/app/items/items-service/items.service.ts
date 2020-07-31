import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Item, ItemCategory, ItemResponse, NewOrUpdatedItemRequest} from './data/Item';
import {environment} from '../../../environments/environment';
import {map} from 'rxjs/operators';

export const ITEMS_API_URL = `${environment.apiUrl}/items`;
export const CATEGORIES_API_URL = `${environment.apiUrl}/categories`;

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  private static transformToResponseWithEntity(
    response: HttpResponse<ItemResponse>): HttpResponse<Item> {
    return response.clone({body: new Item(response.body)});
  }

  private static transformToResponseWithEntities(
    response: HttpResponse<ItemResponse[]>): HttpResponse<Item[]> {
    return response.clone({body: response.body.map(itemResponse => new Item(itemResponse))});
  }

  constructor(private http: HttpClient) {}

  getAllItems(): Observable<HttpResponse<Item[]>> {
    return this.http.get<ItemResponse[]>(ITEMS_API_URL, {observe: 'response'}).pipe(
      map(ItemsService.transformToResponseWithEntities)
    );
  }

  getItem(id: number): Observable<HttpResponse<Item>> {
    return this.http.get<ItemResponse>(
      `${ITEMS_API_URL}/${id}`,
      {observe: 'response'}).pipe(
        map(ItemsService.transformToResponseWithEntity)
    );
  }

  getCategories(): Observable<HttpResponse<ItemCategory[]>> {
    return this.http.get<ItemCategory[]>(CATEGORIES_API_URL, {observe: 'response'});
  }

  addNewItem(requestData: NewOrUpdatedItemRequest): Observable<HttpResponse<Item>> {
    return this.http.post<ItemResponse>(
      `${ITEMS_API_URL}/`,
      requestData,
      {observe: 'response'}).pipe(
      map(ItemsService.transformToResponseWithEntity)
    );
  }

  closeItem(id: number): Observable<HttpResponse<Item>> {
    return this.http.put<ItemResponse>(
      `${ITEMS_API_URL}/${id}/close`,
      null,
      {observe: 'response'}).pipe(
      map(ItemsService.transformToResponseWithEntity)
    );
  }

  updateItem(requestData: NewOrUpdatedItemRequest): Observable<HttpResponse<Item>> {
    return this.http.put<ItemResponse>(
      `${ITEMS_API_URL}/`,
      requestData,
      {observe: 'response'}).pipe(
      map(ItemsService.transformToResponseWithEntity)
    );
  }

}
