import {async, ComponentFixture, TestBed} from "@angular/core/testing";

import {EnableEthereumComponent} from "@my-account/settings/enable-ethereum/enable-ethereum.component";

describe("EnableEthereumComponent", () => {
    let component: EnableEthereumComponent;
    let fixture: ComponentFixture<EnableEthereumComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [EnableEthereumComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(EnableEthereumComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
