import { createApp } from '../app.js'
import { ProductModel } from '../models/local-file-system/products.js'
import { UserModel } from '../models/local-file-system/users.js'

export const createTestApp = () => {
  return createApp({ productModel: ProductModel, userModel: UserModel })
}