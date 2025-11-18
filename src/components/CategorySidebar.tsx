import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const categories = [
  { id: "wedding", label: "Wedding Cakes" },
  { id: "birthday", label: "Birthday Cakes" },
  { id: "kids", label: "Kids Cakes" },
  { id: "anniversary", label: "Anniversary Cakes" },
  { id: "graduation", label: "Graduation Cakes" },
  { id: "baby-shower", label: "Baby Shower Cakes" },
  { id: "corporate", label: "Corporate Cakes" },
  { id: "cupcakes", label: "Cupcakes" },
  { id: "photo", label: "Photo Cakes" },
  { id: "custom", label: "Custom Cakes" },
];

export const CategorySidebar = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  const handleClick = (categoryId: string) => {
    const el = document.getElementById(`category-${categoryId}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <aside
      ref={ref}
      className={`hidden lg:flex flex-col gap-2 w-64 shrink-0 py-32 px-6 border-r border-border/70 bg-cream/80 backdrop-blur-xl sticky top-0 h-screen overflow-y-auto transition-all duration-500 ${
        isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-6"
      }`}
    >
      <div className="mb-6">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-1">
          Cake Catalog
        </p>
        <h2 className="text-xl font-semibold text-foreground">Categories</h2>
      </div>
      <nav className="space-y-1">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => handleClick(cat.id)}
            className="w-full text-left text-sm px-3 py-2 rounded-lg hover:bg-primary/10 hover:text-primary transition-colors group"
          >
            <span className="inline-flex items-center gap-2">
              <span className="h-1 w-1 rounded-full bg-primary/40 group-hover:bg-primary" />
              <span>{cat.label}</span>
            </span>
          </button>
        ))}
      </nav>
    </aside>
  );
};
