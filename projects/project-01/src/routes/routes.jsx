import Layout from '../components/Layout'
import { TestComponent } from '../components/TestComponent'
import HomePage from '../pages/HomePage'
import NoFoundPage from '../pages/NoFoundPage'
import LoginPage from '../pages/LoginPage'
import RegisterPage from '../pages/RegisterPage'
import ProductDetailsPage from '../pages/ProductDetailsPage'
import ProductsPage from '../pages/ProductsPage'
import CollectionsAndArrivalsPage from '../pages/CollectionsAndArrivalsPage'
import { ProtectedRoute } from '../components/ProtectedRoute'

export const routes = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'test',
        element: (
          <ProtectedRoute>
            <TestComponent />
          </ProtectedRoute>
        ),
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
        element: <ProductDetailsPage />
      }
    ],
  },
  {
    path: '*',
    element: <NoFoundPage />
  },
  {
    path: 'login',
    element: <LoginPage />,
  },
  {
    path: 'register',
    element: <RegisterPage />,
  },
]