import {async, ComponentFixture, TestBed} from "@angular/core/testing";

import {ItemBoughtOfferPlainAdvanceComponent} from "@bought-by-me/item-bought-offer/item-bought-offer-plain-advance/item-bought-offer-plain-advance.component";

describe("ItemBoughtOfferPlainAdvanceComponent", () => {
    let component: ItemBoughtOfferPlainAdvanceComponent;
    let fixture: ComponentFixture<ItemBoughtOfferPlainAdvanceComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ItemBoughtOfferPlainAdvanceComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ItemBoughtOfferPlainAdvanceComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
