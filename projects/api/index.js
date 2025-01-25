// import { createApp, startApp } from './app.js'
import { pool } from './config/database.js'
import { ProductModel } from './models/database/products.js'
import { UserModel } from './models/database/users.js'
import { CartModel } from './models/database/carts.js'
import { OrderModel } from './models/database/orders.js'

const productModel = new ProductModel(pool)
const userModel = new UserModel(pool)
const cartModel = new CartModel(pool)
const orderModel = new OrderModel(pool)

import express, { json } from 'express'
import { createProductsRouter } from './routes/products.js'
import { createUsersRouter } from './routes/users.js'
import { createCartsRouter } from './routes/carts.js'
import { createOrdersRouter } from './routes/orders.js'
import { mainRouter } from './routes/main.js'
import { errorHandler } from './middlewares/errorHandler.js'
import logger from 'morgan'
import cors from 'cors'
import dotenv from 'dotenv'


dotenv.config()
const app = express()
app.use(logger('dev'))
app.use(cors())
app.use(json())
app.use(errorHandler)
app.disable('x-powered-by')

app.use('/', mainRouter)
app.use('/products', createProductsRouter({ productModel }))
app.use('/users', createUsersRouter({ userModel }))
app.use('/carts', createCartsRouter({ cartModel }))
app.use('/orders', createOrdersRouter({ orderModel }))


app.listen(process.env.PORT ?? 3000, () => {
  console.log(`Server running on port http://localhost:${process.env.PORT ?? 3000}`)
})
