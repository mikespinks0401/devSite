/// <reference types="cypress" />

describe('User Activity', () => {

    const sampleUser = {
        email: 'sample@gmail.com',
        username: 'mrSimp01',
        password: 'password',
        passwordConfirm: 'password',
        token: 'XXXX.DUMMY.TOKEN.XXXX'
    }

    beforeEach(()=>{
        cy.task('removeUsers')
        cy.clearCookies()
    })

    context('logging in', ()=> {
        it('User is logged in after registering', ()=> {
            cy.visit('/register')
                cy.get('[data-cy="email"]').should('be.visible').type(sampleUser.email)
                cy.get('[data-cy="username"]').type(sampleUser.username)
                cy.get('[data-cy="password"]').type(sampleUser.password)
                cy.get('[data-cy="confirm password"]').type(sampleUser.password)
                cy.get('[data-cy="formSubmit"]').wait(2000).click()
            cy.get('[data-cy="logout"]')
        })
        it('User State Is Logged In after Login Form', () => {
            cy.register(sampleUser)
            cy.visit('/')
            cy.visit('/login')
            cy.get('[data-cy="email"]').should('be.visible').type(sampleUser.email)
            cy.get('[data-cy="password"]').type(sampleUser.password)
            cy.get('[data-cy="formSubmit"]').wait(2000).click()
            cy.get('[data-cy="logout"]').should('be.visible')
        })

        it('User is logged in automatically on visit', ()=>{
            cy.visit('/register')
                cy.get('[data-cy="email"]').should('be.visible').type(sampleUser.email)
                cy.get('[data-cy="username"]').type(sampleUser.username)
                cy.get('[data-cy="password"]').type(sampleUser.password)
                cy.get('[data-cy="confirm password"]').type(sampleUser.password)
                cy.get('[data-cy="formSubmit"]').wait(2000).click()
                cy.visit('/')
            cy.visit('/login')
                cy.get('[data-cy="email"]').should('be.visible').type(sampleUser.email)
                cy.get('[data-cy="password"]').type(sampleUser.password)
                cy.get('[data-cy="formSubmit"]').wait(2000).click()
                const cookies = cy.getCookies()
                console.log(cookies)
            
            cy.get('[data-cy="logout"]').should('be.visible')
        })

    })
    
    context('logging out', () => {
        it('It shows login button when Logout is Clicked', ()=>{
            cy.visit('/register')
                cy.get('[data-cy="email"]').should('be.visible').type(sampleUser.email)
                cy.get('[data-cy="username"]').type(sampleUser.username)
                cy.get('[data-cy="password"]').type(sampleUser.password)
                cy.get('[data-cy="confirm password"]').type(sampleUser.passwordConfirm)
                cy.get('[data-cy="formSubmit"]').wait(2200).click()
            cy.get('[data-cy="logout"]').click()
            cy.get('[data-cy="login"]').should('be.visible')
        })
        it('Removes RefreshToken Cookie When Logout is Clicked', ()=>{
            cy.visit('/register')
                cy.get('[data-cy="email"]').should('be.visible').type(sampleUser.email)
                cy.get('[data-cy="username"]').type(sampleUser.username)
                cy.get('[data-cy="password"]').type(sampleUser.password)
                cy.get('[data-cy="confirm password"]').type(sampleUser.passwordConfirm)
                cy.get('[data-cy="formSubmit"]').wait(2200).click()     
            cy.get('[data-cy="logout"]').click()
            cy.getCookie('refresh_token').should('not.exist')
        }) 

    })


})