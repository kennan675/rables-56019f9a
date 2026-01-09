import { cakes } from "@/data/cakes";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Link } from "react-router-dom";
import { Cake3DCard } from "@/components/Cake3DCard";

export const CustomerFavorites = () => {
  const { ref, isVisible } = useScrollAnimation();
  // Filter cakes for homepage display
  const favorites = cakes.filter((p) => p.category === 'homepage');

  return (
    <section className="py-20 bg-gradient-to-b from-background to-soft-pink/30" aria-label="Customer favorites">
      <div className="container mx-auto px-6 lg:px-12">
        <div
          ref={ref}
          className={`mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
        >
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-primary mb-3">
              Chef's Selection
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
              Customer Favorites
            </h2>
            <p className="mt-3 max-w-xl text-muted-foreground">
              The cakes our Nairobi & Eldoret families order again and again.
            </p>
          </div>
          <Link
            to="/cakes"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
          >
            View all cakes →
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {favorites.map((cake, index) => (
            <div
              key={cake.id}
              className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <Cake3DCard
                image={cake.image}
                name={cake.name}
                price={cake.price || "Contact for Price"}
                category="Signature Cake"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};