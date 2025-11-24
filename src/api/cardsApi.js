// cardsApi.js
import axios from "axios";

/**
 * Cards API Service
 *
 * Maneja todas las llamadas al backend para el módulo Cards.
 * Base URL configurada con variable de entorno o fallback a localhost.
 */

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api/v1";

export const api = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

/**
 * GET /cards/{userId} - Obtener todas las tarjetas del usuario
 * @param {string} userId - ID del usuario
 * @returns {Promise<Array>} Lista de tarjetas
 */
export async function getCards(userId) {
  try {
    const response = await api.get(`/cards/${userId}`); // userId en path param
    return response.data.data; // Devuelve solo el array de tarjetas
  } catch (error) {
    console.error("Error fetching cards:", error);
    throw error;
  }
}

/**
 * POST /cards/{userId} - Crear una nueva tarjeta
 * @param {string} userId - ID del usuario
 * @param {Object} cardPayload - Datos de la tarjeta
 * @param {string} cardPayload.cardholderName - Nombre del titular
 * @param {string} cardPayload.cardNumber - Número de tarjeta (16 dígitos)
 * @param {string} cardPayload.expirationDate - Fecha de expiración (YYYY-MM-DD)
 * @returns {Promise<Object>} Tarjeta creada
 */
export async function createCard(userId, cardPayload) {
  try {
    const response = await api.post(`/cards/${userId}`, cardPayload);
    return response.data.data; // Devuelve objeto de la tarjeta creada
  } catch (error) {
    console.error("Error creating card:", error);
    throw error;
  }
}

/**
 * PUT /cards/{cardId} - Actualizar tarjeta existente
 * @param {string} cardId - ID de la tarjeta
 * @param {Object} cardPayload - Datos a actualizar
 * @returns {Promise<Object>} Tarjeta actualizada
 */
export async function updateCard(cardId, cardPayload) {
  try {
    const response = await api.put(`/cards/${cardId}`, cardPayload);
    return response.data.data; // Devuelve objeto actualizado
  } catch (error) {
    console.error("Error updating card:", error);
    throw error;
  }
}

/**
 * DELETE /cards/{cardId} - Eliminar tarjeta (soft delete)
 * @param {string} cardId - ID de la tarjeta
 * @returns {Promise<boolean>} true si se eliminó correctamente
 */
export async function deleteCard(cardId) {
  try {
    const response = await api.delete(`/cards/${cardId}`);
    return response.data.success;
  } catch (error) {
    console.error("Error deleting card:", error);
    throw error;
  }
}

/**
 * Safe wrapper para getCards con manejo de errores
 * @param {string} userId - ID del usuario
 * @returns {Promise<Array>} Array de tarjetas o array vacío en caso de error
 */
export async function safeGetCards(userId) {
  try {
    return await getCards(userId);
  } catch (error) {
    console.error("Error fetching cards safely:", error);
    return []; // Devuelve array vacío para que el hook no rompa
  }
}
