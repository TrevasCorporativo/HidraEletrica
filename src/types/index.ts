export type UserRole = 'loja' | 'comprador';

export interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  role: UserRole;
  phone?: string;
  address_street?: string;
  address_neighborhood?: string;
  address_city?: string;
  address_state?: string;
  address_zip?: string;
  company_name?: string;
  cnpj_or_cpf?: string;
  created_at?: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  description?: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  category_id: string;
  price: number;
  original_price?: number;
  brand: string;
  sku: string;
  image_url: string;
  stock_quantity: number;
  show_stock_to_buyer: boolean; // Controla se o comprador vê o número em estoque
  is_active: boolean;           // Controla se o produto aparece na vitrine da loja
  featured?: boolean;
  specs?: Record<string, string>;
  created_at?: string;
  updated_at?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface StoreSettings {
  id: string;
  store_name: string;
  whatsapp_number: string;
  phone: string;
  email: string;
  cnpj: string;
  address_street: string;
  address_neighborhood: string;
  address_city: string;
  address_state: string;
  address_zip: string;
  business_hours_weekday: string;
  business_hours_saturday: string;
  pix_key: string;
  pix_key_type: string;
  announcement_banner?: string;
  // Landing Page Personalizável
  hero_badge?: string;
  hero_title?: string;
  hero_subtitle?: string;
  hero_cta_primary?: string;
  hero_cta_whatsapp?: string;
  feature_1_title?: string;
  feature_1_desc?: string;
  feature_2_title?: string;
  feature_2_desc?: string;
  feature_3_title?: string;
  feature_3_desc?: string;
  metric_1_val?: string;
  metric_1_lbl?: string;
  metric_2_val?: string;
  metric_2_lbl?: string;
  metric_3_val?: string;
  metric_3_lbl?: string;
  metric_4_val?: string;
  metric_4_lbl?: string;
  quote_banner_title?: string;
  quote_banner_desc?: string;
}

export type OrderStatus = 'pendente' | 'em_separacao' | 'enviado' | 'concluido' | 'cancelado';

export interface Order {
  id: string;
  buyer_id?: string;
  buyer_name: string;
  buyer_phone: string;
  buyer_email?: string;
  delivery_address: string;
  payment_method: string;
  notes?: string;
  items: CartItem[];
  total_amount: number;
  status: OrderStatus;
  whatsapp_url?: string;
  created_at: string;
}
