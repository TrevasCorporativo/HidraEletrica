import React from 'react';
import { ShoppingCart, Eye, CheckCircle2, AlertCircle, Plus } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';

interface ProductCardProps {
  product: Product;
  onSelectProduct: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onSelectProduct }) => {
  const { addToCart } = useCart();
  const { isDark } = useTheme();

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

  const installmentValue = (product.price / 3).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });

  const discountPercent = product.original_price
    ? Math.round(((product.original_price - product.price) / product.original_price) * 100)
    : null;

  return (
    <div
      className="product-card-minimal"
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        borderRadius: 'var(--radius-lg)',
        border: isDark ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid #e2e8f0',
        background: isDark ? 'rgba(16, 20, 28, 0.7)' : '#ffffff',
        overflow: 'hidden',
        transition: 'transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease',
        position: 'relative'
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-3px)';
        e.currentTarget.style.borderColor = isDark ? 'rgba(250, 204, 21, 0.4)' : '#cbd5e1';
        e.currentTarget.style.boxShadow = isDark
          ? '0 10px 24px rgba(0, 0, 0, 0.4)'
          : '0 8px 20px rgba(0, 0, 0, 0.06)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.borderColor = isDark ? 'rgba(255, 255, 255, 0.08)' : '#e2e8f0';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {/* Imagem do Produto */}
      <div
        onClick={() => onSelectProduct(product)}
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '1 / 1',
          background: isDark ? 'rgba(11, 14, 20, 0.9)' : '#f8fafc',
          cursor: 'pointer',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1rem'
        }}
      >
        <img
          src={product.image_url}
          alt={product.name}
          loading="lazy"
          style={{
            maxWidth: '100%',
            maxHeight: '100%',
            objectFit: 'contain',
            transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
          onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.05)')}
          onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
        />

        {/* Tag de Desconto se houver */}
        {discountPercent && discountPercent > 0 && (
          <span
            style={{
              position: 'absolute',
              top: '8px',
              left: '8px',
              background: '#ef4444',
              color: '#ffffff',
              fontSize: '0.68rem',
              fontWeight: 800,
              padding: '0.2rem 0.45rem',
              borderRadius: 'var(--radius-sm)',
              letterSpacing: '0.02em',
              boxShadow: '0 2px 6px rgba(239, 68, 68, 0.3)'
            }}
          >
            -{discountPercent}%
          </span>
        )}

        {/* Botão de Ver Detalhes Rápido */}
        <button
          onClick={e => {
            e.stopPropagation();
            onSelectProduct(product);
          }}
          title="Ver detalhes técnicos"
          style={{
            position: 'absolute',
            top: '8px',
            right: '8px',
            width: '30px',
            height: '30px',
            borderRadius: '50%',
            background: isDark ? 'rgba(0, 0, 0, 0.65)' : 'rgba(255, 255, 255, 0.9)',
            border: isDark ? '1px solid rgba(255, 255, 255, 0.15)' : '1px solid #e2e8f0',
            color: 'var(--text-main)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.15s ease',
            opacity: 0.85
          }}
          onMouseEnter={e => {
            e.currentTarget.style.opacity = '1';
            e.currentTarget.style.transform = 'scale(1.08)';
            e.currentTarget.style.background = 'var(--yellow-400)';
            e.currentTarget.style.color = '#000000';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.opacity = '0.85';
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.background = isDark ? 'rgba(0, 0, 0, 0.65)' : 'rgba(255, 255, 255, 0.9)';
            e.currentTarget.style.color = 'var(--text-main)';
          }}
        >
          <Eye size={14} />
        </button>
      </div>

      {/* Conteúdo & Tipografia Minimalista */}
      <div style={{ padding: '0.95rem', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
        
        <div>
          {/* Marca & Estoque em 1 linha limpa */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem', gap: '0.5rem' }}>
            <span style={{
              fontSize: '0.68rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              color: isDark ? 'var(--yellow-400)' : '#b45309'
            }}>
              {product.brand}
            </span>

            {/* Selo sutil de estoque */}
            <span style={{
              fontSize: '0.68rem',
              fontWeight: 600,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.25rem',
              color: product.stock_quantity > 0 ? '#16a34a' : 'var(--text-dim)'
            }}>
              <span style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: product.stock_quantity > 0 ? '#22c55e' : '#94a3b8'
              }} />
              {product.show_stock_to_buyer ? `${product.stock_quantity} un` : 'Pronta Entrega'}
            </span>
          </div>

          {/* Nome do Produto */}
          <h3
            onClick={() => onSelectProduct(product)}
            title={product.name}
            style={{
              fontSize: '0.92rem',
              fontWeight: 700,
              lineHeight: 1.35,
              color: 'var(--text-main)',
              marginBottom: '0.35rem',
              cursor: 'pointer',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              minHeight: '2.5rem'
            }}
          >
            {product.name}
          </h3>

          {/* SKU Discreto */}
          <span style={{ fontSize: '0.68rem', color: 'var(--text-dim)', display: 'block', marginBottom: '0.75rem' }}>
            Ref: {product.sku}
          </span>
        </div>

        {/* Preço e Botão */}
        <div>
          {/* Preço Original Riscado */}
          {formattedOriginalPrice && (
            <span style={{
              fontSize: '0.75rem',
              color: 'var(--text-dim)',
              textDecoration: 'line-through',
              display: 'block',
              lineHeight: 1.1
            }}>
              {formattedOriginalPrice}
            </span>
          )}

          {/* Preço Principal */}
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.35rem', marginBottom: '0.2rem' }}>
            <span style={{
              fontSize: '1.25rem',
              fontWeight: 800,
              fontFamily: 'Outfit',
              color: 'var(--text-main)',
              letterSpacing: '-0.02em'
            }}>
              {formattedPrice}
            </span>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>à vista</span>
          </div>

          {/* Parcelamento */}
          <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)', display: 'block', marginBottom: '0.85rem' }}>
            ou 3x de {installmentValue} s/ juros
          </span>

          {/* Botão de Compra / Adicionar */}
          <button
            onClick={() => addToCart(product, 1)}
            style={{
              width: '100%',
              padding: '0.55rem 0.75rem',
              borderRadius: 'var(--radius-md)',
              border: 'none',
              background: isDark ? 'linear-gradient(135deg, var(--yellow-400), #eab308)' : '#0f172a',
              color: isDark ? '#000000' : '#ffffff',
              fontWeight: 800,
              fontSize: '0.84rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.45rem',
              transition: 'all 0.15s ease'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-1px)';
              e.currentTarget.style.filter = 'brightness(1.1)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.filter = 'none';
            }}
          >
            <ShoppingCart size={15} />
            <span>Adicionar</span>
          </button>
        </div>

      </div>
    </div>
  );
};
