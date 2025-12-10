-- Create app roles enum
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');

-- Create user_roles table for admin access
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Function to check if user has a specific role
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Create products table
CREATE TABLE public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'celebration',
  price NUMERIC NOT NULL DEFAULT 0,
  images TEXT[] DEFAULT '{}',
  short_description TEXT,
  long_description TEXT,
  ingredients TEXT,
  allergens TEXT,
  is_customizable BOOLEAN DEFAULT false,
  is_featured BOOLEAN DEFAULT false,
  is_available BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Create product variants table
CREATE TABLE public.product_variants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE NOT NULL,
  size TEXT NOT NULL,
  servings TEXT NOT NULL,
  price NUMERIC NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.product_variants ENABLE ROW LEVEL SECURITY;

-- Create testimonials table
CREATE TABLE public.testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name TEXT NOT NULL,
  location TEXT,
  quote TEXT NOT NULL,
  rating INTEGER DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  avatar_url TEXT,
  is_featured BOOLEAN DEFAULT false,
  is_approved BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

-- Create orders table
CREATE TABLE public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number TEXT UNIQUE NOT NULL,
  customer_name TEXT NOT NULL,
  customer_email TEXT,
  customer_phone TEXT NOT NULL,
  delivery_address TEXT,
  delivery_method TEXT DEFAULT 'pickup',
  preferred_date DATE,
  preferred_time TEXT,
  payment_method TEXT DEFAULT 'mpesa',
  order_notes TEXT,
  status TEXT DEFAULT 'pending',
  subtotal NUMERIC NOT NULL DEFAULT 0,
  delivery_fee NUMERIC DEFAULT 0,
  total NUMERIC NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Create order items table
CREATE TABLE public.order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE NOT NULL,
  product_id UUID REFERENCES public.products(id),
  product_name TEXT NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 1,
  size TEXT,
  servings TEXT,
  unit_price NUMERIC NOT NULL,
  total_price NUMERIC NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

-- Create baking classes table
CREATE TABLE public.baking_classes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  instructor TEXT,
  date DATE NOT NULL,
  time TEXT NOT NULL,
  duration TEXT,
  price NUMERIC NOT NULL DEFAULT 0,
  max_seats INTEGER DEFAULT 10,
  seats_taken INTEGER DEFAULT 0,
  location TEXT,
  image_url TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.baking_classes ENABLE ROW LEVEL SECURITY;

-- Create class bookings table
CREATE TABLE public.class_bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  class_id UUID REFERENCES public.baking_classes(id) ON DELETE CASCADE NOT NULL,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  seats_booked INTEGER DEFAULT 1,
  payment_status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.class_bookings ENABLE ROW LEVEL SECURITY;

-- RLS Policies

-- Products: Public read, admin write
CREATE POLICY "Products are viewable by everyone"
ON public.products FOR SELECT
USING (true);

CREATE POLICY "Admins can manage products"
ON public.products FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Product variants: Public read, admin write
CREATE POLICY "Product variants are viewable by everyone"
ON public.product_variants FOR SELECT
USING (true);

CREATE POLICY "Admins can manage product variants"
ON public.product_variants FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Testimonials: Public read approved, admin manage all
CREATE POLICY "Approved testimonials are viewable by everyone"
ON public.testimonials FOR SELECT
USING (is_approved = true OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Anyone can submit testimonials"
ON public.testimonials FOR INSERT
WITH CHECK (true);

CREATE POLICY "Admins can manage testimonials"
ON public.testimonials FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Orders: Admins can manage
CREATE POLICY "Admins can view all orders"
ON public.orders FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Anyone can create orders"
ON public.orders FOR INSERT
WITH CHECK (true);

CREATE POLICY "Admins can manage orders"
ON public.orders FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Order items policies
CREATE POLICY "Admins can view order items"
ON public.order_items FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Anyone can create order items"
ON public.order_items FOR INSERT
WITH CHECK (true);

-- Baking classes: Public read, admin write
CREATE POLICY "Active classes are viewable by everyone"
ON public.baking_classes FOR SELECT
USING (is_active = true OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage classes"
ON public.baking_classes FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Class bookings: Admin manage
CREATE POLICY "Admins can view bookings"
ON public.class_bookings FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Anyone can book classes"
ON public.class_bookings FOR INSERT
WITH CHECK (true);

-- User roles: Only admins can manage
CREATE POLICY "Users can view their own roles"
ON public.user_roles FOR SELECT
TO authenticated
USING (user_id = auth.uid() OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage roles"
ON public.user_roles FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for timestamp updates
CREATE TRIGGER update_products_updated_at
BEFORE UPDATE ON public.products
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_orders_updated_at
BEFORE UPDATE ON public.orders
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();