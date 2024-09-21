import { Link } from 'react-router-dom'
import { CartIcon, ShopTitle, ProfileIcon } from '../assets/Icons'
import '../css/header.css'

export function Header() {
  return (
    <header className="header-container">
      <nav className="header-nav">
        <div className="header-left">
          <Link to="/women" className="header-link">Women</Link>
          <Link to="/men" className="header-link">Men</Link>
        </div>
        <div className="header-center">
          <Link to="/" className="header-logo">
            <ShopTitle />
          </Link>
        </div>
        <div className="header-right">
          <div className="header-search">
            <input type="search" placeholder="Search" />
          </div>
          <Link to="/cart" className="header-cart">
            <CartIcon />
          </Link>
          <Link to="/profile" className="header-profile">
            <ProfileIcon />
          </Link>
        </div>
      </nav>
    </header>
  )
}