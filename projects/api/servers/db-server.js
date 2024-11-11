import { createApp, startApp } from '../app.js'
import { pool } from '../config/database.js'
import { ProductModel } from '../models/database/products.js'
import { UserModel } from '../models/database/users.js'
import { CartModel } from '../models/database/carts.js'

const productModel = new ProductModel(pool)
const userModel = new UserModel(pool)
const cartModel = new CartModel(pool)

const app = createApp({ productModel, userModel, cartModel })

try {
  await startApp(app)
} catch (error) {
  console.error('Error starting the server', error)
}
