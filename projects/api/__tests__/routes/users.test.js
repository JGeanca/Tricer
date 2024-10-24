import request from 'supertest'
import { createTestApp } from '../../test-server.js'

const app = createTestApp()

describe('Users routes API', () => {

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