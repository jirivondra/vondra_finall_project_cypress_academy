import { customElement } from "../cypress/e2e/helper/custom_element"


export class UserApi {
    constructor() {
        this.apiUrlBeLogin = Cypress.env('backend') + "/tegb/login"
        this.method = 'POST'
        this.accessTokenAlias = customElement('@accessToken')
    }

  creatAccesTokenAlias(data, alias) {
          cy.wrap(data).as(alias)
          return this
  }

    setAccessToken(accessToken) {
    cy.setCookie( "access_token", accessToken)
    return this
    }

    login(username, password) {
        return cy.request({
            method: this.method ,
            url: this.apiUrlBeLogin, 
            headers: {
                'Content-Type': 'application/json'
            },
            body: {
                username,
                password,
            },
        });
    }

}