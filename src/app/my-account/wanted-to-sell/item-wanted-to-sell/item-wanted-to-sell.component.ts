import {Component, Input} from "@angular/core";
import {ItemWantedToSell} from "@my-account/data/ItemWantedToSell";
import {Router} from "@angular/router";
import {SimpleConversation} from "@my-account/data/SimpleConversation";

@Component({
    selector: "item-wanted-to-sell",
    templateUrl: "./item-wanted-to-sell.component.html",
    styleUrls: ["./item-wanted-to-sell.component.scss"]
})
export class ItemWantedToSellComponent {

    @Input() item!: ItemWantedToSell;

    constructor(private router: Router) {
    }

    get thereAreConversations(): boolean {
        return this.item.conversations.length > 0;
    }

    navigateToItem() {
        this.router.navigateByUrl(`/items/${this.item?.id}`).then(() => {
        });
    }

    navigateToConversation(conversation: SimpleConversation) {
        this.router
            .navigateByUrl(`/items/${this.item?.id}/conversation?subjectId=${conversation.interestedUserId}`)
            .then(() => {
            });
    }
}
