/// <reference types="cypress" />

describe('The Header', () => {
  context('Renders on mobile/small screns', () => {
    beforeEach(() => {
      cy.viewport('iphone-6')
      cy.visit('/')
    })

    it('hamburger menu shows on mobile', () => {
      cy.get('[data-cy="hamburger"]')
    })

    it('aria-Expanded false when loaded', ()=>{
        
        cy.get('[data-cy="hamburger"]').should( ($menu) => {
         
            const isExpanded = $menu.attr('aria-expanded')
            assert.equal(isExpanded, "false"  , "Menu Should not be expanded")
        })
    })

    it('aria-Expanded true when hamburger icon clicked', ()=>{

        cy.get('[data-cy="hamburger"]').click()
        cy.get('[data-cy="hamburger"]').should('have.attr', 'aria-expanded', 'true')
    })

    it('contains logo', () => {
      cy.get('[data-cy="logo"]')
    })

    it('mobile menu should be hidden by default', ()=>{
      cy.get('[data-cy="mobile menu"]').should('not.be.visible')
    })

    it('mobile menu visible when clicked', ()=>{
      cy.get('[data-cy="hamburger"]').click()
      cy.get('[data-cy="mobile menu"]').should('be.visible')
    })


  })


})
