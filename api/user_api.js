export class UserApi {
    constructor() {
        this.apiUrlBeLogin = Cypress.env('backend') + "/tegb/login"
        this.method = 'POST'

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