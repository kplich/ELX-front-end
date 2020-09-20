import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable, of} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';

import {Conversation} from '@conversation/data/Conversation';
import {ConversationService} from '@conversation/service/conversation/conversation.service';
import {ItemsService} from '@items/service/items.service';
import {Item} from '@items/data/Item';
import {NewMessageRequest} from '@conversation/message-form/conversation-message-form.component';
import {HttpResponse} from '@angular/common/http';
import {LoggedInUserService} from '@shared/logged-in-user/logged-in-user.service';
import {SnackBarService} from '@shared/snack-bar-service/snack-bar.service';
import {OfferContractService} from '@conversation/service/offer-contract/offer-contract.service';

export const STRINGS = {
    error: "An error occurred."
};

@Component({
    selector: "app-conversation",
    templateUrl: "./conversation.component.html",
    styleUrls: ["./conversation.component.scss"]
})
export class ConversationComponent implements OnInit {

    item$!: Observable<Item | undefined>;
    conversation$!: Observable<Conversation | undefined>;

    private itemId!: number;
    private subjectId!: number | null;

    constructor(
        private loggedInUserService: LoggedInUserService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private itemsService: ItemsService,
        private conversationService: ConversationService,
        private offerContractService: OfferContractService,
        private snackBarService: SnackBarService
    ) {}

    ngOnInit(): void {
        const loggedInUser = this.loggedInUserService.authenticatedUser;
        if (loggedInUser === null) {
            this.router.navigateByUrl("/log-in").then(() => {});
        }

        const itemIdString = this.activatedRoute.snapshot.paramMap.get("id");
        if (itemIdString) {
            this.itemId = parseInt(itemIdString, 10);

            this.item$ = this.itemsService.getItem(this.itemId)
                .pipe(
                    map(response => response.body ? response.body : undefined)
                );

            const subjectIdString = this.activatedRoute.snapshot.queryParamMap.get("subjectId");
            this.subjectId = subjectIdString ? parseInt(subjectIdString, 10) : null;

            this.loadConversation();
        } else {
            console.warn("no id for item!");
        }
    }

    private loadConversation() {
        if (this.subjectId === null) {
            this.conversation$ = this.getConversation(this.itemId);
        } else {
            this.conversation$ = this.getConversationWithSubject(this.itemId, this.subjectId);
        }
    }

    private getConversationWithSubject(itemId: number, subjectId: number) {
        return this.conversationService.getConversationWithSubject(itemId, subjectId)
            .pipe(
                catchError(error => {
                    // if this user hasn't started a conversation, owner cannot start it
                    if (error.status === 404) {
                        this.router.navigateByUrl(`/items/${this.itemId}`).then(() => {
                            this.snackBarService.openSnackBar(STRINGS.error);
                        });
                    }

                    // owner cannot have a conversation with self
                    if (error.status === 400) {
                        this.router.navigateByUrl(`/items/${this.itemId}`).then(() => {
                            this.snackBarService.openSnackBar(STRINGS.error);
                        });
                    }

                    return of(new HttpResponse());
                }),
                map(response => response.body ? response.body : undefined),
                tap(console.log)
            );
    }

    private getConversation(itemId: number) {
        return this.conversationService.getConversation(itemId)
            .pipe(
                catchError(error => {
                    // if there's no conversation about the item, other user can start it

                    // subject id is necessary
                    if (error.status === 400) {
                        this.router.navigateByUrl(`/items/${this.itemId}`).then(() => {
                            this.snackBarService.openSnackBar(STRINGS.error);
                        });
                    }

                    return of(new HttpResponse());
                }),
                map(response => response.body ? response.body : undefined),
                tap(console.log)
            );
    }

    sendMessage(message: NewMessageRequest): void {
        this.conversation$ = this.conversationService.sendMessage(
            this.itemId,
            message
        );
    }

    cancelOffer(offerId: number) {
        this.conversation$ = this.conversationService.cancelOffer(offerId).pipe(
            catchError(_ => of(undefined)),
            tap(console.log)
        );
    }

    declineOffer(offerId: number) {
        this.conversation$ = this.conversationService.declineOffer(offerId).pipe(
            catchError(_ => of(undefined)),
            tap(console.log)
        );
    }

    acceptOffer(offerId: number) {
        this.offerContractService.createContract().then(contract => console.log(contract));

    }
}
