import { Account } from '../../../api/account_api';
import { UserApi } from '../../../api/user_api';
import { LoginPage } from '../page-objects/login_page';
import { RegistrationPage } from '../page-objects/registration_page';
import { faker } from '@faker-js/faker';

/*
E2E (vše frontend, pokud není uvedeno jinak v krocích)
//  1. Zaregistrujte uživatele (přes frontend)
//  2. Přes API vytvořte uživateli účet (v aplikaci nefunguje)
  3. Přihlaste se do aplikace nově založeným uživatelem.
      a. při přihlášení počkejte na dokončení api: GET /tegb/profile, GET /tegb/accounts (intercept)
//  4. Vyplňte uživateli profil
//  5. Zkontrolujte údaje profilu po uložení 
//  6. Zkontrolujte zobrazení vytvořeného účtu (viditelnost, částka)
//  7. Odhlaste se 
*/

const firstName = faker.person.firstName();
const lastName = faker.person.lastName();
const userName = faker.internet.username({ firstName: firstName, lastName: lastName });
const password = faker.internet.password();
const phone = faker.phone.number({ style: 'international' });
const email = faker.internet.email({ firstName: firstName, lastName: lastName });
const age = faker.number.int({ min: 1, max: 99 });

const testData = {
  firstName: firstName,
  lastName: lastName,
  userName: userName,
  password: password,
  phone: phone,
  age: age,
  email: email,
};

describe('', () => {
  beforeEach(() => {
    new LoginPage().visit();
  });
  it('', () => {
    const account = new Account();

    cy.intercept(Cypress.env('backend') + '/tegb/login').as('login_api');
    cy.intercept(Cypress.env('backend') + '/tegb/profile').as('profile_api');
    cy.intercept(Cypress.env('backend') + '/tegb/accounts').as('accounts_api');
    const userApi = new UserApi();
    new RegistrationPage()
      .visit()
      .fillUserName(testData.userName)
      .checkUserman(testData.userName)
      .fillPassword(testData.password)
      .checkPassword(testData.password)
      .fillEmail(testData.email)
      .checkEmail(testData.email)
      .registrationButtonIsVisible()
      .clickRegistrationButton()
      .checkSuccessRegistrationTitle();
    userApi.login(testData.userName, testData.password).then(response => {
      expect(response.status).to.eq(201);
      new UserApi().creatAccesTokenAlias(response.body.access_token, 'accessToken').setAccessToken('@accessToken');
    });
    userApi.accessTokenAlias.get().then(accessToken => {
      const requestData = {
        accessToken: accessToken,
        startBalance: 1000,
      };
      account.creatAccount(requestData).then(response => {
        expect(response.status).to.eq(201);
      });

      new LoginPage()
        .typeName(testData.userName)
        .checkName(testData.userName)
        .typePassWord(testData.password)
        .checkPassWord(testData.password)
        .loginButtonIsVisiable()
        .clickLoginButton()
        .waitForProfileAPI('@profile_api')
        .waitForAccountsAPI('@accounts_api')
        .waitForLoginAPI('@login_api')
        .editProfilButtonIsVisiable()
        .clickEditProfile()
        .headlineIsVisible()
        .fillFristName(testData.firstName)
        .checkFirstName(testData.firstName)
        .fillLastName(testData.lastName)
        .checkLastName(testData.lastName)
        .fillEmail(testData.email)
        .checkEmail(testData.email)
        .fillTelephone(testData.phone)
        .checkTelephone(testData.phone)
        .fillAge(testData.age)
        .checkAge(testData.age)
        .saveChangesButtonIsVisible()
        .clickSaveChangesButton()
        .checkFirtName(testData.firstName)
        .checkLastName(testData.lastName)
        .checkEmail(testData.email)
        .checkTelephoneNumber(testData.phone)
        .checkAge(testData.age)
        .logOutIsVisiable()
        .clickLogOut();
    });
  });
});
