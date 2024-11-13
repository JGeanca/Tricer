import { pool } from '../config/database'

export const closeTestDB = async () => {
  try {
    await pool.end()
  } catch (error) {
    console.error('Error closing database connection:', error)
  }
}

export const setupTestDB = async () => {
  try {
    // Clear the data
    await pool.query('DELETE FROM order_items')
    await pool.query('DELETE FROM orders')
    await pool.query('DELETE FROM cart_items')
  } catch (error) {
    console.error('Error cleaning up test database:', error)
  }
}

export const tearDownTestDB = async () => {
  try {
    // Clear the data
    await pool.query('DELETE FROM order_items')
    await pool.query('DELETE FROM orders')
    await pool.query('DELETE FROM cart_items')
  } catch (error) {
    console.error('Error closing test database:', error)
  }
}

export const setupCart = async (userId) => {
  try {
    const [cartResult] = await pool.query(
      'SELECT id FROM carts WHERE user_id = ?',
      [userId]
    )

    await pool.query(`
      INSERT INTO cart_items (cart_id, product_id, inventory_id, quantity)
      SELECT 
        ?,    -- cart_id
        '1',  -- product_id fijo
        pi.id, -- inventory_id
        1      -- quantity
      FROM product_inventory pi 
      WHERE pi.product_id = '1' 
      AND pi.size = 'M' 
      AND pi.color = 'blue'
      LIMIT 1
    `, [cartResult[0].id])

  } catch (error) {
    console.error('Error setting up cart:', error)
    throw error
  }
}

export const cleanupOrderAndCart = async (userId, orderId) => {
  try {
    const [cartResult] = await pool.query(
      'SELECT id FROM carts WHERE user_id = ?',
      [userId]
    )
    await pool.query('DELETE FROM cart_items WHERE cart_id = ?', [cartResult[0].id])

    if (orderId) {
      await pool.query(
        'UPDATE product_inventory SET stock = stock + 1 WHERE product_id = "1" AND size = "M" AND color = "blue"'
      )
      await pool.query('DELETE FROM order_items WHERE order_id = ?', [orderId])
      await pool.query('DELETE FROM orders WHERE id = ?', [orderId])
    }
  } catch (error) {
    console.error('Error in cleanup:', error)
    throw error
  }
}


export const setStock = async (quantity = 10) => {
  try {
    await pool.query(`
      UPDATE product_inventory 
      SET stock = ?
      WHERE product_id = '1' AND size = 'M' AND color = 'blue'
    `, [quantity])
  } catch (error) {
    console.error('Error setting stock:', error)
    throw error
  }
}

export const setupCartWithQuantity = async (userId, quantity) => {
  try {
    const [cartResult] = await pool.query(
      'SELECT id FROM carts WHERE user_id = ?',
      [userId]
    )

    await pool.query(`
      INSERT INTO cart_items (cart_id, product_id, inventory_id, quantity)
      SELECT 
        ?,     -- cart_id
        '1',   -- product_id fijo
        pi.id, -- inventory_id
        ?      -- quantity (ahora es parámetro)
      FROM product_inventory pi 
      WHERE pi.product_id = '1' 
      AND pi.size = 'M' 
      AND pi.color = 'blue'
      LIMIT 1
    `, [cartResult[0].id, quantity])

  } catch (error) {
    console.error('Error setting up cart:', error)
    throw error
  }
}
