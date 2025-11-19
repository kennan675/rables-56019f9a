import { products } from "@/data/products";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export const CakesGallery = () => {
  const { ref, isVisible } = useScrollAnimation();

  if (!products.length) return null;

  return (
    <section className="py-16 bg-background" aria-label="Cakes gallery">
      <div className="container mx-auto px-6 lg:px-12">
        <div
          ref={ref}
          className={`mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-2">
              Explore the gallery
            </p>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold">
              Recent <span className="gradient-text">Creations</span>
            </h2>
            <p className="mt-2 max-w-xl text-sm md:text-base text-muted-foreground">
              A curated mix of wedding, birthday and celebration cakes we&apos;ve crafted for clients.
            </p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
          {products.map((cake) => (
            <figure
              key={cake.id}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card/80 shadow-sm hover:shadow-xl transition-all duration-500"
            >
              {cake.images && cake.images[0] && (
                <img
                  src={cake.images[0]}
                  alt={cake.name}
                  className="h-40 w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
              )}
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/95 via-background/70 to-transparent px-3 pb-3 pt-6 text-xs text-foreground">
                <div className="font-medium text-sm line-clamp-1">{cake.name}</div>
                <div className="text-[0.7rem] text-muted-foreground line-clamp-1">
                  {cake.shortDescription}
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};
