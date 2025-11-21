import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingBag, Eye } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { products as catalogProducts } from "@/data/products";

const featuredProducts = catalogProducts.filter((product) => product.isFeatured).slice(0, 3);

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

export const Products = () => {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation();

  return (
    <section id="products" className="py-24 bg-muted/30">
      <div className="container mx-auto px-6 lg:px-12">
        <div 
          ref={titleRef}
          className={`mb-16 text-center transition-all duration-1000 ${
            titleVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-20'
          }`}
        >
          <h2 className="mb-4 text-4xl font-bold md:text-5xl lg:text-6xl">
            Our <span className="gradient-text">Signature</span> Creations
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground md:text-xl">
            From intimate gatherings to grand celebrations, we craft cakes that become the centerpiece of your memories
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {featuredProducts.map((product, index) => {
            const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });
            
            return (
              <div
                key={product.id}
                ref={ref}
                className={`transition-all duration-700 ${
                  isVisible 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-20'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <Card className="group relative overflow-hidden border border-border/70 bg-card/90 shadow-md hover:shadow-2xl h-full">
                  <div className="relative h-64 overflow-hidden">
                    {product.images?.[0] && (
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                        loading="lazy"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    <span className="absolute left-4 top-4 rounded-full bg-primary/90 px-3 py-1 text-xs font-semibold text-primary-foreground">
                      Offer of the Month
                    </span>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-2xl">{product.name}</CardTitle>
                    <CardDescription className="text-base">{product.shortDescription}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-lg font-semibold text-primary">
                      {formatPriceRange(product.price, product.priceVariants)}
                    </p>
                  </CardContent>

                  <div className="absolute inset-x-0 bottom-0 translate-y-full bg-white/95 px-5 py-4 text-sm text-foreground transition-transform duration-500 group-hover:translate-y-0">
                    <div className="flex gap-3">
                      <CardDescription className="sr-only">Quick actions</CardDescription>
                      <button
                        onClick={() => window.open(`/product/${product.id}`, '_self')}
                        className="inline-flex flex-1 items-center justify-center rounded-full border border-border px-3 py-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground hover:border-primary hover:text-primary"
                      >
                        <Eye className="mr-1 h-4 w-4" /> View details
                      </button>
                      <button
                        onClick={() =>
                          window.open(
                            `https://wa.me/254704209055?text=${encodeURIComponent(
                              `Hi Rable Bakes! I'm interested in the ${product.name}.`
                            )}`,
                            '_blank'
                          )
                        }
                        className="inline-flex flex-1 items-center justify-center rounded-full bg-primary px-3 py-2 text-xs font-semibold uppercase tracking-wide text-primary-foreground hover:bg-primary/90"
                      >
                        <ShoppingBag className="mr-1 h-4 w-4" /> Order
                      </button>
                    </div>
                  </div>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
