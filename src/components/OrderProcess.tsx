import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { MessageCircle, Palette, Truck, CheckCircle2 } from "lucide-react";

const steps = [
  {
    icon: MessageCircle,
    title: "Share Your Vision",
    description: "Tell us about your event 24-48 hours in advance. Share your theme, flavors, and any special requests via WhatsApp.",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: Palette,
    title: "Design & Quote",
    description: "We'll create a custom design and send you a quote. Lock in your booking with a small deposit.",
    color: "bg-gold/10 text-gold",
  },
  {
    icon: Truck,
    title: "Fresh Bake & Deliver",
    description: "Your cake is baked fresh on the day of your event (orders require 24-48h notice) and delivered safely.",
    color: "bg-coral/10 text-coral",
  },
  {
    icon: CheckCircle2,
    title: "Celebrate!",
    description: "Enjoy your beautiful, delicious cake and make memories that last a lifetime.",
    color: "bg-primary/10 text-primary",
  },
];

export const OrderProcess = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="py-20 bg-background" aria-label="How to order">
      <div className="container mx-auto px-6 lg:px-12">
        <div
          ref={ref}
          className={`mb-12 text-center transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
        >
          <p className="text-sm uppercase tracking-[0.3em] text-primary mb-3">
            Simple Process
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
            From Idea to Cake in 4 Easy Steps
          </h2>
        </div>

        <div className="relative">
          {/* Connection Line */}
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-border hidden lg:block -translate-y-1/2" />

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <article
                key={step.title}
                className={`relative text-center transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                  }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                {/* Step Number */}
                <div className="relative mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-card border-4 border-background shadow-lg z-10">
                  <div className={`flex h-14 w-14 items-center justify-center rounded-full ${step.color}`}>
                    <step.icon className="h-6 w-6" />
                  </div>
                  <span className="absolute -top-2 -right-2 flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                    {index + 1}
                  </span>
                </div>

                <h3 className="mb-3 text-xl font-semibold">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};