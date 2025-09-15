import { Dashboard } from '../page-objects/dashboard_page';
import { LoginPage } from '../page-objects/login_page';
import dashboardData from '../../fixtures/dashboard_data.json';
import headerData from '../../fixtures/header_data.json';

const testData = {
  user: Cypress.env('tegb_user_atomic'),
  passWord: Cypress.env('tegb_password_atomic'),
};

describe('Atomic Test For Dashboard', { testIsolation: false }, () => {
  const dashboard = new Dashboard();
  before(() => {
    new LoginPage().clearCache().visit().login(testData.user, testData.passWord);
  });

  context('Menu', () => {
    dashboard.menuItems.forEach(item => {
      it(`Should menu item ${item.slug} is visible`, () => {
        item.element.isVisible();
      });

      it(`Should menu item ${item.slug} has correct text`, () => {
        item.element.haveText(item.name);
      });

      it.skip(`Should menu item ${item.slug} is clickable => položka v menu je pouze statický text`, () => {
        item.element.click();
      });
    });
  });

  context('Profil detail', () => {
    it('Should Detail profile exist', () => {
      dashboard.detailProfil.isExist();
    });

    dashboard.profilDetailPrefixItems.forEach(item => {
      it(`Should ${item.name} is visible in Profile detail`, () => {
        item.element.isVisible();
      });

      it(`Should ${item.name} prefix has correct text`, () => {
        item.element.haveText(item.text);
      });
    });

    dashboard.profilDetailItems.forEach(item => {
      it(`Should ${item.type} is visible in Profile detail`, () => {
        item.element.isVisible();
      });

      it(`Should ${item.type} prefix has correct text`, () => {
        item.element.haveText(item.text);
      });
    });

    it('Should edit profile is clickable', () => {
      new Dashboard().clickEditProfile().clickCancelEditButton();
    });
  });

  context('Account', () => {
    it('Should Section Account is exist', () => {
      dashboard.accountSection.isExist();
    });

    dashboard.accountsSectionItems.forEach(item => {
      it(`Should item ${item.text} is exist in section`, () => {
        item.element.isVisible();
      });
    });

    it('Should Account Title is visible', () => {
      dashboard.accountsTitle.isVisible();
    });

    it('Should add account is visiable', () => {
      dashboard.accountAddButton.isVisible();
    });

    const accountsHeaderData = dashboardData.acountsHeader;

    accountsHeaderData.forEach(item => {
      it(`Should Account has ${item.type} correct text`, () => {
        dashboard[item.element].haveText(item.text);
      });
    });

    it.skip('Should add account is clickable => tlačítko nefunguje', () => {
      dashboard.accountAddButton.click();
    });
  });

  context('Header', () => {
    const headerTypeDatas = headerData.headerItemsType;
    const headerTextDatas = headerData.headerItemsText;

    it('Should header exist', () => {
      dashboard.header.isExist();
    });

    headerTypeDatas.forEach(item => {
      it(`Should header ${item.type} is visible`, () => {
        dashboard[item.name].isVisible();
      });
    });

    headerTextDatas.forEach(item => {
      it(`Should header ${item.type} title has corrcet titles`, () => {
        dashboard[item.name].haveText(item.text);
      });
    });
    it.skip('Should logo is clickable => logo is not clickable', () => {
      dashboard.logo.click();
    });

    it.skip('Should logout button is clickable', () => {
      dashboard.logOutButton.click();
    });
  });
});
