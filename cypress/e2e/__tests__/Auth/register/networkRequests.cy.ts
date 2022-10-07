/// <reference types="cypress" />

const sampleUser = {
    email: 'sample@gmail.com',
    password: 'password',
    passwordConfirm: 'password'
}

describe('responds correctly with requests', ()=>{
    afterEach(()=>{
        cy.task('removeUsers')
    })
    it('throws 400 when no fields sent', ()=>{
        cy.request({method: 'POST', url:'/api/v1/auth/register', failOnStatusCode: false}).then( res =>{

        const statusCode = res.status

        assert.equal(statusCode, 400, 'status code should equal 400')
        })
    })

    it('throws 400 when fields dont match user schema', ()=>{
        cy.request({method: 'POST', url:'/api/v1/auth/register', body:{
            email: "jiknhpio", password: "", confirmPassword: ""
        }, failOnStatusCode: false}).then( res =>{

        const statusCode = res.status

        assert.equal(statusCode, 400, 'status code should equal 400')
        })
    })

    it('responds with 201 when data is shaped correctly', ()=>{
        cy.request({method: 'POST', url:'/api/v1/auth/register', body: sampleUser}).then( res => {

        const statusCode = res.status
        assert.equal(statusCode, 201, 'Status should be 201 when user created') 
        })
    })

    it('responds with 409 when trying to create a user with data that already exists',  ()=>{
          cy.request({method: 'POST', url:'/api/v1/auth/register', body: sampleUser})
          cy.request({method: 'POST', url:'/api/v1/auth/register', body: sampleUser, failOnStatusCode: false}).then(res => {
            const statusCode = res.status
            assert.equal(statusCode, 409, '409 should be thrown due to email already exist')
          })
    })

})