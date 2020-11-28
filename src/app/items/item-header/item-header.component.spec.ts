import {async, ComponentFixture, TestBed} from "@angular/core/testing";

import {ItemHeaderComponent} from "./item-header.component";
import {RouterTestingModule} from "@angular/router/testing";

describe("ItemHeaderComponent", () => {
    let component: ItemHeaderComponent;
    let fixture: ComponentFixture<ItemHeaderComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            declarations: [ItemHeaderComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ItemHeaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
