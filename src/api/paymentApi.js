import axios from "axios";
import { CARDS_USER_ID} from "../data/dummyProducts";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api/v1";

export const api = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

export async function createPayment(paymentPayload) {
    const paymentResponse = await api.post(`/payments/${CARDS_USER_ID}`, paymentPayload);
    return paymentResponse.data;
}