import { Container, Row, Col, Card } from 'react-bootstrap'

export function ProductsGrid({ products }) {
  return (
    <Container>
      <Row>
        {products.map((product) => (
          <Col key={product.id}>
            <Card>
              <Card.Body>
                <Card.Title>{product.title}</Card.Title>
                <Card.Text>${product.price.toFixed(2)}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  )
}