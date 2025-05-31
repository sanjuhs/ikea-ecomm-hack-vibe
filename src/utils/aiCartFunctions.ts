import {
  searchProducts,
  getProductsByIds,
  SearchFilters,
} from "./productSearch";
import { Product } from "@/types/product";

export interface AICartResult {
  success: boolean;
  message: string;
  products?: Product[];
  totalPrice?: number;
  error?: string;
}

// Function for AI to search products
export function aiSearchProducts(filters: SearchFilters): AICartResult {
  try {
    const result = searchProducts(filters);

    if (result.products.length === 0) {
      return {
        success: false,
        message: `No products found matching your criteria. Try adjusting your search.`,
        products: [],
      };
    }

    const totalPrice = result.products.reduce(
      (sum, product) => sum + product.price,
      0
    );

    return {
      success: true,
      message: `Found ${result.products.length} products matching your criteria.`,
      products: result.products,
      totalPrice,
    };
  } catch (error) {
    return {
      success: false,
      message: "Error searching products",
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

// Function for AI to prepare cart additions (returns product info for confirmation)
export function aiPrepareCartAddition(
  productIds: number[],
  quantities: number[]
): AICartResult {
  try {
    if (productIds.length !== quantities.length) {
      return {
        success: false,
        message: "Product IDs and quantities arrays must have the same length",
        error: "Array length mismatch",
      };
    }

    const products = getProductsByIds(productIds);

    if (products.length !== productIds.length) {
      const missingIds = productIds.filter(
        (id) => !products.find((p) => p.id === id)
      );
      return {
        success: false,
        message: `Some products not found: ${missingIds.join(", ")}`,
        error: "Products not found",
      };
    }

    const totalPrice = products.reduce((sum, product, index) => {
      return sum + product.price * quantities[index];
    }, 0);

    const itemsText = products
      .map(
        (product, index) =>
          `${quantities[index]}x ${product.name} ($${product.price} each)`
      )
      .join(", ");

    return {
      success: true,
      message: `Ready to add to cart: ${itemsText}. Total: $${totalPrice.toFixed(
        2
      )}`,
      products,
      totalPrice,
    };
  } catch (error) {
    return {
      success: false,
      message: "Error preparing cart addition",
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

// Function schemas for OpenAI function calling
export const AI_FUNCTION_SCHEMAS = [
  {
    name: "search_products",
    description:
      "Search for kitchen products based on criteria like category, price, difficulty, etc.",
    parameters: {
      type: "object",
      properties: {
        category: {
          type: "string",
          enum: ["knives", "spoons", "forks", "cutting-boards", "tools"],
          description: "Product category to search in",
        },
        tags: {
          type: "array",
          items: { type: "string" },
          description:
            'Keywords to search for (e.g., ["chef", "professional", "beginner"])',
        },
        priceRange: {
          type: "array",
          items: { type: "number" },
          minItems: 2,
          maxItems: 2,
          description: "Price range as [min, max] (e.g., [0, 50])",
        },
        difficulty: {
          type: "string",
          enum: ["beginner", "intermediate", "professional"],
          description: "Difficulty level for the user",
        },
        material: {
          type: "string",
          description: 'Material preference (e.g., "wood", "steel", "bamboo")',
        },
        limit: {
          type: "number",
          description: "Maximum number of products to return (default: 10)",
        },
      },
      required: [],
    },
  },
  {
    name: "add_to_cart",
    description: "Add specific products to the user's cart with quantities",
    parameters: {
      type: "object",
      properties: {
        items: {
          type: "array",
          items: {
            type: "object",
            properties: {
              productId: {
                type: "number",
                description: "The ID of the product to add",
              },
              quantity: {
                type: "number",
                description: "Quantity to add (default: 1)",
                minimum: 1,
              },
            },
            required: ["productId"],
          },
          description: "Array of items to add to cart",
        },
      },
      required: ["items"],
    },
  },
];

// Helper function to format products for AI response
export function formatProductsForAI(products: Product[]): string {
  return products
    .map(
      (product) =>
        `${product.name} - $${product.price} (${product.difficulty}, ${product.material})`
    )
    .join("\n");
}
