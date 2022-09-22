/// <reference types="cypress" />

describe("All Pages should exist", ()=> {
    it('Home page exists', ()=> {
        cy.visit("/")
    })

    it('About Page Should exists', ()=>{
        cy.visit("/about")
    }) 
    
    it('Blog Page Should exists', ()=>{
        cy.visit("/blog")
    })

    it('Contact Page Should exists', ()=>{
        cy.visit("/contact")
    })
})

describe("Header and Footer exists", ()=> {

    it('should show header navigation', ()=>{
        cy.get('[data-cy="Nav"]')
    })


    it('should show footer', ()=>{
        cy.get('[data-cy="Footer"]')
    })
})