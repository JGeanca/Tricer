import bcrypt from 'bcrypt'

export class UserModel {
  constructor(db) {
    this.db = db
  }

  async create({ username, email, password }) {
    try {
      let hashedPass = null

      if (password) {
        hashedPass = await bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS, 10))
      }

      await this.db.query('START TRANSACTION')
      await this.db.query(
        'INSERT INTO users (id, username, email, password) VALUES (UUID(), ?, ?, ?)',
        [username, email, hashedPass]
      )

      // Get the id of the newly created user
      //TODO: Turn this into a trigger in the database
      const [newUser] = await this.db.query(
        'SELECT id FROM users WHERE username = ?',
        [username]
      )

      // Create a new cart for the user
      await this.db.query(
        'INSERT INTO carts (id, user_id) VALUES (UUID(), ?)',
        [newUser[0].id]
      )

      await this.db.query('COMMIT')

      return { id: newUser[0].id, username, email }

    } catch (error) {
      await this.db.query('ROLLBACK')
      throw error
    }
  }

  async usernameExists({ username }) {
    const [userExists] = await this.db.query(
      'SELECT COUNT(*) as count FROM users WHERE username = ?',
      [username]
    )
    return userExists[0].count > 0
  }

  async emailExists({ email }) {
    const [emailExists] = await this.db.query(
      'SELECT COUNT(*) as count FROM users WHERE email = ?',
      [email]
    )
    return emailExists[0].count > 0
  }

  async verifyCredentials({ credential, password }) {
    const [user] = await this.db.query(
      'SELECT * FROM users WHERE username = ? OR email = ?',
      [credential, credential]
    )

    if (!user.length) return null

    if (await bcrypt.compare(password, user[0].password)) {
      return { id: user[0].id, username: user[0].username }
    }
    return null
  }

  async verifyGoogleCredential({ email, username }) {
    const sanitizedEmail = email.trim()
    const sanitizedUsername = username.trim()

    const [user] = await this.db.query(
      'SELECT * FROM users WHERE username = ? OR email = ?',
      [sanitizedUsername, sanitizedEmail]
    )

    if (!user.length) return null

    return { id: user[0].id, username: user[0].username }
  }
}
