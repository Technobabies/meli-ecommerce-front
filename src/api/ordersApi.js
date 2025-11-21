import axios from "axios";

/**
 * API Base URL Configuration
 * 
 * This uses VITE_API_BASE_URL environment variable which should be configured in Vercel:
 * - Production (main branch): https://meli-ecommerce-orders-api.onrender.com/api/v1
 * - Staging (staging branch): https://meli-ecommerce-staging.onrender.com/api/v1
 * 
 * Fallback to localhost for local development (safer than defaulting to production)
 */
const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api/v1";

export const api = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

export async function getOrders() {
  const response = await api.get("/orders");
  return response.data;
}

export async function safeGetOrders() {
  try {
    return await getOrders();
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
}

export async function createOrder(orderPayload) {
  const res = await api.post("/orders", orderPayload);
  return res.data;
}
