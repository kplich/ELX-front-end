import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {Observable, of} from "rxjs";
import {catchError, map, tap} from "rxjs/operators";

import {Conversation} from "@conversation/data/Conversation";
import {ConversationService} from "@conversation/service/conversation.service";
import {ItemsService} from "@items/service/items.service";
import {Item} from "@items/data/Item";
import {NewMessageRequest} from "@conversation/message-form/conversation-message-form.component";
import {HttpResponse} from "@angular/common/http";

@Component({
    selector: "app-conversation",
    templateUrl: "./conversation.component.html",
    styleUrls: ["./conversation.component.scss"]
})
export class ConversationComponent implements OnInit {

    item!: Observable<Item | undefined>;
    conversation!: Observable<Conversation | undefined>;

    private itemId!: number;
    private subjectId!: number | null;

    constructor(
        private activatedRoute: ActivatedRoute,
        private itemsService: ItemsService,
        private conversationService: ConversationService
    ) {}

    ngOnInit(): void {
        console.log("conversation component ng on init!");
        const itemIdString = this.activatedRoute.snapshot.paramMap.get("id");
        if (itemIdString) {
            this.itemId = parseInt(itemIdString, 10);

            this.item = this.itemsService.getItem(this.itemId)
                .pipe(
                    map(response => response.body ? response.body : undefined)
                );

            const subjectIdString = this.activatedRoute.snapshot.queryParamMap.get("subjectId");
            this.subjectId = subjectIdString ? parseInt(subjectIdString, 10) : null;
            this.conversation = this.getConversation(this.itemId, this.subjectId);
        } else {
            console.warn("no id for item!");
        }
    }

    private getConversation(itemId: number, subjectId: number | null) {
        return this.conversationService.getConversation(itemId, subjectId)
            .pipe(
                catchError(_ => of(new HttpResponse())),
                map(response => response.body ? response.body : undefined),
                tap(console.log)
            );
    }

    sendMessage(message: NewMessageRequest): void {
        this.conversation = this.conversationService.sendMessage(
            this.itemId,
            message
        );
    }

    cancelOffer(offerId: number) {
        this.conversationService.cancelOffer(offerId).subscribe(
            _ => {},
            err => console.error(err),
            () => {
                this.conversation = this.getConversation(this.itemId, this.subjectId);
            }
        );
    }

    declineOffer(offerId: number) {
        this.conversationService.declineOffer(offerId).subscribe(
            _ => {},
            err => console.error(err),
            () => {
                this.conversation = this.getConversation(this.itemId, this.subjectId);
            }
        );
    }

    acceptOffer(offerId: number) {
        console.log("accepting offer! :D");
    }
}
