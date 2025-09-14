import { customElement } from "../helper/custom_element";
import { Menu } from "./common/menu";

export class Dashboard extends Menu {
    constructor(){
        super()
        this.editProfilButton = customElement('[data-testid="toggle-edit-profile-button"]')
        this.firstName = customElement('[data-testid="name"]')
        this.firstNamePrefix = customElement('[data-testid="name"] strong')
        this.lastName = customElement('[data-testid="surname"]')
        this.lastNamePrefix = customElement('[data-testid="surname"] strong')
        this.email = customElement('[data-testid="email"]')
        this.emailPrefix = customElement('[data-testid="email"] strong')
        this.phone = customElement('[data-testid="phone"]')
        this.phonePrefix = customElement('[data-testid="phone"] strong')
        this.age = customElement('[data-testid="age"]')
        this.agePrefix = customElement('[data-testid="age"] strong')
        this.logOutButton = customElement('.logout-link')
        this.detailProfil = customElement('[data-testid="account-summary"]')
        this.detailProfilHeadLine = customElement('[data-testid="profile-details-title"]')
        this.accountsSection = customElement('[data-testid="accounts-title"]')
        this.accountAddButton =customElement('.account-action')
        this.accountNumber = customElement('[data-testid="account-number-heading"]')
        this.accountBalance= customElement('[data-testid="account-balance-heading"]')
        this.accountType = customElement('[data-testid="account-type-heading"]')

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