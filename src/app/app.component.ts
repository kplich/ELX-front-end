import {Component} from '@angular/core';
import {AuthenticationService} from './identity-management/authentication-service/authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router) {
  }

  get loggedUser(): string | null {
    return this.authenticationService.authenticatedUser;
  }

  logOut() {
    this.authenticationService.logOut();
    window.location.reload();
  }

  navigateToLogIn() {
    this.router.navigateByUrl('/log-in').then(_ => {});
  }

  navigateToMyAccount() {
    this.router.navigateByUrl('/my-account').then(_ => {});
  }

  navigateToItems() {
    this.router.navigateByUrl('/browse-items').then(_ => {});
  }
}
