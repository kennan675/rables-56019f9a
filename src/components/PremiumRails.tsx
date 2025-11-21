import { products } from "@/data/products";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Link } from "react-router-dom";
import { ArrowRight, ShoppingBag } from "lucide-react";

const formatPriceRange = (price: number, variants?: { price: number }[]) => {
  if (!variants || variants.length === 0) {
    return `KES ${price.toLocaleString()}`;
  }

  const values = variants.map((variant) => variant.price);
  const min = Math.min(...values);
  const max = Math.max(...values);

  return min === max
    ? `KES ${min.toLocaleString()}`
    : `KES ${min.toLocaleString()} - ${max.toLocaleString()}`;
};

const ProductRail = ({
  title,
  subtitle,
  items,
  badgeLabel,
  viewAllHref,
}: {
  title: string;
  subtitle: string;
  items: typeof products;
  badgeLabel: string;
  viewAllHref: string;
}) => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="py-16" aria-label={title}>
      <div className="container mx-auto px-6 lg:px-12">
        <div
          ref={ref}
          className={`mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-2">
              {badgeLabel}
            </p>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold">
              {title}
            </h2>
            <p className="mt-2 max-w-xl text-sm md:text-base text-muted-foreground">
              {subtitle}
            </p>
          </div>
          <Link
            to={viewAllHref}
            className="inline-flex items-center gap-2 text-sm font-medium text-primary"
          >
            View all
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {items.map((item, index) => (
            <article
              key={item.id}
              className="group relative overflow-hidden rounded-3xl border border-border/80 bg-card shadow-sm hover:shadow-2xl transition-all duration-500"
              style={{ transitionDelay: `${index * 80}ms` }}
            >
              <div className="relative h-64 overflow-hidden">
                {item.images?.[0] && (
                  <img
                    src={item.images[0]}
                    alt={item.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                {item.isFeatured && (
                  <span className="absolute left-4 top-4 rounded-full bg-primary/90 px-3 py-1 text-xs font-semibold text-primary-foreground">
                    Chef's Pick
                  </span>
                )}
              </div>

              <div className="p-5">
                <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-muted-foreground">
                  <span>{item.category}</span>
                  <span>{formatPriceRange(item.price, item.priceVariants)}</span>
                </div>
                <h3 className="mt-3 text-xl font-semibold leading-tight">{item.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                  {item.shortDescription}
                </p>
              </div>

              <div className="absolute inset-x-0 bottom-0 translate-y-full bg-white/95 px-5 py-4 text-sm text-foreground transition-transform duration-500 group-hover:translate-y-0">
                <div className="flex flex-wrap gap-2">
                  <Link
                    to={`/product/${item.id}`}
                    className="inline-flex flex-1 items-center justify-center rounded-full border border-border px-3 py-2 text-xs font-semibold tracking-wide uppercase text-muted-foreground hover:border-primary hover:text-primary"
                  >
                    Quick View
                  </Link>
                  <button
                    onClick={() =>
                      window.open(
                        `https://wa.me/254704209055?text=${encodeURIComponent(
                          `Hi Rable Bakes! I'm interested in the ${item.name}.`
                        )}`,
                        "_blank"
                      )
                    }
                    className="inline-flex flex-1 items-center justify-center rounded-full bg-primary px-3 py-2 text-xs font-semibold uppercase tracking-wide text-primary-foreground hover:bg-primary/90"
                  >
                    <ShoppingBag className="mr-1 h-4 w-4" /> Order
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export const PremiumRails = () => {
  const customerFavorites = products.filter((product) => product.isFeatured).slice(0, 4);
  const weddingCollection = products.filter((product) => product.category === "wedding").slice(0, 4);

  return (
    <div className="bg-background">
      <ProductRail
        title="Customer Favorites"
        subtitle="Beloved cakes that our Nairobi & Eldoret families reorder again and again."
        items={customerFavorites}
        badgeLabel="Chef curated"
        viewAllHref="/cakes"
      />
      <ProductRail
        title="Wedding Atelier"
        subtitle="Elegant tiers, luxe textures, and couture finishes for your grand celebrations."
        items={weddingCollection}
        badgeLabel="Signature wedding collection"
        viewAllHref="/cakes/wedding"
      />
    </div>
  );
};
