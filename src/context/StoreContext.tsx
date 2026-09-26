import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, StoreSettings, Category, Order, OrderStatus } from '../types';
import { INITIAL_PRODUCTS, INITIAL_CATEGORIES, INITIAL_STORE_SETTINGS } from '../data/mockProducts';
import { supabase, isSupabaseConfigured } from '../services/supabase';

interface StoreContextType {
  products: Product[];
  activeProducts: Product[];
  categories: Category[];
  storeSettings: StoreSettings;
  orders: Order[];
  activeCategory: string;
  searchQuery: string;
  setActiveCategory: (cat: string) => void;
  setSearchQuery: (query: string) => void;
  // Métodos da Loja (Admin)
  addProduct: (product: Omit<Product, 'id' | 'created_at' | 'updated_at'>) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  toggleProductActive: (id: string) => void;
  toggleStockVisibility: (id: string) => void;
  updateStoreSettings: (newSettings: Partial<StoreSettings>) => void;
  // Métodos de Pedidos
  createOrder: (orderData: Omit<Order, 'id' | 'created_at'>) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const PRODUCTS_STORAGE_KEY = 'hidraeletrica_products_v1';
const SETTINGS_STORAGE_KEY = 'hidraeletrica_settings_v1';
const ORDERS_STORAGE_KEY = 'hidraeletrica_orders_v1';

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Estado de Produtos
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem(PRODUCTS_STORAGE_KEY);
      return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
    } catch {
      return INITIAL_PRODUCTS;
    }
  });

  // Estado de Configurações da Loja
  const [storeSettings, setStoreSettings] = useState<StoreSettings>(() => {
    try {
      const saved = localStorage.getItem(SETTINGS_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.email === 'comercial@hidraeletrica.com.br' || parsed.address_city === 'São Paulo' || !parsed.whatsapp_number?.includes('31')) {
          return { ...parsed, ...INITIAL_STORE_SETTINGS };
        }
        return { ...INITIAL_STORE_SETTINGS, ...parsed };
      }
      return INITIAL_STORE_SETTINGS;
    } catch {
      return INITIAL_STORE_SETTINGS;
    }
  });

  // Estado de Pedidos / Orçamentos
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem(ORDERS_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [categories] = useState<Category[]>(INITIAL_CATEGORIES);
  const [activeCategory, setActiveCategory] = useState<string>('todos');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Sincronizar produtos com localStorage
  useEffect(() => {
    try {
      localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(products));
    } catch (e) {
      console.warn('Erro ao salvar produtos no localStorage', e);
    }
  }, [products]);

  // Sincronizar configurações com localStorage
  useEffect(() => {
    try {
      localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(storeSettings));
    } catch (e) {
      console.warn('Erro ao salvar configurações no localStorage', e);
    }
  }, [storeSettings]);

  // Sincronizar pedidos com localStorage
  useEffect(() => {
    try {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
    } catch (e) {
      console.warn('Erro ao salvar pedidos no localStorage', e);
    }
  }, [orders]);

  // Tentativa de sincronização em segundo plano com Supabase se configurado
  useEffect(() => {
    if (!isSupabaseConfigured) return;

    const fetchSupabaseData = async () => {
      try {
        const { data: remoteProducts, error } = await supabase
          .from('products')
          .select('*');

        if (!error && remoteProducts && remoteProducts.length > 0) {
          setProducts(remoteProducts as Product[]);
        }

        const { data: remoteSettings } = await supabase
          .from('store_settings')
          .select('*')
          .limit(1)
          .single();

        if (remoteSettings) {
          setStoreSettings(prev => ({ ...prev, ...remoteSettings }));
        }
      } catch (err) {
        console.info('Usando dados locais de produtos e loja (Supabase em modo offline/fallback).', err);
      }
    };

    fetchSupabaseData();
  }, []);

  // Cadastrar Produto (Loja)
  const addProduct = (newProd: Omit<Product, 'id' | 'created_at' | 'updated_at'>) => {
    const id = typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : 'prod-' + Date.now();
    const createdProduct: Product = {
      ...newProd,
      id,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    setProducts(prev => [createdProduct, ...prev]);

    if (isSupabaseConfigured) {
      supabase.from('products').insert([createdProduct]).then(({ error }) => {
        if (error) console.error('Erro ao inserir produto no Supabase:', error);
      });
    }
  };

  // Atualizar Produto (Loja)
  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts(prev =>
      prev.map(p => (p.id === id ? { ...p, ...updates, updated_at: new Date().toISOString() } : p))
    );

    if (isSupabaseConfigured) {
      supabase.from('products').update(updates).eq('id', id).then(() => {});
    }
  };

  // Excluir Produto (Loja)
  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    if (isSupabaseConfigured) {
      supabase.from('products').delete().eq('id', id).then(() => {});
    }
  };

  // Alternar Ativação do Produto (se está na vitrine pública ou não)
  const toggleProductActive = (id: string) => {
    setProducts(prev =>
      prev.map(p => {
        if (p.id === id) {
          const nextActive = !p.is_active;
          if (isSupabaseConfigured) {
            supabase.from('products').update({ is_active: nextActive }).eq('id', id).then(() => {});
          }
          return { ...p, is_active: nextActive };
        }
        return p;
      })
    );
  };

  // Alternar se exibe a quantidade de estoque para o comprador
  const toggleStockVisibility = (id: string) => {
    setProducts(prev =>
      prev.map(p => {
        if (p.id === id) {
          const nextVal = !p.show_stock_to_buyer;
          if (isSupabaseConfigured) {
            supabase.from('products').update({ show_stock_to_buyer: nextVal }).eq('id', id).then(() => {});
          }
          return { ...p, show_stock_to_buyer: nextVal };
        }
        return p;
      })
    );
  };

  // Atualizar Configurações da Loja (WhatsApp, Endereço, Horários, etc.)
  const updateStoreSettings = (newSettings: Partial<StoreSettings>) => {
    setStoreSettings(prev => {
      const merged = { ...prev, ...newSettings };
      if (isSupabaseConfigured) {
        supabase.from('store_settings').update(newSettings).eq('id', prev.id).then(() => {});
      }
      return merged;
    });
  };

  // Criar Pedido / Orçamento
  const createOrder = (orderData: Omit<Order, 'id' | 'created_at'>): Order => {
    const id = typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : 'ped-' + Date.now();
    const newOrder: Order = {
      ...orderData,
      id,
      created_at: new Date().toISOString()
    };

    setOrders(prev => [newOrder, ...prev]);

    if (isSupabaseConfigured) {
      supabase.from('orders').insert([newOrder]).then(({ error }) => {
        if (error) console.error('Erro ao registrar pedido no Supabase:', error);
      });
    }

    return newOrder;
  };

  // Atualizar Status do Pedido (Loja)
  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders(prev =>
      prev.map(o => (o.id === orderId ? { ...o, status } : o))
    );
    if (isSupabaseConfigured) {
      supabase.from('orders').update({ status }).eq('id', orderId).then(() => {});
    }
  };

  // Produtos ativos para a vitrine pública
  const activeProducts = products.filter(p => p.is_active);

  return (
    <StoreContext.Provider
      value={{
        products,
        activeProducts,
        categories,
        storeSettings,
        orders,
        activeCategory,
        searchQuery,
        setActiveCategory,
        setSearchQuery,
        addProduct,
        updateProduct,
        deleteProduct,
        toggleProductActive,
        toggleStockVisibility,
        updateStoreSettings,
        createOrder,
        updateOrderStatus
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
