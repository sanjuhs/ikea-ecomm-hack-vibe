# Product Requirements Document: AI-Powered Kitchen Cutlery E-commerce Demo

## Project Overview

A demo e-commerce landing page showcasing kitchen cutlery and tools with an integrated AI agent that can help users select and add items to their cart. Built for hackathon demonstration of AI-powered shopping assistance.

## Implementation Status & To-Do List

### ✅ Phase 1: Foundation & Product Dataset (COMPLETED)

- [x] Create comprehensive PRD with AI agent requirements
- [x] Design enhanced product data structure with metadata
- [x] Create TypeScript interfaces for type safety
- [x] Expand product dataset to 35 items across 5 categories
- [x] Update landing page to display enhanced product information
- [x] Add category distribution and difficulty badges
- [x] Configure Next.js for external images (Unsplash)
- [x] Test basic functionality and responsive design

### 🔄 Phase 2: AI Chat Interface (IN PROGRESS)

- [ ] Install OpenAI NPM package and dependencies
- [ ] Set up environment variables for OpenAI API key
- [ ] Create chat widget component with modern UI
- [ ] Implement chat state management (useState/useReducer)
- [ ] Design chat bubble layout with user/assistant messages
- [ ] Add chat toggle functionality (open/close)
- [ ] Create typing indicators and loading states
- [ ] Style chat widget to match IKEA-inspired design
- [ ] Make chat widget responsive for mobile devices
- [ ] Add chat history persistence (session storage)

### 📋 Phase 3: Cart State Management (PENDING)

- [ ] Create cart context/provider for global state
- [ ] Implement add to cart functionality
- [ ] Create cart item interface and types
- [ ] Add cart counter in header with real count
- [ ] Implement remove from cart functionality
- [ ] Add cart sidebar/modal for viewing items
- [ ] Calculate cart totals and quantities
- [ ] Add cart persistence (localStorage)
- [ ] Create cart item components with quantity controls
- [ ] Add cart empty state and messaging

### 🤖 Phase 4: AI Agent Integration (PENDING)

- [ ] Create OpenAI API route handler (/api/chat)
- [ ] Design system prompt for kitchen product assistant
- [ ] Implement product search and filtering logic
- [ ] Create product recommendation algorithms
- [ ] Add natural language processing for user queries
- [ ] Implement cart manipulation via AI commands
- [ ] Add product knowledge base integration
- [ ] Create demo scenario handlers
- [ ] Add error handling for AI responses
- [ ] Implement conversation context management

### 🎨 Phase 5: Polish & Demo Features (PENDING)

- [ ] Add smooth animations and transitions
- [ ] Implement product quick view modals
- [ ] Add product image galleries
- [ ] Create demo mode with preset scenarios
- [ ] Add keyboard shortcuts for demo presentation
- [ ] Implement voice input for chat (optional)
- [ ] Add chat export functionality
- [ ] Create admin panel for easy product editing
- [ ] Add performance optimizations
- [ ] Final testing and bug fixes

## Detailed Technical To-Dos

### AI Chat Implementation Tasks

1. **Setup & Dependencies**

   - [ ] `npm install openai @types/node`
   - [ ] Create `.env.local` with `OPENAI_API_KEY`
   - [ ] Add environment variable types

2. **Chat Widget Component**

   - [ ] Create `components/ChatWidget.tsx`
   - [ ] Implement floating chat button
   - [ ] Create expandable chat interface
   - [ ] Add message list with auto-scroll
   - [ ] Implement message input with send button
   - [ ] Add emoji and formatting support

3. **API Integration**

   - [ ] Create `app/api/chat/route.ts`
   - [ ] Implement OpenAI GPT-4o integration
   - [ ] Design system prompt for product assistant
   - [ ] Add streaming response support
   - [ ] Implement error handling and rate limiting

4. **Product Integration**
   - [ ] Create product search utilities
   - [ ] Implement tag-based filtering
   - [ ] Add price range and category filtering
   - [ ] Create recommendation scoring system
   - [ ] Implement cart addition via AI

### Demo Scenarios Implementation

- [ ] **Beginner Cook**: "I'm just starting to cook, what do I need?"
- [ ] **Dinner Party**: "I'm hosting a dinner party for 10 people"
- [ ] **Budget Shopping**: "I need kitchen tools under $100 total"
- [ ] **Eco-Friendly**: "I only want sustainable products"
- [ ] **Professional Setup**: "I need professional-grade tools"

## Core Requirements

### 1. Landing Page Features ✅

- **Product Grid**: Display 30-40 kitchen items in a clean, responsive grid layout
- **Product Cards**: Each item shows:
  - Product image
  - Product name
  - Price
  - Brief description
  - Simple "Add to Cart" button
