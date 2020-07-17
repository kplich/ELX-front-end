import {async, TestBed} from '@angular/core/testing';
import {LoggingInComponent} from './logging-in.component';
import {AuthenticationService} from '../authentication-service/authentication.service';
import {Router} from '@angular/router';
import {SnackBarService} from '../../shared/snack-bar-service/snack-bar.service';

describe('LoggingInComponent', () => {
  const authenticationServiceSpy = jasmine.createSpyObj('AuthenticationService', ['logIn']);
  const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
  const snackBarServiceSpy = jasmine.createSpyObj('SnackBarService', ['openSnackBar']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        LoggingInComponent
      ],
      providers: [
        {provide: AuthenticationService, useValue: authenticationServiceSpy},
        {provide: Router, useValue: routerSpy},
        {provide: SnackBarService, useValue: snackBarServiceSpy}
      ]
    }).compileComponents();
  }));

  it('should create the component', () => {
    const fixture = TestBed.createComponent(LoggingInComponent);
    const component: LoggingInComponent = fixture.debugElement.componentInstance;
    expect(component).toBeTruthy();
    expect(component.username).toBeTruthy();
    expect(component.password).toBeTruthy();
    expect(component.username.value).toBeFalsy();
    expect(component.password.value).toBeFalsy();
    expect(component.loggingInForm.valid).toBeFalsy();
  });

  it('should have the log-in button disabled', () => {

  });
});
