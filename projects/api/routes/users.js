import { Router } from 'express'
import { UserController } from '../controllers/users.js'
import { authMiddleware } from '../middlewares/tokenValidation.js'

export const createUsersRouter = ({ userModel }) => {
  const usersRouter = Router()

  const userController = new UserController({ userModel })

  usersRouter.post('/register', userController.register)
  usersRouter.post('/login', userController.login)

  usersRouter.get('/cart', authMiddleware, userController.getCart)
  usersRouter.post('/cart', authMiddleware, userController.addToCart)
  usersRouter.delete('/cart/:productId', authMiddleware, userController.removeFromCart)
  usersRouter.put('/cart/:productId', authMiddleware, userController.updateCartItem)

  return usersRouter
}