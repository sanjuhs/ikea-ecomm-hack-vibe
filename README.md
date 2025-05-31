# KitchenCraft - E-commerce Demo

A simple, clean e-commerce landing page for kitchen cutlery and tools, built for hackathon demonstration purposes. Inspired by IKEA's minimalist design philosophy.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📁 Project Structure

```
src/
├── app/
│   ├── page.tsx          # Main landing page
│   └── globals.css       # Global styles
├── data/
│   └── products.json     # Product data (easily editable)
└── types/
    └── product.ts        # TypeScript interfaces
```

## 🛠 Modifying Products

The product data is stored in `src/data/products.json` and can be easily modified for demo purposes:

```json
{
  "products": [
    {
      "id": 1,
      "name": "Product Name",
      "price": 29.99,
      "description": "Product description",
      "image": "https://images.unsplash.com/photo-...",
      "category": "knives" // knives | utensils | cutting-boards | tools
    }
  ]
}
```

### Adding New Products

1. Open `src/data/products.json`
2. Add a new product object to the `products` array
3. Ensure the `id` is unique
4. Use one of the valid categories: `knives`, `utensils`, `cutting-boards`, or `tools`
5. Save the file - changes will be reflected immediately in development

### Image Sources

The demo uses Unsplash images for product photos. You can:

- Use any Unsplash URL with `?w=400&h=400&fit=crop` for consistent sizing
- Replace with your own hosted images
- Use placeholder services like `https://via.placeholder.com/400x400`

## 🎨 Design Features

- **IKEA-inspired**: Clean, minimalist design with plenty of whitespace
- **Responsive**: Mobile-first design that works on all devices
- **Modern UI**: Hover effects, smooth transitions, and professional typography
- **Accessible**: Semantic HTML and proper contrast ratios

## 🔧 Tech Stack

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type safety and better developer experience
- **Tailwind CSS v4** - Utility-first CSS framework
- **JSON Data** - Simple, file-based product storage

## 📝 Demo Features

- Product grid with hover effects
- Category badges
- Price display
- Non-functional "Add to Cart" buttons (demo only)
- Responsive navigation
- Professional footer

## 🎯 Hackathon Ready

This project is designed for quick demonstration:

- No database setup required
- Easy product data modification
- Fast development server startup
- Clean, professional appearance
- Mobile-responsive design

## 📄 License

This is a demo project created for hackathon purposes. Feel free to use and modify as needed.
