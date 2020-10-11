import {async, ComponentFixture, TestBed} from "@angular/core/testing";

import {UserItemConversationComponent} from "@my-account/user-item-conversation/user-item-conversation.component";

describe("UserItemConversationComponent", () => {
    let component: UserItemConversationComponent;
    let fixture: ComponentFixture<UserItemConversationComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [UserItemConversationComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(UserItemConversationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
