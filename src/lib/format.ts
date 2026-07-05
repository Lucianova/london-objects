const gbp = new Intl.NumberFormat('en-GB', {
  style: 'currency',
  currency: 'GBP',
})

export function formatPrice(pence: number): string {
  if (!Number.isInteger(pence) || pence < 0) {
    throw new Error(`Price must be a non-negative whole number of pence, got: ${pence}`)
  }
  return gbp.format(pence / 100)
}

export function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}
