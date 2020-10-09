import {Component, Input} from "@angular/core";
import {Router} from "@angular/router";
import {ItemWantedToBuy} from "@my-account/data/ItemWantedToBuy";

@Component({
    selector: "item-wanted-to-buy",
    templateUrl: "./item-wanted-to-buy.component.html",
    styleUrls: ["./item-wanted-to-buy.component.scss"]
})
export class ItemWantedToBuyComponent {

    @Input() item!: ItemWantedToBuy;

    constructor(private router: Router) {
    }

    navigateToItem() {
        this.router.navigateByUrl(`/items/${this.item?.id}`).then(() => {
        });
    }

    navigateToConversation() {
        this.router.navigateByUrl(`/items/${this.item?.id}/conversation`)
            .then(() => {
            });
    }
}
