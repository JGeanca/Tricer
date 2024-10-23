import { useAuth } from '../hooks/useAuth'

export function TestComponent() {
  const { user, isLoading, isAuthenticated, logout } = useAuth()

  if (isLoading) return <div>Loading...</div>
  if (!isAuthenticated) return <h1>Please login to see the content of this page!!!</h1>


  return (
    <div>
      <h1>Welcome, {user.username}!</h1>
      <button onClick={logout}>Logout</button>
    </div>
  )

}
