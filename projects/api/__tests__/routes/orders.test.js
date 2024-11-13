import request from 'supertest'
import { createTestApp } from '../../servers/db-test-server'
import {
  setupTestDB,
  tearDownTestDB,
  setupCart,
  cleanupOrderAndCart,
  setStock,
  setupCartWithQuantity
} from '../setup.js'
import jwt from 'jsonwebtoken'

const app = createTestApp()

const generateToken = (userId = 'test-user-id') => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1h' })
}

describe('Orders Routes', () => {
  const userID = "9649a6c5-9f82-11ef-a417-e0d55e430678"
  const token = generateToken(userID)
  let createdOrderId = null

  beforeAll(async () => {
    await setupTestDB()
    await setStock(10)
  })

  it('GET /orders should return unauthorized if no token is provided', async () => {
    const res = await request(app)
      .get('/orders')
      .expect('Content-Type', /json/)
      .expect(401)

    expect(res.body).toHaveProperty('message', 'Unauthorized')
  })

  it('GET /orders should return 404 if no orders are found', async () => {
    await setupTestDB()

    const res = await request(app)
      .get('/orders')
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(404)

    expect(res.body).toHaveProperty('message', 'No orders found')
  })

  describe('POST /orders', () => {
    beforeEach(async () => {
      await setupCart(userID)
    })

    afterEach(async () => {
      await cleanupOrderAndCart(userID, createdOrderId)
      createdOrderId = null
    })

    it('POST /orders should create an order', async () => {
      const res = await request(app)
        .post('/orders')
        .set('Authorization', `Bearer ${token}`)
        .expect('Content-Type', /json/)
        .expect(201)

      expect(res.body).toHaveProperty('message', 'Order created successfully')
      expect(res.body).toHaveProperty('order')
      expect(res.body.order).toHaveProperty('orderId')
      createdOrderId = res.body.order.id

    })
  })

  it('GET /orders/:id should return the order details', async () => {
    await setupCart(userID)
    const createRes = await request(app)
      .post('/orders')
      .set('Authorization', `Bearer ${token}`)

    createdOrderId = createRes.body.order.orderId

    const res = await request(app)
      .get(`/orders/${createdOrderId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(200)

    expect(res.body).toHaveProperty('order')
    expect(res.body.order).toHaveProperty('orderId')
    expect(res.body.order).toHaveProperty('totalAmount')
    expect(res.body.order).toHaveProperty('status')
    expect(res.body.order).toHaveProperty('createdAt')
    expect(res.body.order).toHaveProperty('items')

    await cleanupOrderAndCart(userID, createdOrderId)
    createdOrderId = null
  })


  it('POST /orders should return 409 if there is insufficient stock', async () => {
    await setStock(1)  // Set low stock
    await setupCartWithQuantity(userID, 2)

    const res = await request(app)
      .post('/orders')
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(409)

    expect(res.body).toHaveProperty('message', 'Insufficient stock for one or more products')

    await cleanupOrderAndCart(userID, null)
    await setStock(10)  // Restore stock
  })

  afterAll(async () => {
    await tearDownTestDB()
    await setStock(10)  // Restore stock
  })
})