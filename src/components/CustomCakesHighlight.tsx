import { useNavigate } from "react-router-dom";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export const CustomCakesHighlight = () => {
  const navigate = useNavigate();
  const { ref, isVisible } = useScrollAnimation();

  const openWhatsApp = () => {
    const text = "Hi Rable Bakes! I would love to design a fully custom cake for my occasion.";
    window.open(
      `https://wa.me/254704209055?text=${encodeURIComponent(text)}`,
      "_blank"
    );
  };

  return (
    <section className="py-16 bg-muted/40" aria-label="Custom cakes">
      <div className="container mx-auto px-6 lg:px-12">
        <div
          ref={ref}
          className={`grid gap-10 md:grid-cols-2 items-center transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-2">
              Fully custom creations
            </p>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-3">
              Bring your <span className="gradient-text">dream cake</span> to life
            </h2>
            <p className="text-sm md:text-base text-muted-foreground mb-4">
              Share your inspiration photos, colors and theme, and our team will design a one-of-a-kind
              centrepiece for your celebration.
            </p>
            <div className="flex flex-wrap gap-3 text-xs md:text-sm text-muted-foreground">
              <span className="inline-flex items-center rounded-full border border-border px-3 py-1 bg-background/60">
                Weddings &amp; engagements
              </span>
              <span className="inline-flex items-center rounded-full border border-border px-3 py-1 bg-background/60">
                Brand &amp; corporate launches
              </span>
              <span className="inline-flex items-center rounded-full border border-border px-3 py-1 bg-background/60">
                Milestone birthdays
              </span>
            </div>
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => navigate("/custom-cake")}
                className="inline-flex items-center justify-center rounded-full bg-secondary px-6 py-3 text-sm font-medium text-secondary-foreground shadow-sm hover:bg-secondary/90 transition-colors"
              >
                Start a custom order
              </button>
              <button
                onClick={openWhatsApp}
                className="inline-flex items-center justify-center rounded-full border border-primary/70 px-6 py-3 text-sm font-medium text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                Chat on WhatsApp
              </button>
            </div>
          </div>

          <div className="relative aspect-video rounded-3xl bg-gradient-to-br from-primary/20 via-secondary/10 to-background/80 border border-dashed border-primary/40 flex items-center justify-center text-center px-6">
            <div className="max-w-xs">
              <p className="text-xs uppercase tracking-[0.3em] text-primary mb-2">
                Design preview
              </p>
              <p className="text-sm md:text-base text-muted-foreground">
                This is a placeholder space for future custom cake concept images or a short video showcasing
                the design process.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
