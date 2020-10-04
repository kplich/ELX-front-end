import {Component} from "@angular/core";
import {LoggedInUserService} from "@shared/logged-in-user/logged-in-user.service";
import {OfferComponent} from "@conversation/offer/offer.component";
import {DoubleAdvanceOffer} from "@conversation/data/offer/DoubleAdvanceOffer";

@Component({
    selector: "app-double-advance-offer",
    templateUrl: "./double-advance-offer.component.html",
    styleUrls: ["./../offer.component.scss"]
})
export class DoubleAdvanceOfferComponent extends OfferComponent<DoubleAdvanceOffer> {

    constructor(loggedInUserService: LoggedInUserService) {
        super(loggedInUserService);
    }
}
