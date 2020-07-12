import { Component } from '@angular/core';
import {AuthenticationService} from './identity-management/authentication-service/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'front-end';

  constructor(private authenticationService: AuthenticationService) {
  }

  get loggedUser(): string | null {
    return this.authenticationService.authenticatedUser;
  }

  logOut() {
    this.authenticationService.logOut();
  }
}
