export type CakeCategory = '0.5kg' | '1kg' | 'bento-5' | 'bento-2' | 'cupcakes' | 'homepage';

export interface Cake {
  id: string;
  name: string;
  image: string;
  category: CakeCategory;
  price?: string;
  description?: string;
}

export const cakes: Cake[] = [
  // 0.5kg Cakes
  { id: '0.5kg-1', name: 'Classic 0.5kg Cake 1', image: '/images/rables/0.5kg/rb 12.jpeg', category: '0.5kg' },
  { id: '0.5kg-2', name: 'Classic 0.5kg Cake 2', image: '/images/rables/0.5kg/rb 13.jpeg', category: '0.5kg' },
  { id: '0.5kg-3', name: 'Classic 0.5kg Cake 3', image: '/images/rables/0.5kg/rb 18.jpeg', category: '0.5kg' },

  // 1kg Cakes
  { id: '1kg-1', name: 'Premium 1kg Cake 1', image: '/images/rables/1kg/rb 1.jpeg', category: '1kg' },
  { id: '1kg-2', name: 'Premium 1kg Cake 2', image: '/images/rables/1kg/rb 10, pt 2.jpeg', category: '1kg' },
  { id: '1kg-3', name: 'Premium 1kg Cake 3', image: '/images/rables/1kg/rb 10.jpeg', category: '1kg' },
  { id: '1kg-4', name: 'Premium 1kg Cake 4', image: '/images/rables/1kg/rb 2.jpeg', category: '1kg' },
  { id: '1kg-5', name: 'Premium 1kg Cake 5', image: '/images/rables/1kg/rb 3.jpeg', category: '1kg' },
  { id: '1kg-6', name: 'Premium 1kg Cake 6', image: '/images/rables/1kg/rb 4.jpeg', category: '1kg' },
  { id: '1kg-7', name: 'Premium 1kg Cake 7', image: '/images/rables/1kg/rb 5.jpeg', category: '1kg' },
  { id: '1kg-8', name: 'Premium 1kg Cake 8', image: '/images/rables/1kg/rb 6.jpeg', category: '1kg' },
  { id: '1kg-9', name: 'Premium 1kg Cake 9', image: '/images/rables/1kg/rb 9.jpeg', category: '1kg' },
  { id: '1kg-10', name: 'Premium 1kg Cake 10', image: '/images/rables/1kg/rb15.jpeg', category: '1kg' },

  // Bento with 5 Cupcakes
  { id: 'bento-5-1', name: 'Bento & 5 Cupcakes 1', image: '/images/rables/bento-5/rb 14.jpeg', category: 'bento-5' },
  { id: 'bento-5-2', name: 'Bento & 5 Cupcakes 2', image: '/images/rables/bento-5/rb 16.jpeg', category: 'bento-5' },
  { id: 'bento-5-3', name: 'Bento & 5 Cupcakes 3', image: '/images/rables/bento-5/rb 19.jpeg', category: 'bento-5' },
  { id: 'bento-5-4', name: 'Bento & 5 Cupcakes 4', image: '/images/rables/bento-5/rb 20.jpeg', category: 'bento-5' },

  // Bento with 2 Cupcakes
  { id: 'bento-2-1', name: 'Bento & 2 Cupcakes 1', image: '/images/rables/bento-2/bento with 2 cupcakes.jpeg', category: 'bento-2' },
  { id: 'bento-2-2', name: 'Bento & 2 Cupcakes 2', image: '/images/rables/bento-2/rb 8.jpeg', category: 'bento-2' },

  // Cupcakes
  { id: 'cupcakes-1', name: 'Delight Cupcakes 1', image: '/images/rables/cupcakes/rb 11.jpeg', category: 'cupcakes' },
  { id: 'cupcakes-2', name: 'Delight Cupcakes 2', image: '/images/rables/cupcakes/rb 17.jpeg', category: 'cupcakes' },
  { id: 'cupcakes-3', name: 'Delight Cupcakes 3', image: '/images/rables/cupcakes/rb 7.jpeg', category: 'cupcakes' },

  // Homepage Display
  { id: 'home-1', name: 'Signature Cake 1', image: '/images/rables/homepage/rb 1.jpeg', category: 'homepage' },
  { id: 'home-2', name: 'Signature Cake 2', image: '/images/rables/homepage/rb 10, pt 2.jpeg', category: 'homepage' },
  { id: 'home-3', name: 'Signature Cake 3', image: '/images/rables/homepage/rb 10.jpeg', category: 'homepage' },
  { id: 'home-4', name: 'Signature Cake 4', image: '/images/rables/homepage/rb 16.jpeg', category: 'homepage' },
  { id: 'home-5', name: 'Signature Cake 5', image: '/images/rables/homepage/rb 18.jpeg', category: 'homepage' },
  { id: 'home-6', name: 'Signature Cake 6', image: '/images/rables/homepage/rb 19.jpeg', category: 'homepage' },
  { id: 'home-7', name: 'Signature Cake 7', image: '/images/rables/homepage/rb 2.jpeg', category: 'homepage' },
  { id: 'home-8', name: 'Signature Cake 8', image: '/images/rables/homepage/rb 20.jpeg', category: 'homepage' },
  { id: 'home-9', name: 'Signature Cake 9', image: '/images/rables/homepage/rb 3.jpeg', category: 'homepage' },
  { id: 'home-10', name: 'Signature Cake 10', image: '/images/rables/homepage/rb 4.jpeg', category: 'homepage' },
  { id: 'home-11', name: 'Signature Cake 11', image: '/images/rables/homepage/rb 6.jpeg', category: 'homepage' },
  { id: 'home-12', name: 'Signature Cake 12', image: '/images/rables/homepage/rb 8.jpeg', category: 'homepage' },
];
