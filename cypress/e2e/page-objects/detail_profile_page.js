// DetailProfilePage.js
import { customElement } from '../helper/custom_element';
import { Dashboard } from './dashboard_page';

export class DetailProfilePage {
  constructor() {
    this.HeadlineDetailProfile = customElement('[data-testid="profile-details-title"]');
    this.firstname = customElement('[data-testid="chage-name-input"]');
    this.lastname = customElement('[data-testid="chage-surname-input"]');
    this.email = customElement('[data-testid="chage-email-input"]');
    this.telephone = customElement('[data-testid="chage-phone-input"]');
    this.age = customElement('[data-testid="chage-age-input"]');
    this.saveChanges = customElement('[data-testid="save-changes-button"]');
    this.detailProfileTiele = customElement('[data-testid="profile-details-title"]');
    this.cancelEditButton = customElement('[data-testid="toggle-edit-profile-button"]');
  }

  headlineIsVisible() {
    this.detailProfileTiele.isVisible();
    return this;
  }
  fillFristName(firstname) {
    this.firstname.type(firstname);
    return this;
  }
  checkfirstname(firstname) {
    this.firstname.haveValue(firstname);
    return this;
  }
  filllastname(lastname) {
    this.lastname.type(lastname);
    return this;
  }
  checklastname(lastname) {
    this.lastname.haveValue(lastname);
    return this;
  }
  fillEmail(email) {
    this.email.type(email);
    return this;
  }
  checkEmail(email) {
    this.email.haveValue(email);
    return this;
  }
  fillTelephone(telephone) {
    this.telephone.type(telephone);
    return this;
  }
  checkTelephone(telephone) {
    this.telephone.haveValue(telephone);
    return this;
  }
  fillAge(age) {
    this.age.type(age);
    return this;
  }
  checkAge(age) {
    this.age.haveValue(age);
    return this;
  }
  saveChangesButtonIsVisible() {
    this.saveChanges.isVisible();
    return this;
  }

  clickCancelEditButton() {
    this.cancelEditButton.click();
    return new Dashboard();
  }

  clickSaveChangesButton() {
    this.saveChanges.click();
    return new Dashboard();
  }
}
