import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, Calendar, MessageCircle } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const bakingClass = {
  id: "BC001",
  title: "Professional Cake Baking & Decorating Masterclass",
  subtitle: "EST. 2025 - RABLEBAKES BAKERY",
  description: "Master the complete art of professional cake baking and decorating. Learn essential techniques from basic recipes to advanced decorating methods in this comprehensive masterclass.",
  date: "Weekend Classes Available",
  time: "9:00 AM - 3:00 PM",
  duration: "6 hours",
  price: 15000,
  seats: 10,
  level: "All Levels Welcome",
  courseOutline: [
    "Lemon Cake - Perfect citrus techniques",
    "Chocolate Cake - Rich moist methods", 
    "Blueberry Cake - Fruit incorporation",
    "Cake fillings (Passion, Lemon, Blueberry & more)",
    "Chocolate cage creation & assembly",
    "Cake dowelling and stacking techniques",
    "Professional piping techniques",
    "Buttercream & whipped cream preparation",
    "Ganache techniques & applications",
    "Additional cake recipes & variations",
    "Cake costing for business"
  ],
  locations: [
    "Nairobi: Uhuru Phase 4 or Juja",
    "Eldoret: Unga Estate (West)"
  ],
  contact: {
    phone1: "+254704209055",
    phone2: "+254729063060",
    instagram: "@rablebakes"
  },
  includes: [
    "All ingredients and materials provided",
    "Professional recipe booklet",
    "Decorating tools kit to take home",
    "Take home your decorated cake",
    "Certificate of completion",
    "Light refreshments included",
    "Business startup guide"
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
                  <div className="mb-4">
                    <p className="text-sm font-medium text-primary/80 uppercase tracking-wider">
                      {bakingClass.subtitle}
                    </p>
                  </div>
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
                      <h4 className="font-semibold mb-4 text-center">Course Outline:</h4>
                      <ul className="grid md:grid-cols-2 gap-2 text-sm text-muted-foreground">
                        {bakingClass.courseOutline.map((item, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <span className="text-primary">✓</span> {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="bg-primary/5 rounded-xl p-6">
                      <h4 className="font-semibold mb-3 text-center">Location:</h4>
                      <div className="space-y-1 text-sm text-muted-foreground text-center">
                        {bakingClass.locations.map((location, i) => (
                          <p key={i}>{location}</p>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="text-center space-y-4">
                    <div>
                      <span className="text-4xl font-bold text-primary">
                        ONLY KSh 15,000
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
                <h2 className="text-2xl font-bold mb-4">BOOK HERE</h2>
                <div className="text-left space-y-3 text-muted-foreground">
                  <p> {bakingClass.contact.phone1}</p>
                  <p> {bakingClass.contact.phone2}</p>
                  <p>Instagram: {bakingClass.contact.instagram}</p>
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
