import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Star, Check, X, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";
import { Tables } from "@/integrations/supabase/types";

type Testimonial = Tables<"testimonials">;

export const AdminTestimonials = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast.error("Failed to fetch testimonials");
      return;
    }

    setTestimonials(data || []);
    setLoading(false);
  };

  const updateTestimonial = async (id: string, updates: Partial<Testimonial>) => {
    const { error } = await supabase
      .from('testimonials')
      .update(updates)
      .eq('id', id);

    if (error) {
      toast.error("Failed to update testimonial");
      return;
    }

    toast.success("Testimonial updated");
    fetchTestimonials();
  };

  const deleteTestimonial = async (id: string) => {
    if (!confirm("Are you sure you want to delete this testimonial?")) return;

    const { error } = await supabase
      .from('testimonials')
      .delete()
      .eq('id', id);

    if (error) {
      toast.error("Failed to delete testimonial");
      return;
    }

    toast.success("Testimonial deleted");
    fetchTestimonials();
  };

  if (loading) {
    return <div className="text-center py-8 text-muted-foreground">Loading testimonials...</div>;
  }

  const pendingCount = testimonials.filter(t => !t.is_approved).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h2 className="text-xl font-semibold">Testimonials ({testimonials.length})</h2>
          {pendingCount > 0 && (
            <p className="text-sm text-amber-600">{pendingCount} pending approval</p>
          )}
        </div>
      </div>

      <div className="grid gap-4">
        {testimonials.map((testimonial) => (
          <Card key={testimonial.id} className={`border-border/50 ${!testimonial.is_approved ? 'border-amber-500/50' : ''}`}>
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-semibold">{testimonial.customer_name}</h3>
                    {testimonial.location && (
                      <span className="text-sm text-muted-foreground">
                        from {testimonial.location}
                      </span>
                    )}
                    {!testimonial.is_approved && (
                      <Badge variant="outline" className="border-amber-500 text-amber-600">
                        Pending Approval
                      </Badge>
                    )}
                    {testimonial.is_featured && (
                      <Badge className="bg-primary/20 text-primary">Featured</Badge>
                    )}
                  </div>

                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < (testimonial.rating || 5)
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-muted'
                        }`}
                      />
                    ))}
                  </div>

                  <p className="text-muted-foreground italic">"{testimonial.quote}"</p>

                  <p className="text-xs text-muted-foreground">
                    Submitted {format(new Date(testimonial.created_at), 'PPP')}
                  </p>
                </div>

                <div className="flex flex-col gap-3 min-w-[180px]">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm">Approved</span>
                    <Switch
                      checked={testimonial.is_approved || false}
                      onCheckedChange={(checked) =>
                        updateTestimonial(testimonial.id, { is_approved: checked })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm">Featured</span>
                    <Switch
                      checked={testimonial.is_featured || false}
                      onCheckedChange={(checked) =>
                        updateTestimonial(testimonial.id, { is_featured: checked })
                      }
                    />
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-destructive hover:text-destructive"
                    onClick={() => deleteTestimonial(testimonial.id)}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {testimonials.length === 0 && (
          <Card className="border-dashed">
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">No testimonials yet.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};
