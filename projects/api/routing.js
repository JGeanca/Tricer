const http = require('node:http')

const productsJson = require('./products/products.json')

const processRequest = (req, res) => {
  const { method, url } = req

  switch (method) {
    case 'GET':
      switch (url) {
        case '/products':
          res.setHeader('Content-Type', 'application/json')
          return res.end(JSON.stringify(productsJson))
        default:
          res.statusCode = 404
          return res.end('Not found 404')
      }
    case 'POST':
      switch (url) {
        case '/products':
          let body = ''

          // listen to the 'body' event
          req.on('body', chunk => {
            body += chunk
          })

          // listen to the 'end' event
          req.on('end', () => {
            const productData = JSON.parse(body)

            //TODO: call database to save product

            res.writeHead(201, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify(productData))
          })
          break
      }
  }
}


const server = http.createServer(processRequest)

server.listen(3000, () => {
  console.log('Server running on port http://localhost:3000')
})