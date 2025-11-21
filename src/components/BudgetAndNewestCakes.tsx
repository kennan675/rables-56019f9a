import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";

const createPlaceholderImage = (label: string) =>
  `https://placehold.co/600x600/fff5fb/d61f88?text=${encodeURIComponent(label.replace(/\s+/g, "+"))}`;

const budgetCakes = [
  { name: "Sprinkle Bae", size: "0.5kg Cake", price: "KSh 1,800" },
  { name: "Vanilla Legacy", size: "1kg Cake", price: "KSh 2,200" },
  { name: "Chocolate Modern", size: "1kg Cake", price: "KSh 2,400" },
  { name: "Red Velvet Regal", size: "1kg Cake", price: "KSh 2,600" },
  { name: "Black Forest Classic", size: "1kg Cake", price: "KSh 2,600" },
  { name: "White Forest Luxe", size: "1kg Cake", price: "KSh 2,600" },
].map((cake) => ({ ...cake, image: createPlaceholderImage(cake.name) }));

const newestCakes = [
  { name: "Minimal 22", size: "0.5kg Cake", price: "KSh 2,000" },
  { name: "Biscoff Drip", size: "1kg Cake", price: "KSh 3,200" },
  { name: "Black Glam", size: "1.5kg Cake", price: "KSh 4,200" },
  { name: "Champagne Rosette", size: "0.8kg Cake", price: "KSh 3,000" },
  { name: "Pastel Crown", size: "1kg Cake", price: "KSh 3,500" },
  { name: "Marble Muse", size: "1.2kg Cake", price: "KSh 3,800" },
].map((cake) => ({ ...cake, image: createPlaceholderImage(cake.name) }));

const rails = [
  { title: "Our Budget Cakes", cakes: budgetCakes },
  { title: "Our Newest Cakes", cakes: newestCakes },
];

export const BudgetAndNewestCakes = () => {
  return (
    <section className="bg-white py-16 lg:py-20" aria-label="Budget and newest cake collections">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="space-y-16">
          {rails.map((rail) => (
            <div key={rail.title} className="space-y-6">
              <div className="text-center">
                <p className="text-xs uppercase tracking-[0.3em] text-[#ff2fb8]">Rable Specials</p>
                <h2 className="text-3xl font-semibold text-[#1c1c1c]">{rail.title}</h2>
              </div>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {rail.cakes.map((cake) => (
                  <article key={cake.name} className="flex h-full flex-col overflow-hidden rounded-3xl border border-[#fde4f3] bg-[#fff5fb] shadow-sm">
                    <div className="overflow-hidden">
                      <img
                        src={cake.image}
                        alt={cake.name}
                        className="h-64 w-full object-cover transition-transform duration-700 hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                    <div className="flex flex-1 flex-col gap-2 px-6 py-6 text-center">
                      <div className="text-lg font-semibold text-[#231f20]">{cake.name}</div>
                      <p className="text-sm text-muted-foreground">{cake.size}</p>
                      <p className="text-2xl font-bold text-[#ff2fb8]">{cake.price}</p>
                      <Button
                        asChild
                        className="mt-4 w-full rounded-full bg-[#ff2fb8] text-white hover:bg-[#ff2fb8]/90"
                      >
                        <Link to="/cakes">Buy Now</Link>
                      </Button>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
