import { useAuth } from '../hooks/useAuth'

export function TestComponent() {
  const { user, logout } = useAuth()

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Welcome, {user.username}!</h1>
      <button
        onClick={logout}
        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
      >
        Logout
      </button>
    </div>
  )
}