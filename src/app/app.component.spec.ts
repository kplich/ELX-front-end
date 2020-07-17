import {async, TestBed} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {AuthenticationService} from './identity-management/authentication-service/authentication.service';
import {MaterialModule} from './material/material.module';

describe('AppComponent', () => {
  const authenticationServiceSpy = jasmine.createSpyObj('AuthenticationService', ['authenticatedUser']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule],
      declarations: [
        AppComponent
      ],
      providers: [
        {provide: AuthenticationService, useValue: authenticationServiceSpy}
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'front-end'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('front-end');
  });
});
