import { useState, useEffect } from "react";
import { useFetchCards } from "../../../hooks/useFetchCards";
import { createCard } from "../../../api/cardsApi";
import { CARDS_USER_ID } from "../../../data/dummyProducts";
import CardModal from "../../../components/CardModal";

export default function CardSelector({ onCardSelect }) {
  const { cards, loading, error, refetch } = useFetchCards(CARDS_USER_ID);
  const [selectedCardId, setSelectedCardId] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [saveError, setSaveError] = useState(null);

  useEffect(() => {
    // Auto-select first card if available
    if (cards.length > 0 && !selectedCardId) {
      setSelectedCardId(cards[0].id);
      onCardSelect(cards[0]);
    }
  }, [cards, selectedCardId, onCardSelect]);

  const handleSelectChange = (e) => {
    const cardId = e.target.value;
    setSelectedCardId(cardId);
    
    const selectedCard = cards.find(card => card.id === cardId);
    onCardSelect(selectedCard || null);
  };

  const handleSaveCard = async (cardData) => {
    try {
      setSaveError(null);

      if (cards.length < 3) {
        await createCard(CARDS_USER_ID, cardData);
        await refetch();
        setIsModalOpen(false);
      } else {
        setSaveError("No puedes agregar más de 3 tarjetas.");
      }
    } catch (err) {
      console.error("Error al crear tarjeta:", err);
      const errorMessage =
        err?.response?.data?.message ||
        err?.message ||
        "No se pudo guardar la tarjeta. Revisa los datos.";
      setSaveError(errorMessage);
    }
  };

  if (loading) {
    return (
      <div className="text-gray-400">
        Loading payment methods...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-400">
        Error loading payment methods
      </div>
    );
  }

  return (
    <>
      <CardModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSaveError(null);
        }}
        onSave={handleSaveCard}
        cardToEdit={null}
      />

      {saveError && (
        <div className="bg-red-500 bg-opacity-20 border border-red-500 text-red-300 px-4 py-3 rounded mb-4">
          {saveError}
        </div>
      )}

      {cards.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 space-y-4">
          <div className="text-7xl animate-pulse">💳</div>
          <h3 className="text-xl font-semibold text-white">No payment methods yet</h3>
          <p className="text-gray-400 text-center max-w-sm">
            Add a card to complete your purchases securely
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg transition-all duration-200 hover:scale-105 transform active:scale-95"
          >
            Add Your First Card
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          <label htmlFor="card-select" className="block text-sm font-medium text-gray-300">
            Select Payment Method
          </label>
        
          <select
            id="card-select"
            value={selectedCardId}
            onChange={handleSelectChange}
            className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
          >
            <option value="" disabled>Choose a card...</option>
            {cards.map((card) => (
              <option key={card.id} value={card.id}>
                {card.cardholderName} - {card.maskedCardNumber}
              </option>
            ))}
          </select>

          {selectedCardId && (
            <div className="bg-gray-700 p-4 rounded-lg mt-3 animate-fade-in transition-all duration-300">
              <p className="text-sm text-gray-400">Selected card:</p>
              <p className="font-semibold text-white">
                {cards.find(c => c.id === selectedCardId)?.cardholderName}
              </p>
              <p className="text-gray-300">
                {cards.find(c => c.id === selectedCardId)?.maskedCardNumber}
              </p>
            </div>
          )}

          <button
            onClick={() => setIsModalOpen(true)}
            disabled={cards.length >= 3}
            className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 transform active:scale-95"
          >
            Add Card {cards.length >= 3 && "(Max 3)"}
          </button>
        </div>
      )}
    </>
  );
}
