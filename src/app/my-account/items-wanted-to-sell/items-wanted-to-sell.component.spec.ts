import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {ItemsWantedToSellComponent} from "@my-account/items-wanted-to-sell/items-wanted-to-sell.component";
import {RouterTestingModule} from "@angular/router/testing";
import {UsedStatusDto} from "@items/data/UsedStatus";
import {OfferTypeResponseDto} from "@conversation/data/OfferType";
import {OfferStatusDto} from "@conversation/data/OfferStatus";
import {ItemWantedToSell} from "@my-account/data/items/ItemWantedToSell";

describe("ItemsWantedToSellComponent", () => {
    let component: ItemsWantedToSellComponent;
    let fixture: ComponentFixture<ItemsWantedToSellComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            declarations: [ItemsWantedToSellComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ItemsWantedToSellComponent);
        component = fixture.componentInstance;
        component.items = [
            new ItemWantedToSell({
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
                conversations: [
                    {
                        id: 10,
                        interestedUser: {
                            id: 11,
                            ethereumAddress: "also not an address",
                            username: "interested 1"
                        },
                        lastMessage: {
                            id: 11,
                            sendingUser: {
                                id: 11,
                                ethereumAddress: "also not an address",
                                username: "interested 1"
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
                    },
                    {
                        id: 12,
                        interestedUser: {
                            id: 12,
                            ethereumAddress: "also not an address",
                            username: "interested 2"
                        },
                        lastMessage: {
                            id: 12,
                            sendingUser: {
                                id: 12,
                                ethereumAddress: "also not an address",
                                username: "interested 2"
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
                    },
                ]
            })
        ];
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
