import { useCallback } from 'react'

export function useValidation() {
  const validateUsername = useCallback((username) => {
    const usernameRegex = /^[a-zA-Z0-9_]+$/
    return username.length >= 4 && username.length <= 15 && usernameRegex.test(username)
  }, [])

  const validateEmail = useCallback((email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }, [])

  const validatePassword = useCallback((password) => {
    const uppercaseRegex = /[A-Z]/
    const numberRegex = /[0-9]/
    // const specialCharRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/
    return (
      password.length >= 8 &&
      password.length <= 20 &&
      uppercaseRegex.test(password) &&
      numberRegex.test(password)
      // && specialCharRegex.test(password)
    )
  }, [])

  const passwordsMatch = useCallback((password, confirmPassword) => password === confirmPassword, [])

  const validateExpirationDate = ((expirationDate) => {
    const expirationRegex = /^(0[1-9]|1[0-2]) \/ (\d{2})$/
    if (!expirationRegex.test(expirationDate)) {
      return false
    }

    const [, month, year] = expirationRegex.exec(expirationDate)
    const currentYear = new Date().getFullYear() % 100
    const currentMonth = new Date().getMonth() + 1

    if (parseInt(year, 10) < currentYear) {
      return false
    }
    if (parseInt(year, 10) === currentYear
      && parseInt(month, 10) < currentMonth) {
      return false
    }

    return true
  })

  return { validateUsername, validateEmail, validatePassword, passwordsMatch, validateExpirationDate }
}
