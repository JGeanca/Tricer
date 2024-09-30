import { useParams } from 'react-router-dom'
import NoFoundPage from './NoFoundPage'

import { products } from '../mocks/products.json'
import { categories } from '../mocks/categories.json'

import { HorizontalCarousel } from '../components/HorizontalCarousel'
import { ProductCard } from '../components/ProductCard'

import '../css/collectionsAndArrivals.css'

const validGenders = ['men', 'women']

export default function CollectionsAndArrivalsPage() {
  const { gender } = useParams()

  if (!validGenders.includes(gender)) return <NoFoundPage />

  const filteredProducts = products.filter(product =>
    product.gender === gender && product.new === true)

  const filteredCategories = categories.filter(category =>
    category.gender === gender)

  return (
    <div>
      <div className="arrivals-section">
        <h1 className="page-title">Arrivals</h1>
        {
          filteredProducts && filteredProducts.length > 0 && (
            <HorizontalCarousel products={filteredProducts}
              itemsPerCarousel={3} />
          )
        }
      </div>

      <div className="collections-section">
        <h1 className="page-title">Categories</h1>

        <div className="collections-cards">
          {filteredCategories.map((category, index) => (
            <ProductCard key={index} product={category} />
          ))}
        </div>
      </div>
    </div>
  )
}
