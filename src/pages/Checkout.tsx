import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { MessageCircle } from "lucide-react";
import { generateCartWhatsAppLink } from "@/utils/whatsapp";
import { toast } from "@/hooks/use-toast";

const Checkout = () => {
  const { cart, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    deliveryMethod: "pickup",
    address: "",
    date: "",
    time: "",
    notes: "",
    paymentMethod: "cod"
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name || !formData.phone || !formData.date || !formData.time) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    if (formData.deliveryMethod === "delivery" && !formData.address) {
      toast({
        title: "Missing Address",
        description: "Please provide a delivery address",
        variant: "destructive"
      });
      return;
    }

    // Generate WhatsApp link with order details
    const whatsappLink = generateCartWhatsAppLink(cart);
    window.open(whatsappLink, '_blank');
    
    // Clear cart and show success message
    clearCart();
    toast({
      title: "Order Sent!",
      description: "Your order has been sent via WhatsApp. We'll confirm shortly!",
    });
    
    // Redirect to home after a short delay
    setTimeout(() => {
      navigate('/');
    }, 2000);
  };

  if (cart.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <main className="min-h-screen">
      <Navigation />
      
      <section className="pt-32 pb-24">
        <div className="container mx-auto px-6 lg:px-12">
          <h1 className="text-4xl font-bold mb-8">Checkout</h1>

          <form onSubmit={handleSubmit}>
            <div className="grid gap-8 lg:grid-cols-3">
              {/* Checkout Form */}
              <div className="lg:col-span-2 space-y-6">
                {/* Contact Information */}
                <Card className="border-none shadow-lg">
                  <CardContent className="pt-6 space-y-4">
                    <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
                    
                    <div>
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className="mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="mt-1"
                        placeholder="+254..."
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Delivery Method */}
                <Card className="border-none shadow-lg">
                  <CardContent className="pt-6 space-y-4">
                    <h2 className="text-2xl font-bold mb-4">Delivery Method</h2>
                    
                    <RadioGroup
                      value={formData.deliveryMethod}
                      onValueChange={(value) => setFormData({ ...formData, deliveryMethod: value })}
                    >
                      <div className="flex items-center space-x-2 p-4 border rounded-lg">
                        <RadioGroupItem value="pickup" id="pickup" />
                        <Label htmlFor="pickup" className="flex-1 cursor-pointer">
                          <div className="font-semibold">Pickup</div>
                          <div className="text-sm text-muted-foreground">
                            123 Baker Street, Sweet Town
                          </div>
                        </Label>
                      </div>
                      
                      <div className="flex items-center space-x-2 p-4 border rounded-lg">
                        <RadioGroupItem value="delivery" id="delivery" />
                        <Label htmlFor="delivery" className="flex-1 cursor-pointer">
                          <div className="font-semibold">Delivery</div>
                          <div className="text-sm text-muted-foreground">
                            We'll deliver to your location
                          </div>
                        </Label>
                      </div>
                    </RadioGroup>
                    
                    {formData.deliveryMethod === "delivery" && (
                      <div>
                        <Label htmlFor="address">Delivery Address *</Label>
                        <Textarea
                          id="address"
                          name="address"
                          required={formData.deliveryMethod === "delivery"}
                          value={formData.address}
                          onChange={handleInputChange}
                          className="mt-1"
                          placeholder="Enter your full delivery address"
                        />
                      </div>
                    )}
                    
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <Label htmlFor="date">Preferred Date *</Label>
                        <Input
                          id="date"
                          name="date"
                          type="date"
                          required
                          value={formData.date}
                          onChange={handleInputChange}
                          className="mt-1"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="time">Preferred Time *</Label>
                        <Input
                          id="time"
                          name="time"
                          type="time"
                          required
                          value={formData.time}
                          onChange={handleInputChange}
                          className="mt-1"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Payment Method */}
                <Card className="border-none shadow-lg">
                  <CardContent className="pt-6 space-y-4">
                    <h2 className="text-2xl font-bold mb-4">Payment Method</h2>
                    
                    <RadioGroup
                      value={formData.paymentMethod}
                      onValueChange={(value) => setFormData({ ...formData, paymentMethod: value })}
                    >
                      <div className="flex items-center space-x-2 p-4 border rounded-lg">
                        <RadioGroupItem value="cod" id="cod" />
                        <Label htmlFor="cod" className="flex-1 cursor-pointer">
                          <div className="font-semibold">Cash on Delivery / Pickup</div>
                          <div className="text-sm text-muted-foreground">
                            Pay when you receive your order
                          </div>
                        </Label>
                      </div>
                      
                      <div className="flex items-center space-x-2 p-4 border rounded-lg">
                        <RadioGroupItem value="mpesa" id="mpesa" />
                        <Label htmlFor="mpesa" className="flex-1 cursor-pointer">
                          <div className="font-semibold">M-Pesa</div>
                          <div className="text-sm text-muted-foreground">
                            Pay via M-Pesa (details provided after order)
                          </div>
                        </Label>
                      </div>
                    </RadioGroup>
                  </CardContent>
                </Card>

                {/* Additional Notes */}
                <Card className="border-none shadow-lg">
                  <CardContent className="pt-6">
                    <Label htmlFor="notes">Order Notes (Optional)</Label>
                    <Textarea
                      id="notes"
                      name="notes"
                      value={formData.notes}
                      onChange={handleInputChange}
                      className="mt-1"
                      placeholder="Any special instructions or requests?"
                    />
                  </CardContent>
                </Card>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <Card className="border-none shadow-lg sticky top-24">
                  <CardContent className="pt-6 space-y-4">
                    <h2 className="text-2xl font-bold">Order Summary</h2>
                    
                    <div className="space-y-3 py-4 border-y border-border">
                      {cart.map((item) => (
                        <div key={`${item.id}-${item.selectedSize}`} className="flex justify-between text-sm">
                          <span>
                            {item.name} x{item.quantity}
                            {item.selectedSize && ` (${item.selectedSize})`}
                          </span>
                          <span className="font-semibold">
                            KSh {((item.selectedPrice || item.price) * item.quantity).toLocaleString()}
                          </span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex justify-between text-xl font-bold">
                      <span>Total</span>
                      <span className="text-primary">KSh {cartTotal.toLocaleString()}</span>
                    </div>
                    
                    <Button type="submit" size="lg" className="w-full">
                      <MessageCircle className="mr-2 h-5 w-5" />
                      Place Order via WhatsApp
                    </Button>
                    
                    <p className="text-xs text-muted-foreground text-center">
                      By placing this order, your details will be sent to us via WhatsApp for confirmation
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </form>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Checkout;
