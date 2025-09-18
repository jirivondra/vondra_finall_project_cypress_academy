import { customElement } from '../cypress/e2e/helper/custom_element';
import { createAlias, wait, intercept } from '../cypress/e2e/helper/utils';

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
  }

  interceptCreatAccountApi() {
    return intercept(this.apiUrlGetAccount);
  }
  interceptProfilApi() {
    return intercept(this.apiUrlProfile);
  }

  waitForLoginAPI(loginApi) {
    wait(loginApi);
    return this;
  }

  createAccessTokenAlias(data, alias) {
    createAlias(data, alias);
    return this;
  }
  creatBalanceAlias(data, alias) {
    createAlias(data, alias);
    return this;
  }
  creatAccountNumberAlias(data, alias) {
    createAlias(data, alias);
    return this;
  }

  creatAccountIdAlias(data, alias) {
    createAlias(data, alias);
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
