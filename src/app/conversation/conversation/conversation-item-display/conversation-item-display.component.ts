import {Component, OnInit, Input} from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';
import {UsedStatus} from "../../../items/items-service/data/UsedStatus";

@Component({
    selector: 'app-conversation-item-display',
    templateUrl: './conversation-item-display.component.html',
    styleUrls: ['./conversation-item-display.component.scss']
})
export class ConversationItemDisplayComponent implements OnInit {

    @Input() itemUrl: SafeUrl;
    @Input() itemTitle: string;
    @Input() itemStatus: UsedStatus;
    @Input() itemPrice: string;

    constructor() {
    }

    ngOnInit(): void {
    }

}
