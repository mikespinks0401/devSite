/// <reference types="cypress" />

describe('Input Errors Work', ()=>{
    
    context('Alert Pops Up For Invalid Inputs', ()=>{
      beforeEach(()=>{
        cy.visit('/register')
        cy.get('[data-cy="auth form"]')
      })

      it('alert pops up when submitting empty form', ()=>{
        cy.get('[data-cy="formSubmit"]').should('be.visible').click()
        cy.contains('Alert')
      })
      it('alert contains required  when submitted', ()=>{
        cy.get('[data-cy="formSubmit"]').should('be.visible').click().then(()=>{
          cy.get('[data-cy="modal"]').contains('Required')
        })
      })
    })
})
