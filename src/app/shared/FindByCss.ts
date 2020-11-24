import {ComponentFixture} from "@angular/core/testing";
import {By} from "@angular/platform-browser";

/**
 * A function used to find a element by a CSS selector within a test fixture.
 * @param fixture component's fixture (T is the component type)
 * @param selector CSS selector used for searching
 * @returns a native HTML element
 */
export function findByCss<T, EL extends HTMLElement>(
    fixture: ComponentFixture<T>, selector: string): EL {
    return fixture.debugElement.query(By.css(selector))?.nativeElement as EL;
}
