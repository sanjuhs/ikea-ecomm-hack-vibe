import { Product } from "@/types/product";
import productsData from "@/data/products.json";

export interface SearchFilters {
  category?: string;
  tags?: string[];
  priceRange?: [number, number];
  difficulty?: string;
  material?: string;
  limit?: number;
}

export interface SearchResult {
  products: Product[];
  totalFound: number;
}

export function searchProducts(filters: SearchFilters): SearchResult {
  const products: Product[] = productsData.products as Product[];

  let filteredProducts = products.filter((product) => {
    // Category filter
    if (filters.category && product.category !== filters.category) {
      return false;
    }

    // Tags filter (any tag matches)
    if (filters.tags && filters.tags.length > 0) {
      const hasMatchingTag = filters.tags.some(
        (tag) =>
          product.tags.some((productTag) =>
            productTag.toLowerCase().includes(tag.toLowerCase())
          ) ||
          product.name.toLowerCase().includes(tag.toLowerCase()) ||
          product.description.toLowerCase().includes(tag.toLowerCase())
      );
      if (!hasMatchingTag) {
        return false;
      }
    }

    // Price range filter
    if (filters.priceRange) {
      const [minPrice, maxPrice] = filters.priceRange;
      if (product.price < minPrice || product.price > maxPrice) {
        return false;
      }
    }

    // Difficulty filter
    if (filters.difficulty && product.difficulty !== filters.difficulty) {
      return false;
    }

    // Material filter
    if (
      filters.material &&
      !product.material.toLowerCase().includes(filters.material.toLowerCase())
    ) {
      return false;
    }

    return true;
  });

  // Sort by relevance (price for now, could be more sophisticated)
  filteredProducts.sort((a, b) => {
    // Prioritize beginner items for general searches
    if (a.difficulty === "beginner" && b.difficulty !== "beginner") return -1;
    if (b.difficulty === "beginner" && a.difficulty !== "beginner") return 1;

    // Then sort by price (ascending)
    return a.price - b.price;
  });

  const totalFound = filteredProducts.length;

  // Apply limit
  if (filters.limit && filters.limit > 0) {
    filteredProducts = filteredProducts.slice(0, filters.limit);
  }

  return {
    products: filteredProducts,
    totalFound,
  };
}

export function getProductById(id: number): Product | undefined {
  const products: Product[] = productsData.products as Product[];
  return products.find((product) => product.id === id);
}

export function getProductsByIds(ids: number[]): Product[] {
  const products: Product[] = productsData.products as Product[];
  return products.filter((product) => ids.includes(product.id));
}

// Helper function to get best value products in a category
export function getBestValueProducts(
  category: string,
  limit: number = 3
): Product[] {
  const result = searchProducts({ category, limit: 20 });

  // Sort by value (lower price, higher rating simulation)
  return result.products
    .sort((a, b) => {
      // Simple value calculation: prefer beginner items and lower prices
      const aValue = (a.difficulty === "beginner" ? 1.2 : 1) / a.price;
      const bValue = (b.difficulty === "beginner" ? 1.2 : 1) / b.price;
      return bValue - aValue;
    })
    .slice(0, limit);
}

// Helper function for AI to understand product categories
export function getAvailableCategories(): string[] {
  return ["knives", "spoons", "forks", "cutting-boards", "tools"];
}

// Helper function for AI to understand difficulty levels
export function getAvailableDifficulties(): string[] {
  return ["beginner", "intermediate", "professional"];
}
