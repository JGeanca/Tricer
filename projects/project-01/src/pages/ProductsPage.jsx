import { products as clothes } from '../mocks/products.json'
import { ProductsGrid } from '../components/ProductsGrid'
import '../css/productsPage.css'

export default function ProductsPage() {
  return (
    <div className='products-container'>
      <h3>Clothes</h3>
      <ProductsGrid products={clothes} />
      <ProductsGrid products={clothes} />
    </div>
  )
}