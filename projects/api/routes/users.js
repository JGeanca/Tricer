import { Router } from 'express'
import { UserController } from '../controllers/users.js'

export const createUsersRouter = ({ userModel }) => {
  const usersRouter = Router()

  const userController = new UserController({ userModel })

  usersRouter.post('/register', userController.register)
  usersRouter.post('/login', userController.login)

  //TODO: Add middleware to check if user is authenticated

  usersRouter.get('/cart', userController.getCart)
  usersRouter.post('/cart', userController.addToCart)
  usersRouter.delete('/cart/', userController.removeFromCart)
  usersRouter.put('/cart/', userController.updateCartItem)

  return usersRouter
}