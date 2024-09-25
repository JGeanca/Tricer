import { InstagramIcon, FacebookIcon, TiktokIcon, PinterestIcon } from '../assets/Icons'
import { Link } from 'react-router-dom'

export function Footer() {
  return (
    <footer>
      <div className='footer-links'>
        <div className='footer-links-column'>
          <strong>Need help?</strong>
          <a href='mailto:support@tricer.com'>Send email</a>
        </div>
        <div className='footer-links-column'>
          <strong>We are TRICER</strong>
          <Link to='/about-us'>About Us</Link>
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
          <Link to="/support">Support</Link>
          <Link to="/terms">Terms and Conditions</Link>
          <Link to="/cookies">Cookie Policy</Link>
        </div>
        <div className='footer-bottom-right'>
          <span>Costa Rica | English</span>
          <span>© 2024 TRICER</span>
        </div>
      </div>
    </footer>
  )
}
