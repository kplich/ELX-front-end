import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SoldByMeComponent } from './sold-by-me.component';

describe('SoldByMeComponent', () => {
  let component: SoldByMeComponent;
  let fixture: ComponentFixture<SoldByMeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SoldByMeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SoldByMeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
