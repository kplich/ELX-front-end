import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ItemWantedComponent } from "@wanted-by-me/item-wanted/item-wanted.component";

describe("ItemWantedComponent", () => {
  let component: ItemWantedComponent;
  let fixture: ComponentFixture<ItemWantedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemWantedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemWantedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
