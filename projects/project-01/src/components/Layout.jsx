import Header from './Header'
import Footer from './Footer'
import TitleUpdater from './TitleUpdater'
import { Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <div className='layout-container'>
      <TitleUpdater />
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

