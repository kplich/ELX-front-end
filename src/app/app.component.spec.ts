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
import createSpyObj = jasmine.createSpyObj;

describe('AppComponent', () => {
  let authenticationService: AuthenticationService;
  let router: Router;
  let fixture: ComponentFixture<AppComponent>;
  let loader: HarnessLoader;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule, HttpClientTestingModule],
      declarations: [
        AppComponent
      ],
      providers: [
        AuthenticationService,
        {provide: Router, useValue: createSpyObj('router', ['navigateByUrl'])}
      ]
    }).compileComponents().then(() => {
      authenticationService = TestBed.inject(AuthenticationService);
      router = TestBed.inject(Router);
      fixture = TestBed.createComponent(AppComponent);
      loader = TestbedHarnessEnvironment.loader(fixture);
    });
  }));

  it('should create the app', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should display \'log in\' button when no user is authenticated', async () => {
    spyOnProperty(authenticationService, 'authenticatedUser').and.returnValue(null);

    expect(fixture.componentInstance.authenticatedUser).toBeNull();
    const logInButton = await loader.getHarness(MatButtonHarness.with({text: BUTTON_LOG_IN_TEXT}));

    expect(logInButton).toBeTruthy();
    expect(await logInButton.isDisabled()).toBeFalsy();
    await logInButton.click();
    expect(router.navigateByUrl).toHaveBeenCalled();
  });

  it('should display \'log out\' and \'my account\' buttons when user is authenticated',
    async(async () => {
      const EXAMPLE_USERNAME = 'username';

      spyOnProperty(authenticationService, 'authenticatedUser').and.returnValue(EXAMPLE_USERNAME);

      expect(fixture.componentInstance.authenticatedUser).toEqual(EXAMPLE_USERNAME);

      const logOutButton =
        await loader.getHarness(MatButtonHarness.with({text: BUTTON_LOG_OUT_TEXT}));
      expect(await logOutButton.isDisabled()).toBeFalsy();

      const myAccountButton =
        await loader.getHarness(MatButtonHarness.with({text: BUTTON_MY_ACCOUNT_TEXT}));
      expect(await myAccountButton.isDisabled()).toBeFalsy();
      await myAccountButton.click();
      expect(router.navigateByUrl).toHaveBeenCalled();
  }));
});
