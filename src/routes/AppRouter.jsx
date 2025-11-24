import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductsPage from "../pages/products/ProductsPage";
import CartPage from "../pages/cart/CartPage";
import { CartProvider } from "../context/CartContext";
import Header from "../components/Header";
import ProfilePage from "../pages/profile/ProfilePage";

export default function AppRouter() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Header />
        <main className="max-w-6xl mx-auto">
          <Routes>
            <Route path="/" element={<ProductsPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </main>
      </BrowserRouter>
    </CartProvider>
  );
}
