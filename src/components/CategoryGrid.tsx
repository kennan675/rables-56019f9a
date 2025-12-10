import { Link } from "react-router-dom";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import weddingCake from "@/assets/wedding-cake.jpg";
import birthdayCake from "@/assets/birthday-cake.jpg";
import cupcakes from "@/assets/cupcakes.jpg";

const categories = [
  {
    id: "birthday",
    name: "Birthday Cakes",
    image: birthdayCake,
    description: "Make every birthday unforgettable",
    color: "from-rose-pink/80",
  },
  {
    id: "wedding",
    name: "Wedding Cakes",
    image: weddingCake,
    description: "Elegant tiers for your big day",
    color: "from-gold/80",
  },
  {
    id: "cupcakes",
    name: "Cupcakes & Treats",
    image: cupcakes,
    description: "Perfect for any gathering",
    color: "from-coral/80",
  },
];

export const CategoryGrid = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="py-20 bg-background" aria-label="Browse by category">
      <div className="container mx-auto px-6 lg:px-12">
        <div
          ref={ref}
          className={`mb-12 text-center transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="text-sm uppercase tracking-[0.3em] text-primary mb-3">
            Our Collection
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
            Browse by Category
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {categories.map((category, index) => (
            <Link
              key={category.id}
              to={`/shop?category=${category.id}`}
              className={`group relative h-80 overflow-hidden rounded-3xl transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <img
                src={category.image}
                alt={category.name}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className={`absolute inset-0 bg-gradient-to-t ${category.color} via-foreground/30 to-transparent`} />
              <div className="absolute inset-0 flex flex-col justify-end p-6 text-primary-foreground">
                <h3 className="text-2xl font-bold mb-2">{category.name}</h3>
                <p className="text-sm text-primary-foreground/80">{category.description}</p>
                <div className="mt-4 flex items-center gap-2 opacity-0 translate-y-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
                  <span className="text-sm font-medium">Shop Now</span>
                  <span className="text-lg">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};