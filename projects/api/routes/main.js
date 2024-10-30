import { Router } from 'express'

export const mainRouter = Router()

mainRouter.get('/', (req, res) => {
  res.json({
    message: "Welcome to TRICER API",
  })
})
