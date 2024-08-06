/// <reference types="cypress" />
// ***********************************************


Cypress.Commands.add('login', (username: string, password: string) => {
   cy.intercept('https://app.cymulate.com/cym/login').as('loginApi')

   
    cy.visit('https://app.cymulate.com/cym/login');
    cy.url().should('include', '/login');
    cy.wait('@loginApi')
     
   
    cy.wait(20000);
    cy.get('input[name="username"]').type(username);
    cy.get('input[name="password"]').type(password);
    cy.get('button[type="submit"]').click();

  });


  declare global {
    namespace Cypress {
      interface Chainable {
        /**
         * Custom command to log in to the Cymulate app.
         * @param email - The user's email
         * @param password - The user's password
         */
        login(email: string, password: string): Chainable<void>;
      }
    }
  }
  
  export {};
