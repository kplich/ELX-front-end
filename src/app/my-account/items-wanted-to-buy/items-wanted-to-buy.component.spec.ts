import { ComponentFixture, TestBed, async } from "@angular/core/testing";
import {ItemsWantedToBuyComponent} from "@my-account/items-wanted-to-buy/items-wanted-to-buy.component";

describe("WantedByMeComponent", () => {
    let component: ItemsWantedToBuyComponent;
    let fixture: ComponentFixture<ItemsWantedToBuyComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ItemsWantedToBuyComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ItemsWantedToBuyComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
