export class CartModel {
  constructor(db) {
    this.db = db
  }

  async getCart({ userId }) {
    try {
      const [userCart] = await this.db.query(
        'SELECT id FROM carts WHERE user_id = ?',
        [userId]
      )

      if (!userCart.length) throw new Error('Cart not found')

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
      `, [userCart[0].id])

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
      console.error('[getCart]: ', error)
      throw error
    }
  }

  async addToCart({ userId, productId, quantity, size, color }) {
    try {
      const [userCart] = await this.db.query(
        'SELECT id FROM carts WHERE user_id = ?',
        [userId]
      )

      if (!userCart.length) throw new Error('User cart not found')

      const [productVariant] = await this.db.query(
        'SELECT id FROM product_inventory WHERE product_id = ? AND size = ? AND color = ?',
        [productId, size, color]
      )

      if (!productVariant.length) throw new Error('Product variant not found')

      const [existingItem] = await this.db.query(
        'SELECT id, quantity FROM cart_items WHERE cart_id = ? AND inventory_id = ?',
        [userCart[0].id, productVariant[0].id]
      )

      await this.db.query('START TRANSACTION')

      try {
        if (existingItem.length) {
          await this.db.query(
            'UPDATE cart_items SET quantity = ? WHERE id = ?',
            [existingItem[0].quantity + quantity, existingItem[0].id]
          )
        } else {
          await this.db.query(
            'INSERT INTO cart_items (cart_id, product_id, inventory_id, quantity) VALUES (?, ?, ?, ?)',
            [userCart[0].id, productId, productVariant[0].id, quantity]
          )
        }

        await this.db.query('COMMIT')
        return this.getCart({ userId })
      } catch (error) {
        await this.db.query('ROLLBACK')
        throw error
      }
    } catch (error) {
      console.error('[addToCart]:', error)
      throw error
    }
  }

  async removeFromCart({ userId, productId, size, color }) {
    try {
      const [userCart] = await this.db.query(
        'SELECT id FROM carts WHERE user_id = ?',
        [userId]
      )

      if (!userCart.length) throw new Error('User cart not found')

      const [productVariant] = await this.db.query(
        'SELECT id FROM product_inventory WHERE product_id = ? AND size = ? AND color = ?',
        [productId, size, color]
      )

      if (!productVariant.length) throw new Error('Product variant not found')

      await this.db.query('START TRANSACTION')

      try {
        await this.db.query(
          'DELETE FROM cart_items WHERE cart_id = ? AND inventory_id = ?',
          [userCart[0].id, productVariant[0].id]
        )

        await this.db.query('COMMIT')
        return this.getCart({ userId })
      } catch (error) {
        await this.db.query('ROLLBACK')
        throw error
      }
    } catch (error) {
      console.error('[removeFromCart]:', error)
      throw error
    }
  }

  async updateCartItem({ userId, productId, size, color, updates }) {
    try {
      const [userCart] = await this.db.query(
        'SELECT id FROM carts WHERE user_id = ?',
        [userId]
      )

      if (!userCart.length) throw new Error('User cart not found')

      const [productVariant] = await this.db.query(
        'SELECT id FROM product_inventory WHERE product_id = ? AND size = ? AND color = ?',
        [productId, size, color]
      )

      if (!productVariant.length) throw new Error('Product variant not found')

      await this.db.query('START TRANSACTION')

      try {
        await this.db.query(
          'UPDATE cart_items SET ? WHERE cart_id = ? AND inventory_id = ?',
          [updates, userCart[0].id, productVariant[0].id]
        )

        await this.db.query('COMMIT')
        return this.getCart({ userId })
      } catch (error) {
        await this.db.query('ROLLBACK')
        throw error
      }
    } catch (error) {
      console.error('[updateCartItem]:', error)
      throw error
    }
  }

  async cleanCart({ userId }) {
    try {
      const [userCart] = await this.db.query(
        'SELECT id FROM carts WHERE user_id = ?',
        [userId]
      )

      if (!userCart.length) throw new Error('User cart not found')

      await this.db.query('START TRANSACTION')

      try {
        await this.db.query(
          'DELETE FROM cart_items WHERE cart_id = ?',
          [userCart[0].id]
        )

        await this.db.query('COMMIT')
        return this.getCart({ userId })
      } catch (error) {
        await this.db.query('ROLLBACK')
        throw error
      }
    } catch (error) {
      console.error('[cleanCart]:', error)
      throw error
    }
  }
}
