import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';

import {Conversation} from '@conversation/data/Conversation';
import {ConversationService} from '@conversation/service/conversation.service';
import {ItemsService} from '@items/service/items.service';
import {Item} from '@items/data/Item';

@Component({
    selector: 'app-conversation',
    templateUrl: './conversation.component.html',
    styleUrls: ['./conversation.component.scss']
})
export class ConversationComponent implements OnInit {

    item!: Observable<Item | undefined>;
    conversation!: Observable<Conversation | undefined>;

    constructor(
        private activatedRoute: ActivatedRoute,
        private itemsService: ItemsService,
        private conversationService: ConversationService
    ) {
    }

    ngOnInit(): void {
        console.log('conversation component ng on init!');
        const itemIdString = this.activatedRoute.snapshot.paramMap.get('id');
        if (itemIdString) {
            const itemId = parseInt(itemIdString, 10);
            this.item = this.itemsService.getItem(itemId)
                .pipe(
                    map(response => response.body ? response.body : undefined)
                );
            this.conversation = this.conversationService.getConversation(itemId)
                .pipe(
                    map(response => response.body ? response.body : undefined),
                    tap(console.log)
                );
        } else {
            console.warn('no id for item!');
        }
    }
}
