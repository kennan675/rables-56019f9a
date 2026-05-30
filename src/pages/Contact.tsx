import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
    MapPin,
    Phone,
    Mail,
    Clock,
    MessageCircle,
    Instagram,
    Send
} from "lucide-react";
import { useState } from "react";

const TikTokIcon = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
);

const Contact = () => {
    const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation();
    const { ref: formRef, isVisible: formVisible } = useScrollAnimation();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: "",
    });

    const contactInfo = [
        {
            icon: MapPin,
            title: "Visit Us",
            details: ["Juja, Kiambu County", "Kasarani, Nairobi"],
        },
        {
            icon: Phone,
            title: "Call Us",
            details: ["+254 729 063 060"],
        },
        {
            icon: Mail,
            title: "Email Us",
            details: ["hello@rablebakes.com"],
        },
        {
            icon: Clock,
            title: "Working Hours",
            details: ["Mon - Sat: 8am - 8pm", "Sunday: Closed"],
        },
    ];

    const handleWhatsAppClick = () => {
        const message = encodeURIComponent("Hi Rable Bakes! I'd like to inquire about your cakes.");
        window.open(`https://wa.me/254729063060?text=${message}`, '_blank');
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Construct WhatsApp message with form data
        const message = encodeURIComponent(
            `Hi Rable Bakes!\n\nName: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\n\nMessage: ${formData.message}`
        );
        window.open(`https://wa.me/254729063060?text=${message}`, '_blank');
    };

    return (
        <main className="min-h-screen bg-background">
            <Navigation />

            {/* Hero Section */}
            <section className="pt-32 pb-16 bg-gradient-to-b from-soft-pink/30 to-background">
                <div className="container mx-auto px-6 lg:px-12">
                    <div
                        ref={heroRef}
                        className={`text-center max-w-3xl mx-auto transition-all duration-1000 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
                            }`}
                    >
                        <p className="text-sm uppercase tracking-[0.3em] text-primary mb-4">
                            Get in Touch
                        </p>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                            Contact <span className="gradient-text">Us</span>
                        </h1>
                        <p className="text-lg text-muted-foreground md:text-xl">
                            Have a question or want to place an order? We'd love to hear from you!
                        </p>
                    </div>
                </div>
            </section>

            {/* Contact Info Cards */}
            <section className="py-12">
                <div className="container mx-auto px-6 lg:px-12">
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                        {contactInfo.map((info, index) => (
                            <Card
                                key={info.title}
                                className="border-border hover:shadow-lg transition-all duration-500"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <CardContent className="p-6 text-center">
                                    <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                                        <info.icon className="w-7 h-7 text-primary" />
                                    </div>
                                    <h3 className="font-bold mb-2">{info.title}</h3>
                                    {info.details.map((detail) => (
                                        <p key={detail} className="text-muted-foreground text-sm">
                                            {detail}
                                        </p>
                                    ))}
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Form & WhatsApp */}
            <section className="py-20 bg-muted/30">
                <div className="container mx-auto px-6 lg:px-12">
                    <div
                        ref={formRef}
                        className={`grid gap-12 lg:grid-cols-2 transition-all duration-1000 ${formVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
                            }`}
                    >
                        {/* Contact Form */}
                        <div>
                            <h2 className="text-2xl md:text-3xl font-bold mb-6">Send Us a Message</h2>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid gap-4 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="name">Your Name</Label>
                                        <Input
                                            id="name"
                                            placeholder="John Doe"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email Address</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="john@example.com"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="phone">Phone Number</Label>
                                    <Input
                                        id="phone"
                                        placeholder="+254 7XX XXX XXX"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="message">Your Message</Label>
                                    <Textarea
                                        id="message"
                                        placeholder="Tell us about your cake requirements..."
                                        rows={5}
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        required
                                    />
                                </div>
                                <Button type="submit" size="lg" className="w-full md:w-auto">
                                    <Send className="mr-2 h-5 w-5" />
                                    Send via WhatsApp
                                </Button>
                            </form>
                        </div>

                        {/* Quick Contact */}
                        <div className="space-y-8">
                            <div>
                                <h2 className="text-2xl md:text-3xl font-bold mb-6">Quick Contact</h2>
                                <p className="text-muted-foreground mb-6">
                                    For faster responses, reach out to us directly on WhatsApp. We typically
                                    respond within minutes during business hours!
                                </p>
                                <Button
                                    size="lg"
                                    onClick={handleWhatsAppClick}
                                    className="bg-[#25D366] hover:bg-[#20bd5a] text-white"
                                >
                                    <MessageCircle className="mr-2 h-5 w-5" />
                                    Chat on WhatsApp
                                </Button>
                            </div>

                            <div>
                                <h3 className="text-xl font-bold mb-4">Follow Us</h3>
                                <p className="text-muted-foreground mb-4">
                                    Stay updated with our latest creations and offers on social media!
                                </p>
                                <div className="flex gap-4">
                                    <a
                                        href="https://instagram.com/rablebakes"
                                        target="_blank"
                                        rel="noreferrer"
                                        className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 text-white transition-transform hover:scale-110"
                                    >
                                        <Instagram className="h-6 w-6" />
                                    </a>
                                    <a
                                        href="https://tiktok.com/@rablebakes"
                                        target="_blank"
                                        rel="noreferrer"
                                        className="flex h-12 w-12 items-center justify-center rounded-full bg-black text-white transition-transform hover:scale-110"
                                    >
                                        <TikTokIcon className="h-6 w-6" />
                                    </a>
                                </div>
                            </div>

                            {/* Map placeholder */}
                            <div className="rounded-2xl overflow-hidden border border-border h-64 bg-muted flex items-center justify-center">
                                <div className="text-center text-muted-foreground">
                                    <MapPin className="w-12 h-12 mx-auto mb-2 opacity-50" />
                                    <p>Juja & Kasarani, Nairobi</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
};

export default Contact;
