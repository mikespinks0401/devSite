import TheHeader from './TheHeader.vue'

describe('<TheHeader />', () => {
  it('renders', () => {
    // see: https://test-utils.vuejs.org/guide/
    cy.mount(TheHeader)
  })
})