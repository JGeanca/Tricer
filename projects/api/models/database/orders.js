export class OrderModel {
  constructor(db) {
    this.db = db
  }

  #isCartEmpty = async ({ userId }) => {
    const [cartItems] = await this.db.query(`
      SELECT COUNT(*) as count 
      FROM cart_items ci 
      JOIN carts c ON ci.cart_id = c.id 
      WHERE c.user_id = ?
    `, [userId])

    return cartItems[0].count === 0
  }

  async getOrderById({ orderId, userId }) {
    try {
      console.log('orderId', orderId)
      const [orderResult] = await this.db.query(
        `SELECT * FROM orders WHERE id = ? AND user_id = ?`,
        [orderId, userId]
      )

      if (!orderResult.length) return null

      const order = orderResult[0]

      const [orderItems] = await this.db.query(`
        SELECT 
          oi.*,
          p.title,
          p.brand,
          pi.size,
          pi.color,
          GROUP_CONCAT(img.url) as images
         FROM order_items oi
         JOIN products p ON oi.product_id = p.id
         JOIN product_inventory pi ON oi.inventory_id = pi.id
         LEFT JOIN product_images img ON p.id = img.product_id
         WHERE oi.order_id = ?
         GROUP BY oi.id
         `, [orderId])

      return {
        orderId: order.id,
        totalAmount: parseFloat(order.total_amount),
        status: order.status,
        createdAt: order.created_at,
        items: orderItems.map(item => ({
          productId: item.product_id.toString(),
          title: item.title,
          brand: item.brand,
          size: item.size,
          color: item.color,
          quantity: item.quantity,
          unitPrice: parseFloat(item.unit_price),
          images: item.images ? item.images.split(',') : []
        }))
      }
    } catch (error) {
      throw error
    }
  }

  async getOrders({ userId }) {
    try {
      const [orders] = await this.db.query(
        `SELECT 
          o.id, o.total_amount, o.status, o.created_at,
          COUNT(oi.id) as total_items
         FROM orders o
         LEFT JOIN order_items oi ON o.id = oi.order_id
         WHERE o.user_id = ?
         GROUP BY o.id
         ORDER BY o.created_at DESC`,
        [userId]
      )

      if (!orders.length) return null

      return orders.map(order => ({
        orderId: order.id,
        totalAmount: parseFloat(order.total_amount),
        status: order.status,
        totalItems: order.total_items,
        createdAt: order.created_at
      }))
    } catch (error) {
      throw error
    }
  }

  async createOrder({ userId }) {
    try {

      if (await this.#isCartEmpty({ userId })) return null

      // Call the stored procedure to create the order
      await this.db.query(
        'CALL create_order_from_cart(?, @order_id)',
        [userId]
      )

      // Get the order id from the stored procedure
      const [orderIdResult] = await this.db.query('SELECT @order_id as orderId')
      const orderId = orderIdResult[0].orderId
      return this.getOrderById({ orderId, userId })
    } catch (error) {
      throw error
    }
  }
}