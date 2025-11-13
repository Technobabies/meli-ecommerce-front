# 🛒 Meli E-Commerce Frontend

This is the **frontend** for the Meli E-Commerce platform, built with **React**.  
It provides a user interface to view, create, and manage orders through a RESTful API.

---

## 🚀 Features

- Create new orders with validated payloads  
- Manage products dynamically  
- Well-structured API service layer using Axios  
- Unit tests with Jest for reliability

---

## 🧱 Project Structure

```
src/
 ├── api/
 │    └── ordersApi.js       # API service for orders
 ├── components/             # Reusable UI components
 ├── pages/
 │    └── OrdersPage.jsx     # Orders listing and management
 ├── tests/
 │    └── ordersApi.test.js  # Jest test suite for the API
 ├── App.jsx
 └── index.js
```

---

## ⚙️ Tech Stack

| Layer | Technology |
|-------|-------------|
| Frontend Framework | **React (Vite)** |
| HTTP Client | **Axios** |
| Testing | **Jest** |
| Styling | CSS / Tailwind (optional) |
| Backend | [Meli E-Commerce Orders API (Spring Boot)](https://github.com/your-backend-link) |

---

## 📦 Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/your-username/meli-ecommerce-frontend.git
cd meli-ecommerce-frontend
npm install
```

Run the development server:

```bash
npm run dev
```

---

## 🌐 API Configuration

The project connects to the backend via Axios.

### `/src/api/ordersApi.js`

```js
import axios from "axios";

const BASE_URL = "http://localhost:8080/api/v1";

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
```

---

## 🧪 Testing

All tests are implemented with **Jest** and focus on ensuring reliable communication with the API layer.

### `/src/tests/ordersApi.test.js`

This test suite verifies:
1. **Correct API calls** to `/orders` endpoint.  
2. **Data returned** from the backend is properly handled.  
3. **Error handling** works correctly with `safeGetOrders()` and `createOrder()`.  

### Running the Tests

```bash
npm test
```

---

## 📋 Example Test

```js
import { getOrders, safeGetOrders, createOrder } from "../api/ordersApi";
import axios from "axios";

const mockGet = jest.fn();
const mockPost = jest.fn();

jest.mock("axios", () => {
  const actualAxios = jest.requireActual("axios");
  return {
    ...actualAxios,
    create: jest.fn(() => ({
      get: mockGet,
      post: mockPost,
      defaults: { baseURL: "http://localhost:8080/api/v1" },
    })),
  };
});

describe("ordersApi", () => {
  afterEach(() => jest.clearAllMocks());

  it("fetches orders successfully", async () => {
    const mockData = [{ id: 1, product: "Laptop" }];
    mockGet.mockResolvedValueOnce({ data: mockData });
    const result = await getOrders();
    expect(result).toEqual(mockData);
    expect(mockGet).toHaveBeenCalledWith("/orders");
  });

  it("handles errors safely with safeGetOrders", async () => {
    mockGet.mockRejectedValueOnce(new Error("Network Error"));
    await expect(safeGetOrders()).rejects.toThrow("Network Error");
  });

  it("creates an order successfully", async () => {
    const mockOrder = { id: 1, product: "Phone" };
    mockPost.mockResolvedValueOnce({ data: mockOrder });
    const result = await createOrder(mockOrder);
    expect(result).toEqual(mockOrder);
    expect(mockPost).toHaveBeenCalledWith("/orders", mockOrder);
  });
});
```

---

## ✅ Test Coverage

These tests ensure:
- API endpoints are called correctly  
- Responses are properly returned to the UI  
- The app is resilient to network errors  

Future enhancements could include:
- Integration tests for components using mock service worker (MSW)  
- UI tests with React Testing Library  

---

