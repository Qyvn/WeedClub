export type Channel = 'b2c' | 'b2b' | 'both'

export type Product = {
  id: string
  name: string
  strain: string
  category: 'Flower' | 'Oils' | 'Edibles' | 'Accessories' | 'Bulk'
  thc: string
  cbd: string
  priceZar: number
  wholesaleZar?: number
  unit: string
  minOrder?: number
  channel: Channel
  origin: string
  description: string
  tags: string[]
  hue: string
}

export const products: Product[] = [
  {
    id: 'cape-haze',
    name: 'Cape Haze',
    strain: 'Sativa-leaning hybrid',
    category: 'Flower',
    thc: '18–22%',
    cbd: '<1%',
    priceZar: 420,
    wholesaleZar: 280,
    unit: '3.5g',
    minOrder: 50,
    channel: 'both',
    origin: 'Western Cape',
    description:
      'Bright citrus and Cape herbal notes. Daytime clarity grown under local sun.',
    tags: ['Daytime', 'Citrus', 'Local'],
    hue: '#3d6b45',
  },
  {
    id: 'karoo-kush',
    name: 'Karoo Kush',
    strain: 'Indica-dominant',
    category: 'Flower',
    thc: '20–24%',
    cbd: '<1%',
    priceZar: 450,
    wholesaleZar: 300,
    unit: '3.5g',
    minOrder: 40,
    channel: 'both',
    origin: 'Northern Cape',
    description:
      'Earthy spice with a soft finish. Evening wind-down from arid highland grows.',
    tags: ['Evening', 'Earthy', 'Relax'],
    hue: '#5a4634',
  },
  {
    id: 'protea-oil',
    name: 'Protea Full Spectrum Oil',
    strain: 'Balanced 1:1',
    category: 'Oils',
    thc: '10mg/ml',
    cbd: '10mg/ml',
    priceZar: 680,
    wholesaleZar: 420,
    unit: '30ml',
    minOrder: 24,
    channel: 'both',
    origin: 'Gauteng lab',
    description:
      'Measured drops for steady wellness routines. Third-party tested batch by batch.',
    tags: ['Balanced', 'Daily', 'Lab-tested'],
    hue: '#8a6b2a',
  },
  {
    id: 'baobab-bites',
    name: 'Baobab Honey Bites',
    strain: 'Hybrid microdose',
    category: 'Edibles',
    thc: '5mg / piece',
    cbd: '2mg / piece',
    priceZar: 280,
    wholesaleZar: 165,
    unit: '10 pcs',
    minOrder: 60,
    channel: 'both',
    origin: 'KwaZulu-Natal',
    description:
      'Soft honey caramels with baobab tang. Easy dosing for newcomers and hosts.',
    tags: ['Microdose', 'Social', 'Sweet'],
    hue: '#a67c3a',
  },
  {
    id: 'veld-vapor',
    name: 'Veld Ceramic Cart',
    strain: 'Live resin',
    category: 'Accessories',
    thc: '75–82%',
    cbd: '<1%',
    priceZar: 650,
    wholesaleZar: 390,
    unit: '1g cart',
    minOrder: 30,
    channel: 'both',
    origin: 'Johannesburg',
    description:
      'Ceramic hardware, pine-and-guava profile. Discrete and travel-ready.',
    tags: ['Portable', 'Premium', 'Resin'],
    hue: '#2f4a3c',
  },
  {
    id: 'bulk-greenhouse',
    name: 'Greenhouse Trim Lot',
    strain: 'Mixed cultivar',
    category: 'Bulk',
    thc: '12–16%',
    cbd: '1–3%',
    priceZar: 0,
    wholesaleZar: 45,
    unit: 'per gram',
    minOrder: 5000,
    channel: 'b2b',
    origin: 'Limpopo',
    description:
      'Extraction-ready greenhouse trim for licensed processors and manufacturers.',
    tags: ['Extraction', 'Volume', 'B2B'],
    hue: '#4a5d3a',
  },
  {
    id: 'rooibos-relief',
    name: 'Rooibos CBD Softgels',
    strain: 'CBD isolate blend',
    category: 'Oils',
    thc: '0%',
    cbd: '25mg / softgel',
    priceZar: 520,
    wholesaleZar: 310,
    unit: '30 softgels',
    minOrder: 36,
    channel: 'both',
    origin: 'Cederberg',
    description:
      'CBD softgels with rooibos extract. Calm focus without intoxication.',
    tags: ['CBD', 'Non-intoxicating', 'Travel'],
    hue: '#6b3f2a',
  },
  {
    id: 'table-mountain',
    name: 'Table Mountain OG',
    strain: 'Classic hybrid',
    category: 'Flower',
    thc: '19–23%',
    cbd: '<1%',
    priceZar: 480,
    wholesaleZar: 320,
    unit: '3.5g',
    minOrder: 40,
    channel: 'both',
    origin: 'Cape Town',
    description:
      'Dense buds with pine resin and a coastal breeze finish. Member favourite.',
    tags: ['Flagship', 'Resinous', 'Hybrid'],
    hue: '#24543a',
  },
]

export const memberships = [
  {
    id: 'leaf',
    name: 'Leaf',
    priceMonthly: 149,
    priceYearly: 1490,
    tagline: 'Entry access for curious locals.',
    perks: [
      '5% off all B2C orders',
      'Free delivery over R800',
      'Early drops on new flower',
      'Member-only education sessions',
    ],
  },
  {
    id: 'protea',
    name: 'Protea',
    priceMonthly: 299,
    priceYearly: 2990,
    tagline: 'Best for regular shoppers across SA.',
    perks: [
      '12% off B2C + priority packing',
      'Free delivery nationwide*',
      'Monthly house strain sample',
      'Guest passes for tasting nights',
      'Birthday credit of R250',
    ],
    featured: true,
  },
  {
    id: 'baobab',
    name: 'Baobab',
    priceMonthly: 799,
    priceYearly: 7990,
    tagline: 'Concierge retail + wholesale privileges.',
    perks: [
      '18% off retail, 5% extra on wholesale',
      'Dedicated buyer WhatsApp line',
      'Quarterly private tasting',
      'Same-day Cape Town metro slots',
      'Invite to grower farm tours',
    ],
  },
] as const

export const hubs = [
  { city: 'Cape Town', detail: 'Flagship dispensary · Gardens' },
  { city: 'Johannesburg', detail: 'Retail + B2B desk · Sandton' },
  { city: 'Durban', detail: 'Click & collect · Umhlanga' },
  { city: 'Pretoria', detail: 'Member lounge · Brooklyn' },
]
