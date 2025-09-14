import { customElement } from "../helper/custom_element";

export class Dashboard {
    constructor(){
        this.editProfilButton = customElement('[data-testid="toggle-edit-profile-button"]')
        this.firstName = customElement('[data-testid="name"]') 
        this.lastName = customElement('[data-testid="surname"]')
        this.email = customElement('[data-testid="email"]')
        this.phone = customElement('[data-testid="phone"]')
        this.age = customElement('[data-testid="age"]')
        this.logOutButton = customElement('.logout-link')

    }

    waitForProfileAPI(profileApi){
        cy.wait(profileApi)
        return this
    }
    waitForAccountsAPI(accountsAPI){
        cy.wait(accountsAPI)
        return this
    }
    waitForLoginAPI(loginApi){
        cy.wait(loginApi)
        return this
    }

    editProfilButtonIsVisiable() {
        this.editProfilButton.isVisible()
        return this
    }
    clickEditProfile() {
        const { DetailProfilePage } = require("./detail_profile_page")
        this.editProfilButton.click()
        return new DetailProfilePage()
    }
    checkFirtName(firstName) {
        this.firstName.haveText('Jméno: ' + firstName) 
        return this
    }
    checkLastName(lastName) {
        this.lastName.haveText('Příjmení: ' + lastName)
        return this
    }
    checkEmail(email) {
        this.email.haveText('Email: ' + email )
        return this
    }
    checkTelephoneNumber(phoneNumber) {
        this.phone.haveText('Telefon: ' + phoneNumber )
        return this
    }
    checkAge(age) {
        this.age.haveText("Věk: " + age)
        return this
    }







    logOutIsVisiable() {
        this.logOutButton.isVisible()
        return this
    } 

    clickLogOut() {
      this.logOutButton.click()
      return this  
    }
}