# AI Cart Management Setup

## Overview

The KitchenCraft e-commerce demo now includes AI-powered cart management! The AI assistant can:

- 🔍 **Search products** based on natural language queries
- 🛒 **Add items to cart** automatically based on user requests
- 💡 **Recommend products** based on cooking experience and preferences
- 📋 **Suggest complete sets** for specific scenarios

## Setup Instructions

### 1. Get OpenAI API Key

1. Go to [OpenAI Platform](https://platform.openai.com/api-keys)
2. Sign in or create an account
3. Create a new API key
4. Copy the key (starts with `sk-proj-...`)

### 2. Configure Environment

1. Create a `.env.local` file in the project root
2. Add your OpenAI API key:

```bash
OPENAI_API_KEY=your_openai_api_key_here
```

### 3. Start the Application

```bash
npm run dev
```

## How to Use

### Natural Language Shopping

Try these example commands in the chat:

**Product Search:**

- "Show me beginner-friendly knives under $30"
- "I need cutting boards made of wood"
- "Find professional kitchen tools"

**Add to Cart:**

- "Add 2 chef knives to my cart"
- "Add a wooden cutting board and a set of spoons"
- "I want to buy the santoku knife"

**Recommendations:**

- "I'm a beginner cook, what do I need?"
- "Recommend tools for a dinner party"
- "What's the best value knife set?"

### AI Functions

The AI uses these functions automatically:

1. **search_products** - Finds products based on criteria
2. **add_to_cart** - Adds specific products to cart

## Features

### Smart Product Search

- Filter by category, price range, difficulty level
- Search by material preferences
- Find products by tags and keywords

### Automatic Cart Management

- AI interprets natural language requests
- Adds products with specified quantities
- Provides confirmation and cart updates
- Visual feedback in chat interface

### Enhanced Chat Experience

- Function call indicators
- Cart action notifications
- Product recommendation displays
- Error handling and guidance

## Technical Implementation

### Function Calling

Uses OpenAI's function calling feature with:

- Product search utilities (`src/utils/productSearch.ts`)
- AI cart functions (`src/utils/aiCartFunctions.ts`)
- Enhanced chat API (`src/app/api/chat/route.ts`)

### Cart Integration

- Seamless integration with existing cart context
- Real-time cart updates
- Persistent cart state across sessions

### Type Safety

- Full TypeScript support
- Proper type definitions for all AI functions
- Error handling and validation

## Troubleshooting

### Chat Not Working

1. Check if `.env.local` file exists with valid API key
2. Restart the development server after adding environment variables
3. Check browser console for error messages

### API Key Issues

1. Ensure API key starts with `sk-proj-` or `sk-`
2. Verify the key is active on OpenAI platform
3. Check if you have sufficient API credits

### Function Calls Not Working

1. Ensure you're using a compatible OpenAI model (GPT-4 recommended)
2. Check network connectivity
3. Verify function schemas are properly defined

## Demo Scenarios

### Beginner Cook Setup

"I'm new to cooking and need basic kitchen tools under $50"

### Dinner Party Preparation

"I'm hosting a dinner party for 8 people, what serving tools do I need?"

### Professional Upgrade

"I'm a professional chef looking for high-end knives"

### Budget Shopping

"Show me the best value products under $25"

The AI will automatically search for relevant products and can add them to your cart with a simple confirmation!
