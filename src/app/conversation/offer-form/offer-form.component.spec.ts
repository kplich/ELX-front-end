import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { OfferFormComponent } from "@conversation/offer-form/offer-form.component";

describe("OfferFormComponent", () => {
  let component: OfferFormComponent;
  let fixture: ComponentFixture<OfferFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfferFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
