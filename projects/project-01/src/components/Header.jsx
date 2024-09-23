import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { CartIcon, ShopTitle, ProfileIcon } from '../assets/Icons'
import '../css/header.css'

export function Header() {
  const [dropdownVisible, setDropdownVisible] = useState(false)
  const [dropdownCategory, setDropdownCategory] = useState('')
  const location = useLocation()
  let timeoutId

  const handleMouseEnter = (category) => {
    clearTimeout(timeoutId)
    setDropdownCategory(category)
    setDropdownVisible(true)
  }

  const handleMouseLeave = () => {
    timeoutId = setTimeout(() => {
      setDropdownVisible(false)
      setDropdownCategory('')
    }, 200) // Retardo de 200ms
  }

  const isActiveLink = (path, category) => {
    return location.pathname === path || dropdownCategory === category
  }

  return (
    <header className="header-container">
      <nav className="header-nav">
        <div className="header-left">
          <div 
            className="header-link-container" 
            onMouseEnter={() => handleMouseEnter('women')}
            onMouseLeave={handleMouseLeave}
          >
            <Link 
              to="/women" 
              className={`header-link ${isActiveLink('/women', 'women') ? 'active' : ''}`}
            >
              Women
            </Link>
          </div>
          <div 
            className="header-link-container" 
            onMouseEnter={() => handleMouseEnter('men')}
            onMouseLeave={handleMouseLeave}
          >
            <Link 
              to="/men" 
              className={`header-link ${isActiveLink('/men', 'men') ? 'active' : ''}`}
            >
              Men
            </Link>
          </div>
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

      {dropdownVisible && (
        <div 
          className="fixed-dropdown" 
          onMouseEnter={() => handleMouseEnter(dropdownCategory)} 
          onMouseLeave={handleMouseLeave}
        >
          <Link to={`/${dropdownCategory}/clothing`} className="dropdown-item">Clothing</Link>
          <Link to={`/${dropdownCategory}/footwear`} className="dropdown-item">Footwear</Link>
          <Link to={`/${dropdownCategory}/accessories`} className="dropdown-item">Accessories</Link>
        </div>
      )}
    </header>
  )
}
