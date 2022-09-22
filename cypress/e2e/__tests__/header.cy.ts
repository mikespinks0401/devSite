/// <reference types="cypress" />

describe('The Header', () => {
  beforeEach(()=>{
    cy.visit('/')
  })
  context('Nav Bar Renders on mobile screens', () => {
    beforeEach(() => {
      cy.viewport('iphone-6')
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

        // cy.get('[data-cy="hamburger"]').click().should('have.attr', 'aria-expanded', 'true')
        // cy.get('[data-cy="hamburger"]').click()
        cy.get('[data-cy="hamburger"]').wait(50).click().wait(1000).should('have.attr', 'aria-expanded', 'true')
    })

    it('contains logo', () => {
      cy.get('[data-cy="logo"]')
    })

    it('mobile menu should be hidden by default', ()=>{
      cy.get('[data-cy="mobile menu"]').should('not.be.visible')
    })

    it('mobile menu visible when clicked', ()=>{
      cy.visit('/')
      cy.get('[data-cy="hamburger"]').wait(50).click()
      cy.get('[data-cy="mobile menu"]').should('be.visible')
    })
  })

  context('Properly renders on medium screens', ()=>{
    cy.viewport("ipad-2")
    it('does not contain hamburger menu', ()=>{

    })
  })

})
