import { Truck, ShieldCheck, Clock, Phone } from "lucide-react";

type TrustItem = {
  icon: typeof Truck;
  title: string;
  description: string;
  href?: string;
};

const items: TrustItem[] = [
  {
    icon: Truck,
    title: "Order 48hrs Prior",
    description: "Delivery after 48 hours",
  },
  {
    icon: ShieldCheck,
    title: "100% Fresh",
    description: "Baked same day",
  },
  {
    icon: Clock,
    title: "Mon – Sat",
    description: "9am – 7pm | Closed Sun",
  },
  {
    icon: Phone,
    title: "24/7 WhatsApp",
    description: "+254 729 063 060",
    href: "https://wa.me/254729063060",
  },
];

export const TrustStrip = () => {
  return (
    <div className="border-b border-border/60 bg-secondary">
      <div className="container mx-auto flex flex-col gap-4 px-6 py-3 text-sm md:flex-row md:items-center md:justify-between">
        {items.map((item, index) => {
          const baseClasses = `flex items-center gap-3 ${index !== 0 ? "md:border-l md:border-border/40 md:pl-6" : ""}`;
          const content = (
            <>
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                <item.icon className="h-4 w-4" />
              </span>
              <div>
                <p className="font-medium text-foreground">{item.title}</p>
                <p className="text-xs text-muted-foreground">{item.description}</p>
              </div>
            </>
          );

          return item.href ? (
            <a
              key={item.title}
              href={item.href}
              target="_blank"
              rel="noreferrer"
              className={`${baseClasses} transition-colors hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2`}
            >
              {content}
            </a>
          ) : (
            <div key={item.title} className={baseClasses}>
              {content}
            </div>
          );
        })}
      </div>
    </div>
  );
};