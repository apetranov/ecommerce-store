import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import NotFoundPage from './components/NotFoundPage.jsx'
import ProductDetails from './components/ProductDetails.jsx'

const router = createBrowserRouter([
  {path: "/", element: <App />},
  {path: "*", element: <NotFoundPage />},
  {path: "/product/:id", element: <ProductDetails />}
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
