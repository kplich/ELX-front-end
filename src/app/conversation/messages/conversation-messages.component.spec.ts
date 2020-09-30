import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ConversationMessagesComponent } from "@conversation/messages/conversation-messages.component";

xdescribe("ConversationMessagesComponent", () => {
  let component: ConversationMessagesComponent;
  let fixture: ComponentFixture<ConversationMessagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConversationMessagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConversationMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
