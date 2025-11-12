import { render, screen } from "@testing-library/react";
import CartPage from "../pages/cart/CartPage";
import { CartProvider } from "../context/CartContext";

describe("CartPage (integration test)", () => {
  it("shows empty cart message when provider has no items", () => {
    render(
      <CartProvider>
        <CartPage />
      </CartProvider>
    );

    // adjust text to whatever your empty-cart message says in CartPage.jsx
    expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument();
  });
});
