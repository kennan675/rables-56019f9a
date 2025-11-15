import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import weddingCake from "@/assets/wedding-cake.jpg";
import birthdayCake from "@/assets/birthday-cake.jpg";
import cupcakes from "@/assets/cupcakes.jpg";

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
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="mb-16 text-center animate-fade-in-up">
          <h2 className="mb-4 text-4xl font-bold md:text-5xl lg:text-6xl">
            Our <span className="gradient-text">Signature</span> Creations
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground md:text-xl">
            From intimate gatherings to grand celebrations, we craft cakes that become the centerpiece of your memories
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product, index) => (
            <Card 
              key={product.title}
              className="group overflow-hidden border-none shadow-lg hover-lift animate-fade-in-up bg-card"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
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
          ))}
        </div>
      </div>
    </section>
  );
};
