const express = require('express')
const app = express()
const productsJson = require('./products/products.json')

app.disable('x-powered-by')

const PORT = process.env.PORT ?? 3000

// Middleware, every request will pass through this middleware
// app.use((req, res, next) => {
//   if (req.method !== 'POST') {
//     return next()
//   }

//   if (req.headers['content-type'] !== 'application/json') {
//     return next()
//   }

//   // Here, the request is a POST
//   // and the content-type is application/json

//   let body = ''

//   // listen to the 'data' event
//   req.on('data', chunk => {
//     body += chunk.toString()
//   })

//   req.on('end', () => {
//     const productData = JSON.parse(body)
//     productData.timestamp = Date.now()
//     req.body = productData
//     next()
//   })
// })

// This lane is the same as the middleware above, but using express.json() middleware
app.use(express.json())

app.get('/', (req, res) => {
  res.json({ message: 'Hello, mc!' })
})

app.get('/products', (req, res) => {
  res.json({ products: productsJson })
})


app.post('/products', (req, res) => {
  res.status(201).json(req.body)
})

app.use((req, res) => {
  res.status(404).send('Not found 404')
})

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`)
})