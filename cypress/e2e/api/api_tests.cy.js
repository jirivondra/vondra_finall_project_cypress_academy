import { UserApi } from '../../../api/user_api';
import { Dashboard } from '../page-objects/dashboard_page';
import { LoginPage } from '../page-objects/login_page';

describe('Login by API', () => {
  const user = {
    username: Cypress.env('tegb_user'),
    password: Cypress.env('tegb_password'),
  };

  beforeEach(() => {
    new LoginPage().visit();
  });

  it('Login Via API and open dashboard', () => {
    const userApi = new UserApi();
    userApi.login(user.username, user.password).then(response => {
      expect(response.status).to.eq(201);
      const accessToken = response.body.access_token;
      userApi.setAccessToken(accessToken);
    });
    new Dashboard().visit();
  });
});
