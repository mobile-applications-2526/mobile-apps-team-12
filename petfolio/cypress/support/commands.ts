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
    cy.request({
      method: 'POST',
      url: `${Cypress.env('SUPABASE_URL')}/auth/v1/token?grant_type=password`,
      headers: {
        'apikey': Cypress.env('SUPABASE_ANON_KEY'),
        'Content-Type': 'application/json'
      },
      body: {
        email,
        password
      }
    }).then((response) => {
      const { access_token, refresh_token, expires_in, expires_at, user } = response.body;
      
      const session = {
        access_token,
        refresh_token,
        expires_in,
        expires_at,
        token_type: 'bearer',
        user
      };
      
      const projectRef = Cypress.env('SUPABASE_URL').match(/https:\/\/([^.]+)/)[1];
      const storageKey = `sb-${projectRef}-auth-token`;
      
      cy.window().then((win) => {
        win.localStorage.setItem(storageKey, JSON.stringify(session));
      });
    });
  }, {
    validate() {
      const projectRef = Cypress.env('SUPABASE_URL').match(/https:\/\/([^.]+)/)[1];
      const storageKey = `sb-${projectRef}-auth-token`;
      
      cy.window().then((win) => {
        const authToken = win.localStorage.getItem(storageKey);
        if (!authToken) {
          throw new Error('No auth token found');
        }
      });
    }
  });
});


export {};