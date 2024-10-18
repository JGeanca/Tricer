import { UserModel } from '../models/local-file-system/users.js'
import { validateUser, validateLogin } from '../schemas/user.schema.js'
import jwt from 'jsonwebtoken'

export class UserController {

  static async register(req, res) {
    try {
      const result = await validateUser(req.body)
      if (!result.success) {
        return res.status(422).json({ errors: JSON.parse(result.error.message) })
      }

      if (await UserModel.usernameExists(result.data.username)) {
        return res.status(409).json({ message: 'Username already exists' })
      }
      if (await UserModel.emailExists(result.data.email)) {
        return res.status(409).json({ message: 'Email already exists' })
      }
      const newUser = await UserModel.create(result.data)
      return res.status(201).json({ message: 'User created successfully', userId: newUser.id })
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' })
    }
  }

  static async login(req, res) {
    try {
      const result = await validateLogin(req.body)
      if (!result.success) {
        return res.status(422).json({ errors: JSON.parse(result.error.message) })
      }

      const user = await UserModel.verifyCredentials(result.data)
      if (!user) {
        return res.status(401).json({ message: 'Invalid username or password' })
      }

      const token = jwt.sign(
        { userId: user.id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      )

      return res.json({ message: 'Login successful', token })
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' })
    }
  }
}