import { Container, Row, Col, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

const cardStyle = {
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  margin: '0 auto',
  maxWidth: '500px'
}

const imageStyle = {
  height: '600px',
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
          <Col key={product.id}>
            <Link to={`/products/${product.id}`} className="text-decoration-none">
              <Card style={cardStyle}>
                <Card.Img
                  variant="top"
                  src={product.images[0]}
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
        ))}
      </Row>
    </Container>
  )
}