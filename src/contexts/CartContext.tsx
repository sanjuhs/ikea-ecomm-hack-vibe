"use client";

import React, { createContext, useContext, useReducer, useEffect } from "react";
import { Product } from "@/types/product";
import { CartItem, CartState, CartContextType } from "@/types/cart";

// Cart Actions
type CartAction =
  | { type: "ADD_TO_CART"; product: Product; quantity: number }
  | { type: "REMOVE_FROM_CART"; productId: number }
  | { type: "UPDATE_QUANTITY"; productId: number; quantity: number }
  | { type: "CLEAR_CART" }
  | { type: "LOAD_CART"; cart: CartState };

// Initial cart state
const initialCartState: CartState = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
};

// Cart reducer
function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_TO_CART": {
      const existingItemIndex = state.items.findIndex(
        (item) => item.product.id === action.product.id
      );

      let newItems: CartItem[];

      if (existingItemIndex >= 0) {
        // Update existing item quantity
        newItems = state.items.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + action.quantity }
            : item
        );
      } else {
        // Add new item
        const newItem: CartItem = {
          id: `${action.product.id}-${Date.now()}`,
          product: action.product,
          quantity: action.quantity,
          addedAt: new Date(),
        };
        newItems = [...state.items, newItem];
      }

      const totalItems = newItems.reduce((sum, item) => sum + item.quantity, 0);
      const totalPrice = newItems.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
      );

      return {
        items: newItems,
        totalItems,
        totalPrice,
      };
    }

    case "REMOVE_FROM_CART": {
      const newItems = state.items.filter(
        (item) => item.product.id !== action.productId
      );

      const totalItems = newItems.reduce((sum, item) => sum + item.quantity, 0);
      const totalPrice = newItems.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
      );

      return {
        items: newItems,
        totalItems,
        totalPrice,
      };
    }

    case "UPDATE_QUANTITY": {
      if (action.quantity <= 0) {
        // Remove item if quantity is 0 or less
        return cartReducer(state, {
          type: "REMOVE_FROM_CART",
          productId: action.productId,
        });
      }

      const newItems = state.items.map((item) =>
        item.product.id === action.productId
          ? { ...item, quantity: action.quantity }
          : item
      );

      const totalItems = newItems.reduce((sum, item) => sum + item.quantity, 0);
      const totalPrice = newItems.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
      );

      return {
        items: newItems,
        totalItems,
        totalPrice,
      };
    }

    case "CLEAR_CART":
      return initialCartState;

    case "LOAD_CART":
      return action.cart;

    default:
      return state;
  }
}

// Create context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Cart provider component
export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, dispatch] = useReducer(cartReducer, initialCartState);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("kitchencraft-cart");
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        dispatch({ type: "LOAD_CART", cart: parsedCart });
      } catch (error) {
        console.error("Error loading cart from localStorage:", error);
      }
    }
  }, []);

  // Save cart to localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem("kitchencraft-cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product, quantity: number = 1) => {
    dispatch({ type: "ADD_TO_CART", product, quantity });
  };

  const removeFromCart = (productId: number) => {
    dispatch({ type: "REMOVE_FROM_CART", productId });
  };

  const updateQuantity = (productId: number, quantity: number) => {
    dispatch({ type: "UPDATE_QUANTITY", productId, quantity });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  const value: CartContextType = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// Custom hook to use cart context
export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
