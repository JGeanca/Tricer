import express, { json } from 'express'
import logger from 'morgan'
import cors from 'cors'
import { createProductsRouter } from './routes/products.js'
import { createUsersRouter } from './routes/users.js'
import { mainRouter } from './routes/main.js'
import { errorHandler } from './middlewares/errorHandler.js'

import dotenv from 'dotenv'

export const createApp = ({ productModel, userModel }) => {
  dotenv.config()
  const app = express()
  app.use(logger('dev'))
  app.use(cors())
  app.use(json())
  app.use(errorHandler)
  app.disable('x-powered-by')

  app.use('/', mainRouter)
  app.use('/products', createProductsRouter({ productModel }))
  app.use('/users', createUsersRouter({ userModel }))

  return app
}

//TODO CHECK!
export const startApp = (app, port = process.env.PORT ?? 3000) => {
  return new Promise((resolve) => {
    const server = app.listen(port, () => {
      console.log(`Server running on port http://localhost:${port}`)
      resolve(server);
    })
  })
}