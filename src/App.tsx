import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/contexts/CartContext";
import Index from "./pages/Index";
import Shop from "./pages/Shop";
import ProductDetail from "./pages/ProductDetail";
import CustomOrders from "./pages/CustomOrders";
import CustomCake from "./pages/CustomCake";
import BakingClasses from "./pages/BakingClasses";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import NotFound from "./pages/NotFound";
import { Cakes, CakesByCategory } from "./pages/Cakes";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <CartProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/cakes" element={<Cakes />} />
            <Route path="/cakes/:categoryId" element={<CakesByCategory />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/custom-orders" element={<CustomOrders />} />
            <Route path="/custom-cake" element={<CustomCake />} />
            <Route path="/baking-classes" element={<BakingClasses />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </CartProvider>
  </QueryClientProvider>
);

export default App;
