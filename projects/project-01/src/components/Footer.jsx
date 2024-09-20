import { InstagramIcon, FacebookIcon, TiktokIcon, PinterestIcon } from '../assets/Icons'
import { Link } from 'react-router-dom'

export function Footer() {
  return (
    <footer>
      <div className='footer-links'>
        <div className='footer-links-column'>
          <strong>¿Necesitas ayuda?</strong>
          <Link to='/contact'>Enviar e-mail</Link>
        </div>
        <div className='footer-links-column'>
          <strong>Somos TRICER</strong>
          <Link to='/about-us'>Sobre Nosotros</Link>
          <Link to='/faq'>FAQ</Link>
        </div>
      </div>
      <div className='footer-social'>
        <a href='https://es.pinterest.com/' target='_blank' rel='noopener noreferrer'><PinterestIcon /></a>
        <a href='https://www.instagram.com/' target='_blank' rel='noopener noreferrer'><InstagramIcon /></a>
        <a href='https://www.facebook.com/' target='_blank' rel='noopener noreferrer'><FacebookIcon /></a>
        <a href='https://www.tiktok.com/' target='_blank' rel='noopener noreferrer'><TiktokIcon /></a>
      </div>
      <div className='footer-bottom'>
        <div className='footer-bottom-left'>
          <Link to="/support">Soporte</Link>
          <Link to="/terms">Términos y Condiciones</Link>
          <Link to="/cookies">Políticas de cookies</Link>
        </div>
        <div className='footer-bottom-right'>
          <span>Costa Rica | Español</span>
          <span>© 2021 TRICER</span>
        </div>
      </div>
    </footer>
  )
}