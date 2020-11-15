import "zone.js/dist/zone-testing";
import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {
    AppComponent,
    BUTTON_LOG_IN_TEXT,
    BUTTON_LOG_OUT_TEXT,
    BUTTON_MY_ACCOUNT_TEXT
} from "@app/app.component";
import {MaterialModule} from "@material/material.module";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {HarnessLoader} from "@angular/cdk/testing";
import {TestbedHarnessEnvironment} from "@angular/cdk/testing/testbed";
import {MatButtonHarness} from "@angular/material/button/testing";
import {Router} from "@angular/router";
import {RouterTestingModule} from "@angular/router/testing";
import {LoggedInUserService} from "@shared/logged-in-user/logged-in-user.service";
import {SimpleUser} from "@my-account/data/SimpleUser";

fdescribe("AppComponent", () => {
    const routerSpy = jasmine.createSpyObj("Router", ["navigateByUrl"]);
    routerSpy.navigateByUrl.and.returnValue(Promise.resolve());

    let loggedInUserService: LoggedInUserService;
    let fixture: ComponentFixture<AppComponent>;
    let loader: HarnessLoader;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [MaterialModule, HttpClientTestingModule, RouterTestingModule],
            declarations: [
                AppComponent
            ],
            providers: [
                LoggedInUserService,
                {
                    provide: Router,
                    useValue: routerSpy
                }
            ]
        }).compileComponents().then(() => {
            loggedInUserService = TestBed.inject(LoggedInUserService);
            fixture = TestBed.createComponent(AppComponent);
            loader = TestbedHarnessEnvironment.loader(fixture);

            fixture.detectChanges();
        });
    }));

    it("should create the app", () => {
        expect(fixture.componentInstance).toBeTruthy();
    });

    it("should display 'log in' button when no user is authenticated",
        async () => {
            spyOnProperty(loggedInUserService, "authenticatedUser").and.returnValue(null);

            expect(fixture.componentInstance.authenticatedUser).toBeNull();
            const logInButton =
                await loader.getHarness(MatButtonHarness.with({text: BUTTON_LOG_IN_TEXT}));

            expect(logInButton).toBeTruthy();
            expect(await logInButton.isDisabled()).toBeFalsy();

            await logInButton.click();
            expect(routerSpy.navigateByUrl).toHaveBeenCalled();
        });

    it("should display 'log out' and 'my account' buttons when user is authenticated",
        async () => {
            const EXAMPLE_USER: SimpleUser = new SimpleUser({
                id: 0,
                username: "username",
                ethereumAddress: null
            });

            spyOnProperty(loggedInUserService, "authenticatedUser")
                .and.returnValue(EXAMPLE_USER);

            expect(fixture.componentInstance.authenticatedUser).toEqual(EXAMPLE_USER);

            const logOutButton = await loader
                .getHarness(MatButtonHarness.with({text: BUTTON_LOG_OUT_TEXT}));
            expect(await logOutButton.isDisabled()).toBeFalsy();

            // this breaks the test :(
            const myAccountButton = await loader
                .getHarness(MatButtonHarness.with({text: BUTTON_MY_ACCOUNT_TEXT}));
            expect(await myAccountButton.isDisabled()).toBeFalsy();
            await myAccountButton.click();
            expect(routerSpy.navigateByUrl).toHaveBeenCalled();
        });
});
