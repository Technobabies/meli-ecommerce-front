import { useState, useEffect } from "react";

export default function CardModal({ isOpen, onClose, onSave, cardToEdit }) {
  const [cardholderName, setCardholderName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expirationMonth, setExpirationMonth] = useState("");
  const [expirationYear, setExpirationYear] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isEditing = !!cardToEdit;

  const validate = () => {
    const newErrors = {};
    if (!cardholderName.trim()) {
      newErrors.cardholderName = "Cardholder name is required.";
    }
    // Validar exactamente 16 dígitos (sin enmascarar)
    const cleanCardNumber = cardNumber.replace(/\D/g, "");
    
    //cambio aqui
    if (!isEditing) {
   if (!/^\d{16}$/.test(cleanCardNumber)) {
      newErrors.cardNumber = "Card number must be 16 digits.";
      }
    } //cambio aqui
 

    // Validar mes (01-12)
    if (!expirationMonth || !/^(0[1-9]|1[0-2])$/.test(expirationMonth)) {
      newErrors.expirationMonth = "Month must be 01-12.";
    }

    // Validar año (2 dígitos, futuro, máximo 20 años)
    if (!expirationYear || !/^\d{2}$/.test(expirationYear)) {
      newErrors.expirationYear = "Year must be 2 digits (YY).";
    } else {
      const year = 2000 + parseInt(expirationYear);
      const month = parseInt(expirationMonth);
      const now = new Date();
      const currentYear = now.getFullYear();
      const maxYear = currentYear + 20;

      // Validar que el año no sea mayor a 20 años desde el actual
      if (year > maxYear) {
        newErrors.expirationYear = `Expiration year cannot be more than 20 years in the future (max ${maxYear}).`;
      } else {
        // Crear fecha del último día del mes de expiración (23:59:59)
        const expiration = new Date(year, month, 0, 23, 59, 59); // El día 0 del mes siguiente = último día del mes actual
        
        if (expiration <= now) {
          newErrors.expirationYear = "Card expiration must be in the future.";
        }
      }
    }
    return newErrors;
  };

  useEffect(() => {
    if (isEditing && cardToEdit) {
      setCardholderName(cardToEdit.cardholderName || "");
      
      // Mostrar número de tarjeta enmascarado en edición
      // El backend devuelve maskedCardNumber, no cardNumber completo
      if (cardToEdit.maskedCardNumber) {
        setCardNumber(cardToEdit.maskedCardNumber);
      } else if (cardToEdit.cardNumber) {
        const lastFourDigits = cardToEdit.cardNumber.slice(-4);
        const maskedCardNumber = "*".repeat(12) + lastFourDigits;
        setCardNumber(maskedCardNumber);
      } else {
        setCardNumber("");
      }
      
      // Parsear expirationDate: si viene como "2025-12-01", extraer mes y año
      if (cardToEdit.expirationDate) {
        const parts = cardToEdit.expirationDate.split("-");
        if (parts.length === 3) {
          setExpirationMonth(parts[1]);
          setExpirationYear(parts[0].slice(-2)); // Últimos 2 dígitos del año
        }
      }
    } else {
      setCardholderName("");
      setCardNumber("");
      setExpirationMonth("");
      setExpirationYear("");
    }
    setErrors({});
  }, [cardToEdit, isEditing, isOpen]);

  useEffect(() => {
    setErrors(validate());
  }, [cardholderName, cardNumber, expirationMonth, expirationYear]);

  if (!isOpen) return null;

  const handleCardNumberChange = (e) => {
    // Solo aceptar dígitos, máximo 16
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 16) {
      setCardNumber(value);
    }
  };

  const handleExpirationMonthChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 2) {
      setExpirationMonth(value);
    }
  };

  const handleExpirationYearChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 2) {
      setExpirationYear(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true);
      try {
        // Convertir MM/YY a YYYY-MM-DD (último día del mes)
        const year = 2000 + parseInt(expirationYear);
        const month = parseInt(expirationMonth);
        
        // Obtener el último día del mes
        const lastDay = new Date(year, month, 0).getDate();
        const expirationDate = `${year}-${expirationMonth.padStart(2, "0")}-${lastDay.toString().padStart(2, "0")}`; // Formato: YYYY-MM-DD

        // Enviar datos en formato correcto para el backend
        let cardData;

        if (isEditing) {
          cardData = {
            cardholderName: cardholderName.trim(),
            expirationDate: expirationDate,  // SOLO esto acepta el back
          };
        } else {
          cardData = {
            cardholderName: cardholderName.trim(),
            cardNumber: cardNumber,
            expirationDate: expirationDate,
          };
        }
         // Enviar datos en formato correcto para el backend
        await onSave(cardData);
      } catch (error) {
        console.error("Error in handleSubmit:", error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

const isFormValid = () => {
  const cleanCardNumber = cardNumber.replace(/\D/g, "");
  
  // En edición, ignorar error de cardNumber
  const relevantErrors = { ...errors };
  if (isEditing) {
    delete relevantErrors.cardNumber;
  }
  
  return (
    Object.values(relevantErrors).every((error) => !error) &&
    cardholderName.trim() &&
    expirationMonth &&
    expirationYear &&
    !isSubmitting &&
    (isEditing || cleanCardNumber.length === 16)
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
            <label className="block text-white mb-2">Cardholder Name</label>
            <input
              type="text"
              value={cardholderName}
              onChange={(e) => setCardholderName(e.target.value)}
              placeholder="John Doe"
              className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-blue-500"
            />
            {errors.cardholderName && (
              <p className="text-red-500 text-sm mt-1">{errors.cardholderName}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-white mb-2">Card Number</label>
            <input
              type="text"
              value={cardNumber}
              onChange={handleCardNumberChange}
              placeholder="1234567890123456"
              disabled={isEditing}
              maxLength="16"
              className={`w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-blue-500 ${
                isEditing ? "cursor-not-allowed opacity-50" : ""
              }`}
            />
            {errors.cardNumber && (
              <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>
            )}
            {!isEditing && cardNumber && (
              <p className="text-gray-400 text-sm mt-1">
                {cardNumber.length}/16 digits
              </p>
            )}
          </div>

          <div className="mb-6">
            <label className="block text-white mb-2">Expiration Date (MM/YY)</label>
            <div className="flex space-x-2">
              <div className="w-1/2">
                <input
                  type="text"
                  value={expirationMonth}
                  onChange={handleExpirationMonthChange}
                  placeholder="MM"
                  maxLength="2"
                  className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-blue-500 text-center"
                />
              </div>
              <div className="w-1/2">
                <input
                  type="text"
                  value={expirationYear}
                  onChange={handleExpirationYearChange}
                  placeholder="YY"
                  maxLength="2"
                  className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-blue-500 text-center"
                />
              </div>
            </div>
            {(errors.expirationMonth || errors.expirationYear) && (
              <p className="text-red-500 text-sm mt-1">
                {errors.expirationMonth || errors.expirationYear}
              </p>
            )}
            {!errors.expirationMonth && !errors.expirationYear && expirationMonth && expirationYear && (
              <p className="text-gray-400 text-sm mt-1">
                Expiration: {expirationMonth}/{expirationYear}
              </p>
            )}
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!isFormValid()}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
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
