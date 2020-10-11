import {async, ComponentFixture, TestBed} from "@angular/core/testing";

import {ItemsBoughtComponent} from "@my-account/items-bought/items-bought.component";

describe("BoughtByMeComponent", () => {
    let component: ItemsBoughtComponent;
    let fixture: ComponentFixture<ItemsBoughtComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ItemsBoughtComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ItemsBoughtComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
