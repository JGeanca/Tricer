import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { Container, Row, Col, Button, Dropdown, DropdownButton } from 'react-bootstrap'
import { InstagramIcon, FacebookIcon, TiktokIcon, PinterestIcon } from '../assets/Icons'
import { capitalize } from '../utils/utils'
import { useProduct } from '../hooks/useProducts'
import { Loading } from '../components/Loading'

import NoProductsFound from '../components/NoProductFound'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../css/productDetailsPage.css'

export default function ProductDetailsPage() {
  const { gender, productType, productId } = useParams()
  const { data: product, isError, isLoading } = useProduct(productId)

  if (isLoading) {
    return <Loading />
  }

  if (isError) {
    return <div>Error loading product</div>
  }

  if (!product || product.length === 0) return <NoProductsFound />

  const { title, colors, images, price } = product

  return (
    <Container fluid className="product-details-container">
      <Row className="product-details-row">
        <Col xs={12} md={5} className="product-images-column">
          <div className="product-images-wrapper">
            <div className="product-thumbnails">
              {images.map((image, index) => (
                <img
                  key={index}
                  className={`thumbnail-image ${index === 0 ? 'selected' : ''}`}
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                />
              ))}
            </div>
            <div className="product-main-image">
              <img src={images[0]} alt="Main product" />
            </div>
          </div>
        </Col>

        <Col xs={12} md={3} className="product-details-column">
          <p className="gender-and-product-type">
            {capitalize(gender)} | {capitalize(productType)}
          </p>
          <h1 className="product-details-title">{title}</h1>
          <div className="product-color">
            <p>Color:</p>
            <div className="color-circle" style={{ backgroundColor: colors[0] }}></div>
          </div>
          <div className="product-details-size">
            <p>Size</p>
            <DropdownButton id="dropdown-basic-button" title="S" className="w-100 text-start">
              <Dropdown.Item href="#/S" className="custom-dropdown-item">S</Dropdown.Item>
              <Dropdown.Item href="#/N" className="custom-dropdown-item">M</Dropdown.Item>
              <Dropdown.Item href="#/L" className="custom-dropdown-item">L</Dropdown.Item>
              <Dropdown.Item href="#/XL" className="custom-dropdown-item">XL</Dropdown.Item>
            </DropdownButton>
          </div>
          <div className="product-details-quantity">
            <p>Quantity</p>
            <div className="quantity">
              <span className="quantity-value">1</span>
              <div className="quantity-buttons">
                <Button variant="outline-secondary" className="btn-increase">+</Button>
                <Button variant="outline-secondary" className="btn-decrease">-</Button>
              </div>
            </div>
          </div>
          <p className="product-details-price">${price}</p>
          <Button className="add-to-basket w-100" size="lg">
            ADD TO BASKET
          </Button>
          <div className="product-share-and-contact">
            <div className="product-details-social">
              <p>Share</p>
              <a href='https://es.pinterest.com/' target='_blank' rel='noopener noreferrer' aria-label="Share on Pinterest">
                <PinterestIcon width={20} height={20} />
              </a>
              <a href='https://www.instagram.com/' target='_blank' rel='noopener noreferrer' aria-label="Share on Instagram">
                <InstagramIcon width={20} height={20} />
              </a>
              <a href='https://www.facebook.com/' target='_blank' rel='noopener noreferrer' aria-label="Share on Facebook">
                <FacebookIcon width={20} height={20} />
              </a>
              <a href='https://www.tiktok.com/' target='_blank' rel='noopener noreferrer' aria-label="Share on TikTok">
                <TiktokIcon width={20} height={20} />
              </a>
            </div>
            <Link to="/contact-us" style={{ color: 'rgb(85, 85, 85)' }}>Contact Us</Link>
          </div>
        </Col>
      </Row>
    </Container>
  )
}
