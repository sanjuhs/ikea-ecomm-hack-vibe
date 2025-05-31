import Image from "next/image";
import { Product, ProductData } from "@/types/product";
import productsData from "@/data/products.json";
import ChatWidget from "@/components/ChatWidget";
import AddToCartButton from "@/components/AddToCartButton";
import CartButton from "@/components/CartButton";

export default function Home() {
  const products: Product[] = (productsData as ProductData).products;

  // Group products by category for display
  const productsByCategory = products.reduce((acc, product) => {
    if (!acc[product.category]) {
      acc[product.category] = [];
    }
    acc[product.category].push(product);
    return acc;
  }, {} as Record<string, Product[]>);

  const categoryNames = {
    knives: "Knives",
    spoons: "Spoons",
    forks: "Forks",
    "cutting-boards": "Cutting Boards",
    tools: "Kitchen Tools",
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">KitchenCraft</h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a
                href="#"
                className="text-gray-700 hover:text-gray-900 font-medium"
              >
                Knives
              </a>
              <a
                href="#"
                className="text-gray-700 hover:text-gray-900 font-medium"
              >
                Spoons
              </a>
              <a
                href="#"
                className="text-gray-700 hover:text-gray-900 font-medium"
              >
                Forks
              </a>
              <a
                href="#"
                className="text-gray-700 hover:text-gray-900 font-medium"
              >
                Cutting Boards
              </a>
              <a
                href="#"
                className="text-gray-700 hover:text-gray-900 font-medium"
              >
                Tools
              </a>
            </nav>
            <div className="flex items-center space-x-4">
              <CartButton />
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Premium Kitchen Cutlery & Tools
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-6">
              Discover our collection of professional-grade kitchen essentials.
              From precision knives to versatile utensils, everything you need
              for culinary excellence.
            </p>
            <div className="flex justify-center space-x-6 text-sm text-gray-500">
              <span>🔪 {productsByCategory.knives?.length || 0} Knives</span>
              <span>🥄 {productsByCategory.spoons?.length || 0} Spoons</span>
              <span>🍴 {productsByCategory.forks?.length || 0} Forks</span>
              <span>
                📋 {productsByCategory["cutting-boards"]?.length || 0} Cutting
                Boards
              </span>
              <span>
                🔧 {productsByCategory.tools?.length || 0} Kitchen Tools
              </span>
            </div>
            <div className="mt-6 p-4 bg-blue-50 rounded-lg inline-block">
              <p className="text-blue-800 text-sm">
                💬 <strong>New!</strong> Try our AI Kitchen Assistant - click
                the chat button to get personalized recommendations!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            Our Products
          </h3>
          <p className="text-gray-600">
            Professional kitchen tools for every cooking enthusiast -{" "}
            {products.length} items available
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow duration-200"
            >
              <div className="aspect-square relative overflow-hidden rounded-t-lg bg-gray-100">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-200"
                />
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="inline-block px-2 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded-full capitalize">
                    {
                      categoryNames[
                        product.category as keyof typeof categoryNames
                      ]
                    }
                  </span>
                  <span
                    className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                      product.difficulty === "beginner"
                        ? "text-green-700 bg-green-100"
                        : product.difficulty === "intermediate"
                        ? "text-yellow-700 bg-yellow-100"
                        : "text-red-700 bg-red-100"
                    }`}
                  >
                    {product.difficulty}
                  </span>
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                  {product.name}
                </h4>
                <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                  {product.description}
                </p>
                <div className="text-xs text-gray-500 mb-3">
                  <div>Material: {product.material}</div>
                  <div>Size: {product.size}</div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-gray-900">
                    ${product.price}
                  </span>
                  <AddToCartButton product={product} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h5 className="text-lg font-semibold mb-4">KitchenCraft</h5>
              <p className="text-gray-400 text-sm">
                Premium kitchen tools and cutlery for professional and home
                chefs. AI-powered shopping assistance now available!
              </p>
            </div>
            <div>
              <h6 className="font-semibold mb-4">Products</h6>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    Knives ({productsByCategory.knives?.length || 0})
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Spoons ({productsByCategory.spoons?.length || 0})
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Forks ({productsByCategory.forks?.length || 0})
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Cutting Boards (
                    {productsByCategory["cutting-boards"]?.length || 0})
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Kitchen Tools ({productsByCategory.tools?.length || 0})
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h6 className="font-semibold mb-4">Support</h6>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Shipping Info
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Returns
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h6 className="font-semibold mb-4">Company</h6>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Press
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Blog
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>
              &copy; 2024 KitchenCraft. All rights reserved. Demo for hackathon
              purposes.
            </p>
          </div>
        </div>
      </footer>

      {/* AI Chat Widget */}
      <ChatWidget />
    </div>
  );
}
