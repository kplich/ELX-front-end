import {async, ComponentFixture, TestBed} from "@angular/core/testing";

import {ItemsSoldComponent} from "@my-account/items-sold/items-sold.component";
import {RouterTestingModule} from "@angular/router/testing";
import {UsedStatusDto} from "@items/data/UsedStatus";
import {OfferTypeResponseDto} from "@conversation/data/OfferType";
import {OfferStatusDto} from "@conversation/data/OfferStatus";
import {ItemSold} from "@my-account/data/items/ItemSold";

describe("ItemsSoldComponent", () => {
    let component: ItemsSoldComponent;
    let fixture: ComponentFixture<ItemsSoldComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            declarations: [ItemsSoldComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ItemsSoldComponent);
        component = fixture.componentInstance;
        component.items = [
            new ItemSold({
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
                offer: {
                    id: 10,
                    type: OfferTypeResponseDto.DOUBLE_ADVANCE,
                    price: 123.000,
                    offerStatus: OfferStatusDto.AWAITING,
                    contractAddress: null
                }
            }),
            new ItemSold({
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
                offer: {
                    id: 10,
                    type: OfferTypeResponseDto.DOUBLE_ADVANCE,
                    price: 123.000,
                    offerStatus: OfferStatusDto.AWAITING,
                    contractAddress: null
                }
            })
        ];
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
