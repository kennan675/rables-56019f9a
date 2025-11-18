import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, Calendar, MessageCircle } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const classes = [
  {
    id: "BC001",
    title: "Cupcake Decorating Basics",
    description: "Learn the fundamentals of cupcake decoration, including piping techniques and frosting styles",
    date: "Every Saturday",
    time: "10:00 AM - 1:00 PM",
    duration: "3 hours",
    price: 3500,
    seats: 8,
    level: "Beginner",
    includes: ["All ingredients", "Recipe booklet", "Take-home cupcakes", "Piping bag kit"]
  },
  {
    id: "BC002",
    title: "Wedding Cake Masterclass",
    description: "Master the art of creating stunning multi-tiered wedding cakes with professional techniques",
    date: "2nd Sunday of each month",
    time: "9:00 AM - 4:00 PM",
    duration: "7 hours",
    price: 8500,
    seats: 6,
    level: "Advanced",
    includes: ["All ingredients", "Professional tips", "Certificate", "Lunch included"]
  },
  {
    id: "BC003",
    title: "Cake Baking Fundamentals",
    description: "Perfect your cake baking skills - from mixing to baking to achieving the perfect texture",
    date: "Every Friday",
    time: "2:00 PM - 5:00 PM",
    duration: "3 hours",
    price: 4000,
    seats: 10,
    level: "Beginner",
    includes: ["All ingredients", "Recipe cards", "Take-home cake", "Baking tips sheet"]
  },
  {
    id: "BC004",
    title: "Sugar Flower Artistry",
    description: "Create beautiful edible sugar flowers for cake decoration and special occasions",
    date: "3rd Saturday of each month",
    time: "10:00 AM - 3:00 PM",
    duration: "5 hours",
    price: 6000,
    seats: 6,
    level: "Intermediate",
    includes: ["Sugar paste", "Tools kit", "Flower samples", "Techniques guide"]
  }
];

const BakingClasses = () => {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation();
  
  const BUSINESS_PHONE = "254722123456";
  
  const handleEnrollClick = (classItem: typeof classes[0]) => {
    const message = encodeURIComponent(
      `Hi Rable Bakes! I'd like to enroll in: ${classItem.title} (${classItem.id})\n\nDate: ${classItem.date}\nTime: ${classItem.time}\nPrice: KSh ${classItem.price}\n\nMy details:\nName: ____\nPhone: ____\nEmail: ____\n\nPlease confirm my enrollment. Thanks!`
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

          {/* Classes Grid */}
          <div className="grid gap-8 md:grid-cols-2">
            {classes.map((classItem, index) => {
              const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });
              
              return (
                <div
                  key={classItem.id}
                  ref={ref}
                  className={`transition-all duration-700 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
                  }`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  <Card className="hover-lift border-none shadow-lg h-full flex flex-col">
                    <CardHeader>
                      <div className="flex justify-between items-start mb-2">
                        <Badge variant="secondary">{classItem.level}</Badge>
                        <Badge className="bg-primary">
                          <Users className="h-3 w-3 mr-1" />
                          {classItem.seats} seats
                        </Badge>
                      </div>
                      <CardTitle className="text-2xl">{classItem.title}</CardTitle>
                      <CardDescription className="text-base">
                        {classItem.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1 flex flex-col justify-between">
                      <div className="space-y-4 mb-6">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          {classItem.date}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          {classItem.time} ({classItem.duration})
                        </div>
                        
                        <div>
                          <h4 className="font-semibold mb-2">What's Included:</h4>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            {classItem.includes.map((item, i) => (
                              <li key={i}>✓ {item}</li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-baseline justify-between">
                          <span className="text-3xl font-bold text-primary">
                            KSh {classItem.price.toLocaleString()}
                          </span>
                          <span className="text-sm text-muted-foreground">per person</span>
                        </div>
                        <Button 
                          className="w-full" 
                          size="lg"
                          onClick={() => handleEnrollClick(classItem)}
                        >
                          <MessageCircle className="mr-2 h-5 w-5" />
                          Enroll via WhatsApp
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              );
            })}
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
