/// <reference types="cypress" />


describe('login form contains proper inputs and shows modal on errors', ()=>{
    beforeEach(()=>{
        cy.visit('/login')
    })
    afterEach(()=>{
        cy.task('removeUsers')
    })
    it('contains email input box', ()=>{
        cy.get('[data-cy="email"]')
    })
    it('contains password input box', ()=>{
        cy.get('[data-cy="password"]')
    })
    it('contains Remember Me Checkbox', ()=> {
        cy.get('[data-cy="remember me"]')
    })
    it('contains Forgot Password Link', ()=>{
        cy.get('[data-cy="forgot password"]')
    })
    it('shows fields required if submitted with empty inputs', ()=>{

        cy.get('[data-cy="formSubmit"]').should('be.visible').click().then(()=>{
            cy.get('[data-cy="modal"]').contains('Required')
        })
    })

    const sampleUser = {
    email: 'sample@gmail.com',
    password: 'password',
    passwordConfirm: 'password'
    }
    

    it('shows invalid credentials when submitted with wrong email or password', ()=>{
        // cy.intercept('POST', '/api/v1/auth', {
        //     statusCode: 401,
        //     statusMessage: 'Invalid Credentials'
        // })

        cy.get('[data-cy= "email"]').should('be.visible').type('sample@gmail.com')
        cy.get('[data-cy="password"]').type('password1')
        cy.get('[data-cy="formSubmit"]').click().then(()=> {
            cy.get('[data-cy="modal"]').should('be.visible').contains('Invalid Credentials')
        })
    })

    it('shows locked out error when exceeds failed password attempts', ()=>{
        cy.request({method: 'POST', url:'/api/v1/auth/register', body: sampleUser})
        cy.request({method: 'POST', url: '/api/v1/auth/login', body: {
            email: sampleUser.email,
            password: '42123'
        },failOnStatusCode: false})
        cy.request({method: 'POST', url: '/api/v1/auth/login', body: {
            email: sampleUser.email,
            password: '42123'
        },failOnStatusCode: false})
        cy.request({method: 'POST', url: '/api/v1/auth/login', body: {
            email: sampleUser.email,
            password: '42123'
        },failOnStatusCode: false})
        cy.request({method: 'POST', url: '/api/v1/auth/login', body: {
            email: sampleUser.email,
            password: '42123'
        },failOnStatusCode: false})
        cy.request({method: 'POST', url: '/api/v1/auth/login', body: {
            email: sampleUser.email,
            password: '42123'
        },failOnStatusCode: false})
        cy.request('/login')
        cy.get('[data-cy= "email"]').type('sample@gmail.com')
        cy.get('[data-cy="password"]').type('password1')
        cy.get('[data-cy="formSubmit"]').click().then(()=> {
        cy.get('[data-cy="modal"]').contains('Locked Out')
        })
    })
   
    

})