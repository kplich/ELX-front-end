import {Component, OnInit, ViewChild, ElementRef, AfterViewChecked} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs";
import {map, tap} from "rxjs/operators";

import {Conversation} from "@conversation/data/Conversation";
import {ConversationService} from "@conversation/service/conversation.service";
import {ItemsService} from "@items/service/items.service";
import {Item} from "@items/data/Item";
import {NewMessageRequest} from "@conversation/message-form/conversation-message-form.component";

@Component({
    selector: "app-conversation",
    templateUrl: "./conversation.component.html",
    styleUrls: ["./conversation.component.scss"]
})
export class ConversationComponent implements OnInit, AfterViewChecked {

    item!: Observable<Item | undefined>;
    conversation!: Observable<Conversation | undefined>;

    @ViewChild("conversationMessages") conversationMessages!: ElementRef;
    private itemId!: number;

    constructor(
        private activatedRoute: ActivatedRoute,
        private itemsService: ItemsService,
        private conversationService: ConversationService
    ) {
    }

    ngOnInit(): void {
        console.log("conversation component ng on init!");
        const itemIdString = this.activatedRoute.snapshot.paramMap.get("id");
        if (itemIdString) {
            this.itemId = parseInt(itemIdString, 10);
            this.item = this.itemsService.getItem(this.itemId)
                .pipe(
                    map(response => response.body ? response.body : undefined)
                );
            this.conversation = this.conversationService.getConversation(this.itemId)
                .pipe(
                    map(response => response.body ? response.body : undefined),
                    tap(console.log)
                );
        } else {
            console.warn("no id for item!");
        }
    }

    ngAfterViewChecked(): void {
        this.scrollMessagesToBottom();
    }

    private scrollMessagesToBottom(): void {
        (this.conversationMessages.nativeElement as HTMLElement).scrollBy({
            top: (this.conversationMessages.nativeElement as HTMLElement).scrollHeight,
            behavior: "smooth"
        });
    }

    sendMessage(message: NewMessageRequest): void {
        this.conversation = this.conversationService.sendMessage(
            this.itemId,
            message
        );
    }
}
