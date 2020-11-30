import {async, ComponentFixture, TestBed} from "@angular/core/testing";

import {EnableEthereumComponent} from "@my-account/settings/enable-ethereum/enable-ethereum.component";
import {MaterialModule} from "@material/material.module";

describe("EnableEthereumComponent", () => {
    let component: EnableEthereumComponent;
    let fixture: ComponentFixture<EnableEthereumComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [ MaterialModule ],
            declarations: [EnableEthereumComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(EnableEthereumComponent);
        component = fixture.componentInstance;
        component.accounts = ["this is not an address"];
        fixture.detectChanges();
    });
});
