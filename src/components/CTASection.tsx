import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { ArrowRight, MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const CTASection = () => {
  const { ref, isVisible } = useScrollAnimation();
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden py-24 bg-gradient-to-br from-[#2b1a1c] via-[#3f1f28] to-[#5a2633]">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute -left-16 top-0 h-64 w-64 rounded-full bg-gradient-to-br from-white/10 to-transparent blur-3xl" />
        <div className="absolute -right-10 bottom-0 h-72 w-72 rounded-full bg-gradient-to-tr from-[#d86b6b]/40 via-transparent to-transparent blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle at top,_rgba(255,255,255,0.08),_transparent_65%)]" />
      </div>

      <div className="relative z-10 mx-auto container px-6 lg:px-12">
        <div
          ref={ref}
          className={`max-w-3xl mx-auto text-center transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="mb-6 text-3xl font-bold text-cream md:text-4xl lg:text-5xl">
            Ready to Make Your Celebration Sweet?
          </h2>
          <p className="mx-auto mb-10 max-w-xl text-lg text-cream/80">
            Whether you're planning a wedding, birthday, or just want to surprise someone special, 
            we're here to create the perfect cake for your moment.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="rounded-full bg-cream px-8 py-6 text-base font-semibold text-[#3f1f28] shadow-lg shadow-black/10 transition hover:bg-[#fbe8dc] hover:shadow-xl"
              onClick={() => navigate('/shop')}
            >
              Browse Our Cakes
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="rounded-full border border-white/70 bg-white/15 px-8 py-6 text-base font-semibold text-white shadow-lg shadow-black/10 transition hover:bg-white/25 hover:border-white"
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