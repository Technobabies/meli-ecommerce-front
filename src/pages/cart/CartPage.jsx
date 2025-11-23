import { useState } from "react";
import { useCart, useCartDispatch } from "../../context/CartContext";
import { createOrder } from "../../api/ordersApi";
import { DUMMY_USER_ID } from "../../data/dummyProducts";

export default function CartPage() {
  const { items } = useCart();
  const dispatch = useCartDispatch();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  // ===================== NUEVO: estado para la tarjeta =====================
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [expirationMonth, setExpirationMonth] = useState("");
  const [expirationYear, setExpirationYear] = useState("");
  const [cvv, setCvv] = useState("");
  // ========================================================================

  const total = items.reduce(
    (sum, i) => sum + i.pricePerUnit * i.quantity,
    0
  );

  // ===================== NUEVO: validación de datos de pago =================
  const validateCardData = () => {
    // que no falte ningún campo
    if (
      !cardNumber ||
      !cardHolder ||
      !expirationMonth ||
      !expirationYear ||
      !cvv
    ) {
      setStatus("Please fill in all card details.");
      return false;
    }

    // solo números y exactamente 16 dígitos
    if (!/^\d{16}$/.test(cardNumber)) {
      setStatus(
        "Card number must contain exactly 16 digits and only numbers."
      );
      return false;
    }

    // CVV solo números, 3 o 4 dígitos
    if (!/^\d{3,4}$/.test(cvv)) {
      setStatus("CVV must contain 3 or 4 digits.");
      return false;
    }

    const month = Number(expirationMonth);
    const year = Number(expirationYear);

    // mes válido
    if (month < 1 || month > 12) {
      setStatus("Expiration month must be between 1 and 12.");
      return false;
    }

    // 🔥 validar que la fecha de expiración aun no haya pasado
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth() + 1; // getMonth() va de 0 a 11

    if (year < currentYear || (year === currentYear && month < currentMonth)) {
      setStatus("The card is expired. Please use a valid expiration date.");
      return false;
    }

    setStatus("");
    return true;
  };
  // ========================================================================

  const handleCheckout = async () => {
    if (!items.length) return;

    // =============== NUEVO: validar datos de la tarjeta antes de enviar =====
    const isValid = validateCardData();
    if (!isValid) return;
    // =======================================================================

    const order = {
      createdBy: DUMMY_USER_ID,
      items: items.map((i) => ({
        productId: i.productId,
        productName: i.productName,
        quantity: i.quantity,
        pricePerUnit: i.pricePerUnit,
      })),
      // NOTA: aquí NO estamos mandando los datos de la tarjeta al backend,
      // solo se simula el ingreso y la validación en el frontend.
    };

    console.log("Order:", order);
    console.log("Simulated card data:", {
      cardNumber,
      cardHolder,
      expirationMonth,
      expirationYear,
      cvv,
    });

    try {
      setLoading(true);
      setStatus("");
      await createOrder(order);
      setStatus("Order created successfully!");
      dispatch({ type: "CLEAR" });

      // NUEVO: limpiar campos de tarjeta después del “pago”
      setCardNumber("");
      setCardHolder("");
      setExpirationMonth("");
      setExpirationYear("");
      setCvv("");
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
            {items.map((i) => (
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

          {/* =================== NUEVO: sección de pago con tarjeta =================== */}
          <div className="bg-secondary p-4 rounded-lg mb-6 space-y-4">
            <h2 className="text-lg font-semibold text-white mb-2">
              Payment details
            </h2>

            <div>
              <label className="block text-sm text-gray-300 mb-1">
                Card number
              </label>
              <input
                type="text"
                inputMode="numeric"
                maxLength={16}
                value={cardNumber}
                onChange={(e) =>
                  setCardNumber(e.target.value.replace(/\D/g, ""))
                } // solo números
                placeholder="1234 5678 9012 3456"
                className="w-full px-3 py-2 rounded-md bg-surface text-white outline-none"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-300 mb-1">
                Name on card
              </label>
              <input
                type="text"
                value={cardHolder}
                onChange={(e) => setCardHolder(e.target.value)}
                placeholder="Name Surname"
                className="w-full px-3 py-2 rounded-md bg-surface text-white outline-none"
              />
            </div>

            <div className="flex gap-3">
              <div className="flex-1">
                <label className="block text-sm text-gray-300 mb-1">
                  Exp. month
                </label>
                <input
                  type="number"
                  min={1}
                  max={12}
                  value={expirationMonth}
                  onChange={(e) => setExpirationMonth(e.target.value)}
                  placeholder="10"
                  className="w-full px-3 py-2 rounded-md bg-surface text-white outline-none"
                />
              </div>

              <div className="flex-1">
                <label className="block text-sm text-gray-300 mb-1">
                  Exp. year
                </label>
                <input
                  type="number"
                  min={2024}
                  value={expirationYear}
                  onChange={(e) => setExpirationYear(e.target.value)}
                  placeholder="2026"
                  className="w-full px-3 py-2 rounded-md bg-surface text-white outline-none"
                />
              </div>

              <div className="flex-1">
                <label className="block text-sm text-gray-300 mb-1">
                  CVV
                </label>
                <input
                  type="password"
                  inputMode="numeric"
                  maxLength={4}
                  value={cvv}
                  onChange={(e) =>
                    setCvv(e.target.value.replace(/\D/g, ""))
                  }
                  placeholder="123"
                  className="w-full px-3 py-2 rounded-md bg-surface text-white outline-none"
                />
              </div>
            </div>
          </div>
          {/* ===================================================================== */}

          {/* Total + botón de checkout (YA LO TENÍAS) */}
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
