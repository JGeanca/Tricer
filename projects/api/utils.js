import { createRequire } from 'node:module'
import jwt from 'jsonwebtoken'
const require = createRequire(import.meta.url)
export const readJSON = (path) => require(path)

export const signToken = (user) => {
  return jwt.sign(
    { userId: user.id, username: user.username, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  )
}