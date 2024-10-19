import { readJSON } from '../../utils.js'
import crypto from 'crypto'
import bcrypt from 'bcrypt'
import { writeFile } from 'fs/promises'

const { users } = readJSON('./repositories/users.json')

export class UserModel {
  static async create({ username, email, password }) {
    const hashedPass = await bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS, 10))
    const newUser = {
      id: crypto.randomUUID(),
      username,
      email,
      password: hashedPass
    }
    users.push(newUser)
    await UserModel.#saveUsers()
    return newUser
  }

  static async #saveUsers() {
    await writeFile('./repositories/users.json', JSON.stringify({ users }, null, 2))
  }

  static async usernameExists(username) {
    return users.some(user => user.username === username)
  }

  static async emailExists(email) {
    return users.some(user => user.email === email)
  }

  static async verifyCredentials({ username, password }) {
    const user = users.find(user => user.username === username)
    if (!user) return null

    if (await bcrypt.compare(password, user.password)) {
      return { id: user.id, username: user.username }
    }
    return null
  }
}