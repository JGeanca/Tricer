import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { Container, Row, Col, Button, Dropdown, DropdownButton } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import { InstagramIcon, FacebookIcon, TiktokIcon, PinterestIcon } from '../assets/Icons'
import { capitalize } from '../utils/utils'
import { useProduct, useProductStock } from '../hooks/useProducts'
import { Loading } from '../components/Loading'
import useCartStore from '../stores/cartStore'
import { useFeedback } from '../hooks/useFeedback'

import NoProductsFound from '../components/NoProductFound'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../css/productDetailsPage.css'

export default function ProductDetailsPage() {
  const { gender, productType, productId } = useParams()
  const { data: product, isError: isProductError, isLoading: isProductLoading } = useProduct(productId)
  const { data: productStock } = useProductStock(productId)

  const [quantity, setQuantity] = useState(1)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [selectedColor, setSelectedColor] = useState('')
  const [selectedSize, setSelectedSize] = useState('')
  const [autoSelectSize, setAutoSelectSize] = useState(true)

  const { addToCart } = useCartStore()
  const { showError, showSuccess } = useFeedback()

  const availableSizes = productStock?.inventory
    ?.filter(item => item.color === selectedColor && item.stock > 0)
    .map(item => item.size)
    .filter((size, index, self) => self.indexOf(size) === index)

  const availableStock = productStock?.inventory
    ?.find(item => item.color === selectedColor && item.size === selectedSize)?.stock || 1

  useEffect(() => {
    if (product?.colors?.length > 0 && !selectedColor) {
      setSelectedColor(product.colors[0])
    }
  }, [product, selectedColor])

  useEffect(() => {
    if (autoSelectSize && availableSizes?.length > 0) {
      setSelectedSize(availableSizes[0])
    } else if (availableSizes?.length === 0) {
      setSelectedSize('')
    }
  }, [selectedColor, availableSizes, autoSelectSize])

  useEffect(() => {
    if (quantity > availableStock) {
      setQuantity(availableStock)
    }
  }, [availableStock, quantity])

  const handleSizeChange = (size) => {
    setSelectedSize(size)
    setAutoSelectSize(false)
  }

  const handleColorChange = (color) => {
    setSelectedColor(color)
    setAutoSelectSize(true)
  }

  const handleSuccessMessage = async () => {
    try {
      showSuccess('Product added successfully')
    } catch (error) {
      console.error('Error in adding product:', error.message)
      showError('Failed to add product')
    }
  }

  const handleAddToCart = async (itemId, quantity, size, color) => {
    try {
      await addToCart({
        productId: itemId,
        size,
        color,
        quantity,
      })
      handleSuccessMessage()
    } catch (error) {
      console.error('Error adding product to cart:', error)
      showError('Failed to add product to cart')
    }
  }

  if (isProductLoading) {
    return <Loading />
  }

  if (isProductError) {
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
                  className={`thumbnail-image ${index === selectedImageIndex ? 'selected' : ''}`}
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  onClick={() => setSelectedImageIndex(index)}
                />
              ))}
            </div>
            <div className="product-main-image">
              <img src={images[selectedImageIndex]} alt="Main product" />
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
            <div className="product-colors">
              {colors.map((color, index) => (
                <div
                  key={index}
                  className={`color-circle ${color === selectedColor ? 'selected' : ''}`}
                  style={{ backgroundColor: color }}
                  onClick={() => handleColorChange(color)}
                ></div>
              ))}
            </div>
          </div>
          <div className="product-details-size">
            <p>Size</p>
            <DropdownButton
              id="dropdown-basic-button"
              title={selectedSize || 'No size available'}
              className="w-100 text-start"
            >
              {availableSizes?.map(size => (
                <Dropdown.Item
                  key={size}
                  onClick={() => handleSizeChange(size)}
                  className="custom-dropdown-item"
                >
                  {size}
                </Dropdown.Item>
              ))}
            </DropdownButton>
          </div>
          <div className="product-details-quantity">
            <p>Quantity</p>
            <div className="quantity">
              <span className="quantity-value">{quantity}</span>
              <div className="quantity-buttons">
                <Button
                  variant="outline-secondary"
                  className="btn-increase"
                  onClick={() => setQuantity(prev => Math.min(prev + 1, availableStock))}
                  disabled={quantity >= availableStock}
                >
                  +
                </Button>
                <Button
                  variant="outline-secondary"
                  className="btn-decrease"
                  onClick={() => setQuantity(prev => Math.max(prev - 1, 1))}
                  disabled={quantity <= 1}
                >
                  -
                </Button>
              </div>
            </div>
          </div>
          <p className="product-details-price">${price}</p>
          <Button
            className="add-to-basket w-100"
            size="lg"
            onClick={() => handleAddToCart(productId, quantity, selectedSize, selectedColor)}
          >
            ADD TO BASKET
          </Button>
          <div className="product-share-and-contact">
            <div className="product-details-social">
              <p>Share</p>
              <a
                href="https://es.pinterest.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Share on Pinterest"
              >
                <PinterestIcon width={20} height={20} />
              </a>
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Share on Instagram"
              >
                <InstagramIcon width={20} height={20} />
              </a>
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Share on Facebook"
              >
                <FacebookIcon width={20} height={20} />
              </a>
              <a
                href="https://www.tiktok.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Share on TikTok"
              >
                <TiktokIcon width={20} height={20} />
              </a>
            </div>
            <Link to="/contact-us" style={{ color: 'rgb(85, 85, 85)' }}>
              Contact Us
            </Link>
          </div>
        </Col>
      </Row>
    </Container>
  )
}
