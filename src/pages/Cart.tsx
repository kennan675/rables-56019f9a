import { Link } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, cartTotal, cartCount } = useCart();

  if (cartCount === 0) {
    return (
      <main className="min-h-screen">
        <Navigation />
        <section className="pt-32 pb-24">
          <div className="container mx-auto px-6 lg:px-12 text-center">
            <ShoppingBag className="h-24 w-24 mx-auto mb-6 text-muted-foreground" />
            <h1 className="text-4xl font-bold mb-4">Your Cart is Empty</h1>
            <p className="text-muted-foreground mb-8">
              Add some delicious cakes to your cart to get started!
            </p>
            <Link to="/shop">
              <Button size="lg">Browse Our Cakes</Button>
            </Link>
          </div>
        </section>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen">
      <Navigation />
      
      <section className="pt-32 pb-24">
        <div className="container mx-auto px-6 lg:px-12">
          <h1 className="text-4xl font-bold mb-8">Shopping Cart ({cartCount} items)</h1>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item) => (
                <Card key={`${item.id}-${item.selectedSize}`} className="border-none shadow-lg">
                  <CardContent className="pt-6">
                    <div className="flex gap-4">
                      <img
                        src={item.images[0]}
                        alt={item.name}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{item.name}</h3>
                        <p className="text-sm text-muted-foreground">ID: {item.id}</p>
                        {item.selectedSize && (
                          <p className="text-sm text-muted-foreground">
                            Size: {item.selectedSize}
                          </p>
                        )}
                        {item.selectedServings && (
                          <p className="text-sm text-muted-foreground">
                            Servings: {item.selectedServings}
                          </p>
                        )}
                        
                        <div className="flex items-center gap-4 mt-3">
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="w-8 text-center font-semibold">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                          
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFromCart(item.id)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4 mr-1" />
                            Remove
                          </Button>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <p className="text-xl font-bold text-primary">
                          KSh {((item.selectedPrice || item.price) * item.quantity).toLocaleString()}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          KSh {(item.selectedPrice || item.price).toLocaleString()} each
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="border-none shadow-lg sticky top-24">
                <CardContent className="pt-6 space-y-4">
                  <h2 className="text-2xl font-bold">Order Summary</h2>
                  
                  <div className="space-y-2 py-4 border-y border-border">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="font-semibold">KSh {cartTotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Delivery</span>
                      <span className="text-sm text-muted-foreground">
                        Calculated at checkout
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between text-xl font-bold">
                    <span>Total</span>
                    <span className="text-primary">KSh {cartTotal.toLocaleString()}</span>
                  </div>
                  
                  <Link to="/checkout">
                    <Button size="lg" className="w-full">
                      Proceed to Checkout
                    </Button>
                  </Link>
                  
                  <Link to="/shop">
                    <Button variant="outline" size="lg" className="w-full">
                      Continue Shopping
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Cart;
