import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import cupcakes from "@/assets/cupcakes.jpg";

export const BakingClassesPreview = () => {
  const { ref, isVisible } = useScrollAnimation();
  const navigate = useNavigate();

  return (
    <section className="py-20 bg-[#f7f0e9]" aria-label="Baking classes">
      <div className="container mx-auto px-6 lg:px-12">
        <div
          ref={ref}
          className={`grid gap-12 lg:grid-cols-2 items-center transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Image */}
          <div className="relative rounded-3xl overflow-hidden h-96 lg:h-[500px]">
            <img
              src={cupcakes}
              alt="Baking class in progress"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <span className="inline-block px-4 py-2 bg-gold text-primary-foreground rounded-full text-sm font-medium mb-3">
                Limited Spots Available
              </span>
            </div>
          </div>

          {/* Content */}
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-[#a9504f] mb-3">
              Learn From The Best
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-[#2d1c18]">
              Baking Classes in Nairobi & Eldoret
            </h2>
            <p className="mb-6 leading-relaxed text-[#5e433b]">
              Join our intimate, hands-on baking classes and learn the art of creating beautiful, 
              delicious cakes. Perfect for beginners and home bakers who want to level up their skills.
            </p>
            
            <ul className="space-y-3 mb-8">
              {[
                "Small class sizes (max 8 students)",
                "All materials and ingredients included",
                "Take home what you bake",
                "Certificate of completion",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">
                    ✓
                  </span>
                  <span className="text-[#5e433b]">{item}</span>
                </li>
              ))}
            </ul>

            <Button
              size="lg"
              className="rounded-full"
              onClick={() => navigate('/baking-classes')}
            >
              View Upcoming Classes
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};