import React from 'react';
import { ExternalLink, ShoppingBag, CheckCircle2 } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { InstagramIcon } from './SocialIcons';

export const MarketplacesSection: React.FC = () => {
  const { isDark } = useTheme();

  return (
    <section style={{ padding: '2.5rem 0 3.5rem 0' }}>
      <div className="container">
        
        {/* Título da Seção */}
        <div style={{ textAlign: 'center', marginBottom: '2.2rem' }}>
          <span className="badge-yellow" style={{ marginBottom: '0.5rem' }}>
            Canais Oficiais de Venda & Redes
          </span>
          <h2 style={{ fontSize: 'clamp(1.75rem, 3.2vw, 2.3rem)', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '0.4rem' }}>
            Estamos Presentes Também em:
          </h2>
          <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', maxWidth: '580px', margin: '0 auto' }}>
            Compre com total segurança nos maiores marketplaces do país ou acompanhe nossas novidades e ofertas diárias:
          </p>
        </div>

        {/* Grid com 3 Cards Grandes e Claros */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.5rem'
        }}>
          
          {/* Card 1: Mercado Livre */}
          <div
            className="glass-panel"
            style={{
              padding: '2rem 1.75rem',
              borderRadius: 'var(--radius-xl)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              border: isDark ? '1px solid rgba(250, 204, 21, 0.25)' : '1px solid #e2e8f0',
              background: isDark ? 'rgba(18, 22, 31, 0.85)' : '#ffffff',
              boxShadow: isDark ? 'var(--shadow-md)' : '0 6px 20px rgba(0, 0, 0, 0.05)',
              transition: 'all 0.25s ease'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.borderColor = '#2563eb';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.borderColor = isDark ? 'rgba(250, 204, 21, 0.25)' : '#e2e8f0';
            }}
          >
            <div>
              {/* Header do Card */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#ffe600', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(255, 230, 0, 0.3)' }}>
                  <ShoppingBag size={24} color="#000000" />
                </div>
                <span style={{ fontSize: '0.72rem', fontWeight: 800, padding: '0.25rem 0.65rem', borderRadius: 'var(--radius-full)', background: isDark ? 'rgba(37, 99, 235, 0.15)' : '#eff6ff', color: '#2563eb', border: '1px solid rgba(37, 99, 235, 0.3)' }}>
                  Loja Oficial
                </span>
              </div>

              <h3 style={{ fontSize: '1.35rem', fontWeight: 800, marginBottom: '0.5rem', color: 'var(--text-main)' }}>
                Mercado Livre
              </h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                Compre com agilidade e total proteção. Aproveite opções de frete grátis, entrega rápida e parcelamento facilitado no cartão.
              </p>

              {/* Lista de Vantagens */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.82rem', color: 'var(--text-main)' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                  <CheckCircle2 size={16} color="#16a34a" /> Entrega Rápida e Segura
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                  <CheckCircle2 size={16} color="#16a34a" /> Parcelamento em até 12x
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                  <CheckCircle2 size={16} color="#16a34a" /> Compra 100% Garantida
                </span>
              </div>
            </div>

            <a
              href="https://www.mercadolivre.com.br"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                background: '#ffe600',
                color: '#000000',
                fontWeight: 800,
                fontSize: '0.92rem',
                padding: '0.85rem 1.25rem',
                borderRadius: 'var(--radius-lg)',
                textDecoration: 'none',
                transition: 'all 0.2s ease',
                boxShadow: '0 4px 14px rgba(255, 230, 0, 0.25)'
              }}
              onMouseEnter={e => e.currentTarget.style.filter = 'brightness(0.95)'}
              onMouseLeave={e => e.currentTarget.style.filter = 'none'}
            >
              <span>Acessar no Mercado Livre</span>
              <ExternalLink size={16} />
            </a>
          </div>

          {/* Card 2: Shopee */}
          <div
            className="glass-panel"
            style={{
              padding: '2rem 1.75rem',
              borderRadius: 'var(--radius-xl)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              border: isDark ? '1px solid rgba(238, 77, 45, 0.25)' : '1px solid #e2e8f0',
              background: isDark ? 'rgba(18, 22, 31, 0.85)' : '#ffffff',
              boxShadow: isDark ? 'var(--shadow-md)' : '0 6px 20px rgba(0, 0, 0, 0.05)',
              transition: 'all 0.25s ease'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.borderColor = '#ee4d2d';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.borderColor = isDark ? 'rgba(238, 77, 45, 0.25)' : '#e2e8f0';
            }}
          >
            <div>
              {/* Header do Card */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#ee4d2d', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(238, 77, 45, 0.3)' }}>
                  <ShoppingBag size={24} color="#ffffff" />
                </div>
                <span style={{ fontSize: '0.72rem', fontWeight: 800, padding: '0.25rem 0.65rem', borderRadius: 'var(--radius-full)', background: isDark ? 'rgba(238, 77, 45, 0.15)' : '#fff1ee', color: '#ee4d2d', border: '1px solid rgba(238, 77, 45, 0.3)' }}>
                  Loja Oficial
                </span>
              </div>

              <h3 style={{ fontSize: '1.35rem', fontWeight: 800, marginBottom: '0.5rem', color: 'var(--text-main)' }}>
                Shopee Brasil
              </h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                Aproveite cupons de desconto diários, ofertas relâmpago e kits especiais de materiais elétricos e hidráulicos direto da fábrica.
              </p>

              {/* Lista de Vantagens */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.82rem', color: 'var(--text-main)' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                  <CheckCircle2 size={16} color="#16a34a" /> Cupons de Desconto Exclusivos
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                  <CheckCircle2 size={16} color="#16a34a" /> Kits Prontos para Reforma
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                  <CheckCircle2 size={16} color="#16a34a" /> Frete Grátis pelo App Shopee
                </span>
              </div>
            </div>

            <a
              href="https://shopee.com.br"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                background: '#ee4d2d',
                color: '#ffffff',
                fontWeight: 800,
                fontSize: '0.92rem',
                padding: '0.85rem 1.25rem',
                borderRadius: 'var(--radius-lg)',
                textDecoration: 'none',
                transition: 'all 0.2s ease',
                boxShadow: '0 4px 14px rgba(238, 77, 45, 0.3)'
              }}
              onMouseEnter={e => e.currentTarget.style.filter = 'brightness(0.95)'}
              onMouseLeave={e => e.currentTarget.style.filter = 'none'}
            >
              <span>Acessar na Shopee</span>
              <ExternalLink size={16} />
            </a>
          </div>

          {/* Card 3: Instagram */}
          <div
            className="glass-panel"
            style={{
              padding: '2rem 1.75rem',
              borderRadius: 'var(--radius-xl)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              border: isDark ? '1px solid rgba(192, 38, 211, 0.25)' : '1px solid #e2e8f0',
              background: isDark ? 'rgba(18, 22, 31, 0.85)' : '#ffffff',
              boxShadow: isDark ? 'var(--shadow-md)' : '0 6px 20px rgba(0, 0, 0, 0.05)',
              transition: 'all 0.25s ease'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.borderColor = '#c026d3';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.borderColor = isDark ? 'rgba(192, 38, 211, 0.25)' : '#e2e8f0';
            }}
          >
            <div>
              {/* Header do Card */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'linear-gradient(135deg, #833ab4, #fd1d1d, #fcb045)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(253, 29, 29, 0.3)' }}>
                  <InstagramIcon size={24} color="#ffffff" />
                </div>
                <span style={{ fontSize: '0.72rem', fontWeight: 800, padding: '0.25rem 0.65rem', borderRadius: 'var(--radius-full)', background: isDark ? 'rgba(192, 38, 211, 0.15)' : '#fdf4ff', color: '#c026d3', border: '1px solid rgba(192, 38, 211, 0.3)' }}>
                  Canal Oficial
                </span>
              </div>

              <h3 style={{ fontSize: '1.35rem', fontWeight: 800, marginBottom: '0.5rem', color: 'var(--text-main)' }}>
                @hidra.eletrica
              </h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                Siga nosso perfil no Instagram para acompanhar novidades da loja, dicas práticas de instalação, promoções relâmpago e bastidores.
              </p>

              {/* Lista de Vantagens */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.82rem', color: 'var(--text-main)' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                  <CheckCircle2 size={16} color="#16a34a" /> Dicas Técnicas para sua Obra
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                  <CheckCircle2 size={16} color="#16a34a" /> Lançamentos em Primeira Mão
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                  <CheckCircle2 size={16} color="#16a34a" /> Atendimento Rápido pelo Direct
                </span>
              </div>
            </div>

            <a
              href="https://www.instagram.com/hidra.eletrica"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                background: 'linear-gradient(135deg, #833ab4, #fd1d1d, #fcb045)',
                color: '#ffffff',
                fontWeight: 800,
                fontSize: '0.92rem',
                padding: '0.85rem 1.25rem',
                borderRadius: 'var(--radius-lg)',
                textDecoration: 'none',
                transition: 'all 0.2s ease',
                boxShadow: '0 4px 14px rgba(253, 29, 29, 0.3)'
              }}
              onMouseEnter={e => e.currentTarget.style.filter = 'brightness(0.95)'}
              onMouseLeave={e => e.currentTarget.style.filter = 'none'}
            >
              <span>Seguir no Instagram</span>
              <ExternalLink size={16} />
            </a>
          </div>

        </div>

      </div>
    </section>
  );
};
