import {Injectable} from '@angular/core';
import {Conversation, ConversationResponse} from "./data/Conversation";
import { HttpResponse, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {environment} from "../../../environments/environment";

export const ITEMS_API_URL = `${environment.apiUrl}/items`;

@Injectable({
    providedIn: 'root'
})
export class ConversationService {

    constructor(private http: HttpClient) {
    }

    private static transformToResponseWithEntity(
        response: HttpResponse<ConversationResponse>): HttpResponse<Conversation> {
        return response.clone({body: new Conversation(response.body)});
    }

    getConversation(itemId: number): Observable<HttpResponse<Conversation>> {
        return this.http.get<ConversationResponse>(`${ITEMS_API_URL}/${itemId}/conversation`, {observe: 'response'}).pipe(
            map(ConversationService.transformToResponseWithEntity)
        )
    }
}
