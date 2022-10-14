/// <reference types="cypress" />

describe('contact form sends email', ()=>{

   it('sends email on submission', ()=> {
       cy.visit('/contact')
       cy.get('[data-cy="name"]').should('be.visible').type('john doe')
       cy.get('[data-cy="email"]').type('sampleEmail@email.com')
       cy.get('[data-cy="message"]').type('Hello, This is a sample Message')
       cy.get('[data-cy="submit"]').click()
       
      })
})