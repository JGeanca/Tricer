import { Header } from './Header'
import { Footer } from './Footer'

import { Outlet } from 'react-router-dom'

export function Layout() {
  return (
    <div className='layout-container'>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

