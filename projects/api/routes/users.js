import { Router } from 'express'
import { UserController } from '../controllers/users.js'

export const createUsersRouter = ({ userModel }) => {
  const usersRouter = Router()

  const userController = new UserController({ userModel })

  usersRouter.post('/register', userController.register)
  usersRouter.post('/login', userController.login)

  return usersRouter
}