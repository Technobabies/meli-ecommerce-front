import { render, screen, fireEvent } from "@testing-library/react";
import ProductCard from "../components/ProductCard";

describe("ProductCard", () => {
  const mockProduct = {
    id: 1,
    name: "Test Product",
    category: "Electronics",
    price: 99.99,
  };

  const mockOnAdd = jest.fn();

  it("renders product information correctly", () => {
    render(<ProductCard product={mockProduct} onAdd={mockOnAdd} />);

    expect(screen.getByText(/Test Product/i)).toBeInTheDocument();
    expect(screen.getByText(/Electronics/i)).toBeInTheDocument();
    expect(screen.getByText(/\$99\.99/)).toBeInTheDocument();
  });

  it("calls onAdd when 'Add to Cart' button is clicked", () => {
    render(<ProductCard product={mockProduct} onAdd={mockOnAdd} />);

    const addButton = screen.getByRole("button", { name: /add to cart/i });
    fireEvent.click(addButton);

    expect(mockOnAdd).toHaveBeenCalledTimes(1);
    expect(mockOnAdd).toHaveBeenCalledWith(mockProduct);
  });
});
