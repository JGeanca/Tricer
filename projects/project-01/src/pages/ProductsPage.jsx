import { useParams } from 'react-router-dom'
import { products } from '../mocks/products.json'
import ProductsGrid from '../components/ProductsGrid'
import NotProductFound from '../components/NoProductFound'
import NoFoundPage from './NoFoundPage'
import '../css/productsPage.css'
import { VALID_GENDERS, VALID_PRODUCT_TYPES } from '../config'
import { capitalize } from '../utils/utils.js'

export default function ProductsPage() {
  const { gender, productType } = useParams()

  if (!VALID_GENDERS.includes(gender) || !VALID_PRODUCT_TYPES.includes(productType)) {
    return <NoFoundPage />
  }

  const filteredProducts = products.filter(product =>
    product.gender === gender && product.type === productType
  )

  return (
    <div className='products-container'>
      <h3>{`${capitalize(productType)}`} </h3>
      {
        filteredProducts && filteredProducts.length > 0 ? (
          <ProductsGrid products={filteredProducts} />
        ) : (
          <NotProductFound />
        )
      }
    </div>
  )
}