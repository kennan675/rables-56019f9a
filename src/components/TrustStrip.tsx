import { Truck, ShieldCheck, CreditCard } from "lucide-react";

const items = [
  {
    icon: Truck,
    title: "Same-day delivery",
    description: "Nairobi & Eldoret, 9am – 6pm",
  },
  {
    icon: ShieldCheck,
    title: "Guaranteed freshness",
    description: "Crafted the morning of your event",
  },
  {
    icon: CreditCard,
    title: "Secure payments",
    description: "M-Pesa, cards & corporate invoicing",
  },
];

export const TrustStrip = () => {
  return (
    <div className="border-b border-border/60 bg-white/90 backdrop-blur-md">
      <div className="container mx-auto flex flex-col gap-4 px-6 py-3 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
        {items.map((item) => (
          <div key={item.title} className="flex items-center gap-3">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
              <item.icon className="h-4 w-4" />
            </span>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-foreground">{item.title}</p>
              <p>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
