import {async, ComponentFixture, TestBed} from "@angular/core/testing";

import {ItemBoughtOfferComponent} from "@bought-by-me/item-bought-offer/item-bought-offer.component";

describe("ItemBoughtOfferComponent", () => {
    let component: ItemBoughtOfferComponent;
    let fixture: ComponentFixture<ItemBoughtOfferComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ItemBoughtOfferComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ItemBoughtOfferComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
