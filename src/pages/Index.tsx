import { Navigation } from "@/components/Navigation";
import { TrustStrip } from "@/components/TrustStrip";
import { Hero } from "@/components/Hero";
import { FeaturedCakes } from "@/components/FeaturedCakes";
import { PremiumRails } from "@/components/PremiumRails";
import { CakesGallery } from "@/components/CakesGallery";
import { BudgetAndNewestCakes } from "@/components/BudgetAndNewestCakes";
import { ShopCakesCTA } from "@/components/ShopCakesCTA";
import { Products } from "@/components/Products";
import { MenuPricing } from "@/components/MenuPricing";
import { HomepageCategories } from "@/components/HomepageCategories";
import { CustomCakesHighlight } from "@/components/CustomCakesHighlight";
import { OrderProcess } from "@/components/OrderProcess";
import { ReviewsAndClasses } from "@/components/ReviewsAndClasses";
import { StoryHighlights } from "@/components/StoryHighlights";
import { InstagramFeed } from "@/components/InstagramFeed";
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <TrustStrip />
      <Navigation />
      <Hero />
      <PremiumRails />
      <CakesGallery />
      <BudgetAndNewestCakes />
      <ShopCakesCTA />
      <FeaturedCakes />
      <Products />
      <HomepageCategories />
      <MenuPricing />
      <CustomCakesHighlight />
      <OrderProcess />
      <ReviewsAndClasses />
      <StoryHighlights />
      <InstagramFeed />
      <About />
      <Contact />
      <Footer />
    </main>
  );
};

export default Index;
