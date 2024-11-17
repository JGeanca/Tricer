import { useAuth } from '../hooks/useAuth'
import { ProfileIcon } from '../assets/Icons'
import { Button } from 'react-bootstrap'
import { useFeedback } from '../hooks/useFeedback'
import { Link } from 'react-router-dom'
import '../css/userAccount.css'

export default function UserAccount() {
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
    <div className="user-account-section">
      <div className="user-info-section">
        <div className= "user-profile-avatar">
          <ProfileIcon />
        </div>
        <h1 className="user-username">
          {user.username}
        </h1>
      </div>
      <div className="profile-buttons-sections">
        <Link to="/Profile" className="header-profile-button">
          Profile
        </Link>
        <Button onClick={handleLogout} className="profile-logout-button">
          Logout
        </Button>
      </div>
    </div>
  )
}