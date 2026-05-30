import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Heart, Award, Users, Cake } from "lucide-react";
import logo from "@/assets/rable-logo.jpg";

const About = () => {
    const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation();
    const { ref: storyRef, isVisible: storyVisible } = useScrollAnimation();
    const { ref: valuesRef, isVisible: valuesVisible } = useScrollAnimation();

    const values = [
        {
            icon: Heart,
            title: "Made with Love",
            description: "Every cake we create is infused with passion and care, ensuring that each bite tells a story of dedication.",
        },
        {
            icon: Award,
            title: "Premium Quality",
            description: "We use only the finest ingredients sourced locally and internationally to guarantee exceptional taste.",
        },
        {
            icon: Users,
            title: "Customer First",
            description: "Your satisfaction is our priority. We work closely with you to bring your cake dreams to life.",
        },
        {
            icon: Cake,
            title: "Artisan Crafted",
            description: "Each cake is handcrafted by skilled bakers who treat every creation as a work of edible art.",
        },
    ];

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
                            Our Story
                        </p>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                            About <span className="gradient-text">Rable Bakes</span>
                        </h1>
                        <p className="text-lg text-muted-foreground md:text-xl">
                            Crafting sweet memories for families across Juja, Kasarani & Nairobi
                        </p>
                    </div>
                </div>
            </section>

            {/* Story Section */}
            <section className="py-20">
                <div className="container mx-auto px-6 lg:px-12">
                    <div
                        ref={storyRef}
                        className={`grid gap-12 lg:grid-cols-2 items-center transition-all duration-1000 ${storyVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
                            }`}
                    >
                        <div className="relative">
                            <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl">
                                <img
                                    src={logo}
                                    alt="Rable Bakes founder"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-primary/20 rounded-3xl -z-10" />
                            <div className="absolute -top-6 -left-6 w-32 h-32 bg-secondary/30 rounded-3xl -z-10" />
                        </div>

                        <div className="space-y-6">
                            <h2 className="text-3xl md:text-4xl font-bold">
                                From a Home Kitchen to Your Table
                            </h2>
                            <div className="space-y-4 text-muted-foreground">
                                <p>
                                    Rable Bakes started as a passion project in a small home kitchen in Nairobi.
                                    What began as baking for friends and family soon blossomed into a beloved
                                    bakery serving hundreds of happy customers.
                                </p>
                                <p>
                                    Our founder's love for creating beautiful, delicious cakes that bring people
                                    together has been the driving force behind everything we do. We believe that
                                    every celebration deserves a cake that's as special as the moment itself.
                                </p>
                                <p>
                                    Today, we're proud to mainly serve Juja and Kasarani, and Nairobi at large, bringing our signature
                                    cakes, cupcakes, and baked goods to celebrations big and small. From birthdays
                                    to weddings, from corporate events to quiet family gatherings — we're honored
                                    to be part of your special moments.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-20 bg-muted/30">
                <div className="container mx-auto px-6 lg:px-12">
                    <div
                        ref={valuesRef}
                        className={`transition-all duration-1000 ${valuesVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
                            }`}
                    >
                        <div className="text-center mb-12">
                            <p className="text-sm uppercase tracking-[0.3em] text-primary mb-4">
                                What We Stand For
                            </p>
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
                                Our Values
                            </h2>
                        </div>

                        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                            {values.map((value, index) => (
                                <div
                                    key={value.title}
                                    className="bg-card rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 border border-border"
                                    style={{ transitionDelay: `${index * 100}ms` }}
                                >
                                    <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                                        <value.icon className="w-7 h-7 text-primary" />
                                    </div>
                                    <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                                    <p className="text-muted-foreground text-sm">{value.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-20">
                <div className="container mx-auto px-6 lg:px-12">
                    <div className="grid gap-8 md:grid-cols-3 text-center">
                        {[
                            { value: "5K+", label: "Happy Customers" },
                            { value: "10K+", label: "Cakes Delivered" },
                            { value: "100%", label: "Fresh Daily" },
                        ].map((stat) => (
                            <div key={stat.label} className="p-6">
                                <p className="text-4xl md:text-5xl font-bold text-primary mb-2">{stat.value}</p>
                                <p className="text-muted-foreground">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
};

export default About;