- **AI Chat Interface**: Small popup chat widget for AI agent interaction

### 2. AI Agent Functionality (Demo Focus)

- **Conversational Shopping**: AI agent can understand user preferences and needs
- **Product Recommendations**: Agent suggests relevant items based on user requirements
- **Cart Management**: Agent can add selected items to cart on behalf of the user
- **Natural Language Processing**: Users can describe what they need in natural language
- **Demo Scenarios**:
  - "I need tools for preparing a dinner party for 8 people"
  - "I'm a beginner cook, what basic knives do I need?"
  - "I want eco-friendly cutting boards under $50"
  - "Help me find the best value utensil set"

### 3. Expanded Product Categories (5 Categories) ✅

1. **Knives**: Chef knives, paring knives, bread knives, santoku, utility knives, steak knives
2. **Spoons**: Wooden spoons, serving spoons, slotted spoons, ladles, measuring spoons
3. **Forks**: Serving forks, carving forks, pasta forks, salad forks
4. **Cutting Boards**: Wooden, bamboo, plastic, glass, marble cutting boards
5. **Kitchen Tools**: Spatulas, tongs, peelers, graters, whisks, can openers, timers

### 4. Data Structure ✅

- **JSON-based**: All product data stored in easily editable JSON
- **Enhanced Product Fields**:
  - `id`: Unique identifier
  - `name`: Product name
  - `price`: Price in USD
  - `description`: Detailed product description
  - `image`: Image URL/path
  - `category`: Product category (knives, spoons, forks, cutting-boards, tools)
  - `tags`: Array of searchable tags for AI agent
  - `difficulty`: Usage difficulty (beginner, intermediate, professional)
  - `material`: Product material (steel, wood, silicone, etc.)
  - `size`: Product size/dimensions

### 5. Design Requirements

- **IKEA-inspired**: Clean, minimalist design with plenty of whitespace ✅
- **Responsive**: Works seamlessly on desktop and mobile ✅
- **Modern UI**: Smooth animations, hover effects, professional typography ✅
- **Chat Widget**: Unobtrusive but easily accessible AI chat interface
- **Visual Feedback**: Clear indication when items are added to cart

### 6. Technical Requirements

- **Next.js 15**: Using App Router ✅
- **TypeScript**: For type safety and better development experience ✅
- **Tailwind CSS v4**: For styling and responsive design ✅
- **Static Data**: JSON data stored locally for easy demo manipulation ✅
- **AI Integration Ready**: Structure prepared for AI agent integration
- **Cart State Management**: Simple cart functionality for demo purposes

## AI Agent Demo Scenarios

### Scenario 1: Beginner Cook Setup

- User: "I'm just starting to cook, what do I need?"
- Agent: Recommends basic knife set, cutting board, and essential utensils
- Agent: Adds recommended items to cart with explanation

### Scenario 2: Dinner Party Preparation

- User: "I'm hosting a dinner party for 10 people"
- Agent: Suggests serving utensils, large cutting boards, and prep tools
- Agent: Calculates quantities needed and adds to cart

### Scenario 3: Budget-Conscious Shopping

- User: "I need kitchen tools under $100 total"
- Agent: Finds best value items within budget
- Agent: Prioritizes essential items and adds to cart

### Scenario 4: Material Preferences

- User: "I only want eco-friendly, sustainable products"
- Agent: Filters for bamboo, wood, and sustainable materials
- Agent: Adds environmentally conscious selections to cart

## Product Dataset Requirements ✅

- **Total Items**: 35 products
- **Category Distribution**:
  - Knives: 8 items ✅
  - Spoons: 6 items ✅
  - Forks: 4 items ✅
  - Cutting Boards: 6 items ✅
  - Kitchen Tools: 11 items ✅
- **Price Range**: $8.99-$89.99 to demonstrate various budget scenarios ✅
- **Variety**: Different materials, sizes, and difficulty levels ✅

## Success Criteria

- Clean, professional e-commerce interface ✅
- 35 diverse kitchen products with rich metadata ✅
- Easy JSON manipulation for demo customization ✅
- AI agent can successfully interpret user needs
- Smooth cart addition functionality
- Responsive design across all devices ✅
- Demo-ready for hackathon presentation

## Next Steps (Immediate)

1. **Install OpenAI package**: `npm install openai`
2. **Set up environment variables** for API key
3. **Create chat widget component** with basic UI
4. **Implement OpenAI API route** for chat functionality
5. **Test basic AI conversation** before product integration

## Out of Scope (For Demo)

- Real payment processing
- User authentication
- Persistent cart storage
- Advanced search/filtering UI
- Product reviews or ratings
- Inventory management
- Order fulfillment
