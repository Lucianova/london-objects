import { formatPrice, slugify } from './format'

test.each([
  [0, '£0.00'],
  [999, '£9.99'],
  [4800, '£48.00'],
  [125000, '£1,250.00'],
])('formatPrice with %i pence', (pence, expected) => {
  expect(formatPrice(pence)).toBe(expected)
})

test('formatPrice with a negative amount', () => {
  expect(() => formatPrice(-100)).toThrow('non-negative whole number')
})

test('formatPrice with fractional pence', () => {
  expect(() => formatPrice(99.5)).toThrow('non-negative whole number')
})

test.each([
  ['Columbia Road Vase', 'columbia-road-vase'],
  ['  Hackney   Table Lamp  ', 'hackney-table-lamp'],
  ["Peckham's Candle Pair!", 'peckham-s-candle-pair'],
  ['already-a-slug', 'already-a-slug'],
  ['', ''],
])('slugify with %j', (input, expected) => {
  expect(slugify(input)).toBe(expected)
})
