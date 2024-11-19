import { validateGetOrder, validateGetOrderById } from '../schemas/orders.schema.js'

export class OrderController {

  constructor({ orderModel }) {
    this.orderModel = orderModel
  }

  createOrder = async (req, res) => {
    try {
      const order = await this.orderModel.createOrder(req.user)

      if (!order) {
        return res.status(400).json({ message: 'Could not create order. Cart might be empty' })
      }

      return res.status(201).json({ message: 'Order created successfully', order })
    } catch (error) {

      if (error.code === 'ER_CHECK_CONSTRAINT_VIOLATED') {
        return res.status(409).json({ message: 'Insufficient stock for one or more products' })
      } else console.error('[createOrder]:', error.message)

      return res.status(500).json({ message: 'Internal server error' })
    }
  }

  getOrders = async (req, res) => {
    try {
      const result = await validateGetOrder(req.user)
      if (!result.success) {
        return res.status(422).json({ errors: JSON.parse(result.error.message) })
      }

      const userId = req.user.userId
      const orders = await this.orderModel.getOrders({ userId })

      if (!orders) {
        return res.status(404).json({ message: 'No orders found' })
      }

      return res.json({ orders })
    } catch (error) {
      console.error('[getOrders]:', error.message)
      return res.status(500).json({ message: 'Internal server error' })
    }
  }

  getOrderById = async (req, res) => {
    try {
      const { id } = req.params
      const userId = req.user.userId
      const result = await validateGetOrderById({ orderId: id, userId })

      if (!result.success) {
        return res.status(422).json({ errors: JSON.parse(result.error.message) })
      }

      const order = await this.orderModel.getOrderById({ orderId: id, userId })

      if (!order) {
        return res.status(404).json({ message: 'Order not found' })
      }

      return res.json({ order })
    } catch (error) {
      console.error('[getOrderById]:', error.message)
      return res.status(500).json({ message: 'Internal server error' })
    }
  }
}