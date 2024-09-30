import { useParams } from 'react-router-dom'
import { products } from '../mocks/products.json'
import ProductsGrid from '../components/ProductsGrid'
import NotProductFound from '../components/NoProductFound'
import NoFoundPage from './NoFoundPage'
import '../css/productsPage.css'

const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1)

const validGenders = ['men', 'women']
const validProductTypes = ['clothing', 'footwear', 'accessories']

export default function ProductsPage() {
  const { gender, productType } = useParams()

  if (!validGenders.includes(gender) || !validProductTypes.includes(productType)) {
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