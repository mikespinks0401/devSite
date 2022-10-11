/// <reference types="cypress" />

import { Jwt } from 'jsonwebtoken'
import jwt_decode from 'jwt-decode'

describe('User Can Log In', ()=>{

    const sampleUser = {
        email: 'sample@gmail.com',
        password: 'password',
        passwordConfirm: 'password'
    }

    beforeEach(()=>{
        cy.task('removeUsers')
        cy.clearCookies()
    })

    it('returns status 200 with proper credentials', ()=>{
        cy.request({method: 'POST', url:'/api/v1/auth/register',body: sampleUser}).then(res => {
           cy.request({method: 'POST', url: '/api/v1/auth/login', body: {email: 'sample@gmail.com', password: 'password'}}).then(res => {
            const code = res.status
            assert.equal(code, 200, '200 should be recieved on successful login')
           })
        })
    })

    it('creates a refresh_token cookie on successful login', ()=>{
        cy.request({method: 'POST', url:'/api/v1/auth/register',body: sampleUser}).then(res => {
           cy.request({method: 'POST', url: '/api/v1/auth/login', body: {email: 'sample@gmail.com', password: 'password'}}).then(res => {
            cy.getCookie('refresh_token').should('exist')
          })
        })
    })

    it('refresh token only last for session when remember me is not clicked', ()=>{
        cy.request({method: 'POST', url:'/api/v1/auth/register',body: sampleUser}).then(res => {
           cy.request({method: 'POST', url: '/api/v1/auth/login', body: {email: 'sample@gmail.com', password: 'password'}}).then(res => {
            cy.getCookie('refresh_token').should(cookie => {
                const token:Jwt = jwt_decode(cookie.value)

                const timeDiff = token.exp - token.iat
                assert.isBelow(timeDiff, 0, 'Token Should Have a negative value to be set to Session Only')

            })
          })
        })
    })

    it('refresh token cookie is gone on refreshing the browser', ()=>{
        cy.request({method: 'POST', url:'/api/v1/auth/register',body: sampleUser}).then(res => {
           cy.request({method: 'POST', url: '/api/v1/auth/login', body: {email: 'sample@gmail.com', password: 'password'}}).then(res => {
            cy.getCookie('refresh_token').should(cookie => {
                cy.getCookie('refresh_token').should('exist').then(()=> {
                    cy.request('/').then(()=>{
                        cy.getCookie('refreh_token').should('not.exist')
                    })
                })

            })
          })
        })
    })

    it('refresh token last for 7 days when remember me is clicked', ()=>{
        cy.request({method: 'POST', url:'/api/v1/auth/register',body: sampleUser}).then(res => {
           cy.request({method: 'POST', url: '/api/v1/auth/login', body: {email: 'sample@gmail.com', password: 'password', rememberMe: true}}).then(res => {
            cy.getCookie('refresh_token').should(cookie => {
                const token:Jwt = jwt_decode(cookie.value)

                const timeDiff = token.exp - token.iat
                assert.equal(timeDiff, 604800,'Token Time Dif should be 604800')

            })
          })
        })
    })
    it('refresh token persist after refreshing the browser when remember me is true', ()=>{
        cy.request({method: 'POST', url:'/api/v1/auth/register',body: sampleUser}).then(res => {
           cy.request({method: 'POST', url: '/api/v1/auth/login', body: {email: 'sample@gmail.com', password: 'password', rememberMe: true}}).then(res => {
            cy.getCookie('refresh_token').should('exist').then(()=>{
                cy.request('/')
                cy.getCookie('refresh_token').should('exist')
            })
          })
        })
    })






})