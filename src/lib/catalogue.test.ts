import type { Product } from '../data/products'
import { byCategory, categoriesOf, sortByPrice } from './catalogue'

const createProduct = (overrides: Partial<Product> = {}): Product => ({
  name: 'Test Vase',
  category: 'ceramics',
  pricePence: 1000,
  description: 'A vase for testing.',
  hue: 20,
  ...overrides,
})

test('byCategory with a matching category', () => {
  const lamp = createProduct({ name: 'Lamp', category: 'lighting' })
  const vase = createProduct({ name: 'Vase', category: 'ceramics' })

  expect(byCategory([lamp, vase], 'lighting')).toEqual([lamp])
})

test('byCategory with "all"', () => {
  const catalogue = [createProduct(), createProduct({ category: 'textiles' })]
  const result = byCategory(catalogue, 'all')

  expect(result).toEqual(catalogue)
  expect(result).not.toBe(catalogue)
})

test('byCategory with an empty catalogue', () => {
  expect(byCategory([], 'ceramics')).toEqual([])
})

test('sortByPrice ascending by default', () => {
  const dear = createProduct({ name: 'Dear', pricePence: 9000 })
  const cheap = createProduct({ name: 'Cheap', pricePence: 500 })

  expect(sortByPrice([dear, cheap]).map((p) => p.name)).toEqual(['Cheap', 'Dear'])
})

test('sortByPrice descending', () => {
  const dear = createProduct({ name: 'Dear', pricePence: 9000 })
  const cheap = createProduct({ name: 'Cheap', pricePence: 500 })

  expect(sortByPrice([cheap, dear], 'desc').map((p) => p.name)).toEqual(['Dear', 'Cheap'])
})

test('sortByPrice does not mutate the input', () => {
  const catalogue = [createProduct({ pricePence: 9000 }), createProduct({ pricePence: 500 })]
  sortByPrice(catalogue)

  expect(catalogue[0].pricePence).toBe(9000)
})

test('categoriesOf returns unique categories alphabetically', () => {
  const catalogue = [
    createProduct({ category: 'textiles' }),
    createProduct({ category: 'ceramics' }),
    createProduct({ category: 'textiles' }),
  ]

  expect(categoriesOf(catalogue)).toEqual(['ceramics', 'textiles'])
})
