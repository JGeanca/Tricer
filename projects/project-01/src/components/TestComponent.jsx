import { useAuth } from '../hooks/useAuth'
import { useState, useEffect } from 'react'

export function TestComponent() {
  const { user, isLoading, logout, isAuthenticated } = useAuth()
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    if (!isLoading) {
      setIsInitialized(true)
    }
  }, [isLoading])

  if (!isInitialized) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <div className="animate-pulse">
          <div className="h-8 w-32 bg-gray-200 rounded" />
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="p-4 text-center">
        <h1 className="text-xl font-semibold text-gray-800">
          Please login to see the content of this page!
        </h1>
      </div>
    )
  }

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