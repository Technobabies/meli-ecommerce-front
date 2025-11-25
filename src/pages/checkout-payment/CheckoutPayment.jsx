import { useState } from "react";
import AddressForm from './components/AddressForm';
import OrderSummary from "./components/OrderSummary";
import { useCart } from "../../context/CartContext";
import { createOrder } from "../../api/ordersApi";
import CardInfo from "../profile/components/CardInfo";

export default function CheckoutPaymentPage() {

  const { items } = useCart();
  const [addingNew, setAddingNew] = useState(false);
  const [address, setAddress] = useState(null);
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [loading, setLoading] = useState(false);

  const total = items.reduce(
    (sum, i) => sum + i.pricePerUnit * i.quantity,
    0
  );

  const handlePlaceOrder = async () => {
    if (!address) return alert("Please fill the shipping information.");
    if (!selectedMethod) return alert("Please select a payment method.");

    const order = {
      address,
      paymentMethod: selectedMethod,
      items,
      total
    };
    
    setLoading(true);
    try {
      const response = await createOrder(order);
      alert("Order placed successfully!");
    } catch (err) {
      alert("Something went wrong.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 text-white">
      <h1 className="text-3xl font-bold mb-8">Checkout & Payment</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* LEFT COLUMN */}
        <div className="space-y-8">

          {/* Shipping Info */}
          <div className="bg-secondary p-6 rounded-xl shadow">
            <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
            <AddressForm onSave={(data) => setAddress(data)} />
          </div>
          
          {/* Payment Methods */}
          <CardInfo/>
        </div>

        <div className="bg-secondary p-6 rounded-xl shadow h-fit">
          <OrderSummary items={items} />

          <button
            onClick={handlePlaceOrder}
            disabled={loading}
            className="mt-8 w-full bg-primary text-surface py-3 rounded-lg hover:bg-green-400 transition disabled:opacity-50"
          >
            {loading ? "Processing..." : "Place Order"}
          </button>
        </div>

      </div>
    </div>
  );
}
