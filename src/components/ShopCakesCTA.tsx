import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Button } from "@/components/ui/button";
import { products } from "@/data/products";

export const ShopCakesCTA = () => {
  const highlightPool = products.filter((product) => product.isFeatured);
  const showcaseProducts = (highlightPool.length ? highlightPool : products).slice(0, 3);
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });

  if (!showcaseProducts.length) return null;

  return (
    <section className="py-16 lg:py-24 bg-muted/20" aria-label="Shop cakes">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] items-center">
          <div
            ref={ref}
            className={`transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4">
              Signature Atelier
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight mb-6">
              Shop our most-requested cakes straight from the studio.
            </h2>
            <p className="text-base md:text-lg text-muted-foreground mb-8 max-w-xl">
              Browse limited wedding editions, couture celebration cakes and seasonal petites. Our full collection
              now lives on the dedicated Cakes menu for a calmer, gallery-first homepage.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg" className="text-base px-7 py-6 rounded-full">
                <Link to="/cakes">
                  Browse full Cakes Menu
                  <ArrowUpRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-base px-6 py-6 rounded-full">
                <Link to="/custom-orders">Request bespoke design</Link>
              </Button>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {showcaseProducts.map((product, index) => (
              <figure
                key={product.id}
                className={`relative overflow-hidden rounded-[28px] border border-border bg-card/80 shadow-lg transition-all duration-500 ${
                  index === 1 ? "hidden sm:block sm:translate-y-8" : ""
                } ${index === 2 ? "hidden lg:block lg:-translate-y-8" : ""}`}
              >
                {product.images?.[0] && (
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="h-[360px] w-full object-cover"
                    loading="lazy"
                  />
                )}
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/95 via-background/70 to-transparent px-4 pb-4 pt-16">
                  <div className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-1">
                    {product.category?.replace(/-/g, " ") ?? "Signature"}
                  </div>
                  <div className="text-lg font-semibold">{product.name}</div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
