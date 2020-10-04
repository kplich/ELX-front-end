import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { DoubleAdvanceOfferComponent } from "./double-advance-offer.component";

describe("DoubleAdvanceOfferComponent", () => {
  let component: DoubleAdvanceOfferComponent;
  let fixture: ComponentFixture<DoubleAdvanceOfferComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoubleAdvanceOfferComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoubleAdvanceOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
