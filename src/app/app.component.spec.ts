import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {AppComponent} from './app.component';
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

    expect(fixture.componentInstance.loggedUser).toBeNull();
    const logInButton = await loader.getHarness(MatButtonHarness.with({text: 'Log in'}));

    expect(logInButton).toBeTruthy();
    expect(await logInButton.isDisabled()).toBeFalsy();
    await logInButton.click();
    expect(router.navigateByUrl).toHaveBeenCalled();
  });

  it('should display \'log out\' and \'my account\' buttons when user is authenticated', async(async () => {
    const EXAMPLE_USERNAME = 'username';

    spyOnProperty(authenticationService, 'authenticatedUser').and.returnValue(EXAMPLE_USERNAME);

    expect(fixture.componentInstance.loggedUser).toEqual(EXAMPLE_USERNAME);

    const logOutButton = await loader.getHarness(MatButtonHarness.with({text: 'Log out'}));
    expect(await logOutButton.isDisabled()).toBeFalsy();

    const myAccountButton = await loader.getHarness(MatButtonHarness.with({text: `My account (${EXAMPLE_USERNAME})`}));
    expect(await myAccountButton.isDisabled()).toBeFalsy();
    await myAccountButton.click();
    expect(router.navigateByUrl).toHaveBeenCalled();
  }));
});
