import {async, ComponentFixture, TestBed} from "@angular/core/testing";

import {UserItemDescriptionComponent} from "@my-account/user-item-description/user-item-description.component";

describe("UserItemDescriptionComponent", () => {
    let component: UserItemDescriptionComponent;
    let fixture: ComponentFixture<UserItemDescriptionComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [UserItemDescriptionComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(UserItemDescriptionComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
});
