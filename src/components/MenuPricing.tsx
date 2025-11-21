import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export const MenuPricing = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="py-16 bg-background" aria-label="Menu and pricing">
      <div className="container mx-auto px-6 lg:px-12">
        <div
          ref={ref}
          className={`mb-8 text-left transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-2">
            Menu &amp; Pricing
          </p>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold">
            Whole cakes, bento &amp; treats
          </h2>
          <p className="mt-2 max-w-2xl text-sm md:text-base text-muted-foreground">
            Guide prices in KES for our most popular sizes. Final quotes may vary slightly by flavour and
            decoration.
          </p>
        </div>

        {/* Whole cakes table */}
        <div className="grid gap-10 lg:grid-cols-[minmax(0,2.1fr)_minmax(0,1.4fr)]">
          <div>
            <h3 className="mb-3 text-sm font-semibold tracking-[0.2em] uppercase text-primary">
              Whole cakes (round)
            </h3>
            <div className="overflow-x-auto rounded-2xl border border-border bg-card/80">
              <table className="min-w-full text-left text-xs md:text-sm">
                <thead className="bg-muted/60">
                  <tr>
                    <th className="px-4 py-3 font-medium">Flavour</th>
                    <th className="px-4 py-3 font-medium">1kg</th>
                    <th className="px-4 py-3 font-medium">1.5kg</th>
                    <th className="px-4 py-3 font-medium">2kg</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      flavour: "Vanilla / Strawberry / Blueberry",
                      one: 2300,
                      oneHalf: 3400,
                      two: 4500,
                    },
                    {
                      flavour: "Lemon / Orange",
                      one: 2400,
                      oneHalf: 3500,
                      two: 4600,
                    },
                    {
                      flavour: "Chocolate / Chocolate Mint / Sponge / Bubblegum / Caramel",
                      one: 2500,
                      oneHalf: 3700,
                      two: 4800,
                    },
                    {
                      flavour: "Pina colada / Red velvet / Lemon poppy / Lemon blueberry / Oreo",
                      one: 2700,
                      oneHalf: 4000,
                      two: 5100,
                    },
                  ].map((row) => (
                    <tr key={row.flavour} className="border-t border-border/60">
                      <td className="px-4 py-3 align-top text-xs md:text-sm text-foreground">
                        {row.flavour}
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">{row.one.toLocaleString()}</td>
                      <td className="px-4 py-3 text-muted-foreground">{row.oneHalf.toLocaleString()}</td>
                      <td className="px-4 py-3 text-muted-foreground">{row.two.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Bento, cupcakes and donuts */}
          <div className="space-y-6 text-sm md:text-base text-muted-foreground">
            <div className="rounded-2xl border border-border bg-card/80 p-5">
              <h3 className="mb-2 text-sm font-semibold tracking-[0.2em] uppercase text-primary">
                Bento packages
              </h3>
              <ul className="space-y-1 text-xs md:text-sm">
                <li>Bento cake + 2 cupcakes: approx. 1,200 - 1,400</li>
                <li>Bento cake + 5 cupcakes: approx. 1,500 - 1,700</li>
                <li className="mt-1 text-[0.7rem] text-muted-foreground">
                  Final price depends on flavour and decoration.
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border border-border bg-card/80 p-5 space-y-3">
              <div>
                <h3 className="mb-1 text-sm font-semibold tracking-[0.2em] uppercase text-primary">
                  Cupcakes
                </h3>
                <p className="text-xs md:text-sm">
                  6 cupcakes: 800
                  <br />
                  12 cupcakes: 1,500
                </p>
              </div>

              <div>
                <h3 className="mb-1 text-sm font-semibold tracking-[0.2em] uppercase text-primary">
                  Glazed donuts
                </h3>
                <p className="text-xs md:text-sm">
                  Box of 6 large: 750
                  <br />
                  Box of 8 large: 1,000
                </p>
              </div>

              <div>
                <h3 className="mb-1 text-sm font-semibold tracking-[0.2em] uppercase text-primary">
                  Assorted donuts
                </h3>
                <p className="text-xs md:text-sm">
                  Box of 6 large: 950
                  <br />
                  Box of 8 large: 1,200
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
