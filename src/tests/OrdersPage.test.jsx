import { render, screen } from "@testing-library/react";
import OrdersPage from "../pages/orders/OrdersPage";
import * as useFetchOrdersModule from "../hooks/useFetchOrders";

describe("OrdersPage", () => {
  it("shows loading state", () => {
    jest.spyOn(useFetchOrdersModule, "useFetchOrders").mockReturnValue({
      orders: [],
      loading: true,
      error: null,
    });

    render(<OrdersPage />);
    expect(screen.getByText(/loading orders/i)).toBeInTheDocument();
  });

  it("renders fetched orders", () => {
    jest.spyOn(useFetchOrdersModule, "useFetchOrders").mockReturnValue({
      orders: [{ id: 1, status: "CREATED", totalPrice: 200 }],
      loading: false,
      error: null,
    });

    render(<OrdersPage />);

    // Match the actual structure: "CREATED - 200"
    expect(screen.getByText(/created/i)).toBeInTheDocument();
    expect(screen.getByText(/200/)).toBeInTheDocument();
  });

  it("shows error message on failure", () => {
    jest.spyOn(useFetchOrdersModule, "useFetchOrders").mockReturnValue({
      orders: [],
      loading: false,
      error: new Error("Network failed"),
    });

    render(<OrdersPage />);
    expect(screen.getByText(/error loading orders/i)).toBeInTheDocument();
  });
});
