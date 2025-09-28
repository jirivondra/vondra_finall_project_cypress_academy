import { customElement } from '../helper/custom_element';
import { BasePage } from './common/base_page';
import { LoginPage } from './login_page';

export class RegistrationPage extends BasePage {
  constructor() {
    super('/register');
    this.userName = customElement('[data-testid="username-input"]');
    this.password = customElement('[data-testid="password-input"]');
    this.emeil = customElement('[data-testid="email-input"]');
    this.registrationButton = customElement('[data-testid="submit-button"]');
  }

  fillUserName(userName) {
    this.userName.type(userName);
    return this;
  }
  checkUserman(userName) {
    this.userName.haveValue(userName);
    return this;
  }
  fillPassword(password) {
    this.password.type(password);
    return this;
  }
  checkPassword(password) {
    this.password.haveValue(password);
    return this;
  }
  fillEmail(email) {
    this.emeil.type(email);
    return this;
  }
  checkEmail(email) {
    this.emeil.haveValue(email);
    return this;
  }
  registrationButtonIsVisible() {
    this.registrationButton.isVisible();
    return this;
  }
  clickRegistrationButton() {
    this.registrationButton.click();
    return new LoginPage();
  }
}
