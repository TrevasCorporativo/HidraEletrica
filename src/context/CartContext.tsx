import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { CartItem, Product, Order } from '../types';
import { useStore } from './StoreContext';
import { useAuth } from './AuthContext';

interface CheckoutData {
  name: string;
  phone: string;
  address: string;
  paymentMethod: string;
  notes?: string;
}

interface CartContextType {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  checkoutWhatsApp: (data: CheckoutData) => Order | null;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'hidraeletrica_cart_v1';

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { storeSettings, createOrder } = useStore();
  const { currentUser } = useAuth();

  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.warn('Erro ao salvar carrinho no localStorage', e);
    }
  }, [items]);

  const addToCart = (product: Product, quantity = 1) => {
    setItems(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setItems(prev => prev.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setItems(prev =>
      prev.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const totalPrice = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const checkoutWhatsApp = (data: CheckoutData): Order | null => {
    if (items.length === 0) return null;

    // Formatar número do WhatsApp (remover caracteres especiais)
    const rawNumber = storeSettings.whatsapp_number.replace(/\D/g, '');
    const cleanNumber = rawNumber.startsWith('55') ? rawNumber : `55${rawNumber}`;

    // Construção da mensagem formatada e elegante
    const dateFormatted = new Date().toLocaleDateString('pt-BR');
    const timeFormatted = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

    let message = `⚡ *NOVO PEDIDO - HIDRAELÉTRICA* ⚡\n`;
    message += `📅 Data: ${dateFormatted} às ${timeFormatted}\n`;
    message += `-------------------------------------------\n`;
    message += `👤 *DADOS DO COMPRADOR:*\n`;
    message += `• *Nome:* ${data.name}\n`;
    message += `• *Telefone:* ${data.phone}\n`;
    message += `• *Entrega:* ${data.address}\n`;
    message += `• *Pagamento:* ${data.paymentMethod.toUpperCase()}\n`;
    if (data.notes && data.notes.trim()) {
      message += `• *Observações:* ${data.notes.trim()}\n`;
    }
    message += `-------------------------------------------\n`;
    message += `📦 *ITENS DO PEDIDO:*\n`;

    items.forEach((item, index) => {
      const subtotal = (item.product.price * item.quantity).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      });
      const unitPrice = item.product.price.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      });
      message += `${index + 1}. *${item.product.name}*\n`;
      message += `   Qtd: ${item.quantity}x | Unit: ${unitPrice} | Subtotal: *${subtotal}*\n`;
      message += `   (Cód: ${item.product.sku} | Marca: ${item.product.brand})\n`;
    });

    message += `-------------------------------------------\n`;
    message += `💰 *TOTAL ESTIMADO: ${totalPrice.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    })}*\n`;
    message += `-------------------------------------------\n`;
    message += `Olá equipe HidraElétrica! Gostaria de confirmar a disponibilidade dos itens e fechar o pedido de materiais.`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encodedMessage}`;

    // Registrar o pedido no banco/estado
    const createdOrder = createOrder({
      buyer_id: currentUser?.id,
      buyer_name: data.name,
      buyer_phone: data.phone,
      buyer_email: currentUser?.email,
      delivery_address: data.address,
      payment_method: data.paymentMethod,
      notes: data.notes,
      items: [...items],
      total_amount: totalPrice,
      status: 'pendente',
      whatsapp_url: whatsappUrl
    });

    // Efeito de confetes festivo
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#facc15', '#eab308', '#ffffff', '#10b981']
      });
    } catch {
      // Ignora erro se canvas não estiver disponível
    }

    // Redireciona para o WhatsApp
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

    // Limpa o carrinho após checkout
    clearCart();
    setIsCartOpen(false);

    return createdOrder;
  };

  return (
    <CartContext.Provider
      value={{
        items,
        totalItems,
        totalPrice,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        checkoutWhatsApp
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
