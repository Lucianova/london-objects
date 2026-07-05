export type Category = 'ceramics' | 'lighting' | 'textiles'

export interface Product {
  name: string
  category: Category
  pricePence: number
  description: string
  hue: number
}

export const products: Product[] = [
  {
    name: 'Columbia Road Vase',
    category: 'ceramics',
    pricePence: 4800,
    description: 'Hand-thrown stoneware with a milk glaze. Holds one dramatic branch.',
    hue: 24,
  },
  {
    name: 'Hackney Table Lamp',
    category: 'lighting',
    pricePence: 12500,
    description: 'Turned ash base, paper shade. Warm light for long evenings.',
    hue: 42,
  },
  {
    name: 'Marylebone Linen Cushion',
    category: 'textiles',
    pricePence: 3900,
    description: 'Washed Irish linen in oat. Feather pad included.',
    hue: 78,
  },
  {
    name: 'Peckham Candle Pair',
    category: 'ceramics',
    pricePence: 1800,
    description: 'Two dinner candles in burnt orange, dipped by hand.',
    hue: 12,
  },
  {
    name: 'Soho Wall Sconce',
    category: 'lighting',
    pricePence: 9200,
    description: 'Brushed brass, plug-in. No electrician required.',
    hue: 48,
  },
  {
    name: 'Brixton Market Throw',
    category: 'textiles',
    pricePence: 7400,
    description: 'Recycled wool in a mustard check. Generously oversized.',
    hue: 36,
  },
  {
    name: 'Barbican Bookend Set',
    category: 'ceramics',
    pricePence: 5600,
    description: 'Cast concrete arches, a small homage to the estate.',
    hue: 210,
  },
  {
    name: 'Shoreditch Plant Pot',
    category: 'ceramics',
    pricePence: 3200,
    description: 'Speckled terracotta with a matte dip glaze. Drainage hole included.',
    hue: 18,
  },
  {
    name: 'Portobello Rattan Shade',
    category: 'lighting',
    pricePence: 6800,
    description: 'Woven pendant shade that throws lovely striped shadows.',
    hue: 32,
  },
]
