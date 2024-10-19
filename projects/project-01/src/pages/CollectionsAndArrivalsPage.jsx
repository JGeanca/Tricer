import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import NoFoundPage from './NoFoundPage'
import { categories } from '../mocks/categories.json'
import { useProducts } from '../hooks/useProducts'
import { HorizontalCarousel } from '../components/HorizontalCarousel'
import { ProductCard } from '../components/ProductCard'
import { VALID_GENDERS } from '../config'
import { Loading } from '../components/Loading'
import '../css/collectionsAndArrivals.css'

export default function CollectionsAndArrivalsPage() {
  const { gender } = useParams()
  const [itemsPerCarousel, setItemsPerCarousel] = useState(3)
  const { data: products, isError, isLoading } = useProducts(gender, null, true)

  //TODO: Fix this useEffect -> add the missing dependencies
  useEffect(() => {
    const updateItemsPerCarousel = () => {
      if (window.innerWidth <= 576) {
        setItemsPerCarousel(1)
      } else if (window.innerWidth <= 768) {
        setItemsPerCarousel(2)
      } else {
        setItemsPerCarousel(3)
      }
    }

    window.addEventListener('resize', updateItemsPerCarousel)
    updateItemsPerCarousel()

    return () => window.removeEventListener('resize', updateItemsPerCarousel)
  }, []) //TODO: <- Add the missing dependencies

  if (!VALID_GENDERS.includes(gender)) return <NoFoundPage />

  if (isLoading) return <Loading />

  if (isError) return <div>Error loading products</div>

  const filteredCategories = categories.filter(category =>
    category.gender === gender)

  return (
    <div>
      <div className="arrivals-section">
        <h1 className="page-title">Arrivals</h1>
        {
          products && products.length > 0 && (
            <HorizontalCarousel products={products}
              itemsPerCarousel={itemsPerCarousel} />
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
