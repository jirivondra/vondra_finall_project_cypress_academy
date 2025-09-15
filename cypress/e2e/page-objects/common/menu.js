import { customElement } from '../../helper/custom_element';
import { Header } from './header';

export class Menu extends Header {
  constructor() {
    super();
    this.menu = customElement('.dashboard-sidebar');
    this.menuItemHome = customElement("//li[text()='Domů']");
    this.menuItemAccounts = customElement("//li[text()='Účty']");
    this.menuItemTransaction = customElement("//li[text()='Transakce']");
    this.menuItemSupport = customElement("//li[text()='Podpora']");
  }
}
