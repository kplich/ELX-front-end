import {Component, Input, OnInit} from "@angular/core";
import {ItemSoldByMe} from "@my-account/data/ItemSoldByMe";
import { Router } from "@angular/router";
import {SimpleConversation} from "@my-account/data/SimpleConversation";

@Component({
    selector: "item-sold",
    templateUrl: "./item-sold.component.html",
    styleUrls: ["./item-sold.component.scss"]
})
export class ItemSoldComponent implements OnInit {

    @Input() item!: ItemSoldByMe;

    constructor(private router: Router) {
    }

    ngOnInit() {
    }

    navigateToItem() {
        this.router.navigateByUrl(`/items/${this.item?.id}`).then(() => {
        });
    }

    navigateToConversation(conversation: SimpleConversation) {
        this.router
            .navigateByUrl(`/items/${this.item?.id}/conversation?subjectId=${conversation.interestedUserId}`)
            .then(() => {});
    }

    get thereAreConversations(): boolean {
        return this.item.conversations.length > 0;
    }
}
