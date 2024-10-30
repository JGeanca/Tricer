import { validateUser } from '../../schemas/user.schema.js'

describe('User schema Validation', () => {
  it('should return true if the user is valid', async () => {

    const user = {  // Arrange
      username: 'rayoMcQueen2001',
      email: 'mcrayo2001@gmail.com',
      password: 'B123456!',
    }

    const result = await validateUser(user) // Act
    expect(result.success).toBe(true) // Assert
  })

  it('should return false if the user is invalid by missing parameters', async () => {

    const user = {  // Arrange
      username: 'rayoMcQueen2001',
    }

    const result = await validateUser(user) // Act
    expect(result.success).toBe(false) // Assert
  })
  it('should return false if username is invalid', async () => {

    const user = {  // Arrange
      username: 'rayoMcQueen2001aaaaaaaaaaaaaaaaaa',
    }

    const result = await validateUser(user) // Act
    expect(result.success).toBe(false) // Assert
  })
  it('should return false if email is invalid', async () => {

    const user = {  // Arrange
      username: 'rayoMcQueen2001',
      email: 'mcrayo2001gmail.com',
      password: 'B123456!'
    }

    const result = await validateUser(user) // Act
    expect(result.success).toBe(false) // Assert
  })
  it('should return false if password is invalid', async () => {

    const user = {  // Arrange
      username: 'rayoMcQueen2001',
      email: 'mcrayo2001@gmail.com',
      password: 'B456!'
    }

    const result = await validateUser(user) // Act
    expect(result.success).toBe(false) // Assert
  })
})