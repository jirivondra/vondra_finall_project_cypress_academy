export const customElement = selector => {
  let isXPath = false
  if (
    selector.startsWith(`//`) ||
    selector.startsWith(`(//`) ||
    selector.startsWith(`"//`) ||
    selector.startsWith(`'//`)
  ) {
    isXPath = true;
  }

  const element = {
    isVisible() {
      if (isXPath) {
        cy.xpath(selector).should('be.visible');
      } else {
        cy.get(selector).should('be.visible');
      }
      return this;
    },
    isNotVisible() {
      if (isXPath) {
        cy.xpath(selector).should('not.be.visible');
      } else {
       cy.get(selector).should('not.be.visible');
      }
      return this;
    },
    isExist() {
      if (isXPath) {
        cy.xpath(selector).should('exist');
      } else {
        cy.get(selector).should('exist');
      }
      return this;
    },
    haveText(text) {
      if (isXPath) {
        cy.xpath(selector).should('have.text', text);
      } else {
        cy.get(selector).should('have.text', text);
      }
      return this;
    },
    containsText(text) {
      if (isXPath) {
        cy.xpath(selector).should('contain.text', text);
      } else {
        cy.get(selector).should('contain.text', text);
      }
      return this;
    },
    haveValue(value) {
      if (isXPath) {
        cy.xpath(selector).should('have.value', value);
      } else {
        cy.get(selector).should('have.value', value);
      }
      return this;
    },
    havePlaceholder(placeholder) {
      if (isXPath) {
        cy.xpath(selector).should('have.attr', 'placeholder', placeholder);
      } else {
        cy.get(selector).should('have.attr', 'placeholder', placeholder);
      }
      return this;
    },
    haveAttribute(attribute, value) {
      if (isXPath) {
        cy.xpath(selector).should('have.attr', attribute, value);
      } else {
        cy.get(selector).should('have.attr', attribute, value);
      }
      return this;
    },
    click() {
      if (isXPath) {
        cy.xpath(selector).click();
      } else {
        cy.get(selector).click();
      }
      return this;
    },
    type(value) {
      if (isXPath) {
        cy.xpath(selector).type(value);
      } else {
        cy.get(selector).type(value);
      }
      return this;
    },
    clear() {
      if (isXPath) {
        cy.xpath(selector).clear();
      } else {
        cy.get(selector).clear();
      }
      return this;
    },
    selectOption(option) {
      if (isXPath) {
        cy.xpath(selector).select(option);
      } else {
        cy.get(selector).select(option);
      }
      return this;
    },
    checkOption() {
      if (isXPath) {
        cy.xpath(selector).check();
      } else {
        cy.get(selector).check();
      }
      return this;
    },
    beChecked() {
      if (isXPath) {
        cy.xpath(selector).should('be.checked');
      } else {
        cy.get(selector).should('be.checked');
      }
      return this;
    },
    get() {
      return isXPath === false ? cy.get(selector) : cy.xpath(selector);
    },
  };
  return element;
};
