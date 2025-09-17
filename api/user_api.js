import { customElement } from '../cypress/e2e/helper/custom_element';

export class UserApi {
  constructor() {
    this.apiUrlLogin = Cypress.env('backend') + '/tegb/login';
    this.method = 'POST';
    this.accessTokenAlias = customElement('@accessToken');
    this.apiHelper = customElement('api_helper');
  }

  interceptLoginApi() {
    return this.apiHelper.intercept(this.apiUrlLogin);
  }

  creatAccesTokenAlias(data, alias) {
    cy.wrap(data).as(alias);
    return this;
  }

  setAccessToken(accessToken) {
    cy.setCookie('access_token', accessToken);
    return this;
  }

  login(requestData) {
    return cy.request({
      method: 'POST',
      url: this.apiUrlLogin,
      headers: {
        'Content-Type': 'application/json',
      },
      body: {
        username: requestData.userName,
        password: requestData.password,
      },
    });
  }
}
