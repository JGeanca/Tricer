import bcrypt from 'bcrypt'


export class UserModel {
  constructor(db) {
    this.db = db
  }

  // Auth methods
  async create({ username, email, password }) {
    try {
      let hashedPass = null

      if (password) {
        hashedPass = await bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS, 10))
      }

      await this.db.query('START TRANSACTION');
      await this.db.query(
        'INSERT INTO users (id, username, email, password) VALUES (UUID(), ?, ?, ?)',
        [username, email, hashedPass]
      )

      // Get the id of the newly created user
      //TODO: Turn this into a trigger in the database
      const [newUser] = await this.db.query(
        'SELECT id FROM users WHERE username = ?',
        [username]
      )

      // Create a new cart for the user
      await this.db.query(
        'INSERT INTO carts (id, user_id) VALUES (UUID(), ?)',
        [newUser[0].id]
      )

      await this.db.query('COMMIT')

      return { id: newUser[0].id, username, email }

    } catch (error) {
      await this.db.query('ROLLBACK');
      console.error('[Create]: ', error);
      throw error;
    }
  }

  async usernameExists({ username }) {
    const [userExists] = await this.db.query(
      'SELECT COUNT(*) as count FROM users WHERE username = ?',
      [username]
    )
    return userExists[0].count > 0
  }

  async emailExists({ email }) {
    const [emailExists] = await this.db.query(
      'SELECT COUNT(*) as count FROM users WHERE email = ?',
      [email]
    )
    return emailExists[0].count > 0
  }

  async verifyCredentials({ credential, password }) {
    const [user] = await this.db.query(
      'SELECT * FROM users WHERE username = ? OR email = ?',
      [credential, credential]
    )

    if (!user.length) return null

    if (await bcrypt.compare(password, user[0].password)) {
      return { id: user[0].id, username: user[0].username }
    }
    return null
  }

  async verifyGoogleCredential({ email, username }) {
    const sanitizedEmail = email.trim()
    const sanitizedUsername = username.trim()

    const [user] = await this.db.query(
      'SELECT * FROM users WHERE username = ? OR email = ?',
      [sanitizedUsername, sanitizedEmail]
    )

    if (!user.length) return null

    return { id: user[0].id, username: user[0].username }
  }



  // Cart methods

  async getUserCart({ userId }) {
    try {
      // Get the user's cart
      const [userCart] = await this.db.query(
        'SELECT id FROM carts WHERE user_id = ?',
        [userId]
      )

      if (!userCart.length) throw new Error('Cart not found')

      // Get the cart items
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

      // Format the cart items
      const formattedCart = cartItems.map(item => ({
        productId: item.productId,
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
      return formattedCart
    } catch (error) {
      console.error('[getUserCart]: ', error)
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

      // Check if the item already exists in the cart
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

        return this.getUserCart({ userId })
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
        return this.getUserCart({ userId })

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
        return this.getUserCart({ userId })

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
        return this.getUserCart({ userId })

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
