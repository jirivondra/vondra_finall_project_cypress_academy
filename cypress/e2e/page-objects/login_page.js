import { customElement } from "../helper/custom_element"
import { BasePage } from "./common/base_page"
import { Dashboard } from "./dashboard_page"

export class LoginPage extends BasePage {
        constructor() {
        super('/')
        this.successful = customElement('[data-testid="success-message"]')
        this.userName = customElement('[data-testid="username-input"]')
        this.passWord = customElement('[data-testid="password-input"]')
        this.loginButton = customElement('[data-testid="submit-button"]')
    }


    clearCache() {
        cy.clearCacheAll()
        return this
    }

    typeName(userName) {
    this.userName.type(userName)
        return this
    }

    checkName(userName) {
    this.userName.haveValue(userName)
        return this
    }

    typePassWord(passWord) {
     this.passWord.type(passWord)
        return this
    }

    checkPassWord(passWord) {
    this.passWord.haveValue(passWord)
        return this
    }

    checkSuccessRegistrationTitle() {
    this.successful.isVisible()
    return this
    }

    loginButtonIsVisiable() {
    this.loginButton.isVisible()
        return this
    }

    clickLoginButton() {
        this.loginButton.click()
        return new Dashboard()
    }

    login(user, passWord){
        this.typeName(user)
        this.typePassWord(passWord)
        this.clickLoginButton()
        return new Dashboard()
    }
} 