import { customElement } from '../cypress/e2e/helper/custom_element';
import { intercept, setCookie, createAlias } from '../cypress/e2e/helper/utils';

export class UserApi {
  constructor() {
    this.apiUrlLogin = Cypress.env('backend') + '/tegb/login';
    this.method = 'POST';
    this.accessTokenAlias = customElement('@accessToken');
  }

  interceptLoginApi() {
    return intercept(this.apiUrlLogin);
  }

  createAccessTokenAlias(data, alias) {
    createAlias(data, alias);
    return this;
  }

  setAccessToken(accessToken) {
    setCookie('access_token', accessToken);
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
