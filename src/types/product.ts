export interface Product {
  id: string;
  name: string;
  category: 'birthday' | 'wedding' | 'celebration' | 'cupcakes' | 'special-design' | 'mini-cakes' | 'seasonal';
  price: number;
  priceVariants?: {
    size: string;
    servings: string;
    price: number;
  }[];
  images: string[];
  shortDescription: string;
  longDescription: string;
  isCustomizable: boolean;
  isFeatured: boolean;
  ingredients?: string;
  allergens?: string;
}

export interface CartItem extends Product {
  quantity: number;
  selectedSize?: string;
  selectedServings?: string;
  selectedPrice?: number;
}
