/// <reference types="cypress" />

describe('Contact Form Works', ()=>{
    beforeEach(()=>{
        cy.visit('/contact')
    })

    it('shows alert when required fields aren\'t filled out', ()=>{
        cy.get('[data-cy="submit"]').should('be.visible').click().then(()=>{
            cy.get('[data-cy="modal"]').contains('Required')
        })
    })

    it('submits when required fields are filled out', ()=>{
        cy.get('[data-cy="name"').should('be.visible').type('john doe')
        cy.get('[data-cy="email"').type('sample@gmail.com')
        cy.get('[data-cy="message"').type('test message')
        cy.intercept('/api/v1/contact/submit', {
            statusCode: 201,
            body: {
            message: 'Success'
            }
        })
        cy.get('[data-cy="submit"').click().then(()=>{
            cy.get('[data-cy="modal"]').contains('Success')
        })
    })

    it('clears form data on successful submission', ()=>{
        cy.get('[data-cy="name"').should('be.visible').type('john doe')
        cy.get('[data-cy="email"').type('sample@gmail.com')
        cy.get('[data-cy="message"').type('test message')
        cy.intercept('/api/v1/contact/submit', {
            statusCode: 201,
            body: {
            message: 'Success'
            }
        })
        cy.get('[data-cy="submit"').click().then(()=>{
            cy.get('[data-cy="modal"]').contains('Success')
        })
        cy.get('[data-cy="close-modal"]').click()
        cy.get('[data-cy="name"]').should('be.visible').should('have.value', "")
    })
})