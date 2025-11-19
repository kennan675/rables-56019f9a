import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useNavigate } from "react-router-dom";

const reviews = [
  {
    name: "Sarah, Nairobi",
    quote:
      "The cake was even more beautiful in person and tasted incredible. Our guests couldn&apos;t stop talking about it!",
  },
  {
    name: "Kevin, Eldoret",
    quote:
      "Seamless ordering and delivery. Rable Bakes captured our theme perfectly for the graduation party.",
  },
  {
    name: "Lynn, Westlands",
    quote:
      "Their attention to detail is unmatched. I always recommend them for birthdays and corporate events.",
  },
];

export const ReviewsAndClasses = () => {
  const { ref, isVisible } = useScrollAnimation();
  const navigate = useNavigate();

  return (
    <section className="py-16 bg-muted/30" aria-label="Reviews and baking classes">
      <div className="container mx-auto px-6 lg:px-12">
        <div
          ref={ref}
          className={`grid gap-10 lg:grid-cols-[minmax(0,2fr)_minmax(0,1.3fr)] items-start transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Reviews */}
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-2">
              Client love
            </p>
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">
              Kind words from <span className="gradient-text">happy clients</span>
            </h2>
            <div className="grid gap-4 md:grid-cols-3">
              {reviews.map((review) => (
                <figure
                  key={review.name}
                  className="rounded-2xl border border-border bg-card/90 p-4 text-sm text-muted-foreground"
                >
                  <p className="mb-3 line-clamp-4">“{review.quote}”</p>
                  <figcaption className="text-xs font-medium text-foreground/80">
                    {review.name}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>

          {/* Classes teaser */}
          <aside className="rounded-3xl border border-primary/30 bg-gradient-to-br from-primary/10 via-secondary/10 to-background/80 p-6 shadow-sm">
            <p className="text-xs uppercase tracking-[0.3em] text-primary mb-2">
              Baking classes
            </p>
            <h3 className="text-xl md:text-2xl font-semibold mb-3">
              Learn to bake the Rable way
            </h3>
            <p className="text-sm md:text-base text-muted-foreground mb-4">
              Join our intimate, hands-on classes in Nairobi and Eldoret and learn how to bake and decorate
              beautiful cakes at home.
            </p>
            <button
              onClick={() => navigate("/baking-classes")}
              className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary/90 transition-colors"
            >
              View upcoming classes
            </button>
          </aside>
        </div>
      </div>
    </section>
  );
};
