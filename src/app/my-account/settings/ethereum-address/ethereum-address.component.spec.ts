import {async, ComponentFixture, TestBed} from "@angular/core/testing";

import {EthereumAddressComponent} from "@my-account/settings/ethereum-address/ethereum-address.component";

describe("EthereumAddressComponent", () => {
    let component: EthereumAddressComponent;
    let fixture: ComponentFixture<EthereumAddressComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [EthereumAddressComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(EthereumAddressComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
