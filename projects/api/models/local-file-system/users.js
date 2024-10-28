import { readJSON } from '../../utils.js'
import crypto from 'crypto'
import bcrypt from 'bcrypt'
import { writeFile } from 'fs/promises'

const { users } = readJSON('./repositories/users.json')

export class UserModel {
  static async create({ username, email, password }) {
    let hashedPass = null

    if (password) {
      hashedPass = await bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS, 10))
    }
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

  static async verifyCredentials({ credential, password }) {
    const user = users.find(
      user => user.username === credential || user.email === credential
    )

    if (!user) return null

    if (await bcrypt.compare(password, user.password)) {
      return { id: user.id, username: user.username }
    }
    return null
  }

  static async verifyGoogleCredential({ email, username }) {
    const sanitizedEmail = email.trim()
    const sanitizedUsername = username.trim()

    const user = users.find(
      user => user.username === sanitizedUsername || user.email === sanitizedEmail
    )

    return user ? { id: user.id, username: user.username } : null
  }
}
