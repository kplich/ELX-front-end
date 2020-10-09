import {async, ComponentFixture, TestBed} from "@angular/core/testing";

import {WantedByMeComponent} from "wanted-to-buy/wanted-by-me/wanted-by-me.component";

describe("WantedByMeComponent", () => {
    let component: WantedByMeComponent;
    let fixture: ComponentFixture<WantedByMeComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [WantedByMeComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(WantedByMeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
