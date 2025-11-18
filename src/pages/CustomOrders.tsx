import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle, Cake, Palette, Calendar } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const CustomOrders = () => {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation();
  const { ref: processRef, isVisible: processVisible } = useScrollAnimation({ threshold: 0.2 });
  
  const BUSINESS_PHONE = "254722123456";
  const customOrderMessage = encodeURIComponent(
    "Hi Rable Bakes! I'd like to discuss a custom cake order. Here are my details:\n\nEvent Type: ____\nDate Needed: ____\nNumber of Guests: ____\nDesign Ideas: ____\nBudget Range: ____\n\nPlease contact me to discuss further. Thanks!"
  );

  const steps = [
    {
      icon: MessageCircle,
      title: "Share Your Vision",
      description: "Contact us via WhatsApp with your event details, design ideas, and preferences. Share inspiration photos if you have them!"
    },
    {
      icon: Palette,
      title: "Design Consultation",
      description: "We'll discuss flavors, designs, colors, and decorations. Get a custom quote based on your requirements."
    },
    {
      icon: Cake,
      title: "Confirmation & Deposit",
      description: "Once you approve the design and quote, we'll confirm your order with a deposit and start creating your dream cake."
    },
    {
      icon: Calendar,
      title: "Pickup or Delivery",
      description: "Your custom cake will be ready for pickup or delivery on your chosen date. We ensure it arrives fresh and beautiful!"
    }
  ];

  return (
    <main className="min-h-screen">
      <Navigation />
      
      <section className="pt-32 pb-24 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto px-6 lg:px-12">
          <div 
            ref={titleRef}
            className={`mb-16 text-center transition-all duration-1000 ${
              titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
            }`}
          >
            <h1 className="mb-4 text-5xl font-bold md:text-6xl lg:text-7xl">
              Custom <span className="gradient-text">Cake Orders</span>
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground md:text-xl">
              Let's create something unique together. Your dream cake, perfectly customized for your special occasion.
            </p>
          </div>

          {/* How It Works */}
          <div 
            ref={processRef}
            className={`mb-16 transition-all duration-1000 ${
              processVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
            }`}
          >
            <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {steps.map((step, index) => (
                <Card key={index} className="hover-lift border-none shadow-lg">
                  <CardContent className="pt-6 text-center">
                    <div className="flex justify-center mb-4">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <step.icon className="h-8 w-8" />
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <Card className="border-none shadow-xl bg-gradient-to-br from-primary/5 to-secondary/5 max-w-2xl mx-auto">
              <CardContent className="pt-8 pb-8">
                <h2 className="text-3xl font-bold mb-4">Ready to Start?</h2>
                <p className="text-lg text-muted-foreground mb-6">
                  Contact us now on WhatsApp to discuss your custom cake order. We typically respond within a few hours!
                </p>
                <Button
                  size="lg"
                  className="text-lg px-8"
                  onClick={() => window.open(`https://wa.me/${BUSINESS_PHONE}?text=${customOrderMessage}`, '_blank')}
                >
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Start Custom Order on WhatsApp
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Custom Order Examples */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-center mb-8">Custom Order Ideas</h2>
            <div className="grid gap-6 md:grid-cols-3">
              <Card className="border-none shadow-lg">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold mb-2">Themed Birthday Cakes</h3>
                  <p className="text-muted-foreground">
                    Character cakes, hobby themes, sports themes, and more. Perfect for kids and adults!
                  </p>
                </CardContent>
              </Card>
              <Card className="border-none shadow-lg">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold mb-2">Wedding Masterpieces</h3>
                  <p className="text-muted-foreground">
                    Multi-tiered elegance with your wedding colors, sugar flowers, and personalized details.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-none shadow-lg">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold mb-2">Corporate Events</h3>
                  <p className="text-muted-foreground">
                    Logo cakes, product launches, company anniversaries. Make your event memorable!
                  </p>
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

export default CustomOrders;
