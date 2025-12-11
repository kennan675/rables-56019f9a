import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, ShoppingCart, MessageSquare, GraduationCap, TrendingUp, DollarSign } from "lucide-react";

export const AdminOverview = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    pendingOrders: 0,
    totalTestimonials: 0,
    pendingTestimonials: 0,
    totalClasses: 0,
    totalRevenue: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      const [products, orders, testimonials, classes] = await Promise.all([
        supabase.from('products').select('id', { count: 'exact' }),
        supabase.from('orders').select('id, status, total', { count: 'exact' }),
        supabase.from('testimonials').select('id, is_approved', { count: 'exact' }),
        supabase.from('baking_classes').select('id', { count: 'exact' }),
      ]);

      const pendingOrders = orders.data?.filter(o => o.status === 'pending').length || 0;
      const pendingTestimonials = testimonials.data?.filter(t => !t.is_approved).length || 0;
      const totalRevenue = orders.data?.reduce((sum, o) => sum + (o.total || 0), 0) || 0;

      setStats({
        totalProducts: products.count || 0,
        totalOrders: orders.count || 0,
        pendingOrders,
        totalTestimonials: testimonials.count || 0,
        pendingTestimonials,
        totalClasses: classes.count || 0,
        totalRevenue,
      });
    };

    fetchStats();
  }, []);

  const statCards = [
    {
      title: "Total Products",
      value: stats.totalProducts,
      icon: Package,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      title: "Total Orders",
      value: stats.totalOrders,
      subtitle: `${stats.pendingOrders} pending`,
      icon: ShoppingCart,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
    {
      title: "Testimonials",
      value: stats.totalTestimonials,
      subtitle: `${stats.pendingTestimonials} pending approval`,
      icon: MessageSquare,
      color: "text-amber-500",
      bgColor: "bg-amber-500/10",
    },
    {
      title: "Baking Classes",
      value: stats.totalClasses,
      icon: GraduationCap,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
    },
    {
      title: "Total Revenue",
      value: `KSh ${stats.totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {statCards.map((stat) => (
          <Card key={stat.title} className="border-border/50">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              {stat.subtitle && (
                <p className="text-xs text-muted-foreground mt-1">{stat.subtitle}</p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm">
              Activity feed will be shown here with recent orders, bookings, and reviews.
            </p>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-muted-foreground text-sm">
              Use the tabs above to manage products, view orders, approve testimonials, and manage baking classes.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
