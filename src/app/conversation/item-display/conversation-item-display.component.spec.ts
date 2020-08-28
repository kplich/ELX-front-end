import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ConversationItemDisplayComponent } from "./conversation-item-display.component";

describe("ConversationItemDisplayComponent", () => {
  let component: ConversationItemDisplayComponent;
  let fixture: ComponentFixture<ConversationItemDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConversationItemDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConversationItemDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
