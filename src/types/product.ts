export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  category: "knives" | "spoons" | "forks" | "cutting-boards" | "tools";
  tags: string[];
  difficulty: "beginner" | "intermediate" | "professional";
  material: string;
  size: string;
}

export interface ProductData {
  products: Product[];
}
