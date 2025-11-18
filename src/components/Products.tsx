import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import weddingCake from "@/assets/wedding-cake.jpg";
import birthdayCake from "@/assets/birthday-cake.jpg";
import cupcakes from "@/assets/cupcakes.jpg";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const products = [
  {
    title: "Wedding Cakes",
    description: "Elegant multi-tiered masterpieces for your special day",
    image: weddingCake,
    price: "From $300",
  },
  {
    title: "Birthday Cakes",
    description: "Custom designs to make every birthday unforgettable",
    image: birthdayCake,
    price: "From $75",
  },
  {
    title: "Cupcakes",
    description: "Delightful treats perfect for any occasion",
    image: cupcakes,
    price: "From $3 each",
  },
];

export const Products = () => {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation();

  return (
    <section id="products" className="py-24 bg-muted/30">
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
            Our <span className="gradient-text">Signature</span> Creations
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground md:text-xl">
            From intimate gatherings to grand celebrations, we craft cakes that become the centerpiece of your memories
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product, index) => {
            const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });
            
            return (
              <div
                key={product.title}
                ref={ref}
                className={`transition-all duration-700 ${
                  isVisible 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-20'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <Card className="group overflow-hidden border border-border/70 bg-card/90 shadow-md hover:shadow-xl hover-lift h-full">
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-2xl">{product.title}</CardTitle>
                    <CardDescription className="text-base">{product.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-xl font-semibold text-primary">{product.price}</p>
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
