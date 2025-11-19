import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const steps = [
  {
    title: "Share the details",
    description:
      "Tell us the date, location, servings and theme for your cake via WhatsApp or the custom order form.",
  },
  {
    title: "Confirm design & quote",
    description:
      "We&apos;ll suggest designs, flavours and pricing, then lock in your booking with a small deposit.",
  },
  {
    title: "We bake & deliver",
    description:
      "Our team bakes, decorates and coordinates pick-up or delivery in Nairobi & Eldoret.",
  },
];

export const OrderProcess = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="py-16 bg-background" aria-label="How to order">
      <div className="container mx-auto px-6 lg:px-12">
        <div
          ref={ref}
          className={`mb-10 text-center transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-2">
            Simple order process
          </p>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold">
            From idea to cake in <span className="gradient-text">3 steps</span>
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {steps.map((step, index) => (
            <article
              key={step.title}
              className="relative rounded-2xl border border-border bg-card/80 p-6 shadow-sm"
            >
              <div className="mb-4 flex items-center justify-between">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                  0{index + 1}
                </span>
              </div>
              <h3 className="mb-2 text-base md:text-lg font-semibold">{step.title}</h3>
              <p className="text-sm text-muted-foreground">{step.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
