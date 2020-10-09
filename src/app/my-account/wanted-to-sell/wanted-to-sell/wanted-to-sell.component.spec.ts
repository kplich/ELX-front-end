import {async, ComponentFixture, TestBed} from "@angular/core/testing";

import {WantedToSellComponent} from "@sold-by-me/sold-by-me/wanted-to-sell.component";

describe("WantedToSellComponent", () => {
    let component: WantedToSellComponent;
    let fixture: ComponentFixture<WantedToSellComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [WantedToSellComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(WantedToSellComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
