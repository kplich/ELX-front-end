import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConversationMessageInputComponent } from './conversation-message-input.component';

describe('ConversationMessageInputComponent', () => {
  let component: ConversationMessageInputComponent;
  let fixture: ComponentFixture<ConversationMessageInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConversationMessageInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConversationMessageInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
