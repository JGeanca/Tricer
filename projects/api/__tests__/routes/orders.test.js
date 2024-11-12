import request from 'supertest'
// import { createTestApp } from '../../servers/fs-test-server'
import { createTestApp } from '../../servers/db-test-server'
import jwt from 'jsonwebtoken'

const app = createTestApp()

const generateToken = (userId = 'test-user-id') => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1h' })
}

describe('Orders Routes', () => {
  const userID = "9649a6c5-9f82-11ef-a417-e0d55e430678"
  const token = generateToken(userID)

  // it('POST /orders should create an order', async () => {

  //   const res = await request(app)
  //     .post('/orders')
  //     .set('Authorization', `Bearer ${token}`)
  //     .expect('Content-Type', /json/)
  //     .expect(201)

  //   expect(res.body).toHaveProperty('message', 'Order created')
  //   expect(res.body).toHaveProperty('order')
  // })

  it('GET /orders should return the user orders', async () => {

    const res = await request(app)
      .get('/orders')
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(200)

    expect(res.body).toHaveProperty('orders')
  })

  it('GET /orders/:id should return the order details', async () => {

    const res = await request(app)
      .get('/orders/ed52cfc3-a130-11ef-b674-e0d55e430678')
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(200)

    expect(res.body).toHaveProperty('order')
    expect(res.body.order).toHaveProperty('orderId')
    expect(res.body.order).toHaveProperty('totalAmount')
    expect(res.body.order).toHaveProperty('status')
    expect(res.body.order).toHaveProperty('createdAt')
    expect(res.body.order).toHaveProperty('items')
  })


  // it('POST /orders should return 409 if there is insufficient stock', async () => {

  //   const res = await request(app)
  //     .post('/orders')
  //     .set('Authorization', `Bearer ${token}`)
  //     .expect('Content-Type', /json/)
  //     .expect(409)

  //   expect(res.body).toHaveProperty('message', 'Insufficient stock for one or more products')
  // })

  // it('GET /orders should return 404 if no orders are found', async () => {

  //   const res = await request(app)
  //     .get('/orders')
  //     .set('Authorization', `Bearer ${token}`)
  //     .expect('Content-Type', /json/)
  //     .expect(404)

  //   expect(res.body).toHaveProperty('message', 'No orders found')
  // })

  it('GET /orders should return unauthorized if no token is provided', async () => {

    const res = await request(app)
      .get('/orders')
      .expect('Content-Type', /json/)
      .expect(401)

    expect(res.body).toHaveProperty('message', 'Unauthorized')
  })








})
