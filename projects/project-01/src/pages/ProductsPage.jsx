import { useParams } from 'react-router-dom'
import { VALID_GENDERS, VALID_PRODUCT_TYPES } from '../config'
import { capitalize } from '../utils/utils.js'
import NoFoundPage from './NoFoundPage'
import NotProductFound from '../components/NoProductFound'
import ProductsGrid from '../components/ProductsGrid'
import { useProducts } from '../hooks/useProducts'
import { Loading } from '../components/Loading'
import '../css/productsPage.css'

export default function ProductsPage() {
  const { gender, productType } = useParams()
  const { data: products, isLoading, isError } = useProducts(gender, productType)

  if (!VALID_GENDERS.includes(gender) || !VALID_PRODUCT_TYPES.includes(productType)) {
    return <NoFoundPage />
  }

  if (isLoading) return <Loading />

  if (isError) return <div>Error loading products</div>

  if (!products || products.length === 0) return <NotProductFound />

  return (
    <div className='products-container'>
      <h3>{`${capitalize(productType)}`} </h3>
      <ProductsGrid products={products} />
    </div>
  )
}