import { Link } from "react-router-dom";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const categories = [
  {
    id: "whole-cakes",
    name: "Whole Cakes",
    image: "/images/rables/1kg/rb 2.jpeg",
    description: "Delicious cakes in various flavors",
    color: "from-primary/80",
  },
  {
    id: "bento",
    name: "Bento Packages",
    image: "/images/rables/bento-5/rb 16.jpeg",
    description: "Mini cakes with cupcakes combo",
    color: "from-secondary/80",
  },
  {
    id: "cupcakes",
    name: "Cupcakes",
    image: "/images/rables/cupcakes/rb 7.jpeg",
    description: "Perfect for any gathering",
    color: "from-muted/80",
  },
  {
    id: "donuts",
    name: "Donuts",
    image: "/images/rables/donuts.png",
    description: "Glazed & assorted donuts",
    color: "from-accent/80",
  },
];

export const CategoryGrid = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="py-20 bg-background" aria-label="Browse by category">
      <div className="container mx-auto px-6 lg:px-12">
        <div
          ref={ref}
          className={`mb-12 text-center transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
        >
          <p className="text-sm uppercase tracking-[0.3em] text-primary mb-3">
            Our Collection
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
            Browse by Category
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {categories.map((category, index) => (
            <Link
              key={category.id}
              to={`/shop?category=${category.id}`}
              className={`group relative h-72 overflow-hidden rounded-3xl transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <img
                src={category.image}
                alt={category.name}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              {/* Strong dark gradient for text visibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/10" />
              <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                <h3 className="text-xl font-bold mb-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">{category.name}</h3>
                <p className="text-sm text-white/90 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">{category.description}</p>
                <div className="mt-4 flex items-center gap-2 opacity-0 translate-y-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
                  <span className="text-sm font-medium drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">Shop Now</span>
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
