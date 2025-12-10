import { supabase } from "./client";
import type { Tables } from "./types";

export type LoyaltyRecord = Tables<"customer_loyalty">;

export type TierConfig = {
  minOrders: number;
  tier: string;
  discount: number;
  headline: string;
};

export const LOYALTY_TIERS: TierConfig[] = [
  {
    minOrders: 8,
    tier: "Golden Baker",
    discount: 15,
    headline: "15% OFF forever and surprise seasonal treats",
  },
  {
    minOrders: 5,
    tier: "Cake VIP",
    discount: 10,
    headline: "10% OFF every order + priority booking",
  },
  {
    minOrders: 3,
    tier: "Sweet Insider",
    discount: 7,
    headline: "7% OFF next cake and early access drops",
  },
];

const DEFAULT_TIER: TierConfig = {
  minOrders: 1,
  tier: "Sugar Starter",
  discount: 5,
  headline: "Welcome gift: 5% OFF your next treat",
};

const BASE_TIER: TierConfig = {
  minOrders: 0,
  tier: "Newcomer",
  discount: 0,
  headline: "Collect orders to unlock sweet rewards",
};

const resolveTier = (totalOrders: number): TierConfig => {
  if (totalOrders <= 0) return BASE_TIER;
  const matchedTier = LOYALTY_TIERS.find((config) => totalOrders >= config.minOrders);
  if (matchedTier) return matchedTier;
  return DEFAULT_TIER;
};

export const fetchLoyaltyByEmail = async (email: string) => {
  const { data, error } = await supabase
    .from("customer_loyalty")
    .select("*")
    .eq("customer_email", email.toLowerCase())
    .maybeSingle();

  if (error) throw error;
  return data;
};

interface RecordLoyaltyParams {
  email?: string | null;
  name?: string;
  orderTotal: number;
}

export const recordLoyaltyProgress = async ({
  email,
  name,
  orderTotal,
}: RecordLoyaltyParams): Promise<LoyaltyRecord | null> => {
  if (!email) return null;

  const normalizedEmail = email.toLowerCase().trim();

  const { data: existing, error: fetchError } = await supabase
    .from("customer_loyalty")
    .select("*")
    .eq("customer_email", normalizedEmail)
    .maybeSingle();

  if (fetchError && fetchError.code !== "PGRST116") {
    throw fetchError;
  }

  const previousOrders = existing?.total_orders ?? 0;
  const previousSpend = existing?.total_spent ?? 0;

  const totalOrders = previousOrders + 1;
  const totalSpent = previousSpend + orderTotal;

  const tier = resolveTier(totalOrders);

  const upsertPayload = {
    customer_email: normalizedEmail,
    customer_name: name ?? existing?.customer_name ?? null,
    total_orders: totalOrders,
    total_spent: totalSpent,
    loyalty_tier: tier.tier,
    discount_percentage: tier.discount,
    last_order_at: new Date().toISOString(),
  } satisfies Partial<LoyaltyRecord> & {
    customer_email: string;
    total_orders: number;
    total_spent: number;
    loyalty_tier: string;
    discount_percentage: number;
    last_order_at: string;
  };

  const { data, error } = await supabase
    .from("customer_loyalty")
    .upsert(upsertPayload, { onConflict: "customer_email" })
    .select()
    .single();

  if (error) throw error;

  return data;
};

export const getLoyaltyHeadline = (totalOrders = 0) => resolveTier(totalOrders).headline;
