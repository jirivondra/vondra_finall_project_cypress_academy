export class CreatAccount {
    constructor(){
        this.apiUrlBecreatAccount = Cypress.env('backend') + "/tegb/accounts/create"
        this.method = 'POST'
        this.type = "Test - Jiří Vondra"

    }

  creatAccesTokenAlias(data, alias) {
          cy.wrap(data).as(alias)
          return this
  }

    creatAccount(requestData) {
        return cy.request({
            method: this.method ,
            url: this.apiUrlBecreatAccount, 
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${requestData.accessToken}`
            },
            body: {
            "startBalance": requestData.startBalance,
             "type": this.type
            },
        });
    }
}