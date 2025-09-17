import { UserApi } from '../../../api/user_api';
import { LoginPage } from '../page-objects/login_page';

describe('Login by API', () => {
  const user = {
    userName: Cypress.env('tegb_user'),
    password: Cypress.env('tegb_password'),
  };

  const userApi = new UserApi();

  beforeEach(() => {
    new LoginPage().visit();
  });

  it('Login Via API and open dashboard', () => {
    userApi.login(user).then(response => {
      expect(response.status).to.eq(201);
      expect(response.body).to.have.property('access_token');
    });
  });
});
