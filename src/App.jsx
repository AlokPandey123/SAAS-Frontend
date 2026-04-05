import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { CartProvider } from './context/CartContext'
import MainLayout from './layouts/MainLayout'
import CartPage from './pages/CartPage'
import CategoryPage from './pages/CategoryPage'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import NotFoundPage from './pages/NotFoundPage'
import ProductDetailsPage from './pages/ProductDetailsPage'
import ProfilePage from './pages/ProfilePage'
import RegisterPage from './pages/RegisterPage'
import './App.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'category/:categoryId',
        element: <CategoryPage />,
      },
      {
        path: 'product/:slug',
        element: <ProductDetailsPage />,
      },
      {
        path: 'cart',
        element: <CartPage />,
      },
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'register',
        element: <RegisterPage />,
      },
      {
        path: 'profile',
        element: <ProfilePage />,
      },
      {
        path: 'home',
        element: <Navigate to="/" replace />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
])

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
    </AuthProvider>
  )
}

export default App
