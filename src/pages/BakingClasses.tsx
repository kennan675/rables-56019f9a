import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, Calendar, MessageCircle } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const bakingClass = {
  id: "BC001",
  title: "Complete Cake Baking & Decorating Class",
  description: "Master the art of baking and decorating beautiful cakes. From mixing techniques to stunning finishes, learn everything you need to create professional-quality cakes at home.",
  date: "Every Saturday",
  time: "9:00 AM - 3:00 PM",
  duration: "6 hours",
  price: 5000,
  seats: 8,
  level: "All Levels",
  includes: [
    "All ingredients and materials provided",
    "Recipe booklet to take home",
    "Piping bag and tips kit",
    "Take home what you bake",
    "Certificate of completion",
    "Light refreshments included"
  ]
};

const BakingClasses = () => {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation();
  const { ref: cardRef, isVisible: cardVisible } = useScrollAnimation({ threshold: 0.2 });
  
  const BUSINESS_PHONE = "254704209055";
  
  const handleEnrollClick = () => {
    const message = encodeURIComponent(
      `Hi Rable Bakes! I'd like to enroll in: ${bakingClass.title} (${bakingClass.id})\n\nDate: ${bakingClass.date}\nTime: ${bakingClass.time}\nPrice: KSh ${bakingClass.price}\n\nMy details:\nName: ____\nPhone: ____\nEmail: ____\n\nPlease confirm my enrollment. Thanks!`
    );
    window.open(`https://wa.me/${BUSINESS_PHONE}?text=${message}`, '_blank');
  };

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
              Baking <span className="gradient-text">Classes</span>
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground md:text-xl">
              Learn the art of baking from professional pastry chefs. Small class sizes for personalized attention.
            </p>
          </div>

          {/* Single Class Card */}
          <div className="max-w-2xl mx-auto">
            <div
              ref={cardRef}
              className={`transition-all duration-700 ${
                cardVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
              }`}
            >
              <Card className="hover-lift border-none shadow-lg">
                <CardHeader className="text-center pb-4">
                  <div className="flex justify-center gap-3 mb-4">
                    <Badge variant="secondary">{bakingClass.level}</Badge>
                    <Badge className="bg-primary">
                      <Users className="h-3 w-3 mr-1" />
                      {bakingClass.seats} seats max
                    </Badge>
                  </div>
                  <CardTitle className="text-3xl">{bakingClass.title}</CardTitle>
                  <CardDescription className="text-base mt-2">
                    {bakingClass.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 mb-8">
                    <div className="flex items-center justify-center gap-6 text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-5 w-5 text-primary" />
                        <span>{bakingClass.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-5 w-5 text-primary" />
                        <span>{bakingClass.time}</span>
                      </div>
                    </div>
                    
                    <div className="bg-muted/50 rounded-xl p-6">
                      <h4 className="font-semibold mb-4 text-center">What's Included:</h4>
                      <ul className="grid md:grid-cols-2 gap-2 text-sm text-muted-foreground">
                        {bakingClass.includes.map((item, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <span className="text-primary">✓</span> {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="text-center space-y-4">
                    <div>
                      <span className="text-4xl font-bold text-primary">
                        KSh {bakingClass.price.toLocaleString()}
                      </span>
                      <span className="text-muted-foreground ml-2">per person</span>
                    </div>
                    <Button 
                      className="w-full max-w-md" 
                      size="lg"
                      onClick={handleEnrollClick}
                    >
                      <MessageCircle className="mr-2 h-5 w-5" />
                      Enroll via WhatsApp
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Info Section */}
          <div className="mt-16 text-center">
            <Card className="border-none shadow-xl bg-gradient-to-br from-primary/5 to-secondary/5 max-w-3xl mx-auto">
              <CardContent className="pt-8 pb-8">
                <h2 className="text-2xl font-bold mb-4">Class Information</h2>
                <div className="text-left space-y-3 text-muted-foreground">
                  <p>• All classes are held at our bakery location in Sweet Town</p>
                  <p>• Materials and ingredients are provided for all classes</p>
                  <p>• Classes have limited seats - book early to secure your spot</p>
                  <p>• Payment required to confirm enrollment (via M-Pesa or bank transfer)</p>
                  <p>• Cancellation policy: Full refund if cancelled 48 hours before class</p>
                  <p>• Contact us on WhatsApp for group bookings or private classes</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default BakingClasses;
