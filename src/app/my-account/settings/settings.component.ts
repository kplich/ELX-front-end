import { Component, OnInit } from '@angular/core';

export const ACCOUNT_SETTINGS_TITLE = 'Account settings';
export const ACCOUNT_SETTINGS_DESCRIPTION = 'Change password, link your Ethereum wallet, etc.';

export const CHANGE_PASSWORD_TITLE = 'Change password';

export const OLD_PASSWORD_LABEL = 'Old password';
export const NEW_PASSWORD_LABEL = 'New password';
export const CHANGE_PASSWORD_BUTTON_TEXT = 'Change password';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  accountSettingsTitle = ACCOUNT_SETTINGS_TITLE;
  accountSettingsDescription = ACCOUNT_SETTINGS_DESCRIPTION;

  changePasswordTitle = CHANGE_PASSWORD_TITLE;

  oldPasswordLabel = OLD_PASSWORD_LABEL;
  newPasswordLabel = NEW_PASSWORD_LABEL;

  changePasswordButtonText = CHANGE_PASSWORD_BUTTON_TEXT;


  constructor() { }

  ngOnInit(): void {
  }

}
