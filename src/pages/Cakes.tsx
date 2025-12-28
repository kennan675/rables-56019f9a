import { useState, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { cakes } from "@/data/cakes";
import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { CategorySidebar } from "@/components/CategorySidebar";
import { Cake3DCard } from "@/components/Cake3DCard";

const categoryLabels: Record<string, string> = {
  all: "All Cakes",
  birthday: "Birthday Cakes",
  celebration: "Celebration Cakes",
  cupcakes: "Cupcakes",
  "special-design": "Special Design Cakes",
  "mini-cakes": "Mini Cakes",
  seasonal: "Seasonal Cakes",
};

const categoryOptions = Object.entries(categoryLabels).map(([id, label]) => ({ id, label }));

const CakesInner = ({ initialCategory }: { initialCategory?: string }) => {
  const [selectedCategory, setSelectedCategory] = useState(initialCategory || "all");
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation();

  // Exclude 'homepage' cakes from the general gallery as requested
  const shopCakes = useMemo(() => cakes.filter(c => c.category !== 'homepage'), []);

  const filteredProducts = useMemo(
    () =>
      selectedCategory === "all"
        ? shopCakes
        : shopCakes.filter((p) => p.category === selectedCategory),
    [selectedCategory, shopCakes]
  );

  const activeLabel = categoryLabels[selectedCategory] || categoryLabels.all;

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
              Browse handcrafted cakes designed for your special occasions.
            </p>
          </div>
        </div>
      </section>

      <section className="pb-24">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex gap-8">
            <CategorySidebar
              includeAllOption
              activeCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />

            <div className="flex-1">
              <div className="mb-8 flex flex-wrap gap-3 lg:hidden">
                {categoryOptions.map((category) => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? "default" : "outline"}
                    onClick={() => setSelectedCategory(category.id)}
                    className="rounded-full text-sm"
                  >
                    {category.label}
                  </Button>
                ))}
              </div>

              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {filteredProducts.map((product, index) => {
                  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });

                  return (
                    <div
                      key={product.id}
                      ref={ref}
                      className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
                        }`}
                      style={{ transitionDelay: `${index * 100}ms` }}
                    >
                      <Cake3DCard
                        image={product.image}
                        name={product.name}
                        price={product.price || "Contact for Price"}
                      />
                    </div>
                  );
                })}
              </div>
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
