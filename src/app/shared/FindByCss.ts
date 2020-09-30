import {ComponentFixture} from "@angular/core/testing";
import {By} from "@angular/platform-browser";

export function findByCss<T, EL extends HTMLElement>(
    fixture: ComponentFixture<T>, selector: string): EL {
    return fixture.debugElement.query(By.css(selector))?.nativeElement as EL;
}
