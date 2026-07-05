import type { Category, Product } from '../data/products'

export type CategoryFilter = Category | 'all'

export function byCategory(products: Product[], filter: CategoryFilter): Product[] {
  if (filter === 'all') return [...products]
  return products.filter((product) => product.category === filter)
}

export function sortByPrice(products: Product[], direction: 'asc' | 'desc' = 'asc'): Product[] {
  const sorted = [...products].sort((a, b) => a.pricePence - b.pricePence)
  return direction === 'asc' ? sorted : sorted.reverse()
}

export function categoriesOf(products: Product[]): Category[] {
  return [...new Set(products.map((product) => product.category))].sort()
}
