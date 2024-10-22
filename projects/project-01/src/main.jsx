import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import CollectionsAndArrivalsPage from './pages/CollectionsAndArrivalsPage'
import ProductsPage from './pages/ProductsPage'
import ProductDetailsPage from './pages/ProductDetailsPage'
import NoFoundPage from './pages/NoFoundPage'
import { LoginForm } from './components/LoginForm'
import { RegisterForm } from './components/RegisterForm'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

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
        path: 'login',
        element: <LoginForm />,
      },
      {
        path: 'register',
        element: <RegisterForm />,
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

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
    <ReactQueryDevtools />
  </QueryClientProvider>
)
