import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { format } from "date-fns";
import { Tables } from "@/integrations/supabase/types";

type Order = Tables<"orders">;

export const AdminOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast.error("Failed to fetch orders");
      return;
    }

    setOrders(data || []);
    setLoading(false);
  };

  const updateOrderStatus = async (orderId: string, status: string) => {
    const { error } = await supabase
      .from('orders')
      .update({ status })
      .eq('id', orderId);

    if (error) {
      toast.error("Failed to update order status");
      return;
    }

    toast.success("Order status updated");
    fetchOrders();
  };

  const getStatusColor = (status: string | null) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-700 dark:text-yellow-400';
      case 'confirmed':
        return 'bg-blue-500/20 text-blue-700 dark:text-blue-400';
      case 'preparing':
        return 'bg-purple-500/20 text-purple-700 dark:text-purple-400';
      case 'ready':
        return 'bg-green-500/20 text-green-700 dark:text-green-400';
      case 'delivered':
        return 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-400';
      case 'cancelled':
        return 'bg-red-500/20 text-red-700 dark:text-red-400';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const filteredOrders = orders.filter(order => {
    if (filter === 'all') return true;
    return order.status === filter;
  });

  if (loading) {
    return <div className="text-center py-8 text-muted-foreground">Loading orders...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h2 className="text-xl font-semibold">Orders ({filteredOrders.length})</h2>
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Orders</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="confirmed">Confirmed</SelectItem>
            <SelectItem value="preparing">Preparing</SelectItem>
            <SelectItem value="ready">Ready</SelectItem>
            <SelectItem value="delivered">Delivered</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4">
        {filteredOrders.map((order) => (
          <Card key={order.id} className="border-border/50">
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-semibold">#{order.order_number}</h3>
                    <Badge className={getStatusColor(order.status)}>
                      {order.status || 'pending'}
                    </Badge>
                    <Badge variant="outline">{order.payment_method}</Badge>
                    <Badge variant="outline">{order.delivery_method}</Badge>
                  </div>
                  
                  <div className="text-sm text-muted-foreground space-y-1">
                    <p><strong>Customer:</strong> {order.customer_name}</p>
                    <p><strong>Phone:</strong> {order.customer_phone}</p>
                    {order.customer_email && (
                      <p><strong>Email:</strong> {order.customer_email}</p>
                    )}
                    {order.delivery_address && (
                      <p><strong>Address:</strong> {order.delivery_address}</p>
                    )}
                    {order.preferred_date && (
                      <p>
                        <strong>Delivery:</strong> {format(new Date(order.preferred_date), 'PPP')}
                        {order.preferred_time && ` at ${order.preferred_time}`}
                      </p>
                    )}
                    {order.order_notes && (
                      <p><strong>Notes:</strong> {order.order_notes}</p>
                    )}
                  </div>

                  <div className="pt-2">
                    <p className="text-sm text-muted-foreground">
                      Subtotal: KSh {order.subtotal.toLocaleString()}
                      {order.delivery_fee ? ` + Delivery: KSh ${order.delivery_fee.toLocaleString()}` : ''}
                    </p>
                    <p className="text-lg font-bold text-primary">
                      Total: KSh {order.total.toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-2 min-w-[160px]">
                  <p className="text-xs text-muted-foreground">
                    {format(new Date(order.created_at), 'PPp')}
                  </p>
                  <Select
                    value={order.status || 'pending'}
                    onValueChange={(value) => updateOrderStatus(order.id, value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="confirmed">Confirmed</SelectItem>
                      <SelectItem value="preparing">Preparing</SelectItem>
                      <SelectItem value="ready">Ready</SelectItem>
                      <SelectItem value="delivered">Delivered</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {filteredOrders.length === 0 && (
          <Card className="border-dashed">
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">No orders found.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};
