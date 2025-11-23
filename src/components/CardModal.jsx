import { useState, useEffect } from "react";

export default function CardModal({ isOpen, onClose, onSave, cardToEdit }) {
  const [cardholderName, setCardholderName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isEditing = !!cardToEdit;

  const validate = () => {
    const newErrors = {};
    if (!cardholderName) {
      newErrors.cardholderName = "Cardholder name is required.";
    }
    if (!/^\d{16}$/.test(cardNumber)) {
      newErrors.cardNumber = "Card number must be 16 digits.";
    }
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expirationDate)) {
      newErrors.expirationDate = "Expiration date must be in MM/YY format.";
    } else {
      const [month, year] = expirationDate.split("/");
      const expiration = new Date(`20${year}`, month - 1);
      const now = new Date();
      if (expiration < now) {
        newErrors.expirationDate = "Card has expired.";
      }
    }
    return newErrors;
  };

  useEffect(() => {
    if (isEditing) {
      setCardholderName(cardToEdit.cardholderName);
      setCardNumber(cardToEdit.cardNumber);
      setExpirationDate(cardToEdit.expirationDate);
    } else {
      setCardholderName("");
      setCardNumber("");
      setExpirationDate("");
    }
  }, [cardToEdit, isEditing]);

  useEffect(() => {
    setErrors(validate());
  }, [cardholderName, cardNumber, expirationDate]);

  if (!isOpen) {
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true);
      const cardData = {
        cardholderName,
        cardNumber: isEditing
          ? cardNumber
          : `**** **** **** ${cardNumber.slice(-4)}`,
        expirationDate,
      };
      await onSave(cardData);
      setIsSubmitting(false);
    }
  };

  const handleBlur = (field) => {
    setErrors({
      ...errors,
      [field]: validate()[field],
    });
  };

  const isFormValid = () => {
    return (
      Object.values(errors).every((error) => !error) &&
      cardholderName &&
      cardNumber &&
      expirationDate
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold text-white mb-6">
          {isEditing ? "Edit Card" : "Add a New Card"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="cardholderName" className="block text-white mb-2">
              Cardholder Name
            </label>
            <input
              type="text"
              id="cardholderName"
              value={cardholderName}
              onChange={(e) => setCardholderName(e.target.value)}
              onBlur={() => handleBlur("cardholderName")}
              className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-blue-500"
            />
            {errors.cardholderName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.cardholderName}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="cardNumber" className="block text-white mb-2">
              Card Number
            </label>
            <input
              type="text"
              id="cardNumber"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              onBlur={() => handleBlur("cardNumber")}
              disabled={isEditing}
              className={`w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-blue-500 ${
                isEditing ? "cursor-not-allowed" : ""
              }`}
            />
            {errors.cardNumber && (
              <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>
            )}
          </div>
          <div className="flex space-x-4 mb-6">
            <div className="w-1/2">
              <label htmlFor="expirationDate" className="block text-white mb-2">
                Expiration Date
              </label>
              <input
                type="text"
                id="expirationDate"
                placeholder="MM/YY"
                value={expirationDate}
                onChange={(e) => setExpirationDate(e.target.value)}
                onBlur={() => handleBlur("expirationDate")}
                className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-blue-500"
              />
              {errors.expirationDate && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.expirationDate}
                </p>
              )}
            </div>
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!isFormValid() || isSubmitting}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              {isSubmitting
                ? "Saving..."
                : isEditing
                ? "Save Changes"
                : "Add Card"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
