import { useState } from "react";
import { useFetchCards } from "../../../hooks/useFetchCards";
import { createCard, updateCard, deleteCard } from "../../../api/cardsApi";
import CardModal from "../../../components/CardModal";
import { DUMMY_USER_ID } from "../../../data/dummyProducts"; // o tu userId real

export default function CardInfo() {
  const { cards, loading, error, refetch } = useFetchCards(DUMMY_USER_ID);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCard, setEditingCard] = useState(null);
  const [saveError, setSaveError] = useState(null);

  const handleSaveCard = async (cardData) => {
    try {
      setSaveError(null);

      if (editingCard) {
        await updateCard(editingCard.id, cardData);
      } else if (cards.length < 3) {
        await createCard(DUMMY_USER_ID, cardData);
      } else {
        setSaveError("No puedes agregar más de 3 tarjetas.");
        return;
      }

      await refetch(); // recarga la lista de tarjetas
      closeModal();
    } catch (err) {
      console.error("Error completo:", err);
      console.error("Status:", err?.response?.status);
      console.error("Data:", err?.response?.data);
      console.error("Message:", err?.message);

      const errorMessage =
        err?.response?.data?.message ||
        err?.message ||
        "No se pudo guardar la tarjeta. Revisa los datos.";
      setSaveError(errorMessage);
    }
  };

  const handleDeleteCard = async (cardId) => {
    if (!window.confirm("¿Estás seguro de que quieres eliminar esta tarjeta?")) {
      return;
    }

    try {
      setSaveError(null);
      await deleteCard(cardId);
      await refetch();
    } catch (err) {
      console.error("Error al eliminar:", err);
      const errorMessage =
        err?.response?.data?.message ||
        err?.message ||
        "No se pudo eliminar la tarjeta.";
      setSaveError(errorMessage);
    }
  };

  const openModal = (card = null) => {
    setEditingCard(card);
    setIsModalOpen(true);
    setSaveError(null);
  };

  const closeModal = () => {
    setEditingCard(null);
    setIsModalOpen(false);
    setSaveError(null);
  };

  if (loading) return <p className="text-white">Cargando tarjetas...</p>;
  if (error) return <p className="text-red-500">Error al cargar tarjetas</p>;

  return (
    <>
      <CardModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSave={handleSaveCard}
        cardToEdit={editingCard}
      />
      <div className="bg-gray-800 shadow rounded-lg p-6">
        <h2 className="text-xl font-bold text-white mb-4">Payment Methods</h2>

        {/* Mostrar error de guardado */}
        {saveError && (
          <div className="bg-red-500 bg-opacity-20 border border-red-500 text-red-300 px-4 py-3 rounded mb-4">
            {saveError}
          </div>
        )}

        <div className="space-y-4">
          {cards.length === 0 ? (
            <div className="text-white">No cards found.</div>
          ) : (
            cards.map((card) => (
              <div
                key={card.id}
                className="bg-gray-700 p-4 rounded-lg flex justify-between items-center"
              >
                <div>
                  <p className="font-bold text-white">{card.cardholderName}</p>
                  <p className="text-gray-300">
                    {card.maskedCardNumber || "****"}
                  </p>
                  <p className="text-gray-300">{card.expirationDate}</p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => openModal(card)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteCard(card.id)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
        {cards.length < 3 && (
          <button
            onClick={() => openModal()}
            className="mt-6 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Add Card
          </button>
        )}
      </div>
    </>
  );
}
