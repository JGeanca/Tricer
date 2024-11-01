import { useAuth } from '../hooks/useAuth'
import profileIcon from '../assets/icons/profile.svg'
import '../css/profilePage.css'

export default function ProfilePage() {
  const { user, logout } = useAuth()

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
            onClick={logout}
            className="logout-button"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  )
}
