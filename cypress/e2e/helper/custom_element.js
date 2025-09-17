export const customElement = selector => {
  let isXPath;
  if (
    selector.startsWith(`//`) ||
    selector.startsWith(`(//`) ||
    selector.startsWith(`"//`) ||
    selector.startsWith(`'//`)
  ) {
    isXPath = true;
  } else {
    isXPath = false;
  }

  const element = {
    isVisible() {
      if (isXPath === false) {
        cy.get(selector).should('be.visible');
      } else {
        cy.xpath(selector).should('be.visible');
      }
      return this;
    },
    isNotVisible() {
      if (isXPath === false) {
        cy.get(selector).should('not.be.visible');
      } else {
        cy.xpath(selector).should('not.be.visible');
      }
      return this;
    },
    isExist() {
      if (isXPath === false) {
        cy.get(selector).should('exist');
      } else {
        cy.xpath(selector).should('exist');
      }
      return this;
    },
    haveText(text) {
      if (isXPath === false) {
        cy.get(selector).should('have.text', text);
      } else {
        cy.xpath(selector).should('have.text', text);
      }
      return this;
    },
    containsText(text) {
      if (isXPath === false) {
        cy.get(selector).should('contain.text', text);
      } else {
        cy.xpath(selector).should('contain.text', text);
      }
      return this;
    },
    haveValue(value) {
      if (isXPath === false) {
        cy.get(selector).should('have.value', value);
      } else {
        cy.xpath(selector).should('have.value', value);
      }
      return this;
    },
    havePlaceholder(placeholder) {
      if (isXPath === false) {
        cy.get(selector).should('have.attr', 'placeholder', placeholder);
      } else {
        cy.xpath(selector).should('have.attr', 'placeholder', placeholder);
      }
      return this;
    },
    haveAttribute(attribute, value) {
      if (isXPath === false) {
        cy.get(selector).should('have.attr', attribute, value);
      } else {
        cy.xpath(selector).should('have.attr', attribute, value);
      }
      return this;
    },
    click() {
      if (isXPath === false) {
        cy.get(selector).click();
      } else {
        cy.xpath(selector).click();
      }
      return this;
    },
    type(value) {
      if (isXPath === false) {
        cy.get(selector).type(value);
      } else {
        cy.xpath(selector).type(value);
      }
      return this;
    },
    clear() {
      if (isXPath === false) {
        cy.get(selector).clear();
      } else {
        cy.xpath(selector).clear();
      }
      return this;
    },
    selectOption(option) {
      if (isXPath === false) {
        cy.get(selector).select(option);
      } else {
        cy.xpath(selector).select(option);
      }
      return this;
    },
    checkOption() {
      if (isXPath === false) {
        cy.get(selector).check();
      } else {
        cy.xpath(selector).check();
      }
      return this;
    },
    beChecked() {
      if (isXPath === false) {
        cy.get(selector).should('be.checked');
      } else {
        cy.xpath(selector).should('be.checked');
      }
      return this;
    },
    get() {
      return isXPath === false ? cy.get(selector) : cy.xpath(selector);
    },
    intercept(url) {
      return cy.intercept(url);
    },

    wait(alias) {
      return cy.wait(alias);
    },

    createAlias(data, alias) {
      cy.wrap(data).as(alias);
      return this;
    },
  };
  return element;
};
