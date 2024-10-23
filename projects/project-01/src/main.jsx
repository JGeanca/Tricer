import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout'
import { TestComponent } from './components/TestComponent'
import CollectionsAndArrivalsPage from './pages/CollectionsAndArrivalsPage'
import HomePage from './pages/HomePage'
import Login from './pages/Login'
import RegisterPage from './pages/RegisterPage'
import NoFoundPage from './pages/NoFoundPage'
import ProductDetailsPage from './pages/ProductDetailsPage'
import ProductsPage from './pages/ProductsPage'

import 'bootstrap/dist/css/bootstrap.min.css'
import './css/footer.css'
import './css/header.css'
import './css/index.css'
import './css/layout.css'

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
        path: 'test',
        element: <TestComponent />,
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

  },
  {
    path: 'login',
    element: <Login />,
  },
  {
    path: 'register',
    element: <RegisterPage />,
  },
])

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
    <ReactQueryDevtools />
  </QueryClientProvider>
)
