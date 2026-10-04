import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { CartProvider } from './context/CartContext'
import { MembershipProvider } from './context/MembershipContext'
import { CartPage } from './pages/CartPage'
import { HomePage } from './pages/HomePage'
import { MembershipsPage } from './pages/MembershipsPage'
import { ProductPage } from './pages/ProductPage'
import { ShopPage } from './pages/ShopPage'
import { WholesalePage } from './pages/WholesalePage'

export default function App() {
  return (
    <MembershipProvider>
      <CartProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="shop" element={<ShopPage />} />
              <Route path="wholesale" element={<WholesalePage />} />
              <Route path="memberships" element={<MembershipsPage />} />
              <Route path="product/:id" element={<ProductPage />} />
              <Route path="cart" element={<CartPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </MembershipProvider>
  )
}
