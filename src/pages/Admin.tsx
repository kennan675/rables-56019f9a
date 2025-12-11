import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AdminProducts } from "@/components/admin/AdminProducts";
import { AdminOrders } from "@/components/admin/AdminOrders";
import { AdminTestimonials } from "@/components/admin/AdminTestimonials";
import { AdminClasses } from "@/components/admin/AdminClasses";
import { AdminOverview } from "@/components/admin/AdminOverview";
import { Package, ShoppingCart, MessageSquare, GraduationCap, LayoutDashboard } from "lucide-react";

const Admin = () => {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAdmin = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate('/auth');
        return;
      }

      const { data } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', session.user.id)
        .eq('role', 'admin')
        .single();

      if (!data) {
        navigate('/');
        return;
      }

      setIsAdmin(true);
    };

    checkAdmin();
  }, [navigate]);

  if (isAdmin === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground">
              Admin Dashboard
            </h1>
            <p className="text-muted-foreground mt-2">
              Manage your bakery products, orders, and more
            </p>
          </div>

          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 gap-2 h-auto p-1 bg-muted/50">
              <TabsTrigger value="overview" className="flex items-center gap-2 py-2.5">
                <LayoutDashboard className="h-4 w-4" />
                <span className="hidden sm:inline">Overview</span>
              </TabsTrigger>
              <TabsTrigger value="products" className="flex items-center gap-2 py-2.5">
                <Package className="h-4 w-4" />
                <span className="hidden sm:inline">Products</span>
              </TabsTrigger>
              <TabsTrigger value="orders" className="flex items-center gap-2 py-2.5">
                <ShoppingCart className="h-4 w-4" />
                <span className="hidden sm:inline">Orders</span>
              </TabsTrigger>
              <TabsTrigger value="testimonials" className="flex items-center gap-2 py-2.5">
                <MessageSquare className="h-4 w-4" />
                <span className="hidden sm:inline">Reviews</span>
              </TabsTrigger>
              <TabsTrigger value="classes" className="flex items-center gap-2 py-2.5">
                <GraduationCap className="h-4 w-4" />
                <span className="hidden sm:inline">Classes</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <AdminOverview />
            </TabsContent>
            <TabsContent value="products">
              <AdminProducts />
            </TabsContent>
            <TabsContent value="orders">
              <AdminOrders />
            </TabsContent>
            <TabsContent value="testimonials">
              <AdminTestimonials />
            </TabsContent>
            <TabsContent value="classes">
              <AdminClasses />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Admin;
