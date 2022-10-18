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
interface NewUser {
  email: string,
  username: string,
  password: string,
  token: string,
}

   Cypress.Commands.add<any>('register', (user:NewUser) => {
    cy.request({method: 'POST', url:'/api/v1/auth/register', body: {email: user.email, username: user.username,  password: user.password, passwordConfirm: user.password, token: user.token}})
     })
   Cypress.Commands.add<any>('login', (user:NewUser) => {
    cy.request({method: 'POST', url:'/api/v1/auth/login', body: {email: user.email, password: user.password, rememberMe: true, token:user.token}})
     })
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
export{}
declare global {
  namespace Cypress {
    interface Chainable {
        login(email: string, password: string, rememberMe, token: string): Chainable<Cypress.Response<any>>
        register(user: NewUser): Chainable<Cypress.Response<any>>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
    }
  }
}
