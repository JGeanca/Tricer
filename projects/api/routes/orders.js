import { Router } from 'express'
import { authMiddleware } from '../middlewares/tokenValidation.js'
import { OrderController } from '../controllers/orders.js'

export const createOrdersRouter = ({ orderModel }) => {
  const ordersRouter = Router()
  const orderController = new OrderController({ orderModel })

  ordersRouter.use(authMiddleware)

  ordersRouter.get('/', orderController.getOrders)
  ordersRouter.get('/:id', orderController.getOrderById)
  ordersRouter.post('/', orderController.createOrder)

  return ordersRouter
}