import {Component, OnInit} from '@angular/core';
import {COULD_NOT_LOAD_ITEM_MESSAGE} from "../../items/item/item.component";
import {ItemsService} from "../../items/items-service/items.service";
import {SnackBarService} from "../../shared/snack-bar-service/snack-bar.service";
import {ActivatedRoute} from '@angular/router';
import {Item} from "../../items/items-service/data/Item";
import {Conversation} from "../conversation-service/data/Conversation";
import {ConversationService} from "../conversation-service/conversation.service";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
    selector: 'app-conversation',
    templateUrl: './conversation.component.html',
    styleUrls: ['./conversation.component.scss']
})
export class ConversationComponent implements OnInit {

    item: Observable<Item>;
    conversation: Observable<Conversation>;

    constructor(
        private activatedRoute: ActivatedRoute,
        private itemsService: ItemsService,
        private conversationService: ConversationService,
        private snackBarService: SnackBarService
    ) {}

    ngOnInit(): void {
        const id = parseInt(this.activatedRoute.snapshot.paramMap.get('id'), 10);
        this.item = this.itemsService.getItem(id)
            .pipe(
                map(response => response.body),
            );
        this.conversation = this.conversationService.getConversation(id)
            .pipe(
                map(response => response.body)
            );
    }
}
