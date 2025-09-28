export class BasePage {
  constructor(path) {
    this.baseUrl = Cypress.env('frontend');
    this.path = path;
  }

  visit() {
    cy.visit(this.baseUrl + this.path);
    return this;
  }
}
