import {async, TestBed} from '@angular/core/testing';

import {RegistrationComponent} from './registration.component';
import {AuthenticationService} from '../authentication-service/authentication.service';
import {Router} from '@angular/router';
import {SnackBarService} from '../../shared/snack-bar-service/snack-bar.service';
import {MaterialModule} from '../../material/material.module';

describe('RegistrationComponent', () => {
  const authenticationService = jasmine.createSpyObj('AuthenticationService', ['signUp']);
  const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
  const snackBarServiceSpy = jasmine.createSpyObj('SnackBarService', ['openSnackBar']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule],
      declarations: [ RegistrationComponent ],
      providers: [
        {provide: AuthenticationService, useValue: authenticationService},
        {provide: Router, useValue: routerSpy},
        {provide: SnackBarService, useValue: snackBarServiceSpy}
      ]
    })
    .compileComponents();
  }));

  it('should create', () => {
    const fixture = TestBed.createComponent(RegistrationComponent);
    const component: RegistrationComponent = fixture.debugElement.componentInstance;
    expect(component).toBeTruthy();
  });
});
