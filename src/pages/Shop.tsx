import { useState } from "react";
import { Link } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { products } from "@/data/products";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const categories = [
  { id: "all", label: "All Cakes" },
  { id: "birthday", label: "Birthday" },
  { id: "wedding", label: "Wedding" },
  { id: "celebration", label: "Celebration" },
  { id: "cupcakes", label: "Cupcakes" },
  { id: "special-design", label: "Special Design" },
  { id: "mini-cakes", label: "Mini Cakes" },
  { id: "seasonal", label: "Seasonal" },
];

const Shop = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation();

  const filteredProducts = selectedCategory === "all" 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  return (
    <main className="min-h-screen">
      <Navigation />
      
      <section className="pt-32 pb-24 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto px-6 lg:px-12">
          <div 
            ref={titleRef}
            className={`mb-12 text-center transition-all duration-1000 ${
              titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
            }`}
          >
            <h1 className="mb-4 text-5xl font-bold md:text-6xl lg:text-7xl">
              Our <span className="gradient-text">Cake Collection</span>
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground md:text-xl">
              Browse our delicious selection of handcrafted cakes for every occasion
            </p>
          </div>

          {/* Category Filter */}
          <div className="mb-12 flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.id)}
                className="transition-all duration-300"
              >
                {category.label}
              </Button>
            ))}
          </div>

          {/* Products Grid */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((product, index) => {
              const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });
              
              return (
                <div
                  key={product.id}
                  ref={ref}
                  className={`transition-all duration-700 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <Link to={`/product/${product.id}`}>
                    <Card className="group overflow-hidden border-none shadow-lg hover-lift bg-card h-full">
                      <div className="relative h-64 overflow-hidden">
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        {product.isFeatured && (
                          <Badge className="absolute top-4 right-4 bg-primary">
                            Featured
                          </Badge>
                        )}
                        {product.isCustomizable && (
                          <Badge className="absolute top-4 left-4 bg-secondary">
                            Customizable
                          </Badge>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                      </div>
                      <CardHeader>
                        <CardTitle className="text-2xl">{product.name}</CardTitle>
                        <CardDescription className="text-base">
                          {product.shortDescription}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-xl font-semibold text-primary">
                          From KSh {product.price}
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Shop;
