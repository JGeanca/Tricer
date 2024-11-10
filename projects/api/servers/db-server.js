import { createApp, startApp } from '../app.js'
import { pool } from '../config/database.js'
import { ProductModel } from '../models/database/products.js'
import { UserModel } from '../models/database/users.js'

const productModel = new ProductModel(pool)
const userModel = new UserModel(pool)

const app = createApp({ productModel, userModel })

try {
  await startApp(app)
} catch (error) {
  console.error('Error starting the server', error)
}
