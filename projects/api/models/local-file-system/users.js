import { readJSON } from '../../utils.js'
import crypto from 'crypto'
import bcrypt from 'bcrypt'
import { writeFile } from 'fs/promises'
import { ProductModel } from './products.js'
const { users } = readJSON('./repositories/users.json')

export class UserModel {
  static async #saveUsers() {
    await writeFile('./repositories/users.json', JSON.stringify({ users }, null, 2))
  }

  // Auth methods
  static async create({ username, email, password }) {
    let hashedPass = null

    if (password) {
      hashedPass = await bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS, 10))
    }
    const newUser = {
      id: crypto.randomUUID(),
      username,
      email,
      password: hashedPass,
      cart: []
    }
    users.push(newUser)
    await UserModel.#saveUsers()
    return newUser
  }

  static async usernameExists({ username }) {
    return users.some(user => user.username === username)
  }

  static async emailExists({ email }) {
    return users.some(user => user.email === email)
  }

  static async verifyCredentials({ credential, password }) {
    const user = users.find(
      user => user.username === credential || user.email === credential
    )

    if (!user) return null

    if (await bcrypt.compare(password, user.password)) {
      return { id: user.id, username: user.username }
    }
    return null
  }

  static async verifyGoogleCredential({ email, username }) {
    const sanitizedEmail = email.trim()
    const sanitizedUsername = username.trim()

    const user = users.find(
      user => user.username === sanitizedUsername || user.email === sanitizedEmail
    )

    return user ? { id: user.id, username: user.username } : null
  }

  // Cart methods
  static async getUserCart({ userId }) {
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
    await UserModel.#saveUsers()
    return UserModel.getUserCart({ userId })
  }

  static async removeFromCart({ userId, productId, size, color }) {
    const user = users.find(user => user.id === userId)

    if (!user) return null

    user.cart = user.cart.filter(item =>
      !(item.productId === productId &&
        item.size === size &&
        item.color === color)
    )

    await UserModel.#saveUsers()
    return UserModel.getUserCart({ userId })
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

    await UserModel.#saveUsers()
    return UserModel.getUserCart({ userId })
  }

  static async cleanCart({ userId }) {
    const user = users.find(user => user.id === userId)

    if (!user) return null

    user.cart = []

    await UserModel.#saveUsers()
    return UserModel.getUserCart({ userId })
  }
}
