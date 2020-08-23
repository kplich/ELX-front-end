import {Component, OnInit} from '@angular/core';
import {COULD_NOT_LOAD_ITEM_MESSAGE} from "../../items/item/item.component";
import {ItemsService} from "../../items/items-service/items.service";
import {SnackBarService} from "../../shared/snack-bar-service/snack-bar.service";
import {ActivatedRoute} from '@angular/router';
import {Item} from "../../items/items-service/data/Item";
import { SafeUrl, DomSanitizer } from '@angular/platform-browser';
import {Conversation} from "../conversation-service/data/Conversation";
import {ConversationService} from "../conversation-service/conversation.service";

@Component({
    selector: 'app-conversation',
    templateUrl: './conversation.component.html',
    styleUrls: ['./conversation.component.scss']
})
export class ConversationComponent implements OnInit {

    item: Promise<Item>;
    conversation: Promise<Conversation>;

    constructor(
        private activatedRoute: ActivatedRoute,
        private itemsService: ItemsService,
        private conversationService: ConversationService,
        private snackBarService: SnackBarService,
        private domSanitizer: DomSanitizer
    ) {}

    ngOnInit(): void {
        const id = parseInt(this.activatedRoute.snapshot.paramMap.get('id'), 10);
        this.item = this.itemsService.getItem(id).toPromise().then(response => response.body); // TODO: catch?
        this.conversation = this.conversationService.getConversation(id).toPromise().then(response => {
            console.log(response.body);
            return response.body;
        });
    }

    get firstPhotoUrl(): Promise<SafeUrl> {
        return this.item.then(item => item.getSafePhotoUrls(this.domSanitizer)[0]);
    }
}
