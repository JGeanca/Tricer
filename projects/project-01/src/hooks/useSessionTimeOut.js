import { useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'

//TODO: Use this in Layout
//TODO: Choose the time for the session to expire, for now it is 30 minutes
const SESSION_TIMEOUT = 30 * 60 * 1000

export const useSessionTimeout = () => {
  const { logout } = useAuth()

  useEffect(() => {
    let timeoutId

    const resetTimeout = () => {
      if (timeoutId) clearTimeout(timeoutId)

      // When the timer expires, we call the logout function
      timeoutId = setTimeout(logout, SESSION_TIMEOUT)
    }

    // These events are natives in js
    const events = ['mousedown', 'keypress', 'scroll', 'touchstart']
    events.forEach(event => document.addEventListener(event, resetTimeout))

    resetTimeout()
    return () => {
      if (timeoutId) clearTimeout(timeoutId)
      events.forEach(event => document.removeEventListener(event, resetTimeout))
    }
  }, [logout])
}