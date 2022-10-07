import * as setup from './seeder/setup'
import * as teardown from './seeder/teardown'
import { defineConfig } from 'cypress'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  video: false,
  e2e: {
    baseUrl: 'http://localhost:3000',
    setupNodeEvents(on, config) {
      on('task', {
        seedUsers(numberOfUsers){
          return new Promise(async (resolve)=>{
            await setup.createUsers(5)
            console.log('created')
            resolve('created')
          })
        },
        removeUsers(){
          return new Promise(async (resolve)=>{
            await teardown.clearUsers()
            resolve('removed')
          })
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
