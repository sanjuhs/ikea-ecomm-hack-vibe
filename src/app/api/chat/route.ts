import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import {
  aiSearchProducts,
  aiPrepareCartAddition,
  AI_FUNCTION_SCHEMAS,
  formatProductsForAI,
  AICartResult,
} from "@/utils/aiCartFunctions";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json();

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "OpenAI API key not configured" },
        { status: 500 }
      );
    }

    const systemPrompt = `You are a helpful kitchen cutlery and tools shopping assistant for KitchenCraft, an e-commerce store. Your role is to help customers find the perfect kitchen tools based on their needs, cooking experience, and preferences.

PRODUCT CATEGORIES:
- Knives: Chef, paring, bread, santoku, utility, steak sets, carving, cleaver
- Spoons: Wooden sets, serving, slotted, ladles, measuring, silicone mixing
- Forks: Serving, carving, pasta, salad serving
- Cutting Boards: Bamboo, walnut, plastic sets, glass, marble, acacia
- Kitchen Tools: Spatulas, tongs, peelers, graters, whisks, can openers, timers, garlic press, shears, thermometers, basting brushes

DIFFICULTY LEVELS:
- Beginner: Easy to use, essential items, good for new cooks
- Intermediate: More specialized tools, requires some cooking knowledge
- Professional: Advanced tools for experienced chefs

MATERIALS AVAILABLE:
- Stainless steel, high-carbon steel, carbon steel
- Bamboo, walnut wood, acacia wood, beech wood
- Silicone, food-grade plastic, tempered glass, marble

PRICE RANGE: $8.99 - $89.99

YOUR CAPABILITIES:
1. Use search_products function to find products based on user criteria
2. Use add_to_cart function to add recommended items to user's cart
3. Recommend products based on user needs and experience level
4. Suggest complete sets for specific scenarios (dinner parties, beginner setups, etc.)
5. Filter by budget, material preferences, or dietary restrictions
6. Explain why certain tools are recommended

FUNCTION USAGE GUIDELINES:
- When users ask for product recommendations, use search_products to find relevant items
- When users want to add items to cart (e.g., "add 2 chef knives"), use add_to_cart function
- Always explain your search criteria and why you chose specific products
- Show product details including price, material, and difficulty level
- Ask for confirmation before adding expensive items to cart

CONVERSATION STYLE:
- Be friendly, knowledgeable, and helpful
- Ask clarifying questions when needed
- Provide specific product recommendations with reasons
- Mention prices and key features
- Offer alternatives at different price points
- Be concise but informative

Remember: You have the ability to search our product catalog and add items to the user's cart automatically. Use these functions to provide a seamless shopping experience.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "system", content: systemPrompt }, ...messages],
      temperature: 0.7,
      tools: AI_FUNCTION_SCHEMAS.map((schema) => ({
        type: "function" as const,
        function: schema,
      })),
      tool_choice: "auto",
    });

    const assistantMessage = completion.choices[0]?.message;

    if (!assistantMessage) {
      return NextResponse.json(
        { error: "No response from AI" },
        { status: 500 }
      );
    }

    // Handle function calls
    if (assistantMessage.tool_calls && assistantMessage.tool_calls.length > 0) {
      const functionResults = [];

      for (const toolCall of assistantMessage.tool_calls) {
        const functionName = toolCall.function.name;
        const functionArgs = JSON.parse(toolCall.function.arguments);

        let result: AICartResult;

        if (functionName === "search_products") {
          result = aiSearchProducts(functionArgs);

          if (result.success && result.products) {
            const productList = formatProductsForAI(result.products);
            functionResults.push({
              tool_call_id: toolCall.id,
              role: "tool" as const,
              content: JSON.stringify({
                success: true,
                message: result.message,
                products: result.products.map((p) => ({
                  id: p.id,
                  name: p.name,
                  price: p.price,
                  category: p.category,
                  difficulty: p.difficulty,
                  material: p.material,
                  description: p.description,
                })),
                productList,
              }),
            });
          } else {
            functionResults.push({
              tool_call_id: toolCall.id,
              role: "tool" as const,
              content: JSON.stringify(result),
            });
          }
        } else if (functionName === "add_to_cart") {
          interface CartItem {
            productId: number;
            quantity?: number;
          }

          const items: CartItem[] = functionArgs.items || [];
          const productIds = items.map((item: CartItem) => item.productId);
          const quantities = items.map((item: CartItem) => item.quantity || 1);

          result = aiPrepareCartAddition(productIds, quantities);

          functionResults.push({
            tool_call_id: toolCall.id,
            role: "tool" as const,
            content: JSON.stringify({
              ...result,
              cartData: result.success
                ? {
                    items: items.map((item: CartItem, index: number) => ({
                      productId: item.productId,
                      quantity: item.quantity || 1,
                      product: result.products?.[index],
                    })),
                  }
                : null,
            }),
          });
        }
      }

      // Get the final response after function calls
      const followUpCompletion = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
          assistantMessage,
          ...functionResults,
        ],
        temperature: 0.7,
      });

      const finalMessage = followUpCompletion.choices[0]?.message?.content;

      return NextResponse.json({
        message: finalMessage,
        functionCalls: assistantMessage.tool_calls,
        functionResults: functionResults.map((fr) => JSON.parse(fr.content)),
      });
    }

    return NextResponse.json({
      message: assistantMessage.content,
    });
  } catch (error) {
    console.error("OpenAI API error:", error);
    return NextResponse.json(
      { error: "Failed to process chat request" },
      { status: 500 }
    );
  }
}
