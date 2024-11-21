interface Product extends ProductAttribute {
  id: number,
  os: string,
  brand: string,
}

interface ProductAttribute {
  name: string,
  slug: string,
  stock: number,
  images?: string[],
  isNew: boolean,
  rating: number,
  reviews: number,
}

interface ProductOperatingSystem {
  id: number,
  name: string,
  slug: string,
}

type ProductFilter = Record<string, string[]>

type SaleValue = 'new' | 'best' | 'hot' | undefined

interface Stock {
  value: 'in-stock' | 'sold-out' | 'running-low',
  label: string,
}
