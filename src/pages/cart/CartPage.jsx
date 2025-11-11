import { useState } from "react";
import { useCart, useCartDispatch } from "../../context/CartContext";
import { createOrder } from "../../api/ordersApi";
import { DUMMY_USER_ID } from "../../data/dummyProducts";

export default function CartPage() {
  const { items } = useCart();
  const dispatch = useCartDispatch();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const total = items.reduce((sum, i) => sum + i.pricePerUnit * i.quantity, 0);

  const handleCheckout = async () => {
    if (!items.length) return;

    const order = {
      createdBy: DUMMY_USER_ID,
      orderItems: items.map(i => ({
        productId: i.productId,
        productName: i.productName,
        quantity: i.quantity,
        pricePerUnit: i.pricePerUnit,
        totalPrice: i.pricePerUnit * i.quantity,
      })),
      totalPrice: total,
      status: "CREATED",
    };

    try {
      setLoading(true);
      setStatus("");
      await createOrder(order);
      setStatus("Order created successfully!");
      dispatch({ type: "CLEAR" });
    } catch (err) {
      console.error(err);
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
              onClick={handleCheckout}
              disabled={loading}
              className="bg-primary text-surface px-6 py-2 rounded-lg hover:bg-green-400 transition disabled:opacity-50"
            >
              {loading ? "Processing..." : "Checkout"}
            </button>
          </div>
        </>
      )}

      {status && <p className="text-center text-gray-300 mt-4">{status}</p>}
    </div>
  );
}
