import { readJSON } from '../../utils.js'
import crypto from 'crypto'
import bcrypt from 'bcrypt'
import { writeFile } from 'fs/promises'

const { users } = readJSON('./repositories/users.json')


export class UserModel {
  static async create({ username, email, password }) {

    const hashedPass = await bcrypt.hash(password, 10)
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

  //TODO, login methods
}