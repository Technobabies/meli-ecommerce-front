import { useState } from "react";
import CardModal from "../../../components/CardModal";

export default function CardInfo() {
  const [cards, setCards] = useState([
    {
      id: 1,
      cardholderName: "John Doe",
      cardNumber: "**** **** **** 1234",
      expirationDate: "12/26",
    },
    {
      id: 2,
      cardholderName: "John Doe",
      cardNumber: "**** **** **** 5678",
      expirationDate: "10/25",
    },
    {
      id: 3,
      cardholderName: "John Doe",
      cardNumber: "**** **** **** 9123",
      expirationDate: "10/25",
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCard, setEditingCard] = useState(null);

  const handleSaveCard = (cardData) => {
    if (editingCard)
      setCards(
        cards.map((card) =>
          card.id === editingCard.id ? { ...card, ...cardData } : card
        )
      );
    else if (cards.length < 3)
      setCards([...cards, { ...cardData, id: Date.now() }]);

    closeModal();
  };

  const handleDeleteCard = (cardId) => {
    setCards(cards.filter((card) => card.id !== cardId));
  };

  const openModal = (card = null) => {
    setEditingCard(card);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setEditingCard(null);
    setIsModalOpen(false);
  };

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
                  <p className="text-gray-300">{card.cardNumber}</p>
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
