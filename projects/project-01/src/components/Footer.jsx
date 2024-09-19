import { InstagramIcon, FacebookIcon, XIcon, TiktokIcon, PinterestIcon } from '../assets/Icons'

export function Footer() {
  return (
    <footer>
      <hr />
      <div className='icons'>
        <PinterestIcon />
        <InstagramIcon />
        <FacebookIcon />
        <TiktokIcon />
      </div>

      <p>Footer miedo &copy; 2024 Tricer</p>
    </footer>
  )
}