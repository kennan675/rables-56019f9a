import { Sparkles, Star, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";

const LOYALTY_TIERS = [
  { tier: "Gold Member", minOrders: 10, discount: 15, headline: "Our most valued customers enjoy exclusive perks" },
  { tier: "Silver Member", minOrders: 5, discount: 10, headline: "Regular sweet-tooths get rewarded" },
  { tier: "Bronze Member", minOrders: 2, discount: 5, headline: "Start your sweet journey with us" },
];

export const LoyaltySpotlight = () => {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-primary/10 bg-gradient-to-br from-rose-50 via-white to-amber-50 px-8 py-14 shadow-2xl shadow-primary/10">
      <div className="absolute inset-y-0 right-0 hidden w-1/3 bg-[radial-gradient(circle_at_center,_rgba(255,166,214,0.45),_transparent_70%)] blur-3xl lg:block" />

      <div className="flex flex-col gap-12 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-xl space-y-6">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1 text-sm font-semibold uppercase tracking-wide text-primary">
            <Sparkles className="h-4 w-4" />
            Loyalty Rewards
          </span>
          <h2 className="text-4xl font-black leading-tight text-slate-900 md:text-5xl">
            Every slice gets sweeter with <span className="text-primary">Rable Rewards</span>
          </h2>
          <p className="text-lg text-slate-600">
            Keep celebrating with us and unlock stacked discounts, priority baking slots, and seasonal surprises.
            Your next cake could be on the house (almost)!
          </p>
          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-primary" />
              Automatic tracking on every order
            </div>
            <div className="flex items-center gap-2">
              <Trophy className="h-4 w-4 text-primary" />
              Unlock VIP tiers by order count
            </div>
          </div>
          <Button size="lg" className="rounded-full px-7 text-base font-semibold">
            Join the Sweet Circle
          </Button>
        </div>

        <div className="grid w-full max-w-md gap-4">
          {LOYALTY_TIERS.map((tier, index) => (
            <div
              key={tier.tier}
              className="rounded-2xl border border-white/60 bg-white/90 p-5 shadow-lg backdrop-blur transition hover:-translate-y-1 hover:shadow-2xl"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-primary/70">{`From ${tier.minOrders} orders`}</p>
                  <h3 className="text-2xl font-bold text-slate-900">{tier.tier}</h3>
                </div>
                <span className="rounded-full bg-primary/10 px-4 py-1 text-sm font-semibold text-primary">
                  {tier.discount}% off
                </span>
              </div>
              <p className="mt-3 text-sm text-slate-600">{tier.headline}</p>
              {index === 0 && (
                <p className="mt-3 text-xs font-medium text-amber-600">
                  Our sweetest tier! Limited-edition treats slip into your box.
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
