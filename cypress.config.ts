import * as setup from './seeder/setup'
import * as teardown from './seeder/teardown'
import { defineConfig } from 'cypress'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  video: false,
  e2e: {
    baseUrl: 'http://localhost:3000',
    setupNodeEvents(on, config) {
        //start smtp-server to listen on
        const ms = require('smtp-tester')
        // implement node event listeners here
        const port = 7778
        const mailServer = ms.init(port)
        console.log('mail server at port %d', port)

        // process all emails
       let lastEmail:any = {}


        mailServer.bind((addr: string, id:number, email: any) => {
          console.log('--- email ---')
          console.log(addr, id, email)
          lastEmail[email.headers.to] = {
            to: email.headers.to,
            html: email.html,
            body: email.body
          }
        })
      
      //add seeder setup and breakdown commands
      on('task', {
        //create users when called
        seedUsers(numberOfUsers){
          return new Promise(async (resolve)=>{
            await setup.createUsers(5)
            console.log('created')
            resolve('created')
          })
        },
        //clear database when called
        removeUsers(){
          return new Promise(async (resolve)=>{
            await teardown.clearUsers()
            resolve('removed')
          })
        },
        getLastEmail : (email: string) => {
          return lastEmail[email] || null
        }
      })
      // implement node event listeners here
    },
  },

  component: {
    devServer: {
      framework: 'vue',
      bundler: 'vite',
      viteConfig: {
        plugins: [vue()],
      },
    },
  },
})
