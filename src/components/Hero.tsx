import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-cake.jpg";

export const Hero = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/80 via-primary/60 to-secondary/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full items-center">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-3xl animate-fade-in-up">
            <h1 className="mb-6 text-5xl font-bold leading-tight text-primary-foreground md:text-6xl lg:text-7xl">
              Handcrafted Cakes
              <br />
              <span className="text-accent">Made with Love</span>
            </h1>
            <p className="mb-8 text-lg text-primary-foreground/90 md:text-xl lg:text-2xl">
              Every cake tells a story. Let us create something special for your celebration.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button 
                size="lg" 
                className="group bg-secondary hover:bg-secondary/90 text-secondary-foreground text-lg px-8 py-6"
              >
                Order Now
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-primary-foreground bg-transparent text-primary-foreground hover:bg-primary-foreground hover:text-primary text-lg px-8 py-6"
              >
                View Menu
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 animate-bounce">
        <div className="h-12 w-8 rounded-full border-2 border-primary-foreground/50">
          <div className="mx-auto mt-2 h-3 w-1 animate-pulse rounded-full bg-primary-foreground/50" />
        </div>
      </div>
    </section>
  );
};
