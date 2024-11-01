import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { routes } from './routes/routes'
import { FeedbackMessageContainer } from './components/FeedbackMessageContainer'
import { GOOGLE_CLIENT_ID } from './config'

import 'bootstrap/dist/css/bootstrap.min.css'
import './css/footer.css'
import './css/header.css'
import './css/index.css'
import './css/layout.css'

const queryClient = new QueryClient()
const router = createBrowserRouter(routes)

createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <RouterProvider router={router} />
      <ReactQueryDevtools />
      <FeedbackMessageContainer />
    </GoogleOAuthProvider>;
  </QueryClientProvider>
)
