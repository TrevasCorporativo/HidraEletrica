import React from 'react';
import { ExternalLink, ShoppingBag, ShieldCheck } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { InstagramIcon } from './SocialIcons';

export const MarketplacesSection: React.FC = () => {
  const { isDark } = useTheme();

  return (
    <section style={{ padding: '2rem 0 3rem 0' }}>
      <div className="container">
        
        {/* Faixa Cabeçalho */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '1.5rem',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div>
            <span className="badge-yellow" style={{ marginBottom: '0.35rem' }}>
              Canais Oficiais
            </span>
            <h2 style={{ fontSize: 'clamp(1.4rem, 2.4vw, 1.85rem)', fontWeight: 800, margin: 0, color: 'var(--text-main)' }}>
              Compre onde preferir com segurança e garantia
            </h2>
          </div>

          <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
            Lojas certificadas com nota fiscal e suporte oficial
          </span>
        </div>

        {/* 3 Cards Minimalistas */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.25rem'
        }}>
          
          {/* Card 1: Mercado Livre */}
          <a
            href="https://www.mercadolivre.com.br"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '1.25rem 1.5rem',
              borderRadius: 'var(--radius-xl)',
              background: isDark ? 'rgba(16, 20, 28, 0.7)' : '#ffffff',
              border: isDark ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid #e2e8f0',
              textDecoration: 'none',
              transition: 'transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.borderColor = '#2563eb';
              e.currentTarget.style.boxShadow = isDark ? '0 8px 20px rgba(0, 0, 0, 0.3)' : '0 6px 18px rgba(37, 99, 235, 0.08)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.borderColor = isDark ? 'rgba(255, 255, 255, 0.08)' : '#e2e8f0';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '10px',
                background: '#ffe600',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 8px rgba(255, 230, 0, 0.25)',
                flexShrink: 0
              }}>
                <ShoppingBag size={22} color="#000000" />
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <span style={{ fontSize: '0.98rem', fontWeight: 800, color: 'var(--text-main)' }}>Mercado Livre</span>
                  <span style={{ fontSize: '0.65rem', fontWeight: 800, color: '#2563eb', background: isDark ? 'rgba(37, 99, 235, 0.15)' : '#eff6ff', padding: '0.15rem 0.45rem', borderRadius: 'var(--radius-full)' }}>Oficial</span>
                </div>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Frete rápido e parcelamento em até 12x</span>
              </div>
            </div>

            <div style={{ color: isDark ? 'var(--yellow-400)' : '#2563eb', display: 'flex', alignItems: 'center' }}>
              <ExternalLink size={16} />
            </div>
          </a>

          {/* Card 2: Shopee */}
          <a
            href="https://shopee.com.br"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '1.25rem 1.5rem',
              borderRadius: 'var(--radius-xl)',
              background: isDark ? 'rgba(16, 20, 28, 0.7)' : '#ffffff',
              border: isDark ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid #e2e8f0',
              textDecoration: 'none',
              transition: 'transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.borderColor = '#ee4d2d';
              e.currentTarget.style.boxShadow = isDark ? '0 8px 20px rgba(0, 0, 0, 0.3)' : '0 6px 18px rgba(238, 77, 45, 0.08)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.borderColor = isDark ? 'rgba(255, 255, 255, 0.08)' : '#e2e8f0';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '10px',
                background: '#ee4d2d',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 8px rgba(238, 77, 45, 0.25)',
                flexShrink: 0
              }}>
                <ShoppingBag size={22} color="#ffffff" />
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <span style={{ fontSize: '0.98rem', fontWeight: 800, color: 'var(--text-main)' }}>Shopee Brasil</span>
                  <span style={{ fontSize: '0.65rem', fontWeight: 800, color: '#ee4d2d', background: isDark ? 'rgba(238, 77, 45, 0.15)' : '#fff1ee', padding: '0.15rem 0.45rem', borderRadius: 'var(--radius-full)' }}>Verificada</span>
                </div>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Cupons diários e kits econômicos</span>
              </div>
            </div>

            <div style={{ color: '#ee4d2d', display: 'flex', alignItems: 'center' }}>
              <ExternalLink size={16} />
            </div>
          </a>

          {/* Card 3: Instagram */}
          <a
            href="https://www.instagram.com/hidra.eletrica"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '1.25rem 1.5rem',
              borderRadius: 'var(--radius-xl)',
              background: isDark ? 'rgba(16, 20, 28, 0.7)' : '#ffffff',
              border: isDark ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid #e2e8f0',
              textDecoration: 'none',
              transition: 'transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.borderColor = '#e1306c';
              e.currentTarget.style.boxShadow = isDark ? '0 8px 20px rgba(0, 0, 0, 0.3)' : '0 6px 18px rgba(225, 48, 108, 0.08)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.borderColor = isDark ? 'rgba(255, 255, 255, 0.08)' : '#e2e8f0';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '10px',
                background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 8px rgba(225, 48, 108, 0.25)',
                flexShrink: 0
              }}>
                <InstagramIcon size={22} color="#ffffff" />
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <span style={{ fontSize: '0.98rem', fontWeight: 800, color: 'var(--text-main)' }}>Instagram</span>
                  <span style={{ fontSize: '0.65rem', fontWeight: 800, color: '#e1306c', background: isDark ? 'rgba(225, 48, 108, 0.15)' : '#fdf2f8', padding: '0.15rem 0.45rem', borderRadius: 'var(--radius-full)' }}>@hidra.eletrica</span>
                </div>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Novidades diárias e dicas técnicas</span>
              </div>
            </div>

            <div style={{ color: '#e1306c', display: 'flex', alignItems: 'center' }}>
              <ExternalLink size={16} />
            </div>
          </a>

        </div>

      </div>
    </section>
  );
};
