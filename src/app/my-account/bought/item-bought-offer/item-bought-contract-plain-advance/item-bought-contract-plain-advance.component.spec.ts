import {async, ComponentFixture, TestBed} from "@angular/core/testing";

import {ItemBoughtContractPlainAdvanceComponent} from "@bought-by-me/item-bought-offer/item-bought-contract-plain-advance/item-bought-contract-plain-advance.component";

describe("ItemBoughtOfferPlainAdvanceComponent", () => {
    let component: ItemBoughtContractPlainAdvanceComponent;
    let fixture: ComponentFixture<ItemBoughtContractPlainAdvanceComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ItemBoughtContractPlainAdvanceComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ItemBoughtContractPlainAdvanceComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
