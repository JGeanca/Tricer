import { readJSON } from '../../utils.js'
import { writeFile } from 'fs/promises'
import { ProductModel } from './products.js'
const { users } = readJSON('./repositories/users.json')

export class CartModel {
  static async #saveUsers() {
    await writeFile('./repositories/users.json', JSON.stringify({ users }, null, 2))
  }

  static async getCart({ userId }) {
    const user = users.find(user => user.id === userId)

    if (!user) return null

    const cartWithProducts = await Promise.all(user.cart.map(async (cartItem) => {
      const product = await ProductModel.getById({ id: cartItem.productId })
      if (!product) return null

      return {
        ...cartItem,              // Cart info
        product: {               // Products info
          title: product.title,
          price: product.price,
          images: product.images,
          brand: product.brand,
          description: product.description,
        }
      }
    }))
    return cartWithProducts.filter(item => item !== null) // Remove null values
  }

  static async addToCart({ userId, productId, quantity, size, color }) {
    const user = users.find(user => user.id === userId)

    if (!user) return null

    const existsInProducts = await ProductModel.getById({ id: productId })

    if (!existsInProducts) return null

    const existsInCart = user.cart.find(item =>
      item.productId === productId &&
      item.size === size &&
      item.color === color
    )

    if (existsInCart) {
      existsInCart.quantity += quantity
    }
    else {
      user.cart.push({ productId, size, color, quantity })
    }
    await CartModel.#saveUsers()
    return CartModel.getCart({ userId })
  }

  static async removeFromCart({ userId, productId, size, color }) {
    const user = users.find(user => user.id === userId)

    if (!user) return null

    user.cart = user.cart.filter(item =>
      !(item.productId === productId &&
        item.size === size &&
        item.color === color)
    )

    await CartModel.#saveUsers()
    return CartModel.getCart({ userId })
  }

  static async updateCartItem({ userId, productId, size, color, updates }) {
    const user = users.find(user => user.id === userId)

    if (!user) return null

    const productIndex = user.cart.findIndex(item =>
      item.productId === productId &&
      item.size === size &&
      item.color === color
    )

    if (productIndex === -1) return null

    user.cart[productIndex] = { ...user.cart[productIndex], ...updates }

    await CartModel.#saveUsers()
    return CartModel.getCart({ userId })
  }

  static async cleanCart({ userId }) {
    const user = users.find(user => user.id === userId)

    if (!user) return null

    user.cart = []

    await CartModel.#saveUsers()
    return CartModel.getCart({ userId })
  }
}
