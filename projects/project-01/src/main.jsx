import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Layout } from './components/Layout'
import HomePage from './pages/HomePage'
import MenPage from './pages/MenPage'
import NotFoundPage from './pages/NotFoundPage'
import './index.css'

// Create a router
const router = createBrowserRouter([
  {
    path: '/', // The path of the route is '/'
    element: <Layout />,  // Render the Layout component when the path matches
    children: [  // The children are all the pages that will use the Layout (That will render the layout!)
      {
        index: true,  // This means that default route (/) will render
        element: <HomePage />,  // <- this page (Home)
      },
      {
        path: 'men',
        element: <MenPage />
      },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />
  }
])

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} /> // Wrap the router in a provider
)
