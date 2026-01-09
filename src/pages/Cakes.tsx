import { useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { cakes, CakeCategory } from "@/data/cakes";
import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { CategorySidebar } from "@/components/CategorySidebar";
import { Cake3DCard } from "@/components/Cake3DCard";
import { useLightbox } from "@/components/ImageLightbox";

const categoryLabels: Record<string, string> = {
  all: "All Cakes",
  "0.5kg": "0.5kg Cakes",
  "1kg": "1kg Cakes",
  "bento-5": "Bento + 5 Cupcakes",
  "bento-2": "Bento + 2 Cupcakes",
  "cupcakes": "Cupcakes",
};

const categoryPrices: Record<string, string> = {
  "0.5kg": "From KSh 1,500",
  "1kg": "From KSh 2,300",
  "bento-5": "From KSh 1,500",
  "bento-2": "From KSh 1,200",
  "cupcakes": "From KSh 800",
};

const categoryOptions = Object.entries(categoryLabels).map(([id, label]) => ({ id, label }));

const CakesInner = ({ initialCategory }: { initialCategory?: string }) => {
  const [selectedCategory, setSelectedCategory] = useState(initialCategory || "all");
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation();
  const navigate = useNavigate();
  const { openLightbox } = useLightbox();

  // Exclude 'homepage' cakes from the general gallery
  const shopCakes = useMemo(() => cakes.filter(c => c.category !== 'homepage'), []);

  const filteredProducts = useMemo(
    () =>
      selectedCategory === "all"
        ? shopCakes
        : shopCakes.filter((p) => p.category === selectedCategory),
    [selectedCategory, shopCakes]
  );

  const activeLabel = categoryLabels[selectedCategory] || categoryLabels.all;

  const handleCakeClick = (cake: typeof cakes[0]) => {
    // Open lightbox to view image
    openLightbox([cake.image]);
  };

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
    // Update URL without full page reload
    if (categoryId === "all") {
      navigate("/cakes");
    } else {
      navigate(`/cakes/${categoryId}`);
    }
  };

  return (
    <main className="min-h-screen">
      <Navigation />

      <section className="pt-32 pb-12 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto px-6 lg:px-12">
          <div
            ref={titleRef}
            className={`mb-12 text-center transition-all duration-1000 ${titleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
              }`}
          >
            <h1 className="mb-4 text-5xl font-bold md:text-6xl lg:text-7xl">
              {activeLabel}
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground md:text-xl">
              Browse our handcrafted cakes designed for your special occasions.
            </p>
            {selectedCategory !== "all" && categoryPrices[selectedCategory] && (
              <p className="mt-4 text-xl font-semibold text-primary">
                {categoryPrices[selectedCategory]}
              </p>
            )}
          </div>
        </div>
      </section>

      <section className="pb-24">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex gap-8">
            <CategorySidebar
              includeAllOption
              activeCategory={selectedCategory}
              onSelectCategory={handleCategoryClick}
            />

            <div className="flex-1">
              {/* Mobile category filter */}
              <div className="mb-8 flex flex-wrap gap-3 lg:hidden">
                {categoryOptions.map((category) => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? "default" : "outline"}
                    onClick={() => handleCategoryClick(category.id)}
                    className="rounded-full text-sm"
                  >
                    {category.label}
                  </Button>
                ))}
              </div>

              {/* Cake Grid */}
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {filteredProducts.map((product, index) => {
                  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });

                  return (
                    <div
                      key={product.id}
                      ref={ref}
                      className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
                        }`}
                      style={{ transitionDelay: `${Math.min(index, 8) * 100}ms` }}
                    >
                      <Cake3DCard
                        image={product.image}
                        name={product.name}
                        price={categoryPrices[product.category] || "Contact for Price"}
                        category={categoryLabels[product.category] || product.category}
                        onClick={() => handleCakeClick(product)}
                      />
                    </div>
                  );
                })}
              </div>

              {filteredProducts.length === 0 && (
                <div className="text-center py-16">
                  <p className="text-muted-foreground text-lg">
                    No cakes found in this category.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export const Cakes = () => {
  return <CakesInner />;
};

export const CakesByCategory = () => {
  const { categoryId } = useParams();
  return <CakesInner initialCategory={categoryId} />;
};
