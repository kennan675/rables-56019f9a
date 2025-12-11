import { Heart, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";

export const LoyaltySpotlight = () => {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-primary/10 bg-gradient-to-br from-rose-50 via-white to-amber-50 px-8 py-14 shadow-2xl shadow-primary/10">
      <div className="absolute inset-y-0 right-0 hidden w-1/3 bg-[radial-gradient(circle_at_center,_rgba(255,166,214,0.45),_transparent_70%)] blur-3xl lg:block" />

      <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-xl space-y-6">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1 text-sm font-semibold uppercase tracking-wide text-primary">
            <Heart className="h-4 w-4" />
            Returning Customer
          </span>
          <h2 className="text-4xl font-black leading-tight text-slate-900 md:text-5xl">
            Once you're family, you're <span className="text-primary">always family</span>
          </h2>
          <p className="text-lg text-slate-600">
            We remember everyone who has celebrated with us. As a returning customer, 
            enjoy special treats and exclusive offers as our way of saying thank you.
          </p>
        </div>

        <div className="w-full max-w-sm">
          <div className="rounded-2xl border border-white/60 bg-white/90 p-6 shadow-lg backdrop-blur">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                <Gift className="h-7 w-7 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">Rable Family</h3>
                <p className="text-sm text-primary font-medium">Exclusive perks for you</p>
              </div>
            </div>
            <p className="mt-4 text-sm text-slate-600">
              Priority booking, surprise treats, and special discounts on your next order.
            </p>
            <Button size="lg" className="mt-5 w-full rounded-full text-base font-semibold">
              Order Again
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
