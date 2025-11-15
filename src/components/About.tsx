import { Heart, Award, Users } from "lucide-react";

const features = [
  {
    icon: Heart,
    title: "Made with Love",
    description: "Every ingredient is carefully selected and every cake is crafted with passion",
  },
  {
    icon: Award,
    title: "Award-Winning",
    description: "Recognized for excellence in taste, design, and customer satisfaction",
  },
  {
    icon: Users,
    title: "Custom Designs",
    description: "Work directly with our team to create your dream cake",
  },
];

export const About = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          <div className="animate-slide-in-left">
            <h2 className="mb-6 text-4xl font-bold md:text-5xl lg:text-6xl">
              The Art of
              <br />
              <span className="gradient-text">Baking Excellence</span>
            </h2>
            <p className="mb-8 text-lg text-muted-foreground leading-relaxed">
              At Rables Bakes, we believe every celebration deserves something extraordinary. 
              For over a decade, we've been transforming simple ingredients into edible art, 
              creating cakes that not only taste divine but become the centerpiece of your most 
              cherished memories.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Our master bakers combine traditional techniques with innovative flavors, 
              ensuring each creation is as unique as the celebration it honors.
            </p>
          </div>

          <div className="grid gap-6 animate-slide-in-right">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="group flex gap-4 rounded-lg border border-border bg-card p-6 transition-all duration-500 hover:border-primary hover:shadow-xl"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-all duration-500 group-hover:bg-primary group-hover:text-primary-foreground">
                  <feature.icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
