import {async, ComponentFixture, TestBed} from "@angular/core/testing";

import {BoughtByMeComponent} from "@bought-by-me/bought-by-me/bought-by-me.component";

describe("BoughtByMeComponent", () => {
    let component: BoughtByMeComponent;
    let fixture: ComponentFixture<BoughtByMeComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [BoughtByMeComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BoughtByMeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
