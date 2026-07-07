import { products } from '../../src/data/products'
import { byCategory, categoriesOf } from '../../src/lib/catalogue'
import { formatPrice, slugify } from '../../src/lib/format'

describe('Landing page', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('shows the masthead and hero copy', () => {
    cy.get('.masthead__mark').should('contain.text', 'London Objects')
    cy.get('h1').should('contain.text', 'lived-in')
  })

  it('renders every product with its category and formatted price', () => {
    cy.get('.grid .card').should('have.length', products.length)

    products.forEach((product) => {
      cy.get(`#${slugify(product.name)}`).within(() => {
        cy.get('h2').should('have.text', product.name)
        cy.get('.card__category').should('have.text', product.category)
        cy.get('.card__price').should('have.text', formatPrice(product.pricePence))
        cy.get('img').should('have.attr', 'src', `/products/${slugify(product.name)}.svg`)
      })
    })
  })

  it('defaults to the "all" filter with every category button available', () => {
    const filters = ['all', ...categoriesOf(products)]

    cy.get('.filters button').should('have.length', filters.length)
    filters.forEach((filter) => {
      cy.get(`.filters button[data-filter="${filter}"]`).should('exist')
    })
    cy.get('.filters button[data-filter="all"]').should('have.attr', 'aria-pressed', 'true')
  })

  categoriesOf(products).forEach((category) => {
    it(`filters down to just the ${category} products when selected`, () => {
      const expected = byCategory(products, category)

      cy.get(`.filters button[data-filter="${category}"]`).click()

      cy.get(`.filters button[data-filter="${category}"]`).should('have.attr', 'aria-pressed', 'true')
      cy.get('.filters button[data-filter="all"]').should('have.attr', 'aria-pressed', 'false')

      cy.get('.grid .card').should('have.length', expected.length)
      expected.forEach((product) => {
        cy.get(`#${slugify(product.name)}`).should('exist')
      })
    })
  })

  it('shows the footer', () => {
    cy.get('.footer').should('contain.text', 'London Objects').and('contain.text', 'Columbia Road')
  })
})
