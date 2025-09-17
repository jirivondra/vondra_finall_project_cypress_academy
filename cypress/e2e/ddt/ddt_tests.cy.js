import { AccountAPI } from '../../../api/account_api';
import { UserApi } from '../../../api/user_api';
import { faker } from '@faker-js/faker';
import accountBalances from '../../fixtures/account_balance_data.json';
import { RegistrationPage } from '../page-objects/registration_page';
import { LoginPage } from '../page-objects/login_page';

describe('Data Driven Test for Account Balances', () => {
  // const loginPage = new LoginPage();
  const userApi = new UserApi();
  const accountApi = new AccountAPI();

  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const userName = faker.internet.username({ firstName: firstName, lastName: lastName });
  const password = faker.internet.password();
  const phone = faker.phone.number({ style: 'international' });
  const email = faker.internet.email({ firstName: firstName, lastName: lastName });
  const age = faker.number.int({ min: 1, max: 99 });

  accountBalances.forEach(balance => {
    const testData = {
      firstName: firstName,
      lastName: lastName,
      userName: userName,
      password: password,
      phone: phone,
      age: age,
      email: email,
      balance: balance.accountBalance,
    };

    it(`Should ${testData.userName} account balance of ${testData.balance} CZK`, () => {
      new RegistrationPage()
        .visit()
        .fillUserName(testData.userName)
        .fillPassword(testData.password)
        .fillEmail(testData.email)
        .clickRegistrationButton()
        .checkSuccessRegistrationTitle();
      userApi.login(testData).then(response => {
        expect(response.status).to.eq(201);
        cy.log('Response body:', JSON.stringify(response.body, null, 2));
        new UserApi().creatAccesTokenAlias(response.body.access_token, 'accessToken').setAccessToken('@accessToken');
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
              .checkBalanceAmount(balance)
              .checkAccountNumber(accountNumber);
          });
        });
      });
    });
  });
});
