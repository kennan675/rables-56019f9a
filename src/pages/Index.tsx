import { Navigation } from "@/components/Navigation";
import { TrustStrip } from "@/components/TrustStrip";
import { Hero } from "@/components/Hero";
import { CategoryGrid } from "@/components/CategoryGrid";

import { OrderProcess } from "@/components/OrderProcess";
import { Testimonials } from "@/components/Testimonials";
import { BakingClassesPreview } from "@/components/BakingClassesPreview";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";
import { LoyaltySpotlight } from "@/components/LoyaltySpotlight";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <TrustStrip />
      <Navigation />
      <Hero />
      <CategoryGrid />

      <OrderProcess />
      <LoyaltySpotlight />
      <Testimonials />
      <BakingClassesPreview />
      <CTASection />
      <Footer />
    </main>
  );
};

export default Index;