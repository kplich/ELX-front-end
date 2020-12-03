import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {Observable, of} from "rxjs";
import {catchError} from "rxjs/operators";
import {Conversation} from "@conversation/data/Conversation";
import {ConversationService} from "@conversation/service/conversation/conversation.service";
import {ItemsService} from "@items/service/items.service";
import {Item} from "@items/data/Item";
import {HttpErrorResponse} from "@angular/common/http";
import {LoggedInUserService} from "@shared/logged-in-user/logged-in-user.service";
import {SnackBarService} from "@shared/snack-bar-service/snack-bar.service";
import {OfferContractService} from "@shared/offer-contract/offer-contract.service";
import {AcceptedOfferData} from "@conversation/messages/conversation-messages.component";
import {NewMessageRequest} from "@conversation/data/NewMessageRequest";
import {PlainAdvanceOffer} from "@conversation/data/offer/PlainAdvanceOffer";
import {DoubleAdvanceOffer} from "@conversation/data/offer/DoubleAdvanceOffer";

export const STRINGS = {
    errors: {
        conversationWithSelf: "You cannot have a conversation with yourself!",
        conversationSubjectRequired: "You need to provide conversation subject ID!",
        conversationNotFound: "There are no messages in this conversation!",
        unauthorizedConversationAccess: "You're not authorized to view this conversation!",
        couldNotSendMessage: "Could not send message",
        couldNotCancelOffer: "Could not cancel offer.",
        couldNotDeclineOffer: "Could not decline offer",
        couldNotCreateContract: "Could not create contract.",
        couldNotAcceptOffer: "The contract has been created, but the offer has not been accepted. You'll have to try again.",
        noConnectionToBlockchain: "You're not connected to blockchain. Could not create contract."
    }
};

@Component({
    selector: "app-conversation",
    templateUrl: "./conversation.component.html",
    styleUrls: ["./conversation.component.scss"]
})
export class ConversationComponent implements OnInit {

    item$!: Observable<Item>;
    conversation$: Observable<Conversation | undefined> = of(undefined);

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
    ) {
    }

    ngOnInit(): void {
        const loggedInUser = this.loggedInUserService.authenticatedUser;
        if (loggedInUser === null) {
            this.router.navigateByUrl("/log-in").then(() => {
            });
            return;
        }

        const itemIdString = this.activatedRoute.snapshot.paramMap.get("id");
        if (itemIdString === null) {
            this.router.navigateByUrl("/error").then(() => {
            });
            return;
        }

        this.itemId = parseInt(itemIdString, 10);
        if (isNaN(this.itemId)) {
            this.router.navigateByUrl("/error").then(() => {
            });
            return;
        }

        this.item$ = this.itemsService.getItem(this.itemId);

        const subjectIdString = this.activatedRoute.snapshot.queryParamMap.get("subjectId");

        this.subjectId = null;
        if (subjectIdString) {
            const subjectId = parseInt(subjectIdString, 10);
            if (isNaN(subjectId)) {
                this.router.navigateByUrl("/error").then(() => {
                });
            } else {
                this.subjectId = subjectId;
            }
        }

        this.loadConversation();
    }

    sendMessage(message: NewMessageRequest) {
        const tempConversation = this.conversation$;

        if (this.subjectId !== null) {
            this.conversation$ = this.conversationService.sendMessageWithSubject(
                this.itemId,
                message,
                this.subjectId
            ).pipe(
                catchError(_ => {
                    this.snackBarService.openSnackBar(STRINGS.errors.couldNotSendMessage);
                    return tempConversation;
                })
            );
        } else {
            this.conversation$ = this.conversationService.sendMessage(
                this.itemId,
                message
            ).pipe(
                catchError(_ => {
                    this.snackBarService.openSnackBar(STRINGS.errors.couldNotSendMessage);
                    return tempConversation;
                })
            );
        }
    }

    cancelOffer(offerId: number) {
        const tempConversation = this.conversation$;
        this.conversation$ = this.conversationService.cancelOffer(offerId).pipe(
            catchError(_ => {
                this.snackBarService.openSnackBar(STRINGS.errors.couldNotCancelOffer);
                return tempConversation;
            })
        );
    }

    declineOffer(offerId: number) {
        const tempConversation = this.conversation$;
        this.conversation$ = this.conversationService.declineOffer(offerId).pipe(
            catchError(_ => {
                this.snackBarService.openSnackBar(STRINGS.errors.couldNotDeclineOffer);
                return tempConversation;
            })
        );
    }

    async acceptOffer(acceptedOfferData: AcceptedOfferData) {
        console.log(acceptedOfferData);
        let contract;
        try {
            if (acceptedOfferData.offer instanceof PlainAdvanceOffer) {
                contract = await this.offerContractService.createPlainAdvanceContract(
                    acceptedOfferData.buyerAddress,
                    acceptedOfferData.sellerAddress,
                    acceptedOfferData.offer.price,
                    acceptedOfferData.offer.advance
                );
            } else if (acceptedOfferData.offer instanceof DoubleAdvanceOffer) {
                contract = await this.offerContractService.createDoubleAdvanceContract(
                    acceptedOfferData.buyerAddress,
                    acceptedOfferData.sellerAddress,
                    acceptedOfferData.offer.price,
                );
            } else {
                console.warn("wrong contract type!");
            }
        } catch (error) {
            this.snackBarService.openSnackBar(STRINGS.errors.couldNotCreateContract);
        }

        if (contract !== null) {
            const tempConversation = this.conversation$;
            this.conversation$ = this.conversationService
                .acceptOffer(acceptedOfferData.offer.id, contract.address).pipe(
                    catchError(_ => {
                        this.snackBarService.openSnackBar(STRINGS.errors.couldNotAcceptOffer);
                        return tempConversation;
                    })
                );
        }
        else {
            this.snackBarService.openSnackBar(STRINGS.errors.noConnectionToBlockchain);
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
                catchError((error: HttpErrorResponse) => {
                    // owner cannot have a conversation with self
                    if (error.status === 400) {
                        this.router.navigateByUrl(`/items/${this.itemId}`).then(() => {
                            this.snackBarService.openSnackBar(STRINGS.errors.conversationWithSelf);
                        });
                    }

                    if (error.status === 401) {
                        this.router.navigateByUrl(`items/${this.itemId}`).then(() => {
                            this.snackBarService.openSnackBar(STRINGS.errors.unauthorizedConversationAccess);
                        });
                    }

                    // if this user hasn't started a conversation, owner cannot start it
                    if (error.status === 404) {
                        this.router.navigateByUrl(`/items/${this.itemId}`).then(() => {
                            this.snackBarService.openSnackBar(STRINGS.errors.conversationNotFound);
                        });
                    }

                    return of(undefined);
                })
            );
    }

    private getConversation(itemId: number) {
        return this.conversationService.getConversation(itemId)
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    // owner cannot have a conversation with self
                    if (error.status === 400) {
                        this.router.navigateByUrl(`/items/${this.itemId}`).then(() => {
                            this.snackBarService.openSnackBar(STRINGS.errors.conversationSubjectRequired);
                        });
                    }

                    if (error.status === 401) {
                        this.router.navigateByUrl(`items/${this.itemId}`).then(() => {
                            this.snackBarService.openSnackBar(STRINGS.errors.unauthorizedConversationAccess);
                        });
                    }

                    return of(undefined);
                })
            );
    }
}
