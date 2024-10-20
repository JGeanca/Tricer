import request from 'supertest'
import { createTestApp } from '../../test-server.js'

const app = createTestApp()

describe('Products routes API', () => {
  it('GET /products should return all products', async () => {
    const res = await request(app).get('/products')
    expect(res.status).toBe(200)
    expect(res.body.length).toBeTruthy()
  })

})