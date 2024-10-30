import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { Loading } from './Loading'

export function PublicOnlyRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuth()
  const location = useLocation()

  if (isLoading) return <Loading />

  if (isAuthenticated) {
    // if the user is authenticated, redirect it
    const previousRoute = location.state?.from?.pathname || '/'
    return <Navigate to={previousRoute} replace />
  }

  return children
}