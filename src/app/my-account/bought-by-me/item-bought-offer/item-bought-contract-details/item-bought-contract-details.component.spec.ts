import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ItemBoughtContractDetailsComponent } from "@bought-by-me/item-bought-offer/item-bought-contract-details/item-bought-contract-details.component";

describe("ItemBoughtContractDetailsComponent", () => {
  let component: ItemBoughtContractDetailsComponent;
  let fixture: ComponentFixture<ItemBoughtContractDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemBoughtContractDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemBoughtContractDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
