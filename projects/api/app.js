import express, { json } from 'express'
import logger from 'morgan'
import cors from 'cors'
import { productsRouter } from './routes/products.js'
import { usersRouter } from './routes/users.js'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
app.use(logger('dev'))
app.use(cors())
app.use(json())
app.disable('x-powered-by')

app.use('/products', productsRouter)
app.use('/users', usersRouter)

const PORT = process.env.PORT ?? 3000

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`)
})
