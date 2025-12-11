export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      baking_classes: {
        Row: {
          created_at: string
          date: string
          description: string | null
          duration: string | null
          id: string
          image_url: string | null
          instructor: string | null
          is_active: boolean | null
          location: string | null
          max_seats: number | null
          price: number
          seats_taken: number | null
          time: string
          title: string
        }
        Insert: {
          created_at?: string
          date: string
          description?: string | null
          duration?: string | null
          id?: string
          image_url?: string | null
          instructor?: string | null
          is_active?: boolean | null
          location?: string | null
          max_seats?: number | null
          price?: number
          seats_taken?: number | null
          time: string
          title: string
        }
        Update: {
          created_at?: string
          date?: string
          description?: string | null
          duration?: string | null
          id?: string
          image_url?: string | null
          instructor?: string | null
          is_active?: boolean | null
          location?: string | null
          max_seats?: number | null
          price?: number
          seats_taken?: number | null
          time?: string
          title?: string
        }
        Relationships: []
      }
      class_bookings: {
        Row: {
          class_id: string
          created_at: string
          customer_email: string
          customer_name: string
          customer_phone: string
          id: string
          payment_status: string | null
          seats_booked: number | null
        }
        Insert: {
          class_id: string
          created_at?: string
          customer_email: string
          customer_name: string
          customer_phone: string
          id?: string
          payment_status?: string | null
          seats_booked?: number | null
        }
        Update: {
          class_id?: string
          created_at?: string
          customer_email?: string
          customer_name?: string
          customer_phone?: string
          id?: string
          payment_status?: string | null
          seats_booked?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "class_bookings_class_id_fkey"
            columns: ["class_id"]
            isOneToOne: false
            referencedRelation: "baking_classes"
            referencedColumns: ["id"]
          },
        ]
      }
      order_items: {
        Row: {
          created_at: string
          id: string
          order_id: string
          product_id: string | null
          product_name: string
          quantity: number
          servings: string | null
          size: string | null
          total_price: number
          unit_price: number
        }
        Insert: {
          created_at?: string
          id?: string
          order_id: string
          product_id?: string | null
          product_name: string
          quantity?: number
          servings?: string | null
          size?: string | null
          total_price: number
          unit_price: number
        }
        Update: {
          created_at?: string
          id?: string
          order_id?: string
          product_id?: string | null
          product_name?: string
          quantity?: number
          servings?: string | null
          size?: string | null
          total_price?: number
          unit_price?: number
        }
        Relationships: [
          {
            foreignKeyName: "order_items_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          created_at: string
          customer_email: string | null
          customer_name: string
          customer_phone: string
          delivery_address: string | null
          delivery_fee: number | null
          delivery_method: string | null
          id: string
          order_notes: string | null
          order_number: string
          payment_method: string | null
          preferred_date: string | null
          preferred_time: string | null
          status: string | null
          subtotal: number
          total: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          customer_email?: string | null
          customer_name: string
          customer_phone: string
          delivery_address?: string | null
          delivery_fee?: number | null
          delivery_method?: string | null
          id?: string
          order_notes?: string | null
          order_number: string
          payment_method?: string | null
          preferred_date?: string | null
          preferred_time?: string | null
          status?: string | null
          subtotal?: number
          total?: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          customer_email?: string | null
          customer_name?: string
          customer_phone?: string
          delivery_address?: string | null
          delivery_fee?: number | null
          delivery_method?: string | null
          id?: string
          order_notes?: string | null
          order_number?: string
          payment_method?: string | null
          preferred_date?: string | null
          preferred_time?: string | null
          status?: string | null
          subtotal?: number
          total?: number
          updated_at?: string
        }
        Relationships: []
      }
      product_variants: {
        Row: {
          created_at: string
          id: string
          price: number
          product_id: string
          servings: string
          size: string
        }
        Insert: {
          created_at?: string
          id?: string
          price: number
          product_id: string
          servings: string
          size: string
        }
        Update: {
          created_at?: string
          id?: string
          price?: number
          product_id?: string
          servings?: string
          size?: string
        }
        Relationships: [
          {
            foreignKeyName: "product_variants_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          allergens: string | null
          category: string
          created_at: string
          id: string
          images: string[] | null
          ingredients: string | null
          is_available: boolean | null
          is_customizable: boolean | null
          is_featured: boolean | null
          long_description: string | null
          name: string
          price: number
          product_id: string
          short_description: string | null
          updated_at: string
        }
        Insert: {
          allergens?: string | null
          category?: string
          created_at?: string
          id?: string
          images?: string[] | null
          ingredients?: string | null
          is_available?: boolean | null
          is_customizable?: boolean | null
          is_featured?: boolean | null
          long_description?: string | null
          name: string
          price?: number
          product_id: string
          short_description?: string | null
          updated_at?: string
        }
        Update: {
          allergens?: string | null
          category?: string
          created_at?: string
          id?: string
          images?: string[] | null
          ingredients?: string | null
          is_available?: boolean | null
          is_customizable?: boolean | null
          is_featured?: boolean | null
          long_description?: string | null
          name?: string
          price?: number
          product_id?: string
          short_description?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      testimonials: {
        Row: {
          avatar_url: string | null
          created_at: string
          customer_name: string
          id: string
          is_approved: boolean | null
          is_featured: boolean | null
          location: string | null
          quote: string
          rating: number | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          customer_name: string
          id?: string
          is_approved?: boolean | null
          is_featured?: boolean | null
          location?: string | null
          quote: string
          rating?: number | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          customer_name?: string
          id?: string
          is_approved?: boolean | null
          is_featured?: boolean | null
          location?: string | null
          quote?: string
          rating?: number | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "moderator", "user"],
    },
  },
} as const
