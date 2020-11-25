import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {ItemsWantedToBuyComponent} from "@my-account/items-wanted-to-buy/items-wanted-to-buy.component";
import {RouterTestingModule} from "@angular/router/testing";
import {ItemWantedToBuy} from "@my-account/data/items/ItemWantedToBuy";
import {UsedStatusDto} from "@items/data/UsedStatus";
import {OfferTypeResponseDto} from "@conversation/data/OfferType";
import {OfferStatusDto} from "@conversation/data/OfferStatus";

describe("ItemsWantedToBuyComponent", () => {
    let component: ItemsWantedToBuyComponent;
    let fixture: ComponentFixture<ItemsWantedToBuyComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            declarations: [ItemsWantedToBuyComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ItemsWantedToBuyComponent);
        component = fixture.componentInstance;
        component.items = [
            new ItemWantedToBuy({
                id: 11,
                title: "title 1",
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
                    id: 11,
                    interestedUser: {
                        id: 11,
                        ethereumAddress: "also not an address",
                        username: "interested"
                    },
                    lastMessage: {
                        id: 11,
                        sendingUser: {
                            id: 11,
                            ethereumAddress: "also not an address",
                            username: "interested"
                        },
                        sentOn: Date.now().toString(),
                        textContent: "message content"
                    },
                    lastOffer: {
                        id: 11,
                        type: OfferTypeResponseDto.DOUBLE_ADVANCE,
                        price: 123.000,
                        offerStatus: OfferStatusDto.AWAITING,
                        contractAddress: null
                    }
                }
            }),
            new ItemWantedToBuy({
                id: 12,
                title: "title 2",
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
                    id: 12,
                    interestedUser: {
                        id: 11,
                        ethereumAddress: "also not an address",
                        username: "interested"
                    },
                    lastMessage: {
                        id: 12,
                        sendingUser: {
                            id: 11,
                            ethereumAddress: "also not an address",
                            username: "interested"
                        },
                        sentOn: Date.now().toString(),
                        textContent: "message content"
                    },
                    lastOffer: {
                        id: 12,
                        type: OfferTypeResponseDto.DOUBLE_ADVANCE,
                        price: 123.000,
                        offerStatus: OfferStatusDto.AWAITING,
                        contractAddress: null
                    }
                }
            })
        ];
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
