import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MessageCircle } from "lucide-react";

const BUSINESS_PHONE = "254704209055"; // keep in sync with whatsapp util

const CustomCake = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [occasion, setOccasion] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [guestCount, setGuestCount] = useState("");
  const [budget, setBudget] = useState("");
  const [referenceLink, setReferenceLink] = useState("");
  const [details, setDetails] = useState("");

  const handleWhatsApp = () => {
    const message = encodeURIComponent(
      `Hi Rable Bakes! I'd like a custom cake.\n\n` +
      `Name: ${name || "____"}\n` +
      `Phone: ${phone || "____"}\n` +
      `Occasion: ${occasion || "____"}\n` +
      `Event Date: ${eventDate || "____"}\n` +
      `Guests: ${guestCount || "____"}\n` +
      `Budget: ${budget || "____"}\n` +
      (referenceLink ? `Reference Image / Instagram link: ${referenceLink}\n` : "") +
      `Details / Theme: ${details || "____"}`
    );

    window.open(`https://wa.me/${BUSINESS_PHONE}?text=${message}`, "_blank");
  };

  return (
    <main className="min-h-screen">
      <Navigation />
      <section className="pt-32 pb-24 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-3xl mx-auto mb-10 text-center">
            <h1 className="mb-4 text-4xl md:text-5xl lg:text-6xl font-bold">
              Custom <span className="gradient-text">Cake Request</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Tell us about your dream cake and we will follow up on WhatsApp to confirm all the details.
            </p>
          </div>

          <Card className="max-w-3xl mx-auto border-none shadow-xl">
            <CardHeader>
              <CardTitle>Share Your Cake Idea</CardTitle>
              <CardDescription>
                The more details you give us, the easier it is for us to quote accurately and suggest designs.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="grid gap-4 md:grid-cols-2">
                <Input
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="h-11"
                />
                <Input
                  placeholder="Phone / WhatsApp Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="h-11"
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <Input
                  placeholder="Occasion (Birthday, Wedding, etc.)"
                  value={occasion}
                  onChange={(e) => setOccasion(e.target.value)}
                  className="h-11"
                />
                <Input
                  placeholder="Event Date"
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  className="h-11"
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <Input
                  placeholder="Approx. number of guests"
                  value={guestCount}
                  onChange={(e) => setGuestCount(e.target.value)}
                  className="h-11"
                />
                <Input
                  placeholder="Budget (KSh)"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="h-11"
                />
              </div>

              <Input
                placeholder="Reference image / Instagram post link (optional)"
                value={referenceLink}
                onChange={(e) => setReferenceLink(e.target.value)}
                className="h-11"
              />

              <Textarea
                placeholder="Describe the theme, colors, flavors, and any text you want on the cake."
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                className="min-h-[140px]"
              />

              <Button
                size="lg"
                className="w-full mt-2"
                onClick={handleWhatsApp}
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Send Request on WhatsApp
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default CustomCake;
