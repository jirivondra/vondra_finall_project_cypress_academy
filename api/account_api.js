import { customElement } from '../cypress/e2e/helper/custom_element';

export class AccountAPI {
  constructor() {
    this.apiUrlCreatAccount = Cypress.env('backend') + '/tegb/accounts/create';
    this.apiUrlGetAccount = Cypress.env('backend') + '/tegb/accounts';
    this.apiUrlProfile = Cypress.env('backend') + '/tegb/profile';
    this.type = 'Test';
    this.accountIdAlias = customElement('@accountId');
    this.accessTokenAlias = customElement('@accessToken');
    this.accountNumberAlias = customElement('@accountNumber');
    this.balanceAlias = customElement('@balance');
    this.apiHelper = customElement('api_helper');
  }

  interceptCreatAccountApi() {
    return this.apiHelper.intercept(this.apiUrlGetAccount);
  }
  interceptProfilApi() {
    return this.apiHelper.intercept(this.apiUrlProfile);
  }

  waitForLoginAPI(loginApi) {
    customElement('').wait(loginApi);
    return this;
  }

  creatAccesTokenAlias(data, alias) {
    customElement('').createAlias(data, alias);
    return this;
  }
  creatBalanceAlias(data, alias) {
    customElement('').createAlias(data, alias);
    return this;
  }
  creatAccountNumberAlias(data, alias) {
    customElement('').createAlias(data, alias);
    return this;
  }

  creatAccountIdAlias(data, alias) {
    cy.wrap(data).as(alias);
    return this;
  }

  creatAccount(requestData) {
    return cy.request({
      method: 'POST',
      url: this.apiUrlCreatAccount,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${requestData.accessToken}`,
      },
      body: {
        startBalance: requestData.startBalance,
        type: this.type,
      },
    });
  }
}
