import React, { useState } from "react";
import ProductCard from "../../components/ProductCard";
import { PRODUCTS } from "../../data/dummyProducts";
import { useCartDispatch } from "../../context/CartContext";

export default function ProductsPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const dispatch = useCartDispatch();

  const categories = ["all", ...new Set(PRODUCTS.map(p => p.category))];

  const filtered = PRODUCTS.filter(
    p =>
      (category === "all" || p.category === category) &&
      p.name.toLowerCase().includes(query.toLowerCase())
  );

  function addToCart(product) {
    dispatch({
      type: "ADD_ITEM",
      payload: {
        productId: product.id,
        productName: product.name,
        pricePerUnit: product.price,
        quantity: 1,
        totalPrice: product.price,
      },
    });
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-white mb-6">Products</h1>

      <div className="flex flex-wrap gap-4 mb-6">
        <input
          className="bg-secondary text-gray-200 px-4 py-2 rounded-lg focus:outline-none focus:ring focus:ring-primary"
          placeholder="Search..."
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        <select
          className="bg-secondary text-gray-200 px-4 py-2 rounded-lg"
          value={category}
          onChange={e => setCategory(e.target.value)}
        >
          {categories.map(c => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filtered.map(p => (
          <ProductCard key={p.id} product={p} onAdd={addToCart} />
        ))}
      </div>
    </div>
  );
}
