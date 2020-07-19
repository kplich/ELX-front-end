import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {LoggingInComponent} from './logging-in.component';
import {AuthenticationService} from '../authentication-service/authentication.service';
import {Router} from '@angular/router';
import {SnackBarService} from '../../shared/snack-bar-service/snack-bar.service';
import {MaterialModule} from '../../material/material.module';

describe('LoggingInComponent', () => {
  const authenticationServiceSpy = jasmine.createSpyObj('AuthenticationService', ['login']);
  const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
  const snackBarServiceSpy = jasmine.createSpyObj('SnackBarService', ['openSnackBar']);

  let fixture: ComponentFixture<LoggingInComponent>;
  let component: LoggingInComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule],
      declarations: [
        LoggingInComponent
      ],
      providers: [
        {provide: AuthenticationService, useValue: authenticationServiceSpy},
        {provide: Router, useValue: routerSpy},
        {provide: SnackBarService, useValue: snackBarServiceSpy}
      ]
    });
    fixture = TestBed.createComponent(LoggingInComponent);
    component = fixture.debugElement.componentInstance;
  }));

  it('should create the component', () => {

    expect(component).toBeTruthy();
    expect(component.username).toBeTruthy();
    expect(component.password).toBeTruthy();
    expect(component.username.value).toBeFalsy();
    expect(component.password.value).toBeFalsy();
    expect(component.loggingInForm.valid).toBeFalsy();
  });
});
