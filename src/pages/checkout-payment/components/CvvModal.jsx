import { useState, useEffect } from "react";

export default function CvvModal({ isOpen, onClose, onConfirm }) {
  const [cvv, setCvv] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (isOpen) {
      setCvv("");
      setError("");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const validate = (value) => {
    if (!/^\d{3}$/.test(value)) {
      setError("CVV must be exactly 3 digits.");
      return false;
    }
    setError("");
    return true;
  };

  const handleConfirm = () => {
    if (validate(cvv)) {
      onConfirm(cvv);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-80">
        <h2 className="text-xl font-bold text-white mb-4">Enter CVV</h2>

        <div className="mb-4">
          <label className="block text-gray-300 mb-1">CVV (3 digits)</label>
          <input
            type="password"
            maxLength="3"
            className="w-full px-3 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none"
            value={cvv}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, ""); // only numbers
              setCvv(value);
              if (value.length === 3) validate(value);
            }}
          />
        </div>

        {error && (
          <p className="text-red-400 text-sm mb-3">{error}</p>
        )}

        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={!/^\d{3}$/.test(cvv)}
            className={`px-4 py-2 rounded text-white font-bold ${
              /^\d{3}$/.test(cvv)
                ? "bg-green-500 hover:bg-green-600"
                : "bg-green-900 cursor-not-allowed"
            }`}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
