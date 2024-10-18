import { Router } from 'express'
import { UserController } from '../controllers/users.js'

export const usersRouter = Router()

usersRouter.post('/register', UserController.register)
usersRouter.post('/login', UserController.login)