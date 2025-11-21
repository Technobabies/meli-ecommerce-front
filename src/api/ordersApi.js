import axios from "axios";

// API Base URL - Use environment variable or default to production
const BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://meli-ecommerce-orders-api.onrender.com/api/v1";

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
