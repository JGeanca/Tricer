// Resources: 
// - https://icon-sets.iconify.design/
// - https://heroicons.com/

import shopSvg from '../assets/icons/shop.svg'
import profileSvg from '../assets/icons/profile.svg'
import cartSvg from '../assets/icons/cart.svg'

export function ShopTitle() {
  return (
    <img 
      src={shopSvg} 
      alt="Shop Icon" 
      width="171" 
      height="44" 
      className="size-6" 
    />
  )
}

export function ProfileIcon() {
  return (
    <img 
      src={profileSvg} 
      alt="Profile Icon" 
      width="50" 
      height="50" 
      className="size-6" 
    />
  )
}

export function CartIcon() {
  return (
    <img 
      src={cartSvg} 
      alt="Cart Icon" 
      width="32" 
      height="31" 
      className="size-6" 
    />
  )
}

export function InstagramIcon({ width = 48, height = 48 }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 24 24">
      <path fill="black" d="M13.61 12.243a1.6 1.6 0 1 1-1.56-1.63a1.62 1.62 0 0 1 1.56 1.63"></path>
      <path fill="black" d="M14.763 7.233H9.338a2.024 2.024 0 0 0-2.024 2.024v5.547a2.024 2.024 0 0 0 2.024 2.024h5.425a2.024 2.024 0 0 0 2.024-2.024V9.267a2.026 2.026 0 0 0-2.024-2.034m-2.713 7.723a2.703 2.703 0 1 1 2.642-2.703a2.67 2.67 0 0 1-2.642 2.703m2.936-5.405a.496.496 0 0 1-.496-.506a.506.506 0 1 1 1.012 0a.496.496 0 0 1-.557.506z"></path>
      <path fill="black" d="M12.05 2a10 10 0 1 0-.1 20a10 10 0 0 0 .1-20m6.073 12.702a3.39 3.39 0 0 1-3.41 3.411H9.389a3.39 3.39 0 0 1-3.411-3.41V9.378a3.39 3.39 0 0 1 3.41-3.411h5.325a3.39 3.39 0 0 1 3.41 3.41z"></path>
    </svg>
  )
}

export function FacebookIcon({ width = 48, height = 48 }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 24 24">
      <path fill="black" d="M22 12.08a10 10 0 0 1-8.91 9.893V14.8h2.35a.423.423 0 0 0 .422-.37l.254-2.202a.402.402 0 0 0-.402-.465H13.09v-1.8c0-.836.233-1.407 1.428-1.407h1.112a.423.423 0 0 0 .412-.424V6.238a.423.423 0 0 0-.423-.413H13.82a3.482 3.482 0 0 0-3.714 3.81v2.116H8.339a.413.413 0 0 0-.413.424v2.2a.413.413 0 0 0 .413.413h1.767v7.037A10 10 0 0 1 2 12.08a10 10 0 1 1 20 0"></path>
    </svg>
  )
}

export function XIcon({ width = 48, height = 48 }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 24 24">
      <path fill="black" d="M8 2H1l8.26 11.015L1.45 22H4.1l6.388-7.349L16 22h7l-8.608-11.478L21.8 2h-2.65l-5.986 6.886zm9 18L5 4h2l12 16z"></path>
    </svg>
  )
}

export function TiktokIcon({ width = 48, height = 48 }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 24 24"><path fill="black" d="M12 2a10 10 0 1 0 10 10A10.01 10.01 0 0 0 12 2m5.939 7.713v.646a.37.37 0 0 1-.38.37a5.36 5.36 0 0 1-2.903-1.108v4.728a3.94 3.94 0 0 1-1.18 2.81a4 4 0 0 1-2.87 1.17a4.1 4.1 0 0 1-2.862-1.17a3.98 3.98 0 0 1-1.026-3.805c.159-.642.48-1.232.933-1.713a3.58 3.58 0 0 1 2.79-1.313h.82v1.703a.348.348 0 0 1-.39.348a1.918 1.918 0 0 0-1.23 3.631c.27.155.572.246.882.267c.24.01.48-.02.708-.092a1.93 1.93 0 0 0 1.313-1.816V5.754a.36.36 0 0 1 .359-.36h1.415a.36.36 0 0 1 .359.34a3.3 3.3 0 0 0 1.282 2.245a3.25 3.25 0 0 0 1.641.636a.37.37 0 0 1 .338.35z"></path></svg>
  )
}

export function PinterestIcon({ width = 48, height = 48 }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 24 24"><path fill="black" d="M21.535 14.938a10.1 10.1 0 0 1-4.973 5.901a10.3 10.3 0 0 1-7.734.718a12.9 12.9 0 0 0 1.93-4.935l.441.341a3.35 3.35 0 0 0 2.888.586a4.85 4.85 0 0 0 1.785-.748a4.8 4.8 0 0 0 1.341-1.384a6.58 6.58 0 0 0 .98-5.49a5.54 5.54 0 0 0-1.617-2.732a5.64 5.64 0 0 0-2.866-1.413a7.22 7.22 0 0 0-5.496.831a5.7 5.7 0 0 0-1.879 1.812a5.6 5.6 0 0 0-.859 2.452a5.1 5.1 0 0 0 .916 3.784a2.7 2.7 0 0 0 1.078.906c.259.128.388-.086.474-.352c.184-.522.324-.789.108-1.215a4.23 4.23 0 0 1-.3-4.1a4.3 4.3 0 0 1 1.352-1.646a4.34 4.34 0 0 1 1.988-.799a4.8 4.8 0 0 1 2.931.427a3.75 3.75 0 0 1 1.484 1.316c.366.563.572 1.213.596 1.881a5.6 5.6 0 0 1-.851 3.667a2.74 2.74 0 0 1-.912.932a2.8 2.8 0 0 1-1.244.41a1.47 1.47 0 0 1-1.279-.475a1.43 1.43 0 0 1-.316-1.315c.205-.842.485-1.673.7-2.526c.093-.347.126-.708.098-1.066a1.28 1.28 0 0 0-.664-1.053a1.32 1.32 0 0 0-1.255-.013c-.306.152-.566.38-.756.663c-.189.282-.3.609-.322.947a3.8 3.8 0 0 0 .14 1.961a.8.8 0 0 1 0 .458c-.377 1.62-.808 3.198-1.077 4.85c-.09.771-.116 1.549-.076 2.324v.5a10.12 10.12 0 0 1-5.339-5.049a9.95 9.95 0 0 1-.471-7.29a10.07 10.07 0 0 1 4.645-5.682a10.26 10.26 0 0 1 7.309-1.068c1.326.342 2.569.947 3.652 1.778a10 10 0 0 1 2.648 3.058a9.9 9.9 0 0 1 .802 7.848"></path></svg>
  )
}
