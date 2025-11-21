import { ArrowRight } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const stories = [
  {
    eyebrow: "From the Oven",
    title: "5 lessons from designing twin birthday cakes",
    description:
      "How we managed two contrasting themes in a single centerpiece for a Westlands family celebration.",
    link: "https://www.instagram.com/rablebakes",
    tag: "Journal",
  },
  {
    eyebrow: "Press",
    title: "Featured on Nairobi Treats: Best wedding cakes 2025",
    description:
      "Rable Bakes ranked among the top five bespoke cake studios crafting couture tiers for city weddings.",
    link: "https://www.instagram.com/rablebakes",
    tag: "In the news",
  },
  {
    eyebrow: "Community",
    title: "Baking classes return this quarter",
    description:
      "Intimate 12-person cohorts covering ganache finishes, wafer paper art, and pricing for small businesses.",
    link: "/baking-classes",
    tag: "Workshops",
  },
];

export const StoryHighlights = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="py-16 bg-muted/20" aria-label="Stories and news">
      <div className="container mx-auto px-6 lg:px-12">
        <div
          ref={ref}
          className={`mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-2">From the atelier</p>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold">
              Stories, press & classes
            </h2>
            <p className="mt-2 max-w-2xl text-sm md:text-base text-muted-foreground">
              A look behind the scenes at what we are baking, teaching, and celebrating across Nairobi & Eldoret.
            </p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {stories.map((story) => (
            <article
              key={story.title}
              className="group flex h-full flex-col justify-between rounded-3xl border border-border/70 bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div>
                <p className="text-xs uppercase tracking-[0.4em] text-primary mb-2">{story.eyebrow}</p>
                <h3 className="text-xl font-semibold leading-snug text-foreground">{story.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground">{story.description}</p>
              </div>
              <a
                href={story.link}
                target={story.link.startsWith("http") ? "_blank" : undefined}
                rel={story.link.startsWith("http") ? "noreferrer" : undefined}
                className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-primary"
              >
                {story.tag}
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
