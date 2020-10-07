import {async, ComponentFixture, TestBed} from "@angular/core/testing";

import {ItemBoughtContractDoubleAdvanceComponent} from "@bought-by-me/item-bought-offer/item-bought-contract-double-advance/item-bought-contract-double-advance.component";

describe("ItemBoughtOfferDoubleAdvanceComponent", () => {
    let component: ItemBoughtContractDoubleAdvanceComponent;
    let fixture: ComponentFixture<ItemBoughtContractDoubleAdvanceComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ItemBoughtContractDoubleAdvanceComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ItemBoughtContractDoubleAdvanceComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
