import { Router } from 'express'
import { CartController } from '../controllers/carts.js'
import { authMiddleware } from '../middlewares/tokenValidation.js'

export const createCartsRouter = ({ cartModel }) => {
  const cartsRouter = Router()
  const cartController = new CartController({ cartModel })

  cartsRouter.use(authMiddleware)

  cartsRouter.get('/', cartController.getCart)
  cartsRouter.post('/', cartController.addToCart)
  cartsRouter.delete('/:productId', cartController.removeFromCart)
  cartsRouter.delete('/', cartController.cleanCart)
  cartsRouter.put('/:productId', cartController.updateCartItem)

  return cartsRouter
}
