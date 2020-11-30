import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {ItemWantedToBuyComponent} from "@my-account/item-wanted-to-buy/item-wanted-to-buy.component";
import {RouterTestingModule} from "@angular/router/testing";
import {ItemWantedToBuy} from "@my-account/data/items/ItemWantedToBuy";
import {UsedStatusDto} from "@items/data/UsedStatus";
import {OfferTypeResponseDto} from "@conversation/data/OfferType";
import {OfferStatusDto} from "@conversation/data/OfferStatus";

describe("ItemWantedToBuyComponent", () => {
    let component: ItemWantedToBuyComponent;
    let fixture: ComponentFixture<ItemWantedToBuyComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            declarations: [ItemWantedToBuyComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ItemWantedToBuyComponent);
        component = fixture.componentInstance;
        component.item = new ItemWantedToBuy({
            id: 10,
            title: "title",
            description: "description",
            price: 123.456,
            addedBy: {
                id: 10,
                ethereumAddress: "not an address",
                username: "owner"
            },
            addedOn: Date.now().toString(),
            category: {
                id: 10,
                name: "category name"
            },
            usedStatus: UsedStatusDto.NEW,
            photoUrl: "photo URL",
            conversation: {
                id: 10,
                interestedUser: {
                    id: 11,
                    ethereumAddress: "also not an address",
                    username: "interested"
                },
                lastMessage: {
                    id: 10,
                    sendingUser: {
                        id: 11,
                        ethereumAddress: "also not an address",
                        username: "interested"
                    },
                    sentOn: Date.now().toString(),
                    textContent: "message content"
                },
                lastOffer: {
                    id: 10,
                    type: OfferTypeResponseDto.DOUBLE_ADVANCE,
                    price: 123.000,
                    offerStatus: OfferStatusDto.AWAITING,
                    contractAddress: null
                }
            }
        });
        fixture.detectChanges();
    });
});
