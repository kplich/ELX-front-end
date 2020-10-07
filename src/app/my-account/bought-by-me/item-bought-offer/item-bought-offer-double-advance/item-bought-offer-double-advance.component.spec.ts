import {async, ComponentFixture, TestBed} from "@angular/core/testing";

import {ItemBoughtOfferDoubleAdvanceComponent} from "@bought-by-me/item-bought-offer/item-bought-offer-double-advance/item-bought-offer-double-advance.component";

describe("ItemBoughtOfferDoubleAdvanceComponent", () => {
    let component: ItemBoughtOfferDoubleAdvanceComponent;
    let fixture: ComponentFixture<ItemBoughtOfferDoubleAdvanceComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ItemBoughtOfferDoubleAdvanceComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ItemBoughtOfferDoubleAdvanceComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
