import { Navigation } from "@/components/Navigation";
import { TrustStrip } from "@/components/TrustStrip";
import { Hero } from "@/components/Hero";
import { Products } from "@/components/Products";
import { FeaturedCakes } from "@/components/FeaturedCakes";
import { PremiumRails } from "@/components/PremiumRails";
import { CakesGallery } from "@/components/CakesGallery";
import { CustomCakesHighlight } from "@/components/CustomCakesHighlight";
import { OrderProcess } from "@/components/OrderProcess";
import { MenuPricing } from "@/components/MenuPricing";
import { ReviewsAndClasses } from "@/components/ReviewsAndClasses";
import { StoryHighlights } from "@/components/StoryHighlights";
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { CategorySidebar } from "@/components/CategorySidebar";
import { HomepageCategories } from "@/components/HomepageCategories";
import { InstagramFeed } from "@/components/InstagramFeed";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <TrustStrip />
      <Navigation />
      <div className="flex">
        <CategorySidebar />
        <div className="flex-1">
          <Hero />
          <HomepageCategories />
          <FeaturedCakes />
          <PremiumRails />
          <CakesGallery />
          <CustomCakesHighlight />
          <OrderProcess />
          <MenuPricing />
          <ReviewsAndClasses />
          <StoryHighlights />
          <Products />
          <InstagramFeed />
          <About />
          <Contact />
          <Footer />
        </div>
      </div>
    </main>
  );
};

export default Index;
