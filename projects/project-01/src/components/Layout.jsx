import Header from './Header'
import Footer from './Footer'
import TitleUpdater from './TitleUpdater'
import { Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'


//TODO: Import useSessionTimeout 
export default function Layout() {
  //TODO: useSessionTimeout()
  const { pathname } = useLocation()
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'auto'

    // Force scroll to top 
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'auto',
    })
  }, [pathname])

  return (
    <div className='layout-container'>
      <TitleUpdater />
      <Header />
      <main>
        <div className='main-content'>
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  )
}