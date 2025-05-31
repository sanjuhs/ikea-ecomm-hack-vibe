"use client";

import Link from "next/link";
import { useCart } from "@/contexts/CartContext";

export default function CartButton() {
  const { cart } = useCart();

  return (
    <Link
      href="/cart"
      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
    >
      Cart ({cart.totalItems})
    </Link>
  );
}
