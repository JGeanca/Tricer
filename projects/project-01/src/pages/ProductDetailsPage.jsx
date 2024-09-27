import { useParams } from 'react-router-dom'
import { products } from '../mocks/products.json'
import { Container, Row, Col } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../css/productDetailsPage.css'

export default function ProductDetailsPage() {
  const { productId } = useParams()
  const product = products.find(p => p.id === parseInt(productId))

  return (
    <Container fluid className="product-details-container">
      <Row className="product-details-row">
        <Col xs={12} md={5} className="product-images-column">
          <div className="product-images-wrapper">
            <div className="product-thumbnails">
              {product.images.map((image, index) => (
                <img
                  key={index}
                  className="thumbnail-image"
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                />
              ))}
            </div>
            <div className="product-main-image">
              <img src={product.images[0]} alt="Main product" />
            </div>
          </div>
        </Col>

        <Col xs={12} md={3} className="product-details-column">
          <h1>{product.title}</h1>
          <p>Precio: ${product.price.toFixed(2)}</p>
          <p>Colores: {product.colors.join(', ')}</p>
          <p>Tallas disponibles: {product.sizes.join(', ')}</p>
        </Col>
      </Row>
    </Container>
  )
}
