import {async, ComponentFixture, TestBed} from "@angular/core/testing";

import {MaterialModule} from "@material/material.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AuthenticationService} from "@authentication/authentication-service/authentication.service";
import {Router} from "@angular/router";
import {SnackBarService} from "@shared/snack-bar-service/snack-bar.service";
import {SettingsComponent} from "@my-account/settings/settings/settings.component";

describe("SettingsComponent", () => {
    const authenticationServiceSpy = jasmine.createSpyObj(
        "AuthenticationService",
        ["signUp"]
    );
    const routerSpy = jasmine.createSpyObj("Router", ["navigateByUrl"]);
    const snackBarServiceSpy = jasmine.createSpyObj("SnackBarService", [
        "openSnackBar",
    ]);

    let fixture: ComponentFixture<SettingsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [MaterialModule, BrowserAnimationsModule],
            declarations: [SettingsComponent],
            providers: [
                {provide: AuthenticationService, useValue: authenticationServiceSpy},
                {provide: Router, useValue: routerSpy},
                {provide: SnackBarService, useValue: snackBarServiceSpy},
            ],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SettingsComponent);
        fixture.detectChanges();
    });
});
