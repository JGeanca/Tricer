import { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'

// This hook is to use or "consume" the AuthContext
export const useAuth = () => useContext(AuthContext)