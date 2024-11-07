import request from 'supertest'
import { createTestApp } from '../../servers/fs-test-server'
import jwt from 'jsonwebtoken'

const app = createTestApp()

const generateToken = (userId = 'test-user-id') => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1h' })
}

//* Auth Routes
describe('Users Auth Routes', () => {

  it('POST /users/login should authenticate a valid user by username', async () => {
    const userCredentials = {
      credential: 'testUser',
      password: 'testPassword123'
    }

    const res = await request(app)
      .post('/users/login')
      .send(userCredentials)
      .expect('Content-Type', /json/)
      .expect(200)

    expect(res.body).toHaveProperty('message', 'Login successful')
    expect(res.body).toHaveProperty('token')

  })

  it('POST /users/login should authenticate a valid user by email', async () => {
    const userCredentials = {
      credential: 'testuser@gmail.com',
      password: 'testPassword123'
    }

    const res = await request(app)
      .post('/users/login')
      .send(userCredentials)
      .expect('Content-Type', /json/)
      .expect(200)

    expect(res.body).toHaveProperty('message', 'Login successful')
    expect(res.body).toHaveProperty('token')

  })


  it('POST /users/login should not authenticate an incorrect pass', async () => {
    const userCredentials = {
      credential: 'testUser',
      password: 'wrongPassword'
    }

    const res = await request(app)
      .post('/users/login')
      .send(userCredentials)
      .expect('Content-Type', /json/)
      .expect(401)

    expect(res.body).toHaveProperty('message', 'Invalid credentials')
  })

  it('POST /users/login should invalidate username', async () => {
    const userCredentials = {
      credential: 'WrongTestUser',
      password: 'testPassword123'
    }

    const res = await request(app)
      .post('/users/login')
      .send(userCredentials)
      .expect('Content-Type', /json/)
      .expect(401)

    expect(res.body).toHaveProperty('message', 'Invalid credentials')
  })

  it('POST /users/login should return 422 if no credentials are provided', async () => {
    const res = await request(app)
      .post('/users/login')
      .expect('Content-Type', /json/)
      .expect(422)

    expect(res.body).toHaveProperty('errors')
  })


  // TODO Valid registration test

  it('POST /users/register should fail if username already exists', async () => {
    const user = {
      username: 'testUser',
      email: 'testuser@gmail.com',
      password: 'testPassword123'
    }

    const res = await request(app)
      .post('/users/register')
      .send(user)
      .expect('Content-Type', /json/)
      .expect(409)

    expect(res.body).toHaveProperty('message', 'Username already exists')
  })

  it('POST /users/register should fail if email already exists', async () => {
    const user = {
      username: 'newTestUser',
      email: 'testuser@gmail.com',
      password: 'testPassword123'
    }

    const res = await request(app)
      .post('/users/register')
      .send(user)
      .expect('Content-Type', /json/)
      .expect(409)

    expect(res.body).toHaveProperty('message', 'Email already exists')
  })

  it('POST /users/register should return 422 if no credentials are provided', async () => {
    const res = await request(app)
      .post('/users/register')
      .expect('Content-Type', /json/)
      .expect(422)

    expect(res.body).toHaveProperty('errors')
  })
})

//* Cart Routes
describe('Users Cart Routes', () => {
  const userID = "c26ff231-b599-4de1-ba3f-303fcc5bd824"
  const token = generateToken(userID)

  it('GET /users/cart should return the user cart', async () => {

    const res = await request(app)
      .get('/users/cart')
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(200)

    expect(res.body).toHaveProperty('cart')
  })

  it('POST /users/cart should add a product to the user cart', async () => {
    const product = {
      productId: "1",
      quantity: 1,
      size: "M",
      color: "black"
    }

    const res = await request(app)
      .post('/users/cart')
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

  it('PUT /users/cart should update a product in the user cart', async () => {

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
      .put(`/users/cart/${key.productId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ key, updates })
      .expect('Content-Type', /json/)
      .expect(200)

    expect(res.body).toHaveProperty('message', 'Cart item updated')
    expect(res.body).toHaveProperty('cart')
  })

  it('DELETE /users/cart should remove a product from the user cart', async () => {
    const key = {
      productId: "1",
      size: "XL",
      color: "black",
    }

    const res = await request(app)
      .delete(`/users/cart/${key.productId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ key })
      .expect('Content-Type', /json/)
      .expect(200)

    expect(res.body).toHaveProperty('message', 'Product removed from cart')
  })


  it('POST /users/cart should return 404 if product does not exist', async () => {
    const product = {
      productId: "999",
      quantity: 1,
      size: "M",
      color: "black"
    }

    const res = await request(app)
      .post('/users/cart')
      .set('Authorization', `Bearer ${token}`)
      .send({ userId: userID, ...product })
      .expect('Content-Type', /json/)
      .expect(404)

    expect(res.body).toHaveProperty('message', 'User or product not found')
  })

  it('POST /users/cart should return 404 if user does not exist', async () => {
    const userID = "999"
    const product = {
      productId: "1",
      quantity: 1,
      size: "M",
      color: "black"
    }

    const res = await request(app)
      .post('/users/cart')
      .set('Authorization', `Bearer ${token}`)
      .send({ userId: userID, ...product })
      .expect('Content-Type', /json/)
      .expect(404)

    expect(res.body).toHaveProperty('message', 'User or product not found')
  })

  it('PUT /users/cart should return 404 if product does not exist', async () => {
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
      .put(`/users/cart/${key.productId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ key, updates })
      .expect('Content-Type', /json/)
      .expect(404)
    expect(res.body).toHaveProperty('message', 'User or product not found')
  })

  it('GET /users/cart should return 401 if no token is provided', async () => {
    const res = await request(app)
      .get('/users/cart')
      .expect('Content-Type', /json/)
      .expect(401)

    expect(res.body).toHaveProperty('message', 'Unauthorized')
  })

  it('DELETE /users/cart should clean the user cart', async () => {
    const res = await request(app)
      .delete('/users/cart')
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(200)

    expect(res.body).toHaveProperty('message', 'Cart has been cleaned')
    expect(res.body).toHaveProperty('cart')
    expect(res.body.cart.length).toBe(0)
  })
})