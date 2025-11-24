import { useEffect, useState } from "react";
import { safeGetCards } from "../api/cardsApi";

/**
 * Hook personalizado para obtener tarjetas del usuario
 *
 * @param {string} userId - ID del usuario
 * @returns {Object} { cards, loading, error, refetch }
 */
export function useFetchCards(userId) {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCards = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await safeGetCards(userId);
      setCards(data);
    } catch (err) {
      console.error("Error in useFetchCards:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchCards();
    }
  }, [userId]);

  return { cards, loading, error, refetch: fetchCards };
}

