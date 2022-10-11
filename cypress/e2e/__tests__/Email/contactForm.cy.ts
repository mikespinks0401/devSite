/// <reference types="cypress" />

describe('contact form', ()=>{
    it('contains captcha', ()=>{
        cy.get('[data-cy="captcha]')
    })
})