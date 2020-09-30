import {async, ComponentFixture, TestBed} from "@angular/core/testing";

import {UpdateItemComponent} from "@items/update-item/update-item.component";

describe("EditItemComponent", () => {
    let component: UpdateItemComponent;
    let fixture: ComponentFixture<UpdateItemComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [UpdateItemComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(UpdateItemComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
});
