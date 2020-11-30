import {async, ComponentFixture, TestBed} from "@angular/core/testing";

import {UserItemConversationComponent} from "@my-account/user-item-conversation/user-item-conversation.component";
import {SimpleConversation} from "@my-account/data/SimpleConversation";

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
        component.conversation = new SimpleConversation({
            id: 10,
            interestedUser: {
                id: 10,
                username: "username",
                ethereumAddress: null
            },
            lastMessage: {
                id: 10,
                sendingUser: {
                    id: 10,
                    username: "username",
                    ethereumAddress: null
                },
                sentOn: Date.now().toString(),
                textContent: "content"
            },
            lastOffer: null
        });
        fixture.detectChanges();
    });
});
