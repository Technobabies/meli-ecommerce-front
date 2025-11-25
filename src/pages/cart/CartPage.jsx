import { useState } from "react";
import { useCart, useCartDispatch } from "../../context/CartContext";
import { createOrder } from "../../api/ordersApi";
import { CARDS_USER_ID } from "../../data/dummyProducts";
import { useNavigate } from "react-router-dom";

export default function CartPage() {
  const { items } = useCart();
  const dispatch = useCartDispatch();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const navigate = useNavigate();

  const total = items.reduce((sum, i) => sum + i.pricePerUnit * i.quantity, 0);

  const goToCheckout = () => {
    navigate('/checkout-payment');
  };

  const handleCheckout = async () => {
    if (!items.length) return;

    const order = {
      createdBy: CARDS_USER_ID,
      items: items.map(i => ({
        productId: i.productId,
        productName: i.productName,
        quantity: i.quantity,
        pricePerUnit: i.pricePerUnit
      }))
    };

    console.log("🛒 Creating order:", order);
    console.log("📦 Order items:", JSON.stringify(order.items, null, 2));

    try {
      setLoading(true);
      setStatus("");
      console.log("🚀 Sending order to API...");
      const result = await createOrder(order);
      console.log("✅ Order created successfully:", result);
      setStatus("Order created successfully!");
      dispatch({ type: "CLEAR" });
    } catch (err) {
      console.error("❌ Order creation failed:", err);
      console.error("Response data:", err?.response?.data);
      console.error("Status:", err?.response?.status);
      setStatus("Error creating order.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-white mb-4">Shopping Cart</h1>

      {items.length === 0 ? (
        <p className="text-gray-400">Your cart is empty.</p>
      ) : (
        <>
          <ul className="space-y-4 mb-6">
            {items.map(i => (
              <li
                key={i.productId}
                className="flex justify-between bg-secondary p-4 rounded-lg"
              >
                <div>
                  <p className="font-medium">{i.productName}</p>
                  <p className="text-sm text-gray-400">
                    {i.quantity} × ${i.pricePerUnit.toFixed(2)}
                  </p>
                </div>
                <button
                  onClick={() =>
                    dispatch({ type: "REMOVE_ITEM", payload: i.productId })
                  }
                  className="text-red-400 hover:text-red-500"
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>

          <div className="flex justify-between items-center mb-6">
            <p className="text-lg font-semibold text-white">
              Total: ${total.toFixed(2)}
            </p>
            <button
              onClick={goToCheckout}
              className="bg-primary text-surface px-6 py-2 rounded-lg hover:bg-green-400 transition disabled:opacity-50"
            >
              Checkout
            </button>
          </div>
        </>
      )}

      {status && <p className="text-center text-gray-300 mt-4">{status}</p>}
    </div>
  );
}
