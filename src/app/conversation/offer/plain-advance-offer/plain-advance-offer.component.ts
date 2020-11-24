import { Component } from "@angular/core";
import {LoggedInUserService} from "@shared/logged-in-user/logged-in-user.service";
import {PlainAdvanceOffer} from "@conversation/data/offer/PlainAdvanceOffer";
import {OfferComponent} from "@conversation/offer/offer.component";

@Component({
  selector: "app-plain-advance-offer",
  templateUrl: "./plain-advance-offer.component.html",
  styleUrls: ["./../offer.component.scss"]
})
export class PlainAdvanceOfferComponent extends OfferComponent<PlainAdvanceOffer> {

    constructor(loggedInUserService: LoggedInUserService) {
        super(loggedInUserService);
    }

}
