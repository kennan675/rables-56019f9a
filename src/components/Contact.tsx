import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export const Contact = () => {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation();
  const { ref: formRef, isVisible: formVisible } = useScrollAnimation({ threshold: 0.2 });
  const { ref: infoRef, isVisible: infoVisible } = useScrollAnimation({ threshold: 0.2 });

  return (
    <section id="contact" className="py-24 bg-muted/30">
      <div className="container mx-auto px-6 lg:px-12">
        <div 
          ref={titleRef}
          className={`mb-16 text-center transition-all duration-1000 ${
            titleVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-20'
          }`}
        >
          <h2 className="mb-4 text-4xl font-bold md:text-5xl lg:text-6xl">
            Let's Create Something
            <br />
            <span className="gradient-text">Special Together</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground md:text-xl">
            Ready to order or have questions? We'd love to hear from you
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Contact Form */}
          <div 
            ref={formRef}
            className={`transition-all duration-1000 ${
              formVisible 
                ? 'opacity-100 translate-x-0' 
                : 'opacity-0 -translate-x-20'
            }`}
          >
            <form className="space-y-6">
              <div>
                <Input 
                  placeholder="Your Name" 
                  className="h-12 bg-background"
                />
              </div>
              <div>
                <Input 
                  type="email" 
                  placeholder="Your Email" 
                  className="h-12 bg-background"
                />
              </div>
              <div>
                <Input 
                  type="tel" 
                  placeholder="Phone Number" 
                  className="h-12 bg-background"
                />
              </div>
              <div>
                <Textarea 
                  placeholder="Tell us about your event and what you're looking for..."
                  className="min-h-[150px] bg-background"
                />
              </div>
              <Button 
                size="lg" 
                className="w-full bg-primary hover:bg-primary/90 text-lg py-6"
              >
                Send Message
              </Button>
            </form>
          </div>

          {/* Contact Info */}
          <div 
            ref={infoRef}
            className={`space-y-8 transition-all duration-1000 ${
              infoVisible 
                ? 'opacity-100 translate-x-0' 
                : 'opacity-0 translate-x-20'
            }`}
          >
            <div className="rounded-lg border border-border bg-card p-8">
              <h3 className="mb-6 text-2xl font-semibold">Get in Touch</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="font-medium">Phone</p>
                    <p className="text-muted-foreground">+1 (555) 123-4567</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-muted-foreground">hello@rablesbakes.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="font-medium">Location</p>
                    <p className="text-muted-foreground">
                      123 Baker Street<br />
                      Sweet Town, ST 12345
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-border bg-card p-8">
              <h3 className="mb-4 text-2xl font-semibold">Business Hours</h3>
              <div className="space-y-2 text-muted-foreground">
                <p><span className="font-medium text-foreground">Mon - Fri:</span> 8:00 AM - 6:00 PM</p>
                <p><span className="font-medium text-foreground">Saturday:</span> 9:00 AM - 4:00 PM</p>
                <p><span className="font-medium text-foreground">Sunday:</span> Closed</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
