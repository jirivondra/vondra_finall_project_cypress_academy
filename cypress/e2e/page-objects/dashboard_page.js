import { customElement } from '../helper/custom_element';
import { Menu } from './common/menu';
import { profilDetailsProfix, profileDetailHeader, accountsSection } from '../../fixtures/dashboard_data.json';

export class Dashboard extends Menu {
  constructor() {
    super();

    this.logOutButton = customElement('.logout-link');
    this.detailProfil = customElement('[data-testid="account-summary"]');
    this.detailProfilHeadLine = customElement('[data-testid="profile-details-title"]');
    this.editProfilButton = customElement('[data-testid="toggle-edit-profile-button"]');
    this.accountSection = customElement('.accounts');
    this.accountsTitle = customElement('[data-testid="accounts-title"]');
    this.accountAddButton = customElement('.account-action');

    this.profilDetailItems = profileDetailHeader.map(item => {
      item.element = customElement(`[data-testid='${item.name}']`);
      return item;
    });

    this.profilDetailPrefixItems = profilDetailsProfix.map(item => {
      item.element = customElement(`[data-testid='${item.name}'] strong`);
      return item;
    });

    this.accountsSectionItems = accountsSection.map(item => {
      item.element = customElement(`[data-testid='${item.name}']`);
      return item;
    });
  }

  waitForProfileAPI(profileApi) {
    cy.wait(profileApi);
    return this;
  }
  waitForAccountsAPI(accountsAPI) {
    cy.wait(accountsAPI);
    return this;
  }
  waitForLoginAPI(loginApi) {
    cy.wait(loginApi);
    return this;
  }

  editProfilButtonIsVisiable() {
    this.editProfilButton.isVisible();
    return this;
  }
  clickEditProfile() {
    const { DetailProfilePage } = require('./detail_profile_page');
    this.editProfilButton.click();
    return new DetailProfilePage();
  }
  checkFirtName(firstName) {
    this.firstName.haveText('Jméno: ' + firstName);
    return this;
  }
  checkLastName(lastName) {
    this.lastName.haveText('Příjmení: ' + lastName);
    return this;
  }
  checkEmail(email) {
    this.email.haveText('Email: ' + email);
    return this;
  }
  checkTelephoneNumber(phoneNumber) {
    this.phone.haveText('Telefon: ' + phoneNumber);
    return this;
  }
  checkAge(age) {
    this.age.haveText('Věk: ' + age);
    return this;
  }

  logOutIsVisiable() {
    this.logOutButton.isVisible();
    return this;
  }

  clickLogOut() {
    this.logOutButton.click();
    return this;
  }
}
