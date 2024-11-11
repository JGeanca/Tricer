export class CartModel {
  constructor(db) {
    this.db = db
  }

  async #getUserCartId(userId) {
    const [userCart] = await this.db.query(
      'SELECT id FROM carts WHERE user_id = ?',
      [userId]
    )

    if (!userCart.length) return null
    return userCart[0].id
  }

  async #getProductVariantId({ productId, size, color }) {
    const [productVariant] = await this.db.query(
      'SELECT id FROM product_inventory WHERE product_id = ? AND size = ? AND color = ?',
      [productId, size, color]
    )

    if (!productVariant.length) return null
    return productVariant[0].id
  }

  async getCart({ userId }) {
    try {
      const userCartId = await this.#getUserCartId(userId)

      if (!userCartId) return null

      const [cartItems] = await this.db.query(`
        SELECT 
          ci.quantity,
          pinv.size,
          pinv.color,
          p.id as productId,
          p.title,
          p.price,
          p.brand,
          p.description,
          GROUP_CONCAT(DISTINCT pi.url) as images
        FROM cart_items ci
        JOIN products p ON ci.product_id = p.id
        JOIN product_inventory pinv ON ci.inventory_id = pinv.id
        LEFT JOIN product_images pi ON p.id = pi.product_id
        WHERE ci.cart_id = ?
        GROUP BY ci.id, p.id
      `, [userCartId])

      return cartItems.map(item => ({
        productId: item.productId.toString(),
        quantity: item.quantity,
        size: item.size,
        color: item.color,
        product: {
          title: item.title,
          price: parseFloat(item.price),
          images: item.images ? item.images.split(',') : [],
          brand: item.brand,
          description: item.description
        }
      }))
    } catch (error) {
      throw error
    }
  }

  async addToCart({ userId, productId, quantity, size, color }) {
    try {
      const userCartId = await this.#getUserCartId(userId)
      if (!userCartId) return null

      const productVariantId = await this.#getProductVariantId({ productId, size, color })
      if (!productVariantId) return null

      const [existingItem] = await this.db.query(
        'SELECT id, quantity FROM cart_items WHERE cart_id = ? AND inventory_id = ?',
        [userCartId, productVariantId]
      )

      await this.db.query('START TRANSACTION')

      try {
        if (existingItem.length) { // If item already exists in cart, update quantity + 1
          await this.db.query(
            'UPDATE cart_items SET quantity = ? WHERE id = ?',
            [existingItem[0].quantity + quantity, existingItem[0].id]
          )
        } else {
          await this.db.query(
            'INSERT INTO cart_items (cart_id, product_id, inventory_id, quantity) VALUES (?, ?, ?, ?)',
            [userCartId, productId, productVariantId, quantity]
          )
        }

        await this.db.query('COMMIT')
        return this.getCart({ userId })
      } catch (error) {
        await this.db.query('ROLLBACK')
        throw error
      }
    } catch (error) {
      throw error
    }
  }

  async removeFromCart({ userId, productId, size, color }) {
    try {
      const userCartId = await this.#getUserCartId(userId)
      if (!userCartId) return null

      const productVariantId = await this.#getProductVariantId({ productId, size, color })
      if (!productVariantId) return null

      await this.db.query('START TRANSACTION')

      try {
        await this.db.query(
          'DELETE FROM cart_items WHERE cart_id = ? AND inventory_id = ?',
          [userCartId, productVariantId]
        )

        await this.db.query('COMMIT')
        return this.getCart({ userId })
      } catch (error) {
        await this.db.query('ROLLBACK')
        throw error
      }
    } catch (error) {
      throw error
    }
  }

  async updateCartItem({ userId, productId, size, color, updates }) {
    try {
      const userCartId = await this.#getUserCartId(userId)
      if (!userCartId) return null

      const productVariantId = await this.#getProductVariantId({ productId, size, color })
      if (!productVariantId) return null

      await this.db.query('START TRANSACTION')

      try { //! For now, only quantity can be updated
        await this.db.query(
          'UPDATE cart_items SET ? WHERE cart_id = ? AND inventory_id = ?',
          [updates, userCartId, productVariantId]
        )

        await this.db.query('COMMIT')
        return this.getCart({ userId })
      } catch (error) {
        await this.db.query('ROLLBACK')
        throw error
      }
    } catch (error) {
      throw error
    }
  }

  async cleanCart({ userId }) {
    try {
      const userCartId = await this.#getUserCartId(userId)
      if (!userCartId) return null

      await this.db.query('START TRANSACTION')

      try {
        await this.db.query(
          'DELETE FROM cart_items WHERE cart_id = ?',
          [userCartId]
        )

        await this.db.query('COMMIT')
        return this.getCart({ userId })
      } catch (error) {
        await this.db.query('ROLLBACK')
        throw error
      }
    } catch (error) {
      throw error
    }
  }
}
