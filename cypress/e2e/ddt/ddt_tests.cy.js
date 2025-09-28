import { AccountAPI } from '../../../api/account_api';
import { UserApi } from '../../../api/user_api';
import { faker } from '@faker-js/faker';
import accountBalances from '../../fixtures/account_balance_data.json';
import { RegistrationPage } from '../page-objects/registration_page';
import { LoginPage } from '../page-objects/login_page';

describe('Data Driven Test for Account Balances', () => {
  const userApi = new UserApi();
  const accountApi = new AccountAPI();

  accountBalances.forEach(balance => {
    const firstname = faker.person.firstName();
    const lastname = faker.person.lastName();

    const testData = {
      firstname: firstname,
      lastname: lastname,
      userName: faker.internet.username({ firstname: firstname, lastname: lastname }),
      password: faker.internet.password(),
      phone: faker.phone.number({ style: 'international' }),
      age: faker.number.int({ min: 1, max: 99 }),
      email: faker.internet.email({ firstname: firstname, lastname: lastname }),
      balance: balance.accountBalance,
    };

    it(`Should create an account for ${testData.userName} with a balance of ${testData.balance} CZK`, () => {
      new RegistrationPage()
        .visit()
        .fillUserName(testData.userName)
        .fillPassword(testData.password)
        .fillEmail(testData.email)
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
              .checkBalanceAmount(balance)
              .checkAccountNumber(accountNumber);
          });
        });
      });
    });
  });
});
