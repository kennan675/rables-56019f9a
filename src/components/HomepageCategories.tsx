import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Link } from "react-router-dom";
import { products } from "@/data/products";

const homepageCategories = [
  {
    id: "wedding",
    title: "Wedding Cakes",
    description: "Elegant multi-tiered designs for unforgettable weddings.",
  },
  {
    id: "birthday",
    title: "Birthday Cakes",
    description: "Custom birthday cakes for every age and theme.",
  },
  {
    id: "kids",
    title: "Kids & Character Cakes",
    description: "Playful designs featuring their favorite characters.",
  },
  {
    id: "anniversary",
    title: "Anniversary Cakes",
    description: "Timeless cakes to celebrate every milestone year.",
  },
  {
    id: "graduation",
    title: "Graduation Cakes",
    description: "Celebrate academic milestones with style.",
  },
  {
    id: "baby-shower",
    title: "Baby Shower & Gender Reveal",
    description: "Sweet designs for the newest member of the family.",
  },
  {
    id: "corporate",
    title: "Corporate & Branded",
    description: "Professional cakes for launches, events, and gifting.",
  },
  {
    id: "cupcakes",
    title: "Cupcakes & Minis",
    description: "Bite-sized treats for parties and events.",
  },
  {
    id: "photo",
    title: "Photo & Image Cakes",
    description: "Edible photo prints for highly personalized cakes.",
  },
  {
    id: "custom",
    title: "Fully Custom Creations",
    description: "Send your inspiration and we’ll design from scratch.",
  },
];

export const HomepageCategories = () => {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation();

  return (
    <section className="pt-24 pb-16 bg-background" aria-label="Cake categories overview">
      <div className="container mx-auto px-6 lg:px-12">
        <div
          ref={titleRef}
          className={`mb-10 text-left transition-all duration-1000 ${
            titleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-2">
            Explore by occasion
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
            Cake <span className="gradient-text">Categories</span>
          </h2>
          <p className="mt-3 max-w-2xl text-muted-foreground text-sm md:text-base">
            Browse our most requested cake categories. Click any category on the left sidebar to jump
            directly to its section here on the homepage.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {homepageCategories.map((category, index) => {
            const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });

            const handleScroll = () => {
              const el = document.getElementById(`category-${category.id}`);
              if (el) {
                el.scrollIntoView({ behavior: "smooth", block: "start" });
              }
            };

            const categoryProducts = products.filter(
              (product) => product.category === category.id
            );

            return (
              <article
                key={category.id}
                id={`category-${category.id}`}
                ref={ref}
                className={`group rounded-2xl border border-border bg-card/90 backdrop-blur-sm p-6 md:p-7 shadow-sm hover:shadow-xl hover:border-primary hover-lift cursor-pointer transition-all duration-700 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
                style={{ transitionDelay: `${index * 80}ms` }}
                onClick={handleScroll}
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <h3 className="text-lg md:text-xl font-semibold leading-snug">
                    {category.title}
                  </h3>
                  <span className="text-[0.7rem] uppercase tracking-[0.3em] text-primary/70">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                {categoryProducts.length > 0 && (
                  <div className="mb-4 grid grid-cols-3 gap-2">
                    {categoryProducts.slice(0, 3).map((product) => (
                      <div
                        key={product.id}
                        className="overflow-hidden rounded-xl border border-border/60 bg-background/40 group-hover:border-primary/70 transition-colors"
                      >
                        {product.images && product.images[0] && (
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            className="h-20 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                            loading="lazy"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                )}

                <p className="text-sm md:text-base text-muted-foreground mb-4">
                  {category.description}
                </p>
                <div className="flex items-center justify-between text-xs md:text-sm text-muted-foreground">
                  <span className="inline-flex items-center gap-2">
                    <span className="h-1 w-8 rounded-full bg-primary/40 group-hover:bg-primary transition-colors" />
                    Scroll to section
                  </span>
                  <Link
                    to={`/cakes/${category.id}`}
                    className="text-primary font-medium hover:underline"
                    onClick={(e) => e.stopPropagation()}
                  >
                    View cakes
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
