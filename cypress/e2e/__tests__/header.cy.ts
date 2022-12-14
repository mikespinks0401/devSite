/// <reference types="cypress" />

describe('The Header', () => {
  beforeEach(() => {
    cy.visit('/')
  })
  context('Nav Bar Renders on mobile screens', () => {
    beforeEach(() => {
      cy.viewport('iphone-6')
    })

    it('hamburger menu shows on mobile', () => {
      cy.get('[data-cy="hamburger"]')
    })

    it('aria-Expanded false when loaded', () => {
      cy.get('[data-cy="hamburger"]').should(($menu) => {
        const isExpanded = $menu.attr('aria-expanded')
        assert.equal(isExpanded, 'false', 'Menu Should not be expanded')
      })
    })

    it('aria-Expanded true when hamburger icon clicked', () => {
      cy.get('[data-cy="hamburger"]')
        .should('be.visible')
        .click()
        .should('have.attr', 'aria-expanded', 'true')
    })

    it('contains logo', () => {
      cy.get('[data-cy="logo"]')
    })

    it('mobile menu should be hidden by default', () => {
      cy.get('[data-cy="mobile menu"]').should('not.be.visible')
    })

    it('mobile menu visible when clicked', () => {
      cy.get('[data-cy="hamburger"]').should('be.visible').click()
      cy.get('[data-cy="mobile menu"]').should('be.visible')
    })

    it('Mobile menu closes when A Button / Page is clicked', () => {
      cy.get('[data-cy="hamburger"]').should('be.visible').click()
      cy.get('[data-cy="mobile menu"]').should('be.visible')
      cy.get('[data-cy="navList"] li').should('have.length.above', 1)
    })
  })

  context('Properly renders on medium screens', () => {
    before(() => {
      cy.viewport('ipad-2')
    })
    it('does not contain hamburger menu', () => {
      cy.get('[data-cy="hamburger"]').should('not.be.visible')
    })
  })
})
