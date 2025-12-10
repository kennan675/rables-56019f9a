import { Truck, ShieldCheck, Clock, Phone } from "lucide-react";

const items = [
  {
    icon: Truck,
    title: "Fast Delivery",
    description: "2hrs for ready cakes",
  },
  {
    icon: ShieldCheck,
    title: "100% Fresh",
    description: "Baked same day",
  },
  {
    icon: Clock,
    title: "Open Daily",
    description: "9am – 7pm",
  },
  {
    icon: Phone,
    title: "24/7 WhatsApp",
    description: "+254 704 209 055",
  },
];

export const TrustStrip = () => {
  return (
    <div className="border-b border-border/60 bg-soft-pink">
      <div className="container mx-auto flex flex-col gap-4 px-6 py-3 text-sm md:flex-row md:items-center md:justify-between">
        {items.map((item, index) => (
          <div 
            key={item.title} 
            className={`flex items-center gap-3 ${index !== 0 ? 'md:border-l md:border-border/40 md:pl-6' : ''}`}
          >
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
              <item.icon className="h-4 w-4" />
            </span>
            <div>
              <p className="font-medium text-foreground">{item.title}</p>
              <p className="text-muted-foreground text-xs">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};