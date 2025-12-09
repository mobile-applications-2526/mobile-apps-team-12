/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

declare global {
  namespace Cypress {
    interface Chainable {
      login(email?: string, password?: string): Chainable<void>;
      logout(): Chainable<void>;
    }
  }
}

Cypress.Commands.add('login', (
  email = 'ashley.timmermans@student.ucll.be',
  password = 'welkom1234' 
) => {
  cy.session(['login-session', email, password], () => {
    cy.visit('/login');
    
    cy.contains('Log in here', { timeout: 10000 }).should('be.visible');
    
    cy.get('input').first().clear().type(email);
    cy.get('input').eq(1).clear().type(password);
    
    cy.get('[data-testid="login-button"]').click();
        
    cy.url({ timeout: 15000 }).should('include', '/homepage');
    
    cy.wait(2000);
  }, {
    validate() {
      cy.request({
        url: '/homepage',
        failOnStatusCode: false
      }).then((response) => {
        if (response.status === 200 && response.body.includes('login')) {
          throw new Error('Session expired');
        }
      });
    }
  });
});


export {};