import { createApp, startApp } from './app.js'
import { ProductModel } from './models/local-file-system/products.js'
import { UserModel } from './models/local-file-system/users.js'

const app = createApp({ productModel: ProductModel, userModel: UserModel })

try {
  await startApp(app)
} catch (error) {
  console.error('Error starting the server', error)
}
