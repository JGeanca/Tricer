import {
  validateAddToCart, validateRemoveFromCart, validateUpdateCartItem,
  validateGetCart, validateCleanCart
} from '../schemas/cart.schema.js'

export class CartController {
  constructor({ cartModel }) {
    this.cartModel = cartModel
  }

  getCart = async (req, res) => {
    try {
      const result = await validateGetCart(req.user)
      if (!result.success) {
        return res.status(422).json({ errors: JSON.parse(result.error.message) })
      }
      const cart = await this.cartModel.getCart(req.user)
      if (!cart) {
        return res.status(404).json({ message: 'User cart not found' })
      }
      return res.json({ cart })
    } catch (error) {
      console.error("[getCart]:", error.message)
      return res.status(500).json({ message: 'Internal server error' })
    }
  }

  addToCart = async (req, res) => {
    try {

      const userId = req.user.userId
      const result = await validateAddToCart(req.body)

      if (!result.success) {
        return res.status(422).json({ errors: JSON.parse(result.error.message) })
      }

      const cart = await this.cartModel.addToCart({ userId, ...req.body })
      if (!cart) {
        return res.status(404).json({ message: 'User cart or product not found in store' })
      }
      return res.status(201).json({ message: 'Product added to cart', cart })
    } catch (error) {
      console.error("[addToCart]:", error.message)
      return res.status(500).json({ message: 'Internal server error' })
    }
  }

  removeFromCart = async (req, res) => {
    try {

      const userId = req.user.userId
      const { key } = req.body

      const result = await validateRemoveFromCart(key)
      if (!result.success) {
        return res.status(422).json({ errors: JSON.parse(result.error.message) })
      }
      const cart = await this.cartModel.removeFromCart({ userId, ...key })
      if (!cart) {
        return res.status(404).json({ message: 'User cart or product not found' })
      }
      return res.json({ message: 'Product removed from cart', cart })
    } catch (error) {
      console.error("[removeFromCart]:", error.message)
      return res.status(500).json({ message: 'Internal server error' })
    }
  }

  updateCartItem = async (req, res) => {
    try {
      const userId = req.user.userId
      const { key, updates } = req.body

      const result = await validateUpdateCartItem(req.body)

      if (!result.success) {
        return res.status(422).json({ errors: result.error.issues })
      }

      const cart = await this.cartModel.updateCartItem({ userId, ...key, updates })

      if (!cart) {
        return res.status(404).json({ message: 'User cart or product not found' })
      }

      return res.json({ message: 'Cart item updated', cart })
    } catch (error) {
      console.error("[updateCartItem]:", error.message)
      return res.status(500).json({ message: 'Internal server error' })
    }
  }

  cleanCart = async (req, res) => {
    try {
      const userId = req.user.userId
      const result = await validateCleanCart({ userId })

      if (!result.success) {
        return res.status(422).json({ errors: JSON.parse(result.error.message) })
      }
      const cart = await this.cartModel.cleanCart({ userId })
      if (!cart) {
        return res.status(404).json({ message: 'User cart not found' })
      }
      return res.json({ message: 'Cart has been cleaned', cart })
    } catch (error) {
      console.error("[cleanCart]:", error.message)
      return res.status(500).json({ message: 'Internal server error' })
    }
  }
}