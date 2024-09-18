import { Link } from 'react-router-dom'
import { CartIcon } from '../assets/Icons'

export function Header() {
  return (
    <header>
      <p>This is the Header!</p>
      <CartIcon />
      <nav>
        <Link to="/">HomePage</Link>
        <Link to="/men">MenPage</Link>
      </nav>
      <hr />
    </header>
  )
}