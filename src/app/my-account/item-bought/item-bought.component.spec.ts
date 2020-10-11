import {async, ComponentFixture, TestBed} from "@angular/core/testing";

import {ItemBoughtComponent} from "@my-account/item-bought/item-bought.component";

describe("ItemBoughtComponent", () => {
    let component: ItemBoughtComponent;
    let fixture: ComponentFixture<ItemBoughtComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ItemBoughtComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ItemBoughtComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
