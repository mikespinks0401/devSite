/// <reference types="cypress" />

describe('User Can Log In', ()=>{

    const sampleUser = {
        email: 'sample@gmail.com',
        password: 'password',
        passwordConfirm: 'password'
    }

    afterEach(()=>{
        cy.task('removeUsers')
    })

    it('returns status 200 with proper credentials', ()=>{
        cy.request({method: 'POST', url:'/api/v1/auth/register',body: sampleUser}).then(res => {
           cy.request({method: 'POST', url: '/api/v1/auth/login', body: {email: 'sample@gmail.com', password: 'password'}}).then(res => {
            const code = res.status
            assert.equal(code, 200, '200 should be recieved on successful login')
           })
        })
    })
})