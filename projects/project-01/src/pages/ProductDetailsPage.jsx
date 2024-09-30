import { useParams } from 'react-router-dom'
import { products } from '../mocks/products.json'
import { Container, Row, Col, Button, Dropdown, DropdownButton } from 'react-bootstrap'
import { InstagramIcon, FacebookIcon, TiktokIcon, PinterestIcon } from '../assets/Icons'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../css/productDetailsPage.css'

export default function ProductDetailsPage() {
  const { gender, productType, productId } = useParams()
  const product = products.find(p => p.id === +productId)

  if (!product) {
    return <p>Product not found</p>
  }

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
                  className="thumbnail-image"
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
            {gender.charAt(0).toUpperCase() + gender.slice(1)} | {productType.charAt(0).toUpperCase() + productType.slice(1)}
          </p>
          <h1 className="product-details-title">{title}</h1>
          <div className="product-color">
            <p>Color:</p>
            <div className="color-circle" style={{ backgroundColor: colors[0] }}></div>
          </div>
          <div className="product-details-size">
            <p>Size</p>
            <DropdownButton id="dropdown-basic-button" title="S" className="w-100 text-start">
              <Dropdown.Item href="#/action-1">S</Dropdown.Item>
              <Dropdown.Item href="#/action-2">M</Dropdown.Item>
              <Dropdown.Item href="#/action-3">L</Dropdown.Item>
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
            <a href='' style={{ color: 'rgb(85, 85, 85)'}} >Contact Us</a>
          </div>
        </Col>
      </Row>
    </Container>
  )
}
