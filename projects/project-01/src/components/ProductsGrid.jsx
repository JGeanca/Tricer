import { Container, Row, Col, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useState } from 'react'

const cardStyle = {
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  margin: '0 auto',
  maxWidth: '450px',
  boxShadow: '1px 4px 8px rgba(0, 0, 0, 0.3)',
  backgroundColor: 'white',
  borderRadius: '20px',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease'
}

const cardHoverStyle = {
  transform: 'scale(1.02)',
  boxShadow: '1px 4px 8px rgba(0, 0, 0, 0.6)'
}

const bodyStyle = {
  backgroundColor: 'white',
  borderTop: '1px solid #f0f0f0',
  borderRadius: '0 0 20px 20px'
}

const imageStyle = {
  height: 'auto',
  width: '100%',
  objectFit: 'cover',
  borderRadius: '20px 20px 0 0'
}

const footerStyle = {
  marginTop: 'auto',
  backgroundColor: 'white'

}

export default function ProductsGrid({ products }) {
  return (
    <Container fluid>
      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </Row>
    </Container >
  )
}

function ProductCard({ product }) {
  const [imageIndex, setImageIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseEnter = () => {
    if (product.images.length > 1) {
      setImageIndex(1)
    }
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setImageIndex(0)
    setIsHovered(false)
  }

  return (
    <Col key={product.id}>
      <Link to={`/${product.gender}/${product.type}/${product.id}`} className="text-decoration-none">
        <Card
          style={{
            ...cardStyle,
            ...(isHovered && cardHoverStyle)
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <Card.Img
            variant="top"
            src={product.images[imageIndex]}
            style={imageStyle}
            alt={product.title}
          />
          <Card.Body
            className="d-flex flex-column"
            style={bodyStyle}
          >
            <Card.Title className='text-center'>{product.title}</Card.Title>
            <Card.Text className='text-center' style={footerStyle}>${product.price.toFixed(2)}</Card.Text>
          </Card.Body>
        </Card>
      </Link>
    </Col>
  )
}