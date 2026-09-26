import React from 'react';
import { ShoppingCart, Eye, CheckCircle2, AlertCircle } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
  onSelectProduct: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onSelectProduct }) => {
  const { addToCart } = useCart();

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

  return (
    <div
      className="glass-panel"
      style={{
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        transition: 'transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease',
        cursor: 'default'
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.borderColor = 'rgba(250, 204, 21, 0.4)';
        e.currentTarget.style.boxShadow = '0 12px 28px rgba(0, 0, 0, 0.6), 0 0 15px rgba(250, 204, 21, 0.15)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.borderColor = 'var(--border-card)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {/* Imagem do Produto */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '210px',
          background: 'var(--bg-tertiary)',
          overflow: 'hidden'
        }}
      >
        <img
          src={product.image_url}
          alt={product.name}
          loading="lazy"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.4s ease'
          }}
          onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.06)')}
          onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
        />

        {/* Badge da Marca */}
        <span
          style={{
            position: 'absolute',
            top: '10px',
            left: '10px',
            background: 'rgba(10, 12, 16, 0.85)',
            backdropFilter: 'blur(8px)',
            color: 'var(--yellow-400)',
            fontSize: '0.7rem',
            fontWeight: 700,
            padding: '0.2rem 0.6rem',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid rgba(250, 204, 21, 0.25)'
          }}
        >
          {product.brand}
        </span>

        {/* Botão de Ver Detalhes Rápido */}
        <button
          onClick={() => onSelectProduct(product)}
          title="Ver especificações técnicas"
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            background: 'rgba(10, 12, 16, 0.8)',
            border: '1px solid var(--border-card)',
            color: '#ffffff',
            borderRadius: '50%',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = 'var(--yellow-400)';
            e.currentTarget.style.color = '#000';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'rgba(10, 12, 16, 0.8)';
            e.currentTarget.style.color = '#ffffff';
          }}
        >
          <Eye size={16} />
        </button>
      </div>

      {/* Conteúdo do Card */}
      <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
        
        {/* Informação de Estoque Conforme Regra da Loja */}
        <div style={{ marginBottom: '0.65rem' }}>
          {product.show_stock_to_buyer ? (
            product.stock_quantity > 0 ? (
              <span className="badge-stock available">
                <CheckCircle2 size={12} />
                <span>{product.stock_quantity} un em estoque</span>
              </span>
            ) : (
              <span className="badge-stock low">
                <AlertCircle size={12} />
                <span>Sob consulta</span>
              </span>
            )
          ) : (
            <span className="badge-stock available">
              <CheckCircle2 size={12} />
              <span>Pronta Entrega</span>
            </span>
          )}
        </div>

        {/* Nome do Produto */}
        <h3
          onClick={() => onSelectProduct(product)}
          style={{
            fontSize: '1rem',
            fontWeight: 700,
            lineHeight: 1.35,
            color: 'var(--text-main)',
            marginBottom: '0.5rem',
            cursor: 'pointer',
            minHeight: '2.7rem',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}
          title={product.name}
        >
          {product.name}
        </h3>

        {/* SKU / Código */}
        <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)', marginBottom: '1rem' }}>
          Cód: {product.sku}
        </span>

        {/* Preço e Parcelamento */}
        <div style={{ marginTop: 'auto', marginBottom: '1.1rem' }}>
          {formattedOriginalPrice && (
            <span
              style={{
                fontSize: '0.8rem',
                color: 'var(--text-dim)',
                textDecoration: 'line-through',
                display: 'block',
                lineHeight: 1.2
              }}
            >
              {formattedOriginalPrice}
            </span>
          )}
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.4rem' }}>
            <span style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--yellow-400)', fontFamily: 'Outfit' }}>
              {formattedPrice}
            </span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>à vista</span>
          </div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            ou 3x de {installmentValue} s/ juros
          </span>
        </div>

        {/* Botão de Adicionar ao Carrinho */}
        <button
          onClick={() => addToCart(product, 1)}
          className="btn-primary"
          style={{
            width: '100%',
            padding: '0.7rem',
            fontSize: '0.9rem'
          }}
        >
          <ShoppingCart size={17} />
          <span>Adicionar ao Pedido</span>
        </button>
      </div>
    </div>
  );
};
