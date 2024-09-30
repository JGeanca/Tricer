import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import CollectionsAndArrivalsPage from './pages/CollectionsAndArrivalsPage'
import ProductsPage from './pages/ProductsPage'
import ProductDetailsPage from './pages/ProductDetailsPage'
import NoFoundPage from './pages/NoFoundPage'
import 'bootstrap/dist/css/bootstrap.min.css'

import './css/index.css'
import './css/layout.css'
import './css/header.css'
import './css/footer.css'

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
        path: ':gender/',
        element: <CollectionsAndArrivalsPage />,
      },
      {
        path: ':gender/:productType',
        element: <ProductsPage />
      },
      {
        path: ':gender/:productType/:productId',
        element: <ProductDetailsPage /> //ProductDetailsPage(Cart)
      }
    ],
  },
  {
    path: '*',
    element: <NoFoundPage />
  }
])

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} /> // Wrap the router in a provider
)
