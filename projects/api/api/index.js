// api/index.js
import { createApp } from '../app.js'
import { pool } from '../config/database.js'
import { ProductModel } from '../models/database/products.js'
import { UserModel } from '../models/database/users.js'
import { CartModel } from '../models/database/carts.js'
import { OrderModel } from '../models/database/orders.js'

const productModel = new ProductModel(pool)
const userModel = new UserModel(pool)
const cartModel = new CartModel(pool)
const orderModel = new OrderModel(pool)

const app = createApp({ productModel, userModel, cartModel, orderModel })

export default app
