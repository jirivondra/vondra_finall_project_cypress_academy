


export const intercept = (url) => {
      return cy.intercept(url);
    }

export const wait = (alias) => {
      return cy.wait(alias);
    }

export const createAlias = (data, alias) => {
      cy.wrap(data).as(alias);
    }
export const setCookie = (cookieName, accessToken) => {
      cy.setCookie(cookieName, accessToken);
    }