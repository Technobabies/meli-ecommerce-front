import { useState } from "react";
import AddressForm from "./components/AddressForm";
import OrderSummary from "./components/OrderSummary";
import CardSelector from "./components/CardSelector";
import { useCart, useCartDispatch } from "../../context/CartContext";
import { createOrder } from "../../api/ordersApi";
import { CARDS_USER_ID } from "../../data/dummyProducts";
import { createPayment } from "../../api/paymentApi";
import CvvModal from "./components/CvvModal";
import { useNavigate } from "react-router-dom";

export default function CheckoutPaymentPage() {
  const { items } = useCart();
  const dispatch = useCartDispatch();

  const [address, setAddress] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const [loading, setLoading] = useState(false);

  // CVV modal state
  const [isCvvOpen, setIsCvvOpen] = useState(false);
  const navigate = useNavigate();

  const total = items.reduce((sum, i) => sum + i.pricePerUnit * i.quantity, 0);

  const validateAddress = () => {
    if (!address) return false;

    if (!address.address || address.address.trim() === "") return false;
    if (!address.city || address.city.trim() === "") return false;
    if (!address.postal || address.postal.trim() === "") return false;

    return true;
  };

  const handleOpenCvv = () => {
    // Validate address before allowing payment
    if (!validateAddress()) {
      return alert("Please complete the shipping address (address, city, postal) before placing your order.");
    }

    if (!selectedCard) {
      return alert("Please select a payment method.");
    }

    setIsCvvOpen(true);
  };

  const handlePlaceOrder = async (cvv) => {

    console.log(`Happy CVV ${cvv}`)

    const order = {
      createdBy: CARDS_USER_ID,
      items: items.map((i) => ({
        productId: i.productId,
        productName: i.productName,
        quantity: i.quantity,
        pricePerUnit: i.pricePerUnit,
      })),
    };

    setLoading(true);

    try {
      const orderResponse = await createOrder(order);

      const orderId = orderResponse.data.id;

      const paymentPayload = {
        orderId: orderId,
        cardId: selectedCard.id,
      };

      const paymentResponse = await createPayment(paymentPayload);
      console.log(paymentResponse);
      alert("Order placed successfully!");
      dispatch({ type: "CLEAR" });
      navigate('/');
    } catch (err) {
      alert("Something went wrong.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <CvvModal
        isOpen={isCvvOpen}
        onClose={() => setIsCvvOpen(false)}
        onConfirm={handlePlaceOrder}
      />
      <div className="p-8 text-white">
        <h1 className="text-3xl font-bold mb-8">Checkout & Payment</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* LEFT COLUMN */}
          <div className="space-y-8">
            {/* Shipping Info */}
            <div className="bg-secondary p-6 rounded-xl shadow">
              <h2 className="text-xl font-semibold mb-4">
                Shipping Information
              </h2>
              <AddressForm onSave={(data) => setAddress(data)} />
            </div>

            {/* Payment Methods */}
            <div className="bg-secondary p-6 rounded-xl shadow">
              <h2 className="text-xl font-semibold mb-4">Payment Methods</h2>
              <CardSelector onCardSelect={(card) => setSelectedCard(card)} />
            </div>
          </div>

          <div className="bg-secondary p-6 rounded-xl shadow h-fit">
            <OrderSummary items={items} />

            <button
              onClick={handleOpenCvv}
              disabled={loading}
              className="mt-8 w-full bg-primary text-surface py-3 rounded-lg hover:bg-green-400 transition-all duration-200 disabled:opacity-50 hover:scale-105 transform active:scale-95 font-semibold"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin h-5 w-5 mr-3"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                "Place Order"
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
