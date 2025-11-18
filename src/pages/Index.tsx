import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { Products } from "@/components/Products";
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { CategorySidebar } from "@/components/CategorySidebar";
import { HomepageCategories } from "@/components/HomepageCategories";
import { InstagramFeed } from "@/components/InstagramFeed";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <div className="flex">
        <CategorySidebar />
        <div className="flex-1">
          <Hero />
          <HomepageCategories />
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
