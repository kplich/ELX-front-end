import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ConversationOfferComponent } from "./conversation-offer.component";

describe("ConversationOfferComponent", () => {
  let component: ConversationOfferComponent;
  let fixture: ComponentFixture<ConversationOfferComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConversationOfferComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConversationOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
