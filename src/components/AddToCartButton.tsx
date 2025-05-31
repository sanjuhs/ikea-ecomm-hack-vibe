"use client";

import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { Product } from "@/types/product";

interface AddToCartButtonProps {
  product: Product;
  quantity?: number;
}

export default function AddToCartButton({
  product,
  quantity = 1,
}: AddToCartButtonProps) {
  const { addToCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async () => {
    setIsAdding(true);
    addToCart(product, quantity);

    // Brief delay for visual feedback
    setTimeout(() => {
      setIsAdding(false);
    }, 500);
  };

  return (
    <button
      onClick={handleAddToCart}
      disabled={isAdding}
      className={`px-4 py-2 rounded-lg transition-colors text-sm font-medium ${
        isAdding
          ? "bg-green-600 text-white"
          : "bg-blue-600 text-white hover:bg-blue-700"
      } disabled:cursor-not-allowed`}
    >
      {isAdding ? "Added!" : "Add to Cart"}
    </button>
  );
}
