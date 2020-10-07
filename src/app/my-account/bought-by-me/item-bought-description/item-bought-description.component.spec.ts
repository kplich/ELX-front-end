import {async, ComponentFixture, TestBed} from "@angular/core/testing";

import {ItemBoughtDescriptionComponent} from "@bought-by-me/item-bought-description/item-bought-description.component";

describe("ItemBoughtDescriptionComponent", () => {
    let component: ItemBoughtDescriptionComponent;
    let fixture: ComponentFixture<ItemBoughtDescriptionComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ItemBoughtDescriptionComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ItemBoughtDescriptionComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
