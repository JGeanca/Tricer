const http = require('node:http')

const desiredPort = process.env.PORT ?? 3000

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'text/plain')
  res.end('Hello, mc!\n')
  console.log('Request received', req.url)
})

server.listen(desiredPort, () => {
  console.log(`Server running on port http://localhost:${desiredPort}`)
})