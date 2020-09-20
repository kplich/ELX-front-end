import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Conversation, ConversationResponse} from '@conversation/data/Conversation';
import {environment} from '@environments/environment';
import {NewMessageRequest} from '@conversation/message-form/conversation-message-form.component';

export const ITEMS_API_URL = `${environment.apiUrl}/items`;

@Injectable({
    providedIn: "root"
})
export class ConversationService {

    constructor(private http: HttpClient) {
    }

    private static transformToResponseWithEntity(
        response: HttpResponse<ConversationResponse>): HttpResponse<Conversation> {
        if (response.body === null) {
            throw new Error("Empty response body!");
        }
        return response.clone({body: new Conversation(response.body)});
    }

    getConversation(itemId: number): Observable<HttpResponse<Conversation>> {
        return this.http.get<ConversationResponse>(
            `${ITEMS_API_URL}/${itemId}/conversation`,
            {observe: "response"}).pipe(
            map(ConversationService.transformToResponseWithEntity)
        );
    }

    getConversationWithSubject(itemId: number, subjectId: number): Observable<HttpResponse<Conversation>> {
        return this.http.get<ConversationResponse>(
            `${ITEMS_API_URL}/${itemId}/conversation?subjectId=${subjectId}`,
            {observe: "response"}).pipe(
            map(ConversationService.transformToResponseWithEntity)
        );
    }

    sendMessage(itemId: number, messageRequest: NewMessageRequest): Observable<Conversation> {
        return this.http.post<ConversationResponse>(
            `${ITEMS_API_URL}/${itemId}/conversation`,
            messageRequest
        ).pipe(
            map(response => new Conversation(response))
        );
    }

    acceptOffer(offerId: number, contractAddress: string): Observable<Conversation> {
        return this.http.put<ConversationResponse>(
            `${ITEMS_API_URL}/${offerId}/accept`,
            {contractAddress}
        ).pipe(
            map(response => new Conversation(response))
        );
    }

    declineOffer(offerId: number): Observable<Conversation> {
        return this.http.put<ConversationResponse>(
            `${ITEMS_API_URL}/${offerId}/decline`,
            undefined
        ).pipe(
            map(response => new Conversation(response))
        );
    }

    cancelOffer(offerId: number): Observable<Conversation> {
        return this.http.put<ConversationResponse>(
            `${ITEMS_API_URL}/${offerId}/cancel`,
            undefined
        ).pipe(
            map(response => new Conversation(response))
        );
    }
}
