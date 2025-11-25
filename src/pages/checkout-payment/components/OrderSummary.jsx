export default function OrderSummary({ items }) {
  const total = items.reduce(
    (sum, i) => sum + i.pricePerUnit * i.quantity,
    0
  );

  return (
    <div className="bg-secondary">
      <h2 className="text-xl font-semibold text-white mb-4">Order Summary</h2>

      <div className="space-y-3 mb-4">
        {items.map((item) => (
          <div
            key={item.productId}
            className="flex justify-between text-gray-300"
          >
            <div>
              <p className="font-medium">{item.productName}</p>
              <p className="text-sm text-gray-500">
                {item.quantity} × ${item.pricePerUnit.toFixed(2)}
              </p>
            </div>
            <p className="font-semibold">
              ${(item.pricePerUnit * item.quantity).toFixed(2)}
            </p>
          </div>
        ))}
      </div>

      <div className="border-t border-gray-700 pt-4">
        <div className="flex justify-between text-lg font-bold text-white">
          <p>Total:</p>
          <p>${total.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
}
