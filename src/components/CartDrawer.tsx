import React, { useState, useEffect } from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, MessageSquare, AlertCircle, ShieldAlert } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useStore } from '../context/StoreContext';

export const CartDrawer: React.FC = () => {
  const {
    items,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalPrice,
    totalItems,
    checkoutWhatsApp
  } = useCart();

  const { currentUser } = useAuth();
  const { storeSettings } = useStore();

  const [step, setStep] = useState<'cart' | 'checkout'>('cart');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('pix');
  const [notes, setNotes] = useState('');
  const [formError, setFormError] = useState('');

  // Preenche dados automaticamente se o comprador estiver logado
  useEffect(() => {
    if (currentUser) {
      if (!name) setName(currentUser.full_name || '');
      if (!phone) setPhone(currentUser.phone || '');
      if (!address && currentUser.address_street) {
        const fullAddr = `${currentUser.address_street}${
          currentUser.address_neighborhood ? ` - ${currentUser.address_neighborhood}` : ''
        }${currentUser.address_city ? `, ${currentUser.address_city}` : ''}`;
        setAddress(fullAddr);
      }
    }
  }, [currentUser, isCartOpen]);

  if (!isCartOpen) return null;

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setFormError('Por favor, informe seu nome para o pedido.');
      return;
    }
    if (!phone.trim()) {
      setFormError('Por favor, informe seu telefone / WhatsApp para contato.');
      return;
    }
    if (!address.trim()) {
      setFormError('Por favor, informe o endereço de entrega ou local da obra.');
      return;
    }

    setFormError('');
    checkoutWhatsApp({
      name: name.trim(),
      phone: phone.trim(),
      address: address.trim(),
      paymentMethod,
      notes
    });
    setStep('cart');
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 250,
        background: 'rgba(5, 7, 10, 0.75)',
        backdropFilter: 'blur(6px)',
        display: 'flex',
        justifyContent: 'flex-end',
        animation: 'fadeIn 0.2s ease'
      }}
      onClick={() => setIsCartOpen(false)}
    >
      <div
        className="glass-panel"
        style={{
          width: '100%',
          maxWidth: '480px',
          height: '100%',
          background: 'var(--bg-secondary)',
          borderLeft: '1px solid var(--border-yellow)',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '-10px 0 35px rgba(0, 0, 0, 0.8)',
          position: 'relative'
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Cabeçalho da Gaveta */}
        <div
          style={{
            padding: '1.25rem 1.5rem',
            borderBottom: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'var(--bg-secondary)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div style={{ padding: '0.4rem', borderRadius: '8px', background: 'rgba(250, 204, 21, 0.15)', color: 'var(--yellow-400)' }}>
              <ShoppingBag size={20} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800 }}>
                {step === 'cart' ? 'Carrinho de Materiais' : 'Dados para Entrega'}
              </h3>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                {totalItems} {totalItems === 1 ? 'item selecionado' : 'itens selecionados'}
              </span>
            </div>
          </div>

          <button
            onClick={() => setIsCartOpen(false)}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              padding: '0.4rem'
            }}
          >
            <X size={22} />
          </button>
        </div>

        {/* Corpo: Lista de Itens ou Formulário de Checkout */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1.25rem' }}>
          {items.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
              <div
                style={{
                  width: '70px',
                  height: '70px',
                  borderRadius: '50%',
                  background: 'var(--bg-secondary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.25rem auto',
                  color: 'var(--text-dim)'
                }}
              >
                <ShoppingBag size={34} />
              </div>
              <h4 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Seu carrinho está vazio</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                Navegue pelo catálogo e selecione os materiais elétricos e hidráulicos para sua obra.
              </p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="btn-outline-yellow"
                style={{ fontSize: '0.9rem' }}
              >
                Continuar Comprando
              </button>
            </div>
          ) : step === 'cart' ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {items.map(item => (
                <div
                  key={item.product.id}
                  style={{
                    display: 'flex',
                    gap: '0.9rem',
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border-subtle)',
                    padding: '0.85rem',
                    borderRadius: 'var(--radius-md)',
                    alignItems: 'center'
                  }}
                >
                  <img
                    src={item.product.image_url}
                    alt={item.product.name}
                    style={{
                      width: '64px',
                      height: '64px',
                      objectFit: 'cover',
                      borderRadius: 'var(--radius-sm)',
                      background: '#000'
                    }}
                  />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h5
                      style={{
                        fontSize: '0.86rem',
                        fontWeight: 700,
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        marginBottom: '0.2rem'
                      }}
                      title={item.product.name}
                    >
                      {item.product.name}
                    </h5>
                    <span style={{ fontSize: '0.74rem', color: 'var(--text-dim)', display: 'block' }}>
                      {item.product.brand} | Cód: {item.product.sku}
                    </span>
                    <span style={{ fontSize: '0.88rem', fontWeight: 800, color: 'var(--yellow-400)' }}>
                      {(item.product.price * item.quantity).toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                      })}
                    </span>
                  </div>

                  {/* Controles de Quantidade */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', background: '#090b0e', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', padding: '0.15rem' }}>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      style={{ background: 'none', border: 'none', color: '#fff', padding: '0.2rem 0.5rem', cursor: 'pointer', fontSize: '0.95rem' }}
                    >
                      -
                    </button>
                    <span style={{ fontSize: '0.82rem', fontWeight: 700, minWidth: '20px', textAlign: 'center' }}>
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      style={{ background: 'none', border: 'none', color: '#fff', padding: '0.2rem 0.5rem', cursor: 'pointer', fontSize: '0.95rem' }}
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.product.id)}
                    title="Remover item"
                    style={{ background: 'none', border: 'none', color: 'var(--status-danger)', cursor: 'pointer', padding: '0.35rem' }}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}

              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
                <button
                  onClick={clearCart}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--text-dim)',
                    fontSize: '0.78rem',
                    cursor: 'pointer',
                    textDecoration: 'underline'
                  }}
                >
                  Esvaziar carrinho
                </button>
              </div>
            </div>
          ) : (
            /* Formulário de Dados para o WhatsApp */
            <form onSubmit={handleCheckoutSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ background: 'rgba(250, 204, 21, 0.08)', border: '1px solid rgba(250, 204, 21, 0.25)', padding: '0.85rem', borderRadius: 'var(--radius-md)', marginBottom: '1.25rem', fontSize: '0.82rem', color: 'var(--yellow-300)' }}>
                Seu pedido será enviado formatado diretamente para o <strong>WhatsApp da HidraElétrica ({storeSettings.phone})</strong> para confirmação imediata!
              </div>

              {formError && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.3)', padding: '0.75rem', borderRadius: 'var(--radius-md)', color: '#fca5a5', fontSize: '0.82rem', marginBottom: '1rem' }}>
                  <AlertCircle size={16} />
                  <span>{formError}</span>
                </div>
              )}

              <div className="form-group">
                <label className="form-label">Seu Nome Completo *</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Carlos Oliveira"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">WhatsApp para Contato *</label>
                <input
                  type="tel"
                  required
                  placeholder="(11) 98765-4321"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Endereço de Entrega / Obra *</label>
                <input
                  type="text"
                  required
                  placeholder="Rua, número, bairro e cidade"
                  value={address}
                  onChange={e => setAddress(e.target.value)}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Previsão de Pagamento</label>
                <select
                  value={paymentMethod}
                  onChange={e => setPaymentMethod(e.target.value)}
                  className="form-select"
                >
                  <option value="pix">Pix (Aprovação Imediata c/ Desconto)</option>
                  <option value="cartao">Cartão de Crédito / Débito na Entrega</option>
                  <option value="faturado">Faturado para Empresas (Boleto PJ)</option>
                  <option value="dinheiro">Dinheiro na Entrega</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Observações da Obra (Opcional)</label>
                <textarea
                  placeholder="Ex: Entregar até 12h, procurar o mestre de obras..."
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  rows={2}
                  className="form-textarea"
                />
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem' }}>
                <button
                  type="button"
                  onClick={() => setStep('cart')}
                  className="btn-secondary"
                  style={{ flex: 1, padding: '0.75rem', fontSize: '0.88rem' }}
                >
                  Voltar
                </button>
                <button
                  type="submit"
                  className="btn-whatsapp"
                  style={{ flex: 2, padding: '0.75rem', fontSize: '0.92rem' }}
                >
                  <MessageSquare size={18} />
                  <span>Enviar no WhatsApp</span>
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Rodapé da Gaveta com Subtotal */}
        {items.length > 0 && step === 'cart' && (
          <div
            style={{
              padding: '1.25rem',
              borderTop: '1px solid var(--border-subtle)',
              background: 'var(--bg-secondary)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
              <span style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>Subtotal dos Materiais:</span>
              <span style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--yellow-400)', fontFamily: 'Outfit' }}>
                {totalPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </span>
            </div>

            <p style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginBottom: '1rem' }}>
              * Frete e condições especiais de entrega calculados via WhatsApp conforme localização da sua obra.
            </p>

            <button
              onClick={() => setStep('checkout')}
              className="btn-primary"
              style={{ width: '100%', padding: '0.85rem' }}
            >
              <span>Avançar para Envio via WhatsApp</span>
              <ArrowRight size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
