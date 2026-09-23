import React, { useState } from 'react';
import { X, ShoppingCart, ShieldCheck, CheckCircle2, AlertCircle, Wrench } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({ product, onClose }) => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  const formattedPrice = product.price.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });

  const formattedOriginalPrice = product.original_price
    ? product.original_price.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      })
    : null;

  const handleAdd = () => {
    addToCart(product, quantity);
    onClose();
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 200,
        background: 'rgba(5, 7, 10, 0.85)',
        backdropFilter: 'blur(10px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem'
      }}
      onClick={onClose}
    >
      <div
        className="glass-panel animate-fade-in"
        style={{
          width: '100%',
          maxWidth: '820px',
          maxHeight: '90vh',
          borderRadius: 'var(--radius-xl)',
          overflowY: 'auto',
          background: '#11141c',
          border: '1px solid var(--border-yellow)',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.8), 0 0 25px rgba(250, 204, 21, 0.15)',
          position: 'relative'
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Botão Fechar */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '18px',
            right: '18px',
            background: 'rgba(255, 255, 255, 0.08)',
            border: 'none',
            color: '#fff',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 10,
            transition: 'all 0.2s'
          }}
          onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)')}
          onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)')}
        >
          <X size={20} />
        </button>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', padding: '2rem' }}>
          
          {/* Imagem do Produto */}
          <div>
            <div style={{
              width: '100%',
              height: '320px',
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              background: '#090b0e',
              border: '1px solid var(--border-subtle)',
              marginBottom: '1rem'
            }}>
              <img
                src={product.image_url}
                alt={product.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            
            {/* Selos de Garantia */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', background: 'rgba(255, 255, 255, 0.03)', padding: '0.85rem', borderRadius: 'var(--radius-md)' }}>
              <ShieldCheck size={24} color="var(--yellow-400)" />
              <div>
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#fff', display: 'block' }}>Garantia de Procedência HidraElétrica</span>
                <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>Material original com nota fiscal e suporte técnico</span>
              </div>
            </div>
          </div>

          {/* Dados Técnicos e Compra */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
              <span className="badge-yellow">{product.brand}</span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>SKU: {product.sku}</span>
            </div>

            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '0.75rem', lineHeight: 1.3 }}>
              {product.name}
            </h2>

            {/* Status de Estoque */}
            <div style={{ marginBottom: '1rem' }}>
              {product.show_stock_to_buyer ? (
                product.stock_quantity > 0 ? (
                  <span className="badge-stock available">
                    <CheckCircle2 size={13} />
                    <span>Estoque: {product.stock_quantity} unidades disponíveis</span>
                  </span>
                ) : (
                  <span className="badge-stock low">
                    <AlertCircle size={13} />
                    <span>Produto sob consulta / encomenda</span>
                  </span>
                )
              ) : (
                <span className="badge-stock available">
                  <CheckCircle2 size={13} />
                  <span>Disponível para Pronta Entrega</span>
                </span>
              )}
            </div>

            {/* Descrição */}
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
              {product.description}
            </p>

            {/* Tabela de Especificações Técnicas */}
            {product.specs && Object.keys(product.specs).length > 0 && (
              <div style={{ marginBottom: '1.5rem' }}>
                <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--yellow-400)', marginBottom: '0.6rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Wrench size={14} /> Ficha Técnica
                </h4>
                <div style={{ background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', padding: '0.6rem 0.9rem', fontSize: '0.82rem' }}>
                  {Object.entries(product.specs).map(([key, val]) => (
                    <div key={key} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.35rem 0', borderBottom: '1px solid var(--border-subtle)' }}>
                      <span style={{ color: 'var(--text-muted)' }}>{key}:</span>
                      <strong style={{ color: '#fff' }}>{val}</strong>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Preço */}
            <div style={{ marginTop: 'auto', background: 'rgba(234, 179, 8, 0.06)', border: '1px solid rgba(234, 179, 8, 0.2)', padding: '1rem', borderRadius: 'var(--radius-lg)', marginBottom: '1.25rem' }}>
              {formattedOriginalPrice && (
                <span style={{ fontSize: '0.82rem', color: 'var(--text-dim)', textDecoration: 'line-through', display: 'block' }}>
                  De: {formattedOriginalPrice}
                </span>
              )}
              <div style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--yellow-400)', fontFamily: 'Outfit' }}>
                {formattedPrice}
              </div>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                Faturamento no boleto disponível para CNPJ sob consulta
              </span>
            </div>

            {/* Controle de Quantidade e Adição */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', background: 'var(--bg-secondary)', border: '1px solid var(--border-card)', borderRadius: 'var(--radius-md)' }}>
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  style={{ background: 'none', border: 'none', color: '#fff', padding: '0.7rem 1rem', cursor: 'pointer', fontSize: '1.1rem' }}
                >
                  -
                </button>
                <span style={{ padding: '0 0.8rem', fontWeight: 700, fontSize: '1rem', minWidth: '35px', textAlign: 'center' }}>
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  style={{ background: 'none', border: 'none', color: '#fff', padding: '0.7rem 1rem', cursor: 'pointer', fontSize: '1.1rem' }}
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAdd}
                className="btn-primary"
                style={{ flex: 1, padding: '0.85rem' }}
              >
                <ShoppingCart size={19} />
                <span>Adicionar ao Pedido</span>
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
