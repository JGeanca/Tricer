import { useAuth } from '../hooks/useAuth'
import profileIcon from '../assets/icons/profile.svg'
import { useFeedback } from '../hooks/useFeedback'

import '../css/profilePage.css'

export default function ProfilePage() {
  const { user, logout } = useAuth()
  const { showError, showSuccess } = useFeedback()

  const handleLogout = async () => {
    try {
      await logout()
      showSuccess('Logout successful')
    } catch (error) {
      showError(error.message)
    }
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-avatar-container">
          <img
            src={user.avatarUrl || profileIcon}
            alt="User Avatar"
            className="profile-avatar"
          />
        </div>
        <h1 className="profile-username">
          Welcome, {user.username}!
        </h1>
        <div className="logout-button-container">
          <button
            onClick={handleLogout}
            className="logout-button"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  )
}
