import { customElement } from '../../helper/custom_element';
import { Header } from './header';
import menuData from '../../../fixtures/menu_data.json';

export class Menu extends Header {
  constructor() {
    super();
    this.menu = customElement('.dashboard-sidebar');
    this.menuItems = menuData.map(item => {
      console.info(item.name);
      item.element = customElement(`//li[text()='${item.name}']`);
      console.info(item.element);
      return item;
    });
  }
}
