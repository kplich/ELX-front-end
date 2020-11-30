import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { PlainAdvanceOfferComponent } from "./plain-advance-offer.component";

describe("PlainAdvanceOfferComponent", () => {
  let component: PlainAdvanceOfferComponent;
  let fixture: ComponentFixture<PlainAdvanceOfferComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlainAdvanceOfferComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlainAdvanceOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
