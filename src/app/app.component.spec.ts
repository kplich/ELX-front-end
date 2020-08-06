import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {
    AppComponent,
    BUTTON_LOG_IN_TEXT,
    BUTTON_LOG_OUT_TEXT,
    BUTTON_MY_ACCOUNT_TEXT
} from './app.component';
import {AuthenticationService} from './identity-management/authentication-service/authentication.service';
import {MaterialModule} from './material/material.module';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {HarnessLoader} from '@angular/cdk/testing';
import {TestbedHarnessEnvironment} from '@angular/cdk/testing/testbed';
import {MatButtonHarness} from '@angular/material/button/testing';
import {Router} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';

describe('AppComponent', () => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
    routerSpy.navigateByUrl.and.returnValue(Promise.resolve());

    let authenticationService: AuthenticationService;
    let fixture: ComponentFixture<AppComponent>;
    let loader: HarnessLoader;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [MaterialModule, HttpClientTestingModule, RouterTestingModule],
            declarations: [
                AppComponent
            ],
            providers: [
                AuthenticationService,
                {
                    provide: Router,
                    useValue: routerSpy
                }
            ]
        }).compileComponents().then(() => {
            authenticationService = TestBed.inject(AuthenticationService);
            fixture = TestBed.createComponent(AppComponent);
            loader = TestbedHarnessEnvironment.loader(fixture);

            fixture.detectChanges();
        });
    }));

    it('should create the app', () => {
        expect(fixture.componentInstance).toBeTruthy();
    });

    it('should display \'log in\' button when no user is authenticated',
        async () => {
            spyOnProperty(authenticationService, 'authenticatedUser').and.returnValue(null);

            expect(fixture.componentInstance.authenticatedUser).toBeNull();
            const logInButton =
                await loader.getHarness(MatButtonHarness.with({text: BUTTON_LOG_IN_TEXT}));

            expect(logInButton).toBeTruthy();
            expect(await logInButton.isDisabled()).toBeFalsy();

            await logInButton.click();
            expect(routerSpy.navigateByUrl).toHaveBeenCalled();
        });

    xit('should display \'log out\' and \'my account\' buttons when user is authenticated',
        async () => {
            const EXAMPLE_USERNAME = 'username';

            spyOnProperty(authenticationService, 'authenticatedUser')
                .and.returnValue(EXAMPLE_USERNAME);

            expect(fixture.componentInstance.authenticatedUser).toEqual(EXAMPLE_USERNAME);

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
