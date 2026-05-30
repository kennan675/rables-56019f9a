import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle } from "lucide-react";
import heroImage from "@/assets/hero-cake.jpg";
import { useScrollPosition } from "@/hooks/useScrollPosition";
import { useNavigate } from "react-router-dom";

export const Hero = () => {
  const scrollY = useScrollPosition();
  const parallaxOffset = scrollY * 0.4;
  const navigate = useNavigate();

  return (
    <section id="hero" className="relative min-h-screen w-full overflow-hidden">
      {/* Background Image with Parallax */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${heroImage})`,
          transform: `translateY(${parallaxOffset}px) scale(1.1)`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex min-h-screen items-center">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-2xl animate-fade-in-up">
            {/* Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/20 px-4 py-2 backdrop-blur-sm">
              <span className="h-2 w-2 animate-pulse rounded-full bg-primary" />
              <span className="text-sm font-medium text-primary-foreground">
                Fresh Bakes Daily in Juja, Kasarani & Nairobi
              </span>
            </div>

            <h1 className="mb-6 text-4xl font-bold leading-[1.1] text-primary-foreground sm:text-5xl md:text-6xl lg:text-7xl">
              Cakes That Taste Like
              <span className="mt-2 block text-[#ded9d4] drop-shadow-[0_6px_18px_rgba(0,0,0,0.35)]">Memories</span>
            </h1>

            <p className="mb-8 text-lg text-primary-foreground/80 md:text-xl max-w-lg">
              Premium custom cakes for birthdays, weddings, and every celebration in between. Handcrafted with love.
            </p>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Button
                size="lg"
                className="group bg-primary hover:bg-primary/90 text-primary-foreground text-base px-8 py-6 rounded-full shadow-lg"
                onClick={() => navigate('/cakes')}
              >
                Order Now
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-primary-foreground/30 bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground hover:text-foreground text-base px-8 py-6 rounded-full backdrop-blur-sm"
                onClick={() => window.open('https://wa.me/254729063060?text=' + encodeURIComponent("Hi Rable Bakes! I'd like to customize a cake."), '_blank')}
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Chat on WhatsApp
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};