import { products, type Product } from './data/products'
import { byCategory, categoriesOf, type CategoryFilter } from './lib/catalogue'
import { formatPrice, slugify } from './lib/format'

function productCard(product: Product): string {
  return `
    <li class="card" id="${slugify(product.name)}">
      <div class="card__tile" style="--hue: ${product.hue}">
        <img class="card__img" src="/products/${slugify(product.name)}.svg" alt="" loading="lazy" />
      </div>
      <h2>${product.name}</h2>
      <div class="card__meta">
        <span class="card__category">${product.category}</span>
        <span class="card__price">${formatPrice(product.pricePence)}</span>
      </div>
      <p>${product.description}</p>
    </li>
  `
}

function filterButton(filter: CategoryFilter, active: CategoryFilter): string {
  return `
    <button data-filter="${filter}" aria-pressed="${filter === active}">
      ${filter}
    </button>
  `
}

function render(root: HTMLElement, active: CategoryFilter): void {
  const filters: CategoryFilter[] = ['all', ...categoriesOf(products)]

  root.innerHTML = `
    <header class="masthead wrap">
      <div class="masthead__row">
        <span class="masthead__mark">London <span>Objects</span></span>
        <nav class="masthead__nav" aria-label="Pages">
          <a href="/" aria-current="page">Shop</a>
          <a href="/contact.html">Contact</a>
        </nav>
      </div>
    </header>

    <section class="hero wrap">
      <h1>Well-made things for <em>lived-in</em> homes.</h1>
      <p>
        Ceramics, lighting and textiles, made or found around London.
        Small batches, honest materials, no beige-on-beige.
      </p>
    </section>

    <nav class="filters wrap" aria-label="Filter products by category">
      ${filters.map((filter) => filterButton(filter, active)).join('')}
    </nav>

    <main class="wrap">
      <ul class="grid">
        ${byCategory(products, active).map(productCard).join('')}
      </ul>
    </main>

    <footer class="footer wrap">
      <span>London Objects 2026 — a side project, lovingly overengineered.</span>
      <span>Columbia Road, London E2</span>
    </footer>
  `

  root.querySelectorAll<HTMLButtonElement>('.filters button').forEach((button) => {
    button.addEventListener('click', () => {
      render(root, button.dataset.filter as CategoryFilter)
    })
  })
}

const root = document.querySelector<HTMLElement>('#app')
if (!root) throw new Error('Missing #app root element')

render(root, 'all')
