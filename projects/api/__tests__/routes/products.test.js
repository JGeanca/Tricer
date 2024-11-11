import request from 'supertest'
//import { createTestApp } from '../../servers/fs-test-server'
import { createTestApp } from '../../servers/db-test-server'

const app = createTestApp()

describe('Products routes API', () => {
  it('GET /products should return all products', async () => {
    const res = await request(app).get('/products')
    expect(res.status).toBe(200)
    expect(res.body.length).toBeTruthy()
  })

  it('GET /products/:id should return a product by its id', async () => {
    const res = await request(app).get('/products/1')
    expect(res.status).toBe(200)
    expect(res.body.id).toBe("1")
  })

  it('GET /products?gender=men should return all men products', async () => {
    const res = await request(app).get('/products?gender=men')
    expect(res.status).toBe(200)
    expect(res.body.length).toBeTruthy()
    expect(res.body.every(product => product.gender === 'men')).toBeTruthy()
  })

  it('GET /products?gender=women should return all women products', async () => {
    const res = await request(app).get('/products?gender=women')
    expect(res.status).toBe(200)
    expect(res.body.length).toBeTruthy()
    expect(res.body.every(product => product.gender === 'women')).toBeTruthy()
  })

  it('GET /products?type=clothing should return all clothing products', async () => {
    const res = await request(app).get('/products?type=clothing')
    expect(res.status).toBe(200)
    expect(res.body.length).toBeTruthy()
    expect(res.body.every(product => product.type === 'clothing')).toBeTruthy()
  })

  it(`GET /products?type=clothing&gender=women should return
     all clothing products for women`, async () => {
    const res = await request(app).get('/products?type=clothing&gender=women')
    expect(res.status).toBe(200)
    expect(res.body.length).toBeTruthy()
    expect(res.body.every(product => product.type === 'clothing' &&
      product.gender === 'women')).toBeTruthy()

  })

  it(`GET /products?type=clothing&gender=men should return
    all clothing products for men`, async () => {
    const res = await request(app).get('/products?type=clothing&gender=men')
    expect(res.status).toBe(200)
    expect(res.body.length).toBeTruthy()
    expect(res.body.every(product => product.type === 'clothing' &&
      product.gender === 'men')).toBeTruthy()

  })

  it(`GET /products?type=clothing&gender=men&new=true should return
    all new clothing products for men`, async () => {
    const res = await request(app).get('/products?type=clothing&gender=men&new=true')
    expect(res.status).toBe(200)
    expect(res.body.length).toBeTruthy()
    expect(res.body.every(product => product.type === 'clothing' &&
      product.gender === 'men' && product.new === true)).toBeTruthy()

  })

  // TODO other categories if we add products for them
})