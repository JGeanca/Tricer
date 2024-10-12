const express = require('express')
const { products } = require('./products/products.json')

const app = express()
app.disable('x-powered-by')

const PORT = process.env.PORT ?? 3000

app.get('/', (req, res) => {
  res.send('Hello World! APP')
})

// Get all products
app.get('/products', (req, res) => {
  const { gender, type } = req.query
  let filteredProducts = products

  if (gender) {
    filteredProducts = filteredProducts.filter(
      product => product.gender.toLowerCase() === gender.toLowerCase()
    )
  }
  if (type) {
    filteredProducts = filteredProducts.filter(
      product => product.type.toLowerCase() === type.toLowerCase()
    )
  }

  res.json(filteredProducts)
})

// Get product by id
app.get('/products/:id', (req, res) => {
  const { id } = req.params
  const product = products.find(product => product.id === id)

  if (product) return res.json(product)
  res.status(404).json({ error: 'Product not found' })
})

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`)
})
