# 🛒 Meli E-Commerce Frontend

This is the **frontend** for the Meli E-Commerce platform, built with **React**.  
It provides a user interface to view, create, and manage orders through a RESTful API.

---

## User Interface 🖼️

- Products
<img width="1504" height="775" alt="Screenshot 2025-11-13 172527" src="https://github.com/user-attachments/assets/f3c19aed-8579-4144-ae67-bf1f89e7c030" />

- Cart
<img width="1421" height="733" alt="Screenshot 2025-11-13 172544" src="https://github.com/user-attachments/assets/da823dbc-32ae-40bd-a50d-3b3009535917" />

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

The project connects to the backend via Axios and uses environment variables to determine which API to use based on the deployment environment.

### Environment-Based API URLs

- **Production (main branch)**: `https://meli-ecommerce-orders-api.onrender.com/api/v1`
- **Staging (staging branch)**: `https://meli-ecommerce-staging.onrender.com/api/v1`
- **Local Development**: Falls back to `http://localhost:8080/api/v1` if `VITE_API_BASE_URL` is not set

### `/src/api/ordersApi.js`

The API configuration uses `VITE_API_BASE_URL` environment variable:

```js
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api/v1";

export const api = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});
```

### Configuring Environment Variables in Vercel

For detailed instructions on setting up environment variables in Vercel to automatically switch between production and staging APIs based on Git branch, see [VERCEL_ENV_SETUP.md](./VERCEL_ENV_SETUP.md).

**Quick Setup:**
1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add `VITE_API_BASE_URL` for **Production** environment: `https://meli-ecommerce-orders-api.onrender.com/api/v1`
3. Add `VITE_API_BASE_URL` for **Preview** environment with branch `staging`: `https://meli-ecommerce-staging.onrender.com/api/v1`

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

