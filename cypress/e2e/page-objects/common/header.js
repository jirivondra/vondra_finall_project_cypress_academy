import { customElement } from '../../helper/custom_element';

export class Header {
  constructor() {
    this.header = customElement('.dashboard-header');
    this.logo = customElement('[data-testid="logo-img"]');
    this.headTitle = customElement('.app-title');
    this.logOutButton = customElement('.logout-link');
  }
}
