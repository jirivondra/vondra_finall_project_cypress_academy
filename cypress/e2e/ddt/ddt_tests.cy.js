import { Account } from '../../../api/account_api';
import { UserApi } from '../../../api/user_api';
//import { LoginPage } from '../page-objects/login_page';
import { faker } from '@faker-js/faker';
import accountBalances from '../../fixtures/account_balance_data.json';
import { RegistrationPage } from '../page-objects/registration_page';

describe('Data Driven Test for Account Balances', () => {
  // const loginPage = new LoginPage();
  const userApi = new UserApi();
  const account = new Account();

  accountBalances.forEach(balance => {
    const testData = {
      userName: faker.internet.username(),
      password: faker.internet.password(),
      email: faker.internet.email(),
      balance: balance.accountBalance,
    };

    //     beforeEach(()=>{
    //     loginPage.visit()
    // })

    it(`should test account balance of ${balance.accountBalance} CZK`, () => {
      new RegistrationPage()
        .visit()
        .fillUserName(testData.userName)
        .fillPassword(testData.password)
        .fillEmail(testData.email)
        .clickRegistrationButton()
        .checkSuccessRegistrationTitle();
      userApi.login(testData.userName, testData.password).then(response => {
        expect(response.status).to.eq(201);
        cy.log('Response body:', JSON.stringify(response.body, null, 2));
        new UserApi().creatAccesTokenAlias(response.body.access_token, 'accessToken').setAccessToken('@accessToken');
      });
      userApi.accessTokenAlias.get().then(accessToken => {
        const requestDataCreatAccount = {
          accessToken: accessToken,
          startBalance: 1000,
        };
        account.creatAccount(requestDataCreatAccount).then(response => {
          cy.log('Response body:', JSON.stringify(response.body, null, 2));
          expect(response.status).to.eq(201);
          account.creatAccountIdAlias(response.body.accountId, 'accountId');
        });
        account.accountIdAlias.get().then(accountId => {
          const requestDataAddBalance = {
            accessToken: accessToken,
            accountId: accountId,
            amount: balance.accountBalance,
          };
          account.addBalance(requestDataAddBalance).then(response => {
            expect(response.status).to.eq(201);
          });
        });
        //    new LoginPage()
        //     .typeName(testData.userName)
        //     .checkName(testData.userName)
        //     .typePassWord(testData.password)
        //     .checkPassWord(testData.password)
        //     .loginButtonIsVisiable()
        //     .clickLoginButton()
      });
    });
  });
});
