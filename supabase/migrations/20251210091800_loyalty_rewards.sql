-- Create customer loyalty table to track repeat purchases and discounts
CREATE TABLE public.customer_loyalty (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_email TEXT UNIQUE NOT NULL,
  customer_name TEXT,
  total_orders INTEGER NOT NULL DEFAULT 0,
  total_spent NUMERIC NOT NULL DEFAULT 0,
  loyalty_tier TEXT NOT NULL DEFAULT 'Newcomer',
  discount_percentage NUMERIC NOT NULL DEFAULT 0,
  last_order_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.customer_loyalty ENABLE ROW LEVEL SECURITY;

-- Allow anyone placing an order to upsert loyalty progress
CREATE POLICY "Loyalty can be created by anyone" ON public.customer_loyalty FOR INSERT WITH CHECK (true);
CREATE POLICY "Loyalty can be updated by anyone" ON public.customer_loyalty FOR UPDATE USING (true) WITH CHECK (true);
CREATE POLICY "Loyalty can be viewed by everyone" ON public.customer_loyalty FOR SELECT USING (true);

-- Trigger for updated_at maintenance
CREATE TRIGGER update_customer_loyalty_updated_at
BEFORE UPDATE ON public.customer_loyalty
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();
