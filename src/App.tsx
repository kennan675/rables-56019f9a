import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LightboxProvider } from "@/components/ImageLightbox";
import Index from "./pages/Index";
import Shop from "./pages/Shop";
import ProductDetail from "./pages/ProductDetail";
import CustomOrders from "./pages/CustomOrders";
import CustomCake from "./pages/CustomCake";
import BakingClasses from "./pages/BakingClasses";

import Auth from "./pages/Auth";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
import { Cakes, CakesByCategory } from "./pages/Cakes";
import About from "./pages/About";
import Contact from "./pages/Contact";

import PageLoader from "@/components/PageLoader";

import { AnnouncementBar } from "@/components/AnnouncementBar";

const queryClient = new QueryClient();


const App = () => (
  <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <LightboxProvider>
          <PageLoader />
          <Toaster />
          <Sonner />

          <BrowserRouter>
            <AnnouncementBar />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/cakes" element={<Cakes />} />
              <Route path="/cakes/:categoryId" element={<CakesByCategory />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/custom-orders" element={<CustomOrders />} />
              <Route path="/custom-cake" element={<CustomCake />} />
              <Route path="/baking-classes" element={<BakingClasses />} />

              <Route path="/auth" element={<Auth />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </LightboxProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
