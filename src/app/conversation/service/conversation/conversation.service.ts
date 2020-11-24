import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {Conversation, ConversationResponse} from "@conversation/data/Conversation";
import {environment} from "@environments/environment";
import {NewMessageRequest} from "@conversation/data/NewMessageRequest";

/**
 * API URL used to read and store data about items (and about conversations
 * about those items, too.)
 */
export const ITEMS_API_URL = `${environment.apiUrl}/items`;

/**
 * Service used in the Conversation Module. Used to read conversation, send
 * messages and accept/decline offers.
 */
@Injectable({
    providedIn: "root"
})
export class ConversationService {

    constructor(private http: HttpClient) {
    }

    getConversation(itemId: number): Observable<Conversation> {
        return this.http.get<ConversationResponse>(
            `${ITEMS_API_URL}/${itemId}/conversation`
        ).pipe(
            map(response => new Conversation(response))
        );
    }

    getConversationWithSubject(itemId: number, subjectId: number): Observable<Conversation> {
        return this.http.get<ConversationResponse>(
            `${ITEMS_API_URL}/${itemId}/conversation?subjectId=${subjectId}`
        ).pipe(
            map(response => new Conversation(response))
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

    sendMessageWithSubject(
            itemId: number,
            messageRequest: NewMessageRequest,
            subjectId: number): Observable<Conversation> {
        return this.http.post<ConversationResponse>(
            `${ITEMS_API_URL}/${itemId}/conversation?subjectId=${subjectId}`,
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
