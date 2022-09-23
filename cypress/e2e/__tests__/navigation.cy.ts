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

    it('Login Page Should exists', ()=>{
        cy.visit("/login")
    })
    
    it('Login Page Should exists', ()=>{
        cy.visit("/register")
    })
})

describe("Header and Footer exists", ()=> {

    it('should show header navigation', ()=>{
        cy.get('[data-cy="header"]')
    })


    it('should show footer', ()=>{
        cy.get('[data-cy="Footer"]')
    })
})