import {CategoryResponse, Item} from "@items/data/Item";
import {dtoStringToStatus, UsedStatus, UsedStatusDto} from "@items/data/UsedStatus";
import {Offer, OfferResponse} from "@conversation/data/offer/Offer";
import {OfferTypeResponseDto} from "@conversation/data/OfferType";
import {PlainAdvanceOffer, PlainAdvanceOfferResponse} from "@conversation/data/offer/PlainAdvanceOffer";
import {DoubleAdvanceOffer, DoubleAdvanceOfferResponse} from "@conversation/data/offer/DoubleAdvanceOffer";

export class ItemSold {
    id: number;
    title: string;
    description: string;
    price: number;
    addedOn: Date;
    category: CategoryResponse;
    usedStatus: UsedStatus;
    photoUrl: string;
    offer: Offer;

    constructor(response: ItemSoldResponse) {
        this.id = response.id;
        this.title = response.title;
        this.description = response.description;
        this.price = response.price;
        this.addedOn = new Date(response.addedOn);
        this.category = response.category;
        this.usedStatus = dtoStringToStatus(response.usedStatus);
        this.photoUrl = response.photoUrl;

        switch (response.offer.type) {
            case OfferTypeResponseDto.PLAIN_ADVANCE: {
                this.offer = new PlainAdvanceOffer(response.offer as PlainAdvanceOfferResponse);
                break;
            }
            case OfferTypeResponseDto.DOUBLE_ADVANCE: {
                this.offer = new DoubleAdvanceOffer(response.offer as DoubleAdvanceOfferResponse);
            }
        }
    }

    get formattedPrice(): string {
        return `${this.price} ${Item.ETH_SYMBOL}`;
    }

    public get usedStatusIsApplicable(): boolean {
        return this.usedStatus !== UsedStatus.NOT_APPLICABLE;
    }

    public fixPhotoUrl() {
        this.photoUrl = "assets/error-photo.png";
    }
}

export interface ItemSoldResponse {
    id: number;
    title: string;
    description: string;
    price: number;
    addedOn: string;
    category: CategoryResponse;
    usedStatus: UsedStatusDto;
    photoUrl: string;
    offer: OfferResponse;
}
