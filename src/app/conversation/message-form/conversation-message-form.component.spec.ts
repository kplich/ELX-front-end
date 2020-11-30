import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ConversationMessageFormComponent } from "@conversation/message-form/conversation-message-form.component";

describe("ConversationMessageFormComponent", () => {
  let component: ConversationMessageFormComponent;
  let fixture: ComponentFixture<ConversationMessageFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConversationMessageFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConversationMessageFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
