import {async, ComponentFixture, TestBed} from "@angular/core/testing";

import {ItemPhotosComponent} from "./item-photos.component";

describe("ItemPhotosComponent", () => {
    let component: ItemPhotosComponent;
    let fixture: ComponentFixture<ItemPhotosComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ItemPhotosComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ItemPhotosComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
