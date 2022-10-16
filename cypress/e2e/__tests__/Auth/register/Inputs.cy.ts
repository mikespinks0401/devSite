/// <reference types="cypress" />

describe('Auth System Works', () => {
  it('Goes To Register Page when Main Nav Signup button is clicked', () => {
    cy.visit('/')
    cy.get('[data-cy="main sign up"]')
      .click()
      .get('h1')
      .should('contain', 'Sign Up')
  })

  it('displays registration form', () => {
    cy.visit('/register')
    cy.get('h1').contains('Sign Up')
    cy.get('[data-cy="auth form"]')
  })

  context('Register Form Contains Correct Inputs', () => {
    beforeEach(() => {
      cy.visit('/register')
      cy.get('[data-cy="auth form"]')
    })
    it('contains email field', ()=>{
      cy.get('input[name="email"]')
    })
    it('contains password field', ()=>{
      cy.get('input[name="password"]')
    })
    it('contains passwordConfirm field', ()=>{
      cy.get('input[name="confirm password"]')
    })
    it('contains submit button', ()=>{
      cy.get('button[type="submit"]')
    })
  })


  context('Sign Up Button Works on mobile', () => {
    beforeEach(() => {
      cy.viewport('iphone-8')
    })
    it('Goes To Register Page when Mobile Menu Nav Signup button is clicked', () => {
      cy.visit('/')
      cy.get('[data-cy="hamburger"]').should('be.visible').click()
      cy.get('[data-cy="mobile sign up"]')
        .click()
        .get('h1')
        .should('contain', 'Sign Up')
    })
  })
})
