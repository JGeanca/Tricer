import { createApp, startApp } from '../app.js'
import { ProductModel } from '../models/local-file-system/products.js'
import { UserModel } from '../models/local-file-system/users.js'
import { CartModel } from '../models/local-file-system/carts.js'

const app = createApp({ productModel: ProductModel, userModel: UserModel, cartModel: CartModel })

try {
  await startApp(app)
} catch (error) {
  console.error('Error starting the server', error)
}
