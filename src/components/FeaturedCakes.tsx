import { products } from "@/data/products";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export const FeaturedCakes = () => {
  const featured = products.filter((p) => p.isFeatured);
  const { ref, isVisible } = useScrollAnimation();

  if (!featured.length) return null;

  return (
    <section className="py-16 bg-muted/40" aria-label="Featured cakes">
      <div className="container mx-auto px-6 lg:px-12">
        <div
          ref={ref}
          className={`mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-2">
              Customer favourites
            </p>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold">
              Featured <span className="gradient-text">Cakes</span>
            </h2>
            <p className="mt-2 max-w-xl text-sm md:text-base text-muted-foreground">
              A quick glimpse at some of the designs our clients in Nairobi & Eldoret love the most.
            </p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {featured.map((cake) => (
            <article
              key={cake.id}
              className="group rounded-2xl border border-border bg-card/90 backdrop-blur-sm overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500"
            >
              {cake.images && cake.images[0] && (
                <div className="overflow-hidden">
                  <img
                    src={cake.images[0]}
                    alt={cake.name}
                    className="h-52 w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
              )}
              <div className="p-5 flex flex-col gap-2">
                <h3 className="text-lg font-semibold leading-snug">{cake.name}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {cake.shortDescription}
                </p>
                <p className="text-sm font-medium text-primary mt-1">
                  From KES {cake.price.toLocaleString()}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
