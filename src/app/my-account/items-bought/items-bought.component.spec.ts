import {async, ComponentFixture, TestBed} from "@angular/core/testing";

import {ItemsBoughtComponent} from "@my-account/items-bought/items-bought.component";
import {RouterTestingModule} from "@angular/router/testing";

describe("ItemsBoughtComponent", () => {
    let component: ItemsBoughtComponent;
    let fixture: ComponentFixture<ItemsBoughtComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule],
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
