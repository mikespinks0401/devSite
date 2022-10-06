/// <reference types="cypress" />

describe('Has Correct Endpoints', ()=>{
    it('throws 400 when no fields sent', ()=>{
        cy.request({method: 'POST', url:'/api/v1/auth/register', failOnStatusCode: false}).then( res =>{

        const statusCode = res.status

        assert.equal(statusCode, 400, 'status code should equal 400')
        })
    })

    it('throws 400 when fields dont match user schema', ()=>{
        cy.request({method: 'POST', url:'/api/v1/auth/register', body:{
            email: "", password: "", confirmPassword: ""
        }, failOnStatusCode: false}).then( res =>{

        const statusCode = res.status

        assert.equal(statusCode, 400, 'status code should equal 400')
        })
    })
})