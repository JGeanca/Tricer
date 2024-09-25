import { Container, Row, Col, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useState } from 'react'

const cardStyle = {
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  margin: '0 auto',
  maxWidth: '450px',
}

const imageStyle = {
  height: 'auto',
  width: '100%',
  objectFit: 'cover'
}

const footerStyle = {
  marginTop: 'auto'
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

  const handleMouseEnter = () => {
    if (product.images.length > 1) {
      setImageIndex(1)
    }
  }

  const handleMouseLeave = () => {
    setImageIndex(0)
  }

  return (
    <Col key={product.id}>
      <Link to={`/${product.gender}/${product.type}/${product.id}`} className="text-decoration-none">
        <Card
          style={cardStyle}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <Card.Img
            variant="top"
            src={product.images[imageIndex]}
            style={imageStyle}
            alt={product.title}
          />
          <Card.Body className="d-flex flex-column">
            <Card.Title className='text-center'>{product.title}</Card.Title>
            <Card.Text className='text-center' style={footerStyle}>${product.price.toFixed(2)}</Card.Text>
          </Card.Body>
        </Card>
      </Link>
    </Col>
  )
}