import request from 'supertest'
import { createTestApp } from '../../servers/fs-test-server'
import jwt from 'jsonwebtoken'

const app = createTestApp()

const generateToken = (userId = 'test-user-id') => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1h' })
}

//* Cart Routes
describe('Users Cart Routes', () => {
  const userID = "c26ff231-b599-4de1-ba3f-303fcc5bd824"
  const token = generateToken(userID)

  it('GET /carts should return the user cart', async () => {

    const res = await request(app)
      .get('/carts')
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(200)

    expect(res.body).toHaveProperty('cart')
  })

  it('POST /carts should add a product to the user cart', async () => {
    const product = {
      productId: "1",
      quantity: 1,
      size: "M",
      color: "black"
    }

    const res = await request(app)
      .post('/carts')
      .set('Authorization', `Bearer ${token}`)
      .send(product)
      .expect('Content-Type', /json/)
      .expect(201)

    const addedProduct = res.body.cart.find(item =>
      item.productId === product.productId &&
      item.size === product.size &&
      item.color === product.color
    )

    expect(res.body).toHaveProperty('message', 'Product added to cart')
    expect(addedProduct.size).toBe(product.size);
    expect(addedProduct.color).toBe(product.color);
  })

  it('PUT /carts should update a product in the user cart', async () => {

    const key = {
      productId: "1",
      size: "M",
      color: "black",
    }

    const updates = {
      quantity: 10,
      size: "XL",
    }

    const res = await request(app)
      .put(`/carts/${key.productId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ key, updates })
      .expect('Content-Type', /json/)
      .expect(200)

    expect(res.body).toHaveProperty('message', 'Cart item updated')
    expect(res.body).toHaveProperty('cart')
  })

  it('DELETE /carts should remove a product from the user cart', async () => {
    const key = {
      productId: "1",
      size: "XL",
      color: "black",
    }

    const res = await request(app)
      .delete(`/carts/${key.productId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ key })
      .expect('Content-Type', /json/)
      .expect(200)

    expect(res.body).toHaveProperty('message', 'Product removed from cart')
  })


  it('POST /carts should return 404 if product does not exist', async () => {
    const product = {
      productId: "999",
      quantity: 1,
      size: "M",
      color: "black"
    }

    const res = await request(app)
      .post('/carts')
      .set('Authorization', `Bearer ${token}`)
      .send({ userId: userID, ...product })
      .expect('Content-Type', /json/)
      .expect(404)

    expect(res.body).toHaveProperty('message', 'User cart or product not found in store')
  })

  it('POST /carts should return 404 if user does not exist', async () => {
    const userID = "999"
    const product = {
      productId: "1",
      quantity: 1,
      size: "M",
      color: "black"
    }

    const res = await request(app)
      .post('/carts')
      .set('Authorization', `Bearer ${token}`)
      .send({ userId: userID, ...product })
      .expect('Content-Type', /json/)
      .expect(404)

    expect(res.body).toHaveProperty('message', 'User cart or product not found in store')
  })

  it('PUT /carts should return 404 if product does not exist', async () => {
    const key = {
      productId: "1",
      size: "M",
      color: "black",
    }

    const updates = {
      quantity: 10,
      size: "XL",
    }

    const res = await request(app)
      .put(`/carts/${key.productId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ key, updates })
      .expect('Content-Type', /json/)
      .expect(404)
    expect(res.body).toHaveProperty('message', 'User cart or product not found')
  })

  it('GET /carts should return 401 if no token is provided', async () => {
    const res = await request(app)
      .get('/carts')
      .expect('Content-Type', /json/)
      .expect(401)

    expect(res.body).toHaveProperty('message', 'Unauthorized')
  })

  it('DELETE /carts should clean the user cart', async () => {
    const res = await request(app)
      .delete('/carts')
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(200)

    expect(res.body).toHaveProperty('message', 'Cart has been cleaned')
    expect(res.body).toHaveProperty('cart')
    expect(res.body.cart.length).toBe(0)
  })
})