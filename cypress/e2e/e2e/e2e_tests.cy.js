import { AccountAPI } from '../../../api/account_api';
import { UserApi } from '../../../api/user_api';
import { LoginPage } from '../page-objects/login_page';
import { RegistrationPage } from '../page-objects/registration_page';
import { faker } from '@faker-js/faker';


const firstName = faker.person.firstName();
const lastName = faker.person.lastName();
const userName = faker.internet.username({ firstName: firstName, lastName: lastName });
const password = faker.internet.password();
const phone = faker.phone.number({ style: 'international' });
const email = faker.internet.email({ firstName: firstName, lastName: lastName });
const age = faker.number.int({ min: 1, max: 99 });
const accountBalance = faker.number.int({ min: 1, max: 999999 });

const testData = {
  firstName: firstName,
  lastName: lastName,
  userName: userName,
  password: password,
  phone: phone,
  age: age,
  email: email,
  balance: accountBalance,
};

describe('End-to-End User Registration Flow', () => {
  beforeEach(() => {
    new LoginPage().visit();
  });
  it('should successfully register a new user, log them in, create an account via API, and verify the data on the dashboard and logout', () => {
    const accountApi = new AccountAPI();
    const userApi = new UserApi();

    userApi.interceptLoginApi().as('login_api');
    accountApi.interceptCreatAccountApi().as('getAccounts_api');
    accountApi.interceptProfilApi().as('profile_api');

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
    userApi.login(testData).then(response => {
      expect(response.status).to.eq(201);
      new UserApi().createAccessTokenAlias(response.body.access_token, 'accessToken').setAccessToken('@accessToken');
    });
    userApi.accessTokenAlias.get().then(accessToken => {
      const requestData = {
        accessToken: accessToken,
        startBalance: testData.balance,
      };
      accountApi.creatAccount(requestData).then(response => {
        expect(response.status).to.eq(201);
        accountApi.creatBalanceAlias(response.body.accountNumber, 'accountNumber');
        accountApi.creatAccountNumberAlias(response.body.balance, 'balance');
      });

      accountApi.balanceAlias.get().then(balance => {
        accountApi.accountNumberAlias.get().then(accountNumber => {
          new LoginPage()
            .typeName(testData.userName)
            .checkName(testData.userName)
            .typePassWord(testData.password)
            .checkPassWord(testData.password)
            .loginButtonIsVisiable()
            .clickLoginButton()
            .waitForProfileAPI('@profile_api')
            .waitForGetAccountsAPI('@getAccounts_api')
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
            .checkAccountNumber(accountNumber)
            .checkBalanceAmount(balance)
            .clickLogOut();
        });
      });
    });
  });
});
