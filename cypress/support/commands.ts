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
   Cypress.Commands.add<any>('register', (email, password, token) => {
    cy.request({method: 'POST', url:'/api/v1/auth/register', body: {email: email, password: password, passwordConfirm: password, token: token}})
     })
   Cypress.Commands.add<any>('login', (email, password, rememberMe:boolean = false) => {
    cy.request({method: 'POST', url:'/api/v1/auth/login', body: {email: email, password: password, rememberMe}})
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
        register(email: string, password: string, token: string): Chainable<Cypress.Response<any>>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
    }
  }
}
