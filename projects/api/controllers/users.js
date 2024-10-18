import { UserModel } from '../models/local-file-system/users.js'

export class UserController {

  static async register(req, res) {
    const { username, email, password } = req.body
    const newUser = await UserModel.create({ username, email, password })

    return res.status(201).json({ message: 'User created successfully', userId: newUser.id })
  }
}