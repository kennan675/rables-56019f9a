import { products } from "@/data/products";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Link } from "react-router-dom";
import { ShoppingBag, Heart, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";

const formatPriceRange = (price: number, variants?: { price: number }[]) => {
  if (!variants || variants.length === 0) {
    return `KES ${price.toLocaleString()}`;
  }
  const values = variants.map((v) => v.price);
  const min = Math.min(...values);
  const max = Math.max(...values);
  return min === max
    ? `KES ${min.toLocaleString()}`
    : `KES ${min.toLocaleString()} - ${max.toLocaleString()}`;
};

export const CustomerFavorites = () => {
  const { ref, isVisible } = useScrollAnimation();
  const favorites = products.filter((p) => p.isFeatured).slice(0, 4);
  const { addToCart } = useCart();

  return (
    <section className="py-20 bg-gradient-to-b from-background to-soft-pink/30" aria-label="Customer favorites">
      <div className="container mx-auto px-6 lg:px-12">
        <div
          ref={ref}
          className={`mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
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
            to="/shop"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
          >
            View all cakes →
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {favorites.map((product, index) => (
            <article
              key={product.id}
              className={`group relative overflow-hidden rounded-2xl bg-card border border-border shadow-sm transition-all duration-700 card-hover ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                
                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-2">
                  {product.isFeatured && (
                    <span className="rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                      Popular
                    </span>
                  )}
                </div>

                {/* Quick Actions */}
                <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 translate-x-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-x-0">
                  <button className="flex h-9 w-9 items-center justify-center rounded-full bg-card/90 backdrop-blur-sm shadow-sm hover:bg-primary hover:text-primary-foreground transition-colors">
                    <Heart className="h-4 w-4" />
                  </button>
                  <Link 
                    to={`/product/${product.id}`}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-card/90 backdrop-blur-sm shadow-sm hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    <Eye className="h-4 w-4" />
                  </Link>
                </div>

                {/* Overlay */}
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-foreground/60 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </div>

              {/* Content */}
              <div className="p-4">
                <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
                  {product.category.replace('-', ' ')}
                </p>
                <h3 className="text-lg font-semibold leading-tight mb-2 line-clamp-1">
                  {product.name}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                  {product.shortDescription}
                </p>
                <div className="flex items-center justify-between">
                  <p className="text-lg font-bold text-primary">
                    {formatPriceRange(product.price, product.priceVariants)}
                  </p>
                  <Button
                    size="sm"
                    className="rounded-full"
                    onClick={(e) => {
                      e.preventDefault();
                      addToCart(product, 1);
                    }}
                  >
                    <ShoppingBag className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};