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
