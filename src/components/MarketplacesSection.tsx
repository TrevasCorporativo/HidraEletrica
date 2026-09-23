import React from 'react';
import { ExternalLink, ShoppingBag } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { InstagramIcon } from './SocialIcons';

export const MarketplacesSection: React.FC = () => {
  const { isDark } = useTheme();

  return (
    <section style={{ padding: '1rem 0 2.5rem 0' }}>
      <div className="container">
        <div style={{
          background: isDark ? 'rgba(18, 22, 31, 0.7)' : '#f8fafc',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-xl)',
          padding: '1.25rem 1.75rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1.25rem'
        }}>
          <div>
            <span style={{ fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', color: isDark ? 'var(--yellow-400)' : '#b45309', letterSpacing: '0.06em' }}>
              Canais Oficiais
            </span>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)' }}>
              Compre Onde Preferir
            </h3>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', flexWrap: 'wrap' }}>
            {/* Mercado Livre */}
            <a
              href="https://www.mercadolivre.com.br"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                background: isDark ? 'rgba(255, 255, 255, 0.04)' : '#ffffff',
                border: '1px solid var(--border-card)',
                padding: '0.6rem 1rem',
                borderRadius: 'var(--radius-md)',
                boxShadow: 'var(--shadow-sm)',
                transition: 'all 0.2s ease',
                textDecoration: 'none'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = '#2563eb';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'var(--border-card)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#ffe600', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <ShoppingBag size={17} color="#000000" />
              </div>
              <div style={{ textAlign: 'left' }}>
                <strong style={{ fontSize: '0.85rem', display: 'block', color: 'var(--text-main)', lineHeight: 1.2 }}>Mercado Livre</strong>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Envio Full & Parcelamento</span>
              </div>
              <ExternalLink size={13} color="var(--text-dim)" />
            </a>

            {/* Shopee */}
            <a
              href="https://shopee.com.br"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                background: isDark ? 'rgba(255, 255, 255, 0.04)' : '#ffffff',
                border: '1px solid var(--border-card)',
                padding: '0.6rem 1rem',
                borderRadius: 'var(--radius-md)',
                boxShadow: 'var(--shadow-sm)',
                transition: 'all 0.2s ease',
                textDecoration: 'none'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = '#ee4d2d';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'var(--border-card)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#ee4d2d', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <ShoppingBag size={17} color="#ffffff" />
              </div>
              <div style={{ textAlign: 'left' }}>
                <strong style={{ fontSize: '0.85rem', display: 'block', color: 'var(--text-main)', lineHeight: 1.2 }}>Shopee</strong>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Cupons & Frete Grátis</span>
              </div>
              <ExternalLink size={13} color="var(--text-dim)" />
            </a>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/hidra.eletrica"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                background: isDark ? 'rgba(255, 255, 255, 0.04)' : '#ffffff',
                border: '1px solid var(--border-card)',
                padding: '0.6rem 1rem',
                borderRadius: 'var(--radius-md)',
                boxShadow: 'var(--shadow-sm)',
                transition: 'all 0.2s ease',
                textDecoration: 'none'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = '#c026d3';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'var(--border-card)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'linear-gradient(135deg, #833ab4, #fd1d1d, #fcb045)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <InstagramIcon size={17} color="#ffffff" />
              </div>
              <div style={{ textAlign: 'left' }}>
                <strong style={{ fontSize: '0.85rem', display: 'block', color: 'var(--text-main)', lineHeight: 1.2 }}>@hidra.eletrica</strong>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Siga no Instagram</span>
              </div>
              <ExternalLink size={13} color="var(--text-dim)" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
