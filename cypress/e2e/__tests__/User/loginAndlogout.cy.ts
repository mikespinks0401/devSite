/// <reference types="cypress" />

describe('User Activity', () => {

    const sampleUser = {
        email: 'sample@gmail.com',
        password: 'password',
        passwordConfirm: 'password'
    }

    beforeEach(()=>{
        cy.task('removeUsers')
        cy.clearCookies()
    })

    context('logging in', ()=> {
        it('User is logged in after registering', ()=> {
            cy.visit('/register')
            cy.get('[data-cy="email"]').should('be.visible').type(sampleUser.email)
            cy.get('[data-cy="password"]').type(sampleUser.password)
            cy.get('[data-cy="confirm password"]').type(sampleUser.passwordConfirm)
            cy.get('[data-cy="formSubmit"]').click()
            cy.get('[data-cy="logout"]')
        })
        it('User State Is Logged In after Login Form', () => {
            cy.visit('/register')
                cy.get('[data-cy="email"]').should('be.visible').type(sampleUser.email)
                cy.get('[data-cy="password"]').type(sampleUser.password)
                cy.get('[data-cy="confirm password"]').type(sampleUser.passwordConfirm)
                cy.get('[data-cy="formSubmit"]').click()
            cy.visit('/login')
                cy.get('[data-cy="email"]').should('be.visible').type(sampleUser.email)
                cy.get('[data-cy="password"]').type(sampleUser.password)
                cy.get('[data-cy="formSubmit"]').click()
                cy.get('[data-cy="logout"]')
        })

        it('User is logged in automatically on visit', ()=>{
            cy.register(sampleUser.email, sampleUser.password)
            cy.visit('/')
            cy.login(sampleUser.email, sampleUser.password, true)
            cy.visit('/')
            cy.get('[data-cy="logout"]')
        })

    })
    
    context('logging out', () => {
        it('It shows login button when Logout is Clicked', ()=>{
            cy.register(sampleUser.email, sampleUser.password)
            cy.visit('/')
            cy.get('[data-cy="logout"]').click()
            cy.get('[data-cy="login"]').should('be.visible')
        })
        it('Removes RefreshToken Cookie When Logout is Clicked', ()=>{
            cy.register(sampleUser.email, sampleUser.password)
            cy.visit('/')
            cy.getCookie('refresh_token').should('exist')
            cy.get('[data-cy="logout"]').click()
            cy.getCookie('refresh_token').should('not.exist')
        })

    })


})