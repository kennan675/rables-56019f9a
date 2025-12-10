import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { ArrowRight, MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const CTASection = () => {
  const { ref, isVisible } = useScrollAnimation();
  const navigate = useNavigate();

  return (
    <section className="py-24 bg-gradient-to-br from-primary via-rose-pink to-coral relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-40 h-40 rounded-full border-2 border-primary-foreground" />
        <div className="absolute bottom-10 right-10 w-60 h-60 rounded-full border-2 border-primary-foreground" />
        <div className="absolute top-1/2 left-1/3 w-20 h-20 rounded-full border-2 border-primary-foreground" />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div
          ref={ref}
          className={`max-w-3xl mx-auto text-center transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6">
            Ready to Make Your Celebration Sweet?
          </h2>
          <p className="text-lg text-primary-foreground/80 mb-10 max-w-xl mx-auto">
            Whether you're planning a wedding, birthday, or just want to surprise someone special, 
            we're here to create the perfect cake for your moment.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-primary-foreground text-foreground hover:bg-primary-foreground/90 rounded-full px-8 py-6 text-base"
              onClick={() => navigate('/shop')}
            >
              Browse Our Cakes
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-foreground rounded-full px-8 py-6 text-base bg-transparent"
              onClick={() => window.open('https://wa.me/254704209055', '_blank')}
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              Start Custom Order
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};