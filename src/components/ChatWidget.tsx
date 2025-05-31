"use client";

import { useState, useRef, useEffect } from "react";
import { useCart } from "@/contexts/CartContext";
import { Product } from "@/types/product";

interface FunctionCall {
  id: string;
  function: {
    name: string;
    arguments: string;
  };
}

interface CartItem {
  product: Product;
  quantity: number;
}

interface CartData {
  items: CartItem[];
}

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  functionCalls?: FunctionCall[];
  cartActions?: CartAction[];
}

interface CartAction {
  type: "add" | "search";
  products?: Product[];
  quantities?: number[];
  message: string;
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content:
        "Hi! I'm your kitchen assistant. I can help you find the perfect cutlery and tools for your cooking needs. I can also add items directly to your cart! What are you looking for today?",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { addToCart } = useCart();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleCartAction = (cartData: CartData) => {
    if (cartData && cartData.items) {
      cartData.items.forEach((item: CartItem) => {
        if (item.product) {
          addToCart(item.product, item.quantity);
        }
      });
      return true;
    }
    return false;
  };

  const sendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((msg) => ({
            role: msg.role,
            content: msg.content,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      const data = await response.json();

      // Handle function calls and cart actions
      const cartActions: CartAction[] = [];
      let cartItemsAdded = false;

      if (data.functionResults) {
        for (const result of data.functionResults) {
          if (result.cartData) {
            const success = handleCartAction(result.cartData);
            if (success) {
              cartItemsAdded = true;
              cartActions.push({
                type: "add",
                products: result.cartData.items.map(
                  (item: CartItem) => item.product
                ),
                quantities: result.cartData.items.map(
                  (item: CartItem) => item.quantity
                ),
                message: `Added ${result.cartData.items.length} item(s) to cart`,
              });
            }
          } else if (result.products) {
            cartActions.push({
              type: "search",
              products: result.products,
              message: `Found ${result.products.length} products`,
            });
          }
        }
      }

      let assistantContent = data.message;
      if (cartItemsAdded) {
        assistantContent +=
          "\n\n✅ Items have been added to your cart! You can view your cart by clicking the cart icon in the header.";
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: assistantContent,
        timestamp: new Date(),
        functionCalls: data.functionCalls,
        cartActions: cartActions.length > 0 ? cartActions : undefined,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Chat error:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content:
          "Sorry, I encountered an error. Please try again. Make sure you have set up your OpenAI API key in the .env.local file.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Chat Widget */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 w-80 h-96 bg-white rounded-lg shadow-xl border z-50 flex flex-col">
          {/* Header */}
          <div className="bg-blue-600 text-white p-4 rounded-t-lg flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                🤖
              </div>
              <div>
                <h3 className="font-semibold text-sm">Kitchen Assistant</h3>
                <p className="text-xs text-blue-100">AI-Powered Shopping</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-blue-100 hover:text-white"
            >
              ✕
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                    message.role === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  <div className="whitespace-pre-wrap">{message.content}</div>

                  {/* Show cart actions if any */}
                  {message.cartActions && message.cartActions.length > 0 && (
                    <div className="mt-2 pt-2 border-t border-gray-200">
                      {message.cartActions.map((action, index) => (
                        <div key={index} className="text-xs">
                          {action.type === "add" && (
                            <div className="bg-green-100 text-green-800 px-2 py-1 rounded mb-1">
                              🛒 {action.message}
                            </div>
                          )}
                          {action.type === "search" && action.products && (
                            <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded mb-1">
                              🔍 {action.message}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-800 px-3 py-2 rounded-lg text-sm">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Try: 'Add 2 chef knives to cart'"
                className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                disabled={isLoading}
              />
              <button
                onClick={sendMessage}
                disabled={isLoading || !inputValue.trim()}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
              >
                Send
              </button>
            </div>
            <div className="mt-2 text-xs text-gray-500">
              💡 I can search products and add them to your cart automatically!
            </div>
          </div>
        </div>
      )}

      {/* Floating Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 w-12 h-12 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors z-50 flex items-center justify-center"
      >
        {isOpen ? "✕" : "🤖"}
      </button>
    </>
  );
}
