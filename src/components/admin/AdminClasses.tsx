import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Plus, Pencil, Trash2, Users } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tables } from "@/integrations/supabase/types";

type BakingClass = Tables<"baking_classes">;

export const AdminClasses = () => {
  const [classes, setClasses] = useState<BakingClass[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingClass, setEditingClass] = useState<BakingClass | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    duration: "",
    price: 0,
    max_seats: 10,
    location: "",
    instructor: "",
    image_url: "",
    is_active: true,
  });

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    const { data, error } = await supabase
      .from('baking_classes')
      .select('*')
      .order('date', { ascending: true });

    if (error) {
      toast.error("Failed to fetch classes");
      return;
    }

    setClasses(data || []);
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (editingClass) {
      const { error } = await supabase
        .from('baking_classes')
        .update(formData)
        .eq('id', editingClass.id);

      if (error) {
        toast.error("Failed to update class");
        return;
      }
      toast.success("Class updated successfully");
    } else {
      const { error } = await supabase
        .from('baking_classes')
        .insert([formData]);

      if (error) {
        toast.error("Failed to create class");
        return;
      }
      toast.success("Class created successfully");
    }

    setIsDialogOpen(false);
    resetForm();
    fetchClasses();
  };

  const handleEdit = (bakingClass: BakingClass) => {
    setEditingClass(bakingClass);
    setFormData({
      title: bakingClass.title,
      description: bakingClass.description || "",
      date: bakingClass.date,
      time: bakingClass.time,
      duration: bakingClass.duration || "",
      price: bakingClass.price,
      max_seats: bakingClass.max_seats || 10,
      location: bakingClass.location || "",
      instructor: bakingClass.instructor || "",
      image_url: bakingClass.image_url || "",
      is_active: bakingClass.is_active ?? true,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this class?")) return;

    const { error } = await supabase
      .from('baking_classes')
      .delete()
      .eq('id', id);

    if (error) {
      toast.error("Failed to delete class");
      return;
    }

    toast.success("Class deleted successfully");
    fetchClasses();
  };

  const resetForm = () => {
    setEditingClass(null);
    setFormData({
      title: "",
      description: "",
      date: "",
      time: "",
      duration: "",
      price: 0,
      max_seats: 10,
      location: "",
      instructor: "",
      image_url: "",
      is_active: true,
    });
  };

  if (loading) {
    return <div className="text-center py-8 text-muted-foreground">Loading classes...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Baking Classes ({classes.length})</h2>
        <Dialog open={isDialogOpen} onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) resetForm();
        }}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Class
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingClass ? "Edit Class" : "Add New Class"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">Time</Label>
                  <Input
                    id="time"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    placeholder="e.g., 10:00 AM - 1:00 PM"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="duration">Duration</Label>
                  <Input
                    id="duration"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    placeholder="e.g., 3 hours"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price">Price (KSh)</Label>
                  <Input
                    id="price"
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="max_seats">Max Seats</Label>
                  <Input
                    id="max_seats"
                    type="number"
                    value={formData.max_seats}
                    onChange={(e) => setFormData({ ...formData, max_seats: Number(e.target.value) })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="instructor">Instructor</Label>
                  <Input
                    id="instructor"
                    value={formData.instructor}
                    onChange={(e) => setFormData({ ...formData, instructor: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="image_url">Image URL</Label>
                <Input
                  id="image_url"
                  value={formData.image_url}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  placeholder="https://..."
                />
              </div>

              <div className="flex items-center gap-2">
                <Switch
                  id="is_active"
                  checked={formData.is_active}
                  onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
                />
                <Label htmlFor="is_active">Active (visible to customers)</Label>
              </div>

              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  {editingClass ? "Update" : "Create"} Class
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {classes.map((bakingClass) => (
          <Card key={bakingClass.id} className="border-border/50">
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-semibold">{bakingClass.title}</h3>
                    {!bakingClass.is_active && (
                      <Badge variant="secondary">Inactive</Badge>
                    )}
                    <Badge variant="outline" className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {bakingClass.seats_taken || 0}/{bakingClass.max_seats}
                    </Badge>
                  </div>

                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {bakingClass.description || "No description"}
                  </p>

                  <div className="text-sm text-muted-foreground space-y-1">
                    <p>
                      <strong>Date:</strong> {format(new Date(bakingClass.date), 'PPP')} at {bakingClass.time}
                    </p>
                    {bakingClass.duration && <p><strong>Duration:</strong> {bakingClass.duration}</p>}
                    {bakingClass.location && <p><strong>Location:</strong> {bakingClass.location}</p>}
                    {bakingClass.instructor && <p><strong>Instructor:</strong> {bakingClass.instructor}</p>}
                  </div>

                  <p className="text-lg font-bold text-primary">
                    KSh {bakingClass.price.toLocaleString()}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleEdit(bakingClass)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(bakingClass.id)}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {classes.length === 0 && (
          <Card className="border-dashed">
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">No classes scheduled. Add your first class!</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};
