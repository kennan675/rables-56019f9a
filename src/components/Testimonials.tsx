import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Sarah Wanjiku",
    location: "Nairobi, Westlands",
    quote: "The cake was even more beautiful in person and tasted absolutely incredible. Our wedding guests couldn't stop talking about it! Rable Bakes exceeded all our expectations.",
    rating: 5,
    avatar: "SW",
  },
  {
    id: 2,
    name: "Kevin Omondi",
    location: "Eldoret",
    quote: "Seamless ordering and perfect delivery. They captured our graduation theme beautifully. The attention to detail was amazing and the cake was delicious!",
    rating: 5,
    avatar: "KO",
  },
  {
    id: 3,
    name: "Lynn Muthoni",
    location: "Nairobi, Karen",
    quote: "Their attention to detail is unmatched. I always recommend them for birthdays and corporate events. The flavors are consistent and the designs are always stunning.",
    rating: 5,
    avatar: "LM",
  },
];

export const Testimonials = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="py-20 bg-soft-pink/50" aria-label="Customer testimonials">
      <div className="container mx-auto px-6 lg:px-12">
        <div
          ref={ref}
          className={`mb-12 text-center transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="text-sm uppercase tracking-[0.3em] text-primary mb-3">
            Client Love
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
            What Our Clients Say
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <figure
              key={testimonial.id}
              className={`relative rounded-3xl bg-card p-8 shadow-sm border border-border transition-all duration-700 card-hover ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {/* Quote Icon */}
              <Quote className="absolute top-6 right-6 h-10 w-10 text-primary/10" />
              
              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-gold text-gold" />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-muted-foreground mb-6 leading-relaxed">
                "{testimonial.quote}"
              </blockquote>

              {/* Author */}
              <figcaption className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold">
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};