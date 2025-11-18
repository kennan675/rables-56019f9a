import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Instagram } from "lucide-react";

const MOCK_INSTAGRAM_POSTS = [
  {
    id: "1",
    caption: "Elegant floral wedding cake for a timeless celebration.",
    href: "https://www.instagram.com/rablebakes/",
  },
  {
    id: "2",
    caption: "Bright birthday cake with custom toppers.",
    href: "https://www.instagram.com/rablebakes/",
  },
  {
    id: "3",
    caption: "Cupcake assortment for a baby shower.",
    href: "https://www.instagram.com/rablebakes/",
  },
  {
    id: "4",
    caption: "Chocolate drip cake with gold accents.",
    href: "https://www.instagram.com/rablebakes/",
  },
  {
    id: "5",
    caption: "Corporate logo cake for a product launch.",
    href: "https://www.instagram.com/rablebakes/",
  },
  {
    id: "6",
    caption: "Pastel gender reveal cake surprise.",
    href: "https://www.instagram.com/rablebakes/",
  },
];

export const InstagramFeed = () => {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation();

  return (
    <section className="py-20 bg-muted/30" aria-label="Instagram feed">
      <div className="container mx-auto px-6 lg:px-12">
        <div
          ref={titleRef}
          className={`mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-4 transition-all duration-1000 ${
            titleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-2">
              From Instagram
            </p>
            <h2 className="text-3xl md:text-4xl font-bold">
              Latest <span className="gradient-text">Creations</span>
            </h2>
            <p className="mt-3 max-w-xl text-sm md:text-base text-muted-foreground">
              This section will display live posts from @rablebakes. For now, it shows sample tiles
              so the layout is ready for direct Instagram integration.
            </p>
          </div>
          <a
            href="https://www.instagram.com/rablebakes/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-background/70 px-4 py-2 text-xs md:text-sm font-medium text-primary shadow-sm hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            <Instagram className="h-4 w-4" />
            Follow @rablebakes
          </a>
        </div>

        <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          {MOCK_INSTAGRAM_POSTS.map((post, index) => {
            const { ref, isVisible } = useScrollAnimation({ threshold: 0.15 });

            return (
              <div
                key={post.id}
                ref={ref}
                className={`relative aspect-square overflow-hidden rounded-2xl shadow-md transition-all duration-700 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
                style={{ transitionDelay: `${index * 70}ms` }}
              >
                <a
                  href={post.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group block w-full h-full bg-gradient-to-br from-primary/40 via-secondary/40 to-accent/40"
                >
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.4),_transparent_55%)]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                  <div className="absolute inset-0 flex items-end p-3">
                    <p className="text-[0.7rem] text-white/90 line-clamp-3">
                      {post.caption}
                    </p>
                  </div>
                  <div className="absolute top-2 right-2 flex items-center gap-1 rounded-full bg-black/50 px-2 py-1 text-[0.65rem] text-white">
                    <Instagram className="h-3 w-3" />
                    View
                  </div>
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
