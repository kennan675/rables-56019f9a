import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { products } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ShoppingCart, MessageCircle, ArrowLeft } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { generateWhatsAppLink } from "@/utils/whatsapp";

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find(p => p.id === id);
  const { addToCart } = useCart();
  
  const [selectedVariant, setSelectedVariant] = useState(
    product?.priceVariants?.[0] || null
  );
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Product Not Found</h1>
          <Link to="/shop">
            <Button>Back to Shop</Button>
          </Link>
        </div>
      </main>
    );
  }

  const currentPrice = selectedVariant?.price || product.price;

  const handleAddToCart = () => {
    addToCart(
      product,
      quantity,
      selectedVariant?.size,
      selectedVariant?.servings,
      currentPrice
    );
  };

  const handleWhatsAppCustomize = () => {
    const link = generateWhatsAppLink(
      product,
      selectedVariant?.size,
      selectedVariant?.servings
    );
    window.open(link, '_blank');
  };

  return (
    <main className="min-h-screen">
      <Navigation />
      
      <section className="pt-32 pb-24">
        <div className="container mx-auto px-6 lg:px-12">
          <Link to="/shop" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-8 transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Back to Shop
          </Link>

          <div className="grid gap-12 lg:grid-cols-2">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="relative overflow-hidden rounded-lg">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-[500px] object-cover"
                />
                {product.isFeatured && (
                  <Badge className="absolute top-4 right-4 bg-primary">
                    Featured
                  </Badge>
                )}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-4xl font-bold mb-2">{product.name}</h1>
                <p className="text-muted-foreground text-lg">
                  Product ID: {product.id}
                </p>
              </div>

              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold text-primary">
                  KSh {currentPrice}
                </span>
                {product.priceVariants && (
                  <span className="text-muted-foreground">per cake</span>
                )}
              </div>

              <p className="text-lg">{product.longDescription}</p>

              {/* Size Selection */}
              {product.priceVariants && (
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-semibold mb-4">Select Size & Servings</h3>
                    <RadioGroup
                      value={selectedVariant?.size}
                      onValueChange={(value) => {
                        const variant = product.priceVariants?.find(v => v.size === value);
                        setSelectedVariant(variant || null);
                      }}
                    >
                      {product.priceVariants.map((variant) => (
                        <div key={variant.size} className="flex items-center space-x-2 mb-3">
                          <RadioGroupItem value={variant.size} id={variant.size} />
                          <Label htmlFor={variant.size} className="flex-1 cursor-pointer">
                            {variant.size} - Serves {variant.servings}
                            <span className="ml-2 font-semibold text-primary">
                              KSh {variant.price}
                            </span>
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </CardContent>
                </Card>
              )}

              {/* Quantity */}
              <div className="flex items-center gap-4">
                <Label>Quantity:</Label>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    -
                  </Button>
                  <span className="w-12 text-center font-semibold">{quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </Button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                {!product.isCustomizable ? (
                  <Button
                    size="lg"
                    className="w-full"
                    onClick={handleAddToCart}
                  >
                    <ShoppingCart className="mr-2 h-5 w-5" />
                    Add to Cart
                  </Button>
                ) : (
                  <>
                    <Button
                      size="lg"
                      className="w-full"
                      onClick={handleAddToCart}
                    >
                      <ShoppingCart className="mr-2 h-5 w-5" />
                      Order as Shown
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      className="w-full"
                      onClick={handleWhatsAppCustomize}
                    >
                      <MessageCircle className="mr-2 h-5 w-5" />
                      Customize on WhatsApp
                    </Button>
                  </>
                )}
              </div>

              {/* Product Details */}
              <Card>
                <CardContent className="pt-6 space-y-4">
                  {product.ingredients && (
                    <div>
                      <h4 className="font-semibold mb-2">Ingredients</h4>
                      <p className="text-sm text-muted-foreground">{product.ingredients}</p>
                    </div>
                  )}
                  {product.allergens && (
                    <div>
                      <h4 className="font-semibold mb-2">Allergen Information</h4>
                      <p className="text-sm text-muted-foreground">{product.allergens}</p>
                    </div>
                  )}
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

export default ProductDetail;
