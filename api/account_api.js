import { customElement } from '../cypress/e2e/helper/custom_element';

export class Account {
  constructor() {
    this.apiUrlBeCreatAccount = Cypress.env('backend') + '/tegb/accounts/create';
    this.apiUrlAddBalanceAccount = Cypress.env('backend') + '/tegb/accounts/change-balance';
    this.type = 'Test';
    this.accountIdAlias = customElement('@accountId');
  }

  creatAccesTokenAlias(data, alias) {
    cy.wrap(data).as(alias);
    return this;
  }

  creatAccountIdAlias(data, alias) {
    cy.wrap(data).as(alias);
    return this;
  }

  creatAccount(requestData) {
    return cy.request({
      method: 'POST',
      url: this.apiUrlBeCreatAccount,
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

  addBalance(requestData) {
    return cy.request({
      method: 'PATCH',
      url: this.apiUrlAddBalanceAccount,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${requestData.accessToken}`,
      },
      body: {
        accountId: requestData.accountId,
        amount: requestData.amount,
      },
    });
  }
}
